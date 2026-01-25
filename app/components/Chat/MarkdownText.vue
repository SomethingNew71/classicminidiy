<template>
  <div class="markdown-content" :class="{ 'streaming-content': showCursor }">
    <!-- Settled content (already animated) -->
    <span v-if="settledHtml" v-html="settledHtml"></span>
    <!-- New content with streaming animation -->
    <span
      v-for="(token, index) in animatedTokens"
      :key="`token-${index}-${token.text.slice(0, 10)}`"
      :class="['streaming-token', animationClass]"
      :style="getTokenStyle(index)"
      v-html="token.html"
    ></span>
    <!-- Streaming cursor -->
    <span v-if="showCursor" class="streaming-cursor"></span>
  </div>
</template>

<script setup lang="ts">
  import { marked } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';
  import type { MarkdownTextProps } from '../../../data/models/chat';

  export interface StreamingAnimationOptions {
    /** Animation type: 'fadeIn' | 'blurIn' | 'typewriter' */
    animationType?: 'fadeIn' | 'blurIn' | 'typewriter';
    /** Whether streaming animation is enabled */
    enableAnimation?: boolean;
  }

  const props = withDefaults(defineProps<MarkdownTextProps & { showCursor?: boolean } & StreamingAnimationOptions>(), {
    showCursor: false,
    animationType: 'fadeIn',
    enableAnimation: true,
  });

  // Animation configuration
  const ANIMATION_DURATION = 150; // ms - fast fade/blur in
  const STAGGER_DELAY = 10; // ms between tokens
  const SETTLE_BUFFER = 50; // extra buffer before settling

  // Track settled content (already animated)
  const settledContent = ref('');
  const settledHtml = ref('');

  // Animated tokens for new content
  interface AnimatedToken {
    text: string;
    html: string;
  }
  const animatedTokens = ref<AnimatedToken[]>([]);

  // Timer for settling content
  let settleTimer: ReturnType<typeof setTimeout> | null = null;

  // Get animation class based on type
  const animationClass = computed(() => {
    if (!props.enableAnimation || !props.showCursor) return '';
    switch (props.animationType) {
      case 'blurIn':
        return 'animation-blur-in';
      case 'typewriter':
        return 'animation-typewriter';
      case 'fadeIn':
      default:
        return 'animation-fade-in';
    }
  });

  // Get staggered animation style for each token
  function getTokenStyle(index: number) {
    if (!props.enableAnimation || !props.showCursor) return {};
    return {
      animationDelay: `${index * STAGGER_DELAY}ms`,
      animationDuration: `${ANIMATION_DURATION}ms`,
    };
  }

  // Parse markdown for a single token/chunk
  function parseTokenMarkdown(text: string): string {
    try {
      // Use parseInline for token-level parsing to avoid wrapping in <p> tags
      return marked.parseInline(text) as string;
    } catch {
      return text;
    }
  }

  // Function to add UTM parameters to URLs
  function addUtmParameters(url: string): string {
    try {
      const urlObj = new URL(url);

      // UTM parameters for your store
      const utmParams = {
        utm_source: 'diy_chat_bot',
        utm_medium: 'chat',
        utm_campaign: 'assistant_recommendation',
        utm_content: 'chat_response',
      };

      // Add UTM parameters if they don't already exist
      Object.entries(utmParams).forEach(([key, value]) => {
        if (!urlObj.searchParams.has(key)) {
          urlObj.searchParams.set(key, value);
        }
      });

      return urlObj.toString();
    } catch (error) {
      // If URL parsing fails, return original URL
      console.warn('Failed to parse URL for UTM parameters:', url);
      return url;
    }
  }

  // Custom renderer for links
  const renderer = new marked.Renderer();
  renderer.link = function ({ href, title, tokens }: any) {
    const processedHref = addUtmParameters(href);
    const titleAttr = title ? ` title="${title}"` : '';
    const text = this.parser.parseInline(tokens);
    return `<a href="${processedHref}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  // Configure marked with syntax highlighting and custom renderer
  marked.use(
    markedHighlight({
      langPrefix: 'language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    renderer: renderer,
  });

  // Process content changes for streaming animation
  function processContentUpdate(newContent: string, isStreaming: boolean) {
    if (!isStreaming || !props.enableAnimation) {
      // Not streaming or animation disabled - render all as settled
      settledContent.value = newContent;
      settledHtml.value = marked.parse(newContent) as string;
      animatedTokens.value = [];
      return;
    }

    // Get new portion of content
    const newPortion = newContent.slice(settledContent.value.length);

    if (newPortion.length === 0) {
      return; // No new content
    }

    // Tokenize new content (split by words and whitespace)
    const tokenRegex = /(\S+|\s+)/g;
    const tokens: AnimatedToken[] = [];
    let match;

    while ((match = tokenRegex.exec(newPortion)) !== null) {
      tokens.push({
        text: match[0],
        html: parseTokenMarkdown(match[0]),
      });
    }

    animatedTokens.value = tokens;

    // Schedule settling of animated content
    if (settleTimer) {
      clearTimeout(settleTimer);
    }

    if (tokens.length > 0) {
      const totalAnimationTime = ANIMATION_DURATION + tokens.length * STAGGER_DELAY + SETTLE_BUFFER;
      settleTimer = setTimeout(() => {
        // Move animated content to settled
        settledContent.value = newContent;
        settledHtml.value = marked.parse(newContent) as string;
        animatedTokens.value = [];
      }, totalAnimationTime);
    }
  }

  // Watch for content changes
  watch(
    () => props.content,
    (newContent) => {
      processContentUpdate(newContent, props.showCursor);
    },
    { immediate: true }
  );

  // When streaming stops, immediately settle all content
  watch(
    () => props.showCursor,
    (isStreaming) => {
      if (!isStreaming) {
        // Streaming stopped - settle everything immediately
        if (settleTimer) {
          clearTimeout(settleTimer);
          settleTimer = null;
        }
        settledContent.value = props.content;
        settledHtml.value = marked.parse(props.content) as string;
        animatedTokens.value = [];
      }
    }
  );

  // Reset state when content is cleared (new message)
  watch(
    () => props.content,
    (newContent, oldContent) => {
      if (newContent.length < (oldContent?.length || 0) - 10) {
        // Content was significantly reduced - likely a new message
        settledContent.value = '';
        settledHtml.value = '';
        animatedTokens.value = [];
      }
    }
  );

  // Cleanup timer on unmount
  onUnmounted(() => {
    if (settleTimer) {
      clearTimeout(settleTimer);
    }
  });
</script>

<style scoped>
  /* Import highlight.js theme */
  @import 'highlight.js/styles/github-dark.css';

  .markdown-content {
    font-size: 1rem;
    line-height: 1.6;
    color: hsl(var(--bc));
  }

  /* Headings */
  .markdown-content :deep(h1) {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    margin-top: 1.25rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(h4) {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 0.75rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(h5) {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    margin-top: 0.5rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(h6) {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    margin-top: 0.5rem;
    color: hsl(var(--bc));
  }

  /* Paragraphs */
  .markdown-content :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: hsl(var(--bc));
  }

  /* Lists */
  .markdown-content :deep(ul) {
    list-style-type: disc;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(ol) {
    list-style-type: decimal;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(li) {
    margin-bottom: 0.25rem;
    line-height: 1.6;
  }

  /* Nested lists */
  .markdown-content :deep(ul ul),
  .markdown-content :deep(ol ol),
  .markdown-content :deep(ul ol),
  .markdown-content :deep(ol ul) {
    margin-left: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  /* Links */
  .markdown-content :deep(a) {
    color: hsl(var(--p));
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .markdown-content :deep(a:hover) {
    color: hsl(var(--pf));
  }

  /* Code */
  .markdown-content :deep(code) {
    background-color: hsl(var(--b2));
    color: hsl(var(--bc));
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  .markdown-content :deep(pre) {
    background-color: #0d1117 !important;
    color: #f0f6fc;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1rem;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  }

  .markdown-content :deep(pre code) {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }

  /* Blockquotes */
  .markdown-content :deep(blockquote) {
    border-left: 4px solid hsl(var(--b3));
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: hsl(var(--bc) / 0.8);
  }

  /* Tables */
  .markdown-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  .markdown-content :deep(th),
  .markdown-content :deep(td) {
    border: 1px solid hsl(var(--b3));
    padding: 0.5rem 0.75rem;
    text-align: left;
  }

  .markdown-content :deep(th) {
    background-color: hsl(var(--b2));
    font-weight: 600;
  }

  /* Horizontal rules */
  .markdown-content :deep(hr) {
    border: none;
    border-top: 1px solid hsl(var(--b3));
    margin: 1.5rem 0;
  }

  /* Strong and emphasis */
  .markdown-content :deep(strong) {
    font-weight: 700;
    color: hsl(var(--bc));
  }

  .markdown-content :deep(em) {
    font-style: italic;
    color: hsl(var(--bc));
  }

  /* Images */
  .markdown-content :deep(img) {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
  }

  /* Remove default margins from first and last elements */
  .markdown-content :deep(> *:first-child) {
    margin-top: 0;
  }

  .markdown-content :deep(> *:last-child) {
    margin-bottom: 0;
  }

  /* Streaming cursor */
  .streaming-cursor {
    display: inline-block;
    width: 0.375rem; /* 1.5 */
    height: 1rem;
    background-color: hsl(var(--p));
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    margin-left: 0.125rem; /* 0.5 */
    vertical-align: text-bottom;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* ============================================
     Streaming Token Animations (flowtoken-style)
     ============================================ */

  .streaming-token {
    display: inline;
    animation-fill-mode: both;
  }

  /* Fade In Animation */
  .animation-fade-in {
    animation-name: streamFadeIn;
    animation-timing-function: ease-out;
  }

  @keyframes streamFadeIn {
    0% {
      opacity: 0;
      transform: translateY(4px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Blur In Animation */
  .animation-blur-in {
    animation-name: streamBlurIn;
    animation-timing-function: ease-out;
  }

  @keyframes streamBlurIn {
    0% {
      opacity: 0;
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }

  /* Typewriter Animation */
  .animation-typewriter {
    animation-name: streamTypewriter;
    animation-timing-function: steps(1, end);
  }

  @keyframes streamTypewriter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Ensure proper inline display for animated tokens */
  .streaming-content .streaming-token {
    white-space: pre-wrap;
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .streaming-token {
      animation: none !important;
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }
</style>

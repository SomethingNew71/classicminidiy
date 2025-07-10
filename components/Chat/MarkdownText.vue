<template>
  <div class="markdown-content" v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { marked } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';

  interface Props {
    content: string;
  }

  const props = defineProps<Props>();

  // Configure marked with syntax highlighting
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
  });

  const renderedMarkdown = computed(() => {
    try {
      return marked.parse(props.content);
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return props.content;
    }
  });
</script>

<style scoped>
  /* Import highlight.js theme */
  @import 'highlight.js/styles/github-dark.css';

  .markdown-content {
    font-size: 1rem;
    line-height: 1.625;
  }

  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3,
  .markdown-content h4,
  .markdown-content h5,
  .markdown-content h6 {
    font-weight: 600;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
  }

  .markdown-content h1 {
    font-size: 1.5rem;
  }

  .markdown-content h2 {
    font-size: 1.25rem;
  }

  .markdown-content h3 {
    font-size: 1.125rem;
  }

  .markdown-content p {
    margin-bottom: 1rem;
  }

  .markdown-content ul,
  .markdown-content ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .markdown-content ul {
    list-style-type: disc;
  }

  .markdown-content ol {
    list-style-type: decimal;
  }

  .markdown-content li {
    margin-bottom: 0.25rem;
  }

  .markdown-content blockquote {
    border-left: 4px solid #d1d5db;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    background-color: #f9fafb;
    font-style: italic;
  }

  .markdown-content code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  }

  .markdown-content pre {
    background-color: #1f2937;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow-x: auto;
  }

  .markdown-content pre code {
    background-color: transparent;
    padding: 0;
    font-size: 0.875rem;
  }

  .markdown-content table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: collapse;
  }

  .markdown-content th,
  .markdown-content td {
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    text-align: left;
  }

  .markdown-content th {
    background-color: #f3f4f6;
    font-weight: 600;
  }

  .markdown-content a {
    color: #2563eb;
    text-decoration: underline;
  }

  .markdown-content a:hover {
    color: #1d4ed8;
  }

  .markdown-content img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .markdown-content hr {
    border-color: #d1d5db;
    margin: 1.5rem 0;
  }
</style>

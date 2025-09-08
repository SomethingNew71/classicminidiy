<template>
  <div v-if="links && links.length > 0" class="mt-4 rounded-lg bg-base-100 border border-base-300 p-4">
    <div class="flex items-center gap-2 mb-3">
      <i class="fa-solid fa-link text-primary"></i>
      <h3 class="text-sm font-semibold text-base-content">{{ t('title') }}</h3>
    </div>
    <div class="space-y-2">
      <a
        v-for="(link, index) in links.slice(0, 3)"
        :key="index"
        :href="addUtmParams(link.url)"
        target="_blank"
        rel="noopener noreferrer"
        class="block p-3 rounded-lg bg-base-50 hover:bg-base-200 transition-colors border border-base-200 hover:border-base-300"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm text-primary hover:text-primary-focus line-clamp-2">
              {{ link.title }}
            </div>
            <div class="text-xs text-base-content/70 mt-1 line-clamp-2">
              {{ link.content }}
            </div>
            <div class="text-xs text-base-content/50 mt-1 truncate">
              {{ link.url }}
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2">
            <i class="fa-solid fa-external-link text-xs text-base-content/50"></i>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { t } = useI18n({ useScope: 'local' });
  
  interface UsefulLink {
    url: string;
    title: string;
    content: string;
    score: number;
  }

  interface Props {
    links: UsefulLink[];
  }

  defineProps<Props>();

  // Add UTM parameters to URLs for tracking
  const addUtmParams = (url: string): string => {
    try {
      const urlObj = new URL(url);

      // Only add UTM params if they don't already exist
      if (!urlObj.searchParams.has('utm_source')) {
        urlObj.searchParams.set('utm_source', 'diy_chat_bot');
        urlObj.searchParams.set('utm_medium', 'chat');
        urlObj.searchParams.set('utm_campaign', 'useful_links');
        urlObj.searchParams.set('utm_content', 'search_results');
      }

      return urlObj.toString();
    } catch (error) {
      // If URL parsing fails, return original URL
      return url;
    }
  };
</script>

<i18n lang="json">
{
  "en": {
    "title": "Useful Links"
  },
  "es": {
    "title": "Enlaces Útiles"
  },
  "fr": {
    "title": "Liens Utiles"
  },
  "de": {
    "title": "Nützliche Links"
  },
  "it": {
    "title": "Collegamenti utili"
  },
  "ja": {
    "title": "有用なリンク"
  },
  "ko": {
    "title": "유용한 링크"
  },
  "pt": {
    "title": "Links Úteis"
  },
  "ru": {
    "title": "Полезные ссылки"
  },
  "zh": {
    "title": "有用链接"
  }
}
</i18n>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2; /* Standard property for compatibility */
  }
</style>

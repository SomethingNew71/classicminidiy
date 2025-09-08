<script lang="ts" setup>
  const { t } = useI18n({ useScope: 'local' });
  const { data: stats } = await useFetch('/api/youtube/stats');
</script>

<template>
  <div class="stats stats-vertical lg:stats-horizontal shadow">
    <div class="stat">
      <div class="stat-figure text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </div>
      <div class="stat-title">{{ t('minutes_watched') }}</div>
      <div class="stat-value text-primary" v-if="stats && stats.views">{{ stats?.views }}</div>
      <div class="stat-desc">{{ t('over_30_days') }}</div>
    </div>

    <div class="stat">
      <div class="stat-figure">
        <i class="fad fa-user text-secondary text-3xl"></i>
      </div>
      <div class="stat-title">{{ t('subscribers') }}</div>
      <div class="stat-value text-secondary" v-if="stats && stats.subscribers">{{ stats?.subscribers }}</div>
      <div class="stat-desc">{{ t('across_world') }}</div>
    </div>

    <div class="stat">
      <div class="stat-figure">
        <i class="fad fa-video-camera text-info text-3xl"></i>
      </div>
      <div class="stat-value text-info" v-if="stats && stats.videos">{{ stats?.videos }}</div>
      <div class="stat-title">{{ t('videos') }}</div>
      <div class="stat-desc">{{ t('since_2015') }}</div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "minutes_watched": "Minutes Watched",
    "over_30_days": "over the last 30 days",
    "subscribers": "Subscribers",
    "across_world": "across the world",
    "videos": "Videos",
    "since_2015": "since 2015"
  },
  "de": {
    "minutes_watched": "Minuten angeschaut",
    "over_30_days": "in den letzten 30 Tagen",
    "subscribers": "Abonnenten",
    "across_world": "weltweit",
    "videos": "Videos",
    "since_2015": "seit 2015"
  },
  "es": {
    "minutes_watched": "Minutos Vistos",
    "over_30_days": "en los últimos 30 días",
    "subscribers": "Suscriptores",
    "across_world": "en todo el mundo",
    "videos": "Videos",
    "since_2015": "desde 2015"
  },
  "fr": {
    "minutes_watched": "Minutes regardées",
    "over_30_days": "au cours des 30 derniers jours",
    "subscribers": "Abonnés",
    "across_world": "à travers le monde",
    "videos": "Vidéos",
    "since_2015": "depuis 2015"
  },
  "it": {
    "minutes_watched": "Minuti guardati",
    "over_30_days": "negli ultimi 30 giorni",
    "subscribers": "Iscritti",
    "across_world": "in tutto il mondo",
    "videos": "Video",
    "since_2015": "dal 2015"
  },
  "ja": {
    "minutes_watched": "視聴時間（分）",
    "over_30_days": "過去30日間で",
    "subscribers": "登録者数",
    "across_world": "世界中から",
    "videos": "動画",
    "since_2015": "2015年から"
  },
  "ko": {
    "minutes_watched": "시청 시간(분)",
    "over_30_days": "지난 30일 동안",
    "subscribers": "구독자",
    "across_world": "전 세계",
    "videos": "동영상",
    "since_2015": "2015년부터"
  },
  "pt": {
    "minutes_watched": "Minutos Assistidos",
    "over_30_days": "nos últimos 30 dias",
    "subscribers": "Inscritos",
    "across_world": "ao redor do mundo",
    "videos": "Vídeos",
    "since_2015": "desde 2015"
  },
  "ru": {
    "minutes_watched": "Минут просмотров",
    "over_30_days": "за последние 30 дней",
    "subscribers": "Подписчиков",
    "across_world": "по всему миру",
    "videos": "Видео",
    "since_2015": "с 2015 года"
  },
  "zh": {
    "minutes_watched": "观看分钟数",
    "over_30_days": "过去30天",
    "subscribers": "订阅者",
    "across_world": "全球范围",
    "videos": "视频",
    "since_2015": "自2015年起"
  }
}
</i18n>

<script lang="ts" setup>
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
      <div class="stat-title">Minutes Watched</div>
      <div class="stat-value text-primary" v-if="stats && stats.views">{{ stats?.views }}</div>
      <div class="stat-desc">over the last 30 days</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <i class="fad fa-user text-accent text-3xl"></i>
      </div>
      <div class="stat-title">Subscribers</div>
      <div class="stat-value text-accent" v-if="stats && stats.subscribers">{{ stats?.subscribers }}</div>
      <div class="stat-desc">across the world</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-info">
        <i class="fad fa-video-camera text-info text-3xl"></i>
      </div>
      <div class="stat-value text-info" v-if="stats && stats.videos">{{ stats?.videos }}</div>
      <div class="stat-title">Videos</div>
      <div class="stat-desc">since 2015</div>
    </div>
  </div>
</template>

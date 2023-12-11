<script lang="ts" setup>
  const { data: stats, pending, error } = await useFetch('/api/youtube/stats');
</script>

<template>
  <div class="card mb-5">
    <nav class="level py-4">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Minutes Watched</p>
          <p v-if="pending"></p>
          <p v-else-if="error">??</p>
          <p v-else-if="stats && stats.views" class="title">
            {{ stats.views }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Subscribers</p>
          <p v-if="pending"></p>
          <p v-else-if="error">??</p>
          <p v-else-if="stats && stats.subscribers" class="title">
            {{ stats.subscribers }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">videos</p>
          <p v-if="pending"></p>
          <p v-else-if="error">??</p>
          <p v-else-if="stats && stats.videos" class="title">
            {{ stats.videos }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    box-shadow:
      0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
  }
</style>

<template>
  <div class="card mb-5">
    <nav class="level py-4">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Minutes Watched</p>
          <p v-if="stats.views" class="title">
            {{ stats.views }}
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Subscribers</p>
          <p v-if="stats.subscribers" class="title">
            {{ stats.subscribers }}
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">videos</p>
          <p v-if="stats.videos" class="title">
            {{ stats.videos }}
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  const config = useRuntimeConfig();
  let stats: any;
  await axios
    .get(`${config.public.serverlessEndpoint}/stats`)
    .then((response) => {
      stats = { ...response.data };
    })
    .catch(() => {
      stats = {
        views: undefined,
        subscribers: undefined,
        videos: undefined,
      };
    });
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
  }
</style>

<script lang="ts" setup>
  const { data: stats, status, error } = await useFetch('/api/youtube/stats');
</script>

<template>
  <v-card class="mb-5">
    <nav class="level py-4">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Minutes Watched</p>
          <p v-if="status === 'pending'">
            <v-progress-circular indeterminate></v-progress-circular>
          </p>
          <p v-else-if="error" class="title has-text-primary-00">??</p>
          <p v-else-if="stats && stats.views" class="title has-text-primary-00">
            {{ stats.views }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Subscribers</p>
          <p v-if="status === 'pending'">
            <v-progress-circular indeterminate></v-progress-circular>
          </p>
          <p v-else-if="error" class="title has-text-primary-00">??</p>
          <p v-else-if="stats && stats.subscribers" class="title has-text-primary-00">
            {{ stats.subscribers }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Videos</p>
          <p v-if="status === 'pending'">
            <v-progress-circular indeterminate></v-progress-circular>
          </p>
          <p v-else-if="error" class="title has-text-primary-00">??</p>
          <p v-else-if="stats && stats.videos" class="title has-text-primary-00">
            {{ stats.videos }}
          </p>
          <p v-else>??</p>
        </div>
      </div>
    </nav>
  </v-card>
</template>

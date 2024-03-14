<script setup lang="ts">
  const { data: videos, pending, error } = await useFetch('/api/youtube/videos');
</script>

<template>
  <v-col cols="12">
    <h3 class="fancy-font-bold is-size-3 has-text-centered pb-5">Recent Videos</h3>
  </v-col>

  <v-col v-if="pending" cols="12" md="3" v-for="item in 3">
    <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
  </v-col>
  <v-col v-else-if="error" cols="12">
    <p>Unable to load youtube data</p>
  </v-col>

  <v-col v-else-if="videos" cols="12" md="4" v-for="video in videos">
    <v-card class="mx-auto" max-width="344" :href="video.videoUrl">
      <v-img :src="video.thumbnails.maxres" height="250px">
        <template #sources>
          <source media="(max-width: 799px)" :srcset="video.thumbnails.medium" />
          <source media="(max-width: 992px)" :srcset="video.thumbnails.high" />
          <source media="(max-width: 1200px)" :srcset="video.thumbnails.standard" />
        </template>
      </v-img>
      <v-card-title>{{ video.title }}</v-card-title>
      <v-card-subtitle class="pb-5"> published on {{ video.publishedOn }} </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<style lang="scss">
  .test {
    color: inherit;
  }
</style>

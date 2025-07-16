<script setup lang="ts">
  const { data: videos, status, error } = await useFetch('/api/youtube/videos');
</script>

<template>
  <div class="col-span-12">
    <h3 class="font-bold text-3xl text-center pb-5">Recent Videos</h3>
  </div>

  <div v-if="status === 'pending'" class="col-span-12 md:col-span-3" v-for="item in 3"></div>
  <div v-else-if="error" class="col-span-12">
    <p>Unable to load youtube data</p>
  </div>

  <template v-else-if="videos">
    <div v-for="video in videos" class="card bg-base-100 col-span-12 md:col-span-4 shadow-xl">
      <figure>
        <nuxt-picture :src="video.thumbnails.maxres" alt="Video Thumbnail" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ video.title }}</h2>
        <p>Published on {{ video.publishedOn }}</p>
        <div class="card-actions justify-end">
          <a :href="video.videoUrl" class="btn btn-primary">Watch</a>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
  .test {
    color: inherit;
  }
</style>

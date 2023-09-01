<template>
  <div>
    <h3 class="fancy-font-bold is-size-3 has-text-centered pb-5">Recent Videos</h3>

    <template v-if="isLoading">
      <div class="columns is-multiline">
        <div v-for="(item, index) in 2" :key="index" class="column is-half">
          <div class="card">
            <div class="card-image">
              <o-skeleton height="100px"></o-skeleton>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6">
                  <o-skeleton></o-skeleton>
                </p>
                <p class="subtitle is-7 pt-2">
                  <o-skeleton></o-skeleton>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="columns is-multiline">
      <div class="column is-one-third-desktop" v-for="video in videos">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <a :href="video.videoUrl" target="_blank">
                <picture :alt="video.title + ' thumbnail'">
                  <source media="(max-width: 799px)" :srcset="video.thumbs.medium" />
                  <source media="(max-width: 992px)" :srcset="video.thumbs.high" />
                  <source media="(max-width: 1200px)" :srcset="video.thumbs.standard" />
                  <img loading="lazy" :src="video.thumbs.maxres" :alt="'Thumbnail for ' + videos.title" />
                </picture>
              </a>
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-6">
                {{ video.title }}
              </p>
              <p class="subtitle is-7 pt-2">published on {{ video.publishedOn }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  let videos: any;
  let isLoading = true;
  await useFetch('/api/videos')
    .then((response: any) => {
      videos = response.data._rawValue.map((video: any) => {
        return {
          title: video.title,
          thumbs: video.thumbnails,
          publishedOn: DateTime.fromISO(video.publishedOn).toFormat('LLL dd, yyyy'),
          videoUrl: video.videoUrl,
        };
      });
    })
    .finally(() => {
      isLoading = false;
    });
</script>

<script lang="ts">
  import { DateTime } from 'luxon';
  export default defineComponent({});
</script>

<style lang="scss" scoped>
  .has-shadow {
    box-shadow: none;
  }
</style>

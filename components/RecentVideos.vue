<template>
  <div>
    <h3 class="fancy-font-bold is-size-3 has-text-centered pb-5">
      Recent Videos
    </h3>

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
    <o-carousel
      v-if="!isLoading"
      :v-model="videos"
      :items-to-show="2"
      :repeat="true"
      :has-drag="true"
      :icon-pack="'fad'"
      :icon-size="'is-medium'"
    >
      <o-carousel-item v-for="(video, i) in videos" :key="i">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <a :href="video.videoUrl" target="_blank"
                ><img :src="video.thumbnailUrl"
              /></a>
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-6">
                {{ video.title }}
              </p>
              <p class="subtitle is-7 pt-2">
                published on {{ video.publishedOn }}
              </p>
            </div>
          </div>
        </div>
      </o-carousel-item>
    </o-carousel>
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
          thumbnailUrl: video.thumbnailUrl.url,
          publishedOn: DateTime.fromISO(video.publishedOn).toFormat(
            'LLL dd, yyyy'
          ),
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

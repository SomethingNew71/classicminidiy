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
      :items-to-show="itemsToShow"
      :repeat="true"
      :has-drag="true"
      :items-to-list="4"
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

<script>
  import { DateTime } from 'luxon';
  import axios from 'axios';
  import { defineComponent } from '#imports';

  export default defineComponent({
    data() {
      return {
        videos: undefined,
        isLoading: true,
        apiError: false,
        value: 0,
        breakpoint: '',
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios
          .get(`${this.$config.public.serverlessEndpoint}/videos`)
          .then((response) => {
            this.videos = response.data.map((video) => {
              return {
                title: video.title,
                thumbnailUrl: video.thumbnailUrl.url,
                publishedOn: DateTime.fromISO(video.publishedOn).toFormat(
                  'LLL dd, yyyy'
                ),
                videoUrl: video.videoUrl,
              };
            });
            this.apiError = false;
          })
          .catch(() => {
            this.videos = undefined;
            this.apiError = true;
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
  });
</script>

<style lang="scss" scoped>
  .has-shadow {
    box-shadow: none;
  }
</style>

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
              <b-skeleton height="100px"></b-skeleton>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6">
                  <b-skeleton></b-skeleton>
                </p>
                <p class="subtitle is-7 pt-2">
                  <b-skeleton></b-skeleton>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <b-carousel-list
      v-if="!isLoading"
      :data="videos"
      :items-to-show="itemsToShow"
      :repeat="true"
      :icon-pack="'fad'"
      :icon-size="'is-medium'"
    >
      <template #item="list">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <a :href="list.videoUrl" target="_blank"
                ><img :src="list.thumbnailUrl"
              /></a>
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-6">
                {{ list.title }}
              </p>
              <p class="subtitle is-7 pt-2">
                published on {{ list.publishedOn }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </b-carousel-list>
  </div>
</template>

<script>
  import axios from 'axios';
  import { DateTime } from 'luxon';

  export default {
    data() {
      return {
        videos: undefined,
        isLoading: true,
        apiError: false,
        value: 0,
        // add a new state
        breakpoint: '',
        itemsToShow: 2,
        viewportWidth: undefined,
      };
    },
    watch: {
      windowWidth(newWidth) {
        this.handleResize(newWidth);
      },
    },
    created() {
      this.fetchData();
    },
    mounted() {
      this.handleResize();
    },
    methods: {
      async fetchData() {
        await axios
          .get(`${process.env.serverlessEndpoint}/videos`)
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
      handleResize(newWidth) {
        if (newWidth) {
          this.viewportWidth = newWidth;
        } else {
          this.viewportWidth = window.innerWidth;
        }

        if (this.viewportWidth >= 1280) {
          this.itemsToShow = 4;
        } else if (this.viewportWidth >= 1024) {
          this.itemsToShow = 3;
        } else if (this.viewportWidth >= 756) {
          this.itemsToShow = 2;
        } else if (this.viewportWidth >= 576) {
          this.itemsToShow = 1;
        } else {
          this.itemsToShow = 1;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .has-shadow {
    box-shadow: none;
  }
</style>

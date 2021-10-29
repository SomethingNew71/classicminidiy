<template>
  <div class="card mb-5">
    <nav class="level py-4">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Minutes Watched</p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && stats.views" class="title">
            {{ stats.views }}
          </p>
          <p
            v-else-if="(!isLoading && !stats.views) || apiError"
            class="pt-2 fa-beat"
          >
            <i class="is-size-4 fad fa-question"></i>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Subscribers</p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && stats.subscribers" class="title">
            {{ stats.subscribers }}
          </p>
          <p
            v-else-if="(!isLoading && !stats.subscribers) || apiError"
            class="pt-2 fa-beat"
          >
            <i class="is-size-4 fad fa-question"></i>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">videos</p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && stats.videos" class="title">
            {{ stats.videos }}
          </p>
          <p
            v-else-if="(!isLoading && !stats.videos) || apiError"
            class="pt-2 fa-beat"
          >
            <i class="is-size-4 fad fa-question"></i>
          </p>
        </div>
      </div>
      <!-- <b-loading :is-full-page="false" :active.sync="isLoading" /> -->
    </nav>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        stats: {
          views: undefined,
          subscribers: undefined,
          videos: undefined,
        },
        isLoading: true,
        apiError: false,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios
          .get(`${process.env.serverlessEndpoint}/stats`)
          .then((response) => {
            this.stats = { ...response.data };
            this.apiError = false;
          })
          .catch(() => {
            this.stats = {
              views: undefined,
              subscribers: undefined,
              videos: undefined,
            };
            this.apiError = true;
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
  }
</style>

<template>
  <div class="card mb-5">
    <nav class="level py-4">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">
            Minutes Watched
          </p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && views !== '0'" class="title">
            {{ views }}
          </p>
          <p v-else-if="!isLoading && !views">
            <i class="is-size-4 fad fa-question"></i>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">
            Subscribers
          </p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && subscribers !== '0'" class="title">
            {{ subscribers }}
          </p>
          <p v-else-if="!isLoading && !subscribers">
            <i class="is-size-4 fad fa-question"></i>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">
            videos
          </p>
          <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          <p v-if="!isLoading && videos !== '0'" class="title">
            {{ videos }}
          </p>
          <p v-else-if="!isLoading && !videos">
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
  data () {
    return {
      views: null,
      subscribers: null,
      videos: null,
      isLoading: true
    };
  },
  created () {
    this.fetchData();
  },
  methods: {
    async fetchData () {
      await axios.get('https://uw0jl2qw25.execute-api.us-east-1.amazonaws.com/dev/youtube')
        .then((response) => {
          const items = response.data.items[0].statistics;
          this.views = Number(items.viewCount).toLocaleString();
          this.subscribers = Number(items.subscriberCount).toLocaleString();
          this.videos = Number(items.videoCount).toLocaleString();
        }).catch(() => {
          this.views = 'X';
          this.subscribers = 'X';
          this.videos = 'X';
        }).finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
</style>

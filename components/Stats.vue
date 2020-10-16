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
      const apiKey = process.env.youtube.key;
      const baseURL = 'https://www.googleapis.com/youtube/v3/channels';
      const id = process.env.youtube.id;
      const details = 'snippet,contentDetails,statistics';
      const feed = `${baseURL}?key=${apiKey}&id=${id}&part=${details}`;

      if (this.$store.state.data.youtubeStats.length === 0) {
        await axios.get(feed)
          .then((response) => {
            const items = response.data.items[0].statistics;
            this.views = Number(items.viewCount).toLocaleString();
            this.subscribers = Number(items.subscriberCount).toLocaleString();
            this.videos = Number(items.videoCount).toLocaleString();
            // Commit the stats to the store
            this.$store.commit('data/saveYoutube', items);
            this.isLoading = false;
          })
          .catch((error) => {
            console.error('Youtube Error', error);
            this.views = '0';
            this.subscribers = '0';
            this.videos = '0';
          });
      } else {
        this.views = Number(this.$store.state.data.youtubeStats.viewCount).toLocaleString();
        this.subscribers = Number(this.$store.state.data.youtubeStats.subscriberCount).toLocaleString();
        this.videos = Number(this.$store.state.data.youtubeStats.videoCount).toLocaleString();
        this.isLoading = false;
      }
    }
  }
};
</script>

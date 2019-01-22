<template>
  <v-btn dark medium tag='a' color="red" target='_blank' href='https://www.youtube.com/c/classicminidiy?sub_confirmation=1'>
    <v-icon class="white--text pr-2">fa-youtube-play</v-icon>
    <v-progress-circular v-if="!youtubeSubs" :size="20" indeterminate color="white"></v-progress-circular>{{youtubeSubs}} - Subscribe
  </v-btn>
</template>

<style lang="scss" scoped>

</style>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        youtubeSubs: null
      };
    },
    created: function () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        const apiKey = 'AIzaSyCbmPC-gSOA2g9xQOAeBboTTwz4tSVRQZ8';
        const baseURL = 'https://www.googleapis.com/youtube/v3/channels';
        const channelId = 'UCZIUfOFhrQ9nrR06IOoAJ2Q';
        const details = 'statistics';
        const feed = `${baseURL}?key=${apiKey}&id=${channelId}&part=${details}`;
        const vueScope = this;
        axios.get(feed).then(function (response) {
          // Subscriber Count for Youtube Channel
          vueScope.youtubeSubs = response.data.items[0].statistics.subscriberCount;
        });
      }
    }
  };
</script>

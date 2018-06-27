<template>
  <v-btn dark medium tag='a' color="red" target='_blank' href='https://www.youtube.com/c/classicminidiy?sub_confirmation=1'>
    <v-icon class="white--text pr-2">fa-youtube-play</v-icon>
    {{youtubeSubs}} - Subscribe
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
        const feed = 'https://cdn.hipposm.com/feed/5966e85a5529017368525965';
        const vueScope = this;
        axios.get(feed).then(function (response) {
          // Subscriber Count for Youtube Channel
          vueScope.youtubeSubs = response.data.meta.feed_details.channel_stats.subscriberCount;
        });
      }
    }
  };
</script>

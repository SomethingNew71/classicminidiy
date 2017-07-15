<template>
  <v-flex xs2 offset-sm5 class="youtube-counter mt-1">
    <v-btn error dark medium tag='a' target='_blank' href='https://www.youtube.com/c/classicminidiy'>
      <v-icon fa class="white--text pr-2">youtube-play</v-icon>
      {{ytSubs}}
    </v-btn>
  </v-flex>
</template>

<style lang="scss" src="./ytcounter.scss"></style>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        ytData: null,
        ytSubs: null,
        ytMeta: null
      };
    },
    created: function () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        const feed = 'https://app.hipposm.com/feed/5967b6eb552901318d554842';
        const vueScope = this;
        axios.get(feed).then(function (response) {
          // Raw Youtube feed
          vueScope.ytData = response.data;
          // Raw Youtube meta feed
          vueScope.ytMeta = response.data.meta;
          // Subscriber Count for Youtube Channel
          vueScope.ytSubs = response.data.meta.feed_details.channel_stats.subscriberCount;
        });
      }
    }
  };
</script>

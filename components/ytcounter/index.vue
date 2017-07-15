<template>
  <v-flex xs2 offset-sm5 class="youtube-counter mt-1">
    <v-btn error dark medium tag='a' target='_blank' href='https://www.youtube.com/c/classicminidiy'>
      <v-icon fa class="white--text pr-2">youtube-play</v-icon>
      {{ytData.meta.feed_details.channel_stats.subscriberCount}}
    </v-btn>
  </v-flex>
</template>

<style lang="scss" src="./ytcounter.scss"></style>

<script>
  export default {
    data () {
      const feed = 'https://app.hipposm.com/feed/5967b6eb552901318d554842';

      this.$http.get(feed).then(response => {
        this.ytData = response.body;
      }, response => {
        console.log('Error getting YT Data');
      });
      return {
        ytData: this.ytData
      };
    }
  };
</script>

<template>
  <div class="pt-5">
    <v-layout wrap>
      <v-flex xs12 sm8>
        <h2 class="display-1 pb-1"><v-icon class="red--text display-1 pb-1">fa-youtube-play</v-icon> Latest on Youtube</h2>
        <p class="pt-2">Classic Mini DIY began its life on Youtube and from there it grew to be one of the largest Classic Mini centric channels on Youtube with just at <strong>{{youtubeSubs}}</strong> subscribers. Check out all the latest videos below.</p>
      </v-flex>
      <v-flex xs12 md4 class="text-md-right text-xs-center pt-4">
        <v-btn dark medium tag='a' class="ml-0" color="red" target='_blank' href='https://www.youtube.com/c/classicminidiy'>
          <v-icon class="white--text pr-2">fa-youtube-play</v-icon>
          {{youtubeSubs}} - Subscribe
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>

    </v-layout>
    <v-layout row wrap class="pt-3">
      <v-flex
        xs12
        sm6
        md3
        lg3
        v-for="(video, key, index) in youtubeVideos"
        v-bind:key=video
        class="px-1 pb-2"
        v-bind:class="{ 'hidden-xs-only': key >= 3, 'hidden-sm-and-down': key >= 4}">
        <v-card>
          <v-card-media :src="video.snippet.thumbnails.high.url" height="150px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="mb-0 cut-text body-1">{{video.hippo_text}}</h3>
              <v-divider class="my-2"></v-divider>
              <div class="caption">{{video.hippo_ago}}</div>
            </div>
          </v-card-title>
          <v-card-actions class="pb-3">
            <v-btn class="red" outline :href="'https://www.youtube.com/watch?v='+video.id.videoId+''"> <v-icon class="red--text pr-2">fa-youtube-play</v-icon> Watch on YouTube</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: inherit;
  }
  .card__title.card__title--primary {
    height: 100px;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        youtubeSubs: null,
        youtubeVideos: null
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
          // Grab only the 4 most recent videos
          vueScope.youtubeVideos = Object.entries(response.data.data).slice(0, 8).map(entry => entry[1]);
        });
      }
    },
    filters: {
      concat: function (value) {
        if (!value) return '';
        value = value.substring(0, 50) + '...';
        return value;
      }
    }
  };
</script>

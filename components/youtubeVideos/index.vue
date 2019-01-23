<template>
  <div class="pt-5">
    <v-layout wrap>
      <v-flex xs12 sm8>
        <h2 class="display-1 pb-1">
          <v-icon class="red--text display-1 pb-1">fa-youtube-play</v-icon> Latest on Youtube</h2>
        <p class="pt-2">Classic Mini DIY began its life on Youtube and from there it grew to be one of the largest Classic Mini centric channels on Youtube. Check out all the latest videos below.</p>
      </v-flex>
    </v-layout>
    <v-layout>
  
    </v-layout>
    <v-container fluid grid-list-lg>
      <v-layout v-if="!youtubeVideos">
        <v-flex class="text-xs-center pt-5 mt-5" xs12>
          <v-progress-circular
            :size="150"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap grid-list-lg class="pt-3" v-if="youtubeVideos">
        <v-flex
          xs12 sm6 md3 lg4
          v-for="(video, key, index) in youtubeVideos"
          :key=index
          class="px-1 pb-2"
          v-bind:class="{ 'hidden-xs-only': key >= 3, 'hidden-sm-and-down': key >= 4}"
          >
          <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            >
              <v-img :src="video.snippet.thumbnails.high.url" height="200px"></v-img>
              <v-card-text
                style="position: relative;"
                >
                <v-btn
                  absolute
                  color="red"
                  class="white--text"
                  :href="'https://www.youtube.com/watch?v='+video.snippet.resourceId.videoId+''"
                  fab
                  medium
                  right
                  top
                >
                  <v-icon medium color="white" class="fab-icon-youtube">fa-youtube-play</v-icon>
                </v-btn>
                  <h3 class="py-3 pr-5 cut-text title font-weight-thin">
                    <strong>{{video.snippet.title}}</strong>
                  </h3>
                  <v-spacer></v-spacer>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
  .fab-icon-youtube {
    width: 30px;
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
        const apiKey = 'AIzaSyCbmPC-gSOA2g9xQOAeBboTTwz4tSVRQZ8';
        const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const playlistId = 'PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi';
        const details = 'snippet,contentDetails';
        const feed = `${baseURL}?key=${apiKey}&playlistId=${playlistId}&maxResults=6&part=${details}`;
        const vueScope = this;
  
        axios.get(feed).then(function (response) {
          vueScope.youtubeVideos = response.data.items;
        });
      }
    },
    filters: {
      concat: function (value) {
        if (!value) return '';
        value = value.substring(0, 40) + '...';
        return value;
      }
    }
  };
</script>

<template>
  <v-container fluid grid-list-lg pa-0>
    <v-layout row wrap>
      <v-flex
        v-for="card in cards"
        xs12 md4 sm6
        :key="card.title"
      >
        <v-card class="card-element">
          <v-img :src="card.image" height="200px"></v-img>
          <v-card-text primary-title class="text-xs-center">
            <div class="subheading font-weight-bold">{{card.title}}</div>
              <span class="grey--text">{{card.description}}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
  .card-element {
    border-radius: 5px;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        cards: {
          1: {
            title: 'Make DIY videos',
            description: 'The primary work of Classic Mini DIY is creating videos outlining the way to work on your Classic Mini Cooper.',
            link: '',
            image: 'icons/homepage/camera.gif'
          },
          2: {
            title: 'Keeping the Classic Mini Alive',
            description: 'By making these videos, we hope to keep the Classic Mini alive, as well as keeping the entire online community thriving for years to come.',
            link: '',
            image: '/icons/homepage/mini.gif'
          },
          3: {
            title: 'Offering Mail in Repair Service',
            description: 'A recent addition to our lineup, is the option to send your old or broken Classic Mini parts for a top notch repair and recondition service.',
            link: '',
            image: '/icons/homepage/tools.gif'
          }
        }
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

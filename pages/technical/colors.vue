<template>
  <div class="colors-page">
    <v-layout wrap transition="slide-x-transition">
      <v-flex xs12>
        <h2 class="headline pl-5 pt-4">Color Picker</h2>
      </v-flex>

      <v-flex offset-xs4 xs4>
        <v-select
          v-bind:items="items"
          v-model="e1"
          label="Start typing your color name"
          autocomplete
          @input='fetchData()'
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex offset-xs1 xs10>
        <v-layout row wrap class="color-cards">
          <!-- <v-flex xs12 sm6 md4 lg3 class="py-2" :key="colour" v-for="colour in activeColors.colour.records">
            <v-card hover class="">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="pl-0 subheader">{{colour[2]}}</div>
                      <div class="caption">{{ colour[3] }}</div>
                      <div class="caption">{{ colour[4] }}</div>
                      <div class="caption">{{ colour[5] }}</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      :src="book.imgSource"
                      height="150px"
                      contain
                    >
                    </v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex> -->
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss">

</style>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      e1: 'Blue',
      items: ['Beige', 'Black', 'Blue', 'Bronze', 'Brown', 'Gold', 'Green', 'Grey', 'Maroon', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Turquoise', 'White', 'Yellow'],
      activeColors: {}
    };
  },
  created () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      const baseFeed = 'http://mini-colours.co.uk/api.php/';
      const vueScope = this;
      let complexFeed;
      let baseValue;
      switch (this.e1) {
        case 'Beige':
          baseValue = 15;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Black':
          baseValue = 14;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Blue':
          baseValue = 1;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Bronze':
          baseValue = 5;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Brown':
          baseValue = 4;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Gold':
          baseValue = 9;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Green':
          baseValue = 10;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Grey':
          baseValue = 11;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Maroon':
          baseValue = 16;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Orange':
          baseValue = 7;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Pink':
          baseValue = 6;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Purple':
          baseValue = 18;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Red':
          baseValue = 2;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Silver':
          baseValue = 12;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Turquoise':
          baseValue = 17;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'White':
          baseValue = 13;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        case 'Yellow':
          baseValue = 8;
          complexFeed = `${baseFeed}colour?filter=base_id,eq,${baseValue}`;
          break;
        default:
          console.log('No matching color found');
          break;
      }
      axios.get(complexFeed).then(function (response) {
        vueScope.activeColors = response.data;
      });
    }
  }
};
</script>
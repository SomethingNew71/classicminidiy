<template>
  <v-container class="colors-page" fluid>
    <v-layout wrap transition="slide-x-transition" v-if="!this.isLoading">
      <v-flex xs12 offset-xs1 class="pt-5">
        <v-btn dark primary tag='a' href="/#get-started" >
          <v-icon left dark>fa-arrow-left</v-icon>
          Back to Get Started
        </v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <img src="icons/Multicolor/SVG/Round Icons/Pantone.svg" alt="" width="70px" class="pb-3">
        <p class="subheading grey--text lighten-2 ma-0">All data from Mini-Colours.co.uk</p>
        <h2 class="black--text darken-3">Color Picker</h2>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-divider></v-divider>
      </v-flex>
      <v-flex offset-xs3 offset-sm4 xs6 sm4 class="pt-4">
        <v-select
          v-bind:items="items"
          v-model="e1"
          label="Start typing your color name"
          autocomplete
          @input='fetchData()'
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout v-if="this.isLoading">
      <v-flex xs12 class="text-xs-center pt-5">
        <v-progress-circular indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-if="!this.isLoading">
      <v-flex offset-xs1 xs10>
        <v-layout row wrap class="color-cards">
          <v-flex xs12 sm6 md4 lg3 class="py-2 px-2" :key="index" v-for="(colour, index) in activeColors.colour.records">
            <v-card hover class="">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="pb-2 pt-3 title">{{colour[2]}}</div>
                      <div class="subheading">{{ colour[3] }}</div>
                      <div class="caption">{{ colour[4] }}</div>
                      <div class="caption">{{ colour[5] }}</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      :src="`http://mini-colours.co.uk/images/swatches/${colour[2]}.jpg`"
                      height="130px"
                      v-if="colour[6]"
                    >
                    </v-card-media>
                    <v-card-media
                      src="http://mini-colours.co.uk/images/swatches/no_swatch.jpg"
                      height="130px"
                      v-if="!colour[6]"
                      contain
                    >
                    </v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
  .colors-page {
    min-height: 600px;
  }
</style>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      isLoading: true,
      e1: 'Green',
      items: ['Beige', 'Black', 'Blue', 'Bronze', 'Brown', 'Gold', 'Green', 'Grey', 'Maroon', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Turquoise', 'White', 'Yellow'],
      activeColors: {
        colour: {
          records: {}
        }
      }
    };
  },
  created () {
    this.fetchData();
  },
  methods: {
    fetchData () {
      this.isLoading = true;
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
        vueScope.isLoading = false;
      });
    }
  }
};
</script>

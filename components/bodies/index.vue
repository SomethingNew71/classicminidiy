<template>
  <v-layout row wrap class="bodies">
    <v-tabs
      id="mobile-tabs-1"
      grow
      scroll-bars
      v-model="active"
      light
    >
      <v-tabs-bar slot="activators">
        <v-tabs-item
          v-for="body in bodies"
          :key="body.name"
          :href="'#mobile-tabs-1-' + body.name"
          ripple
        >
          {{ body.name }}
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-content v-for="body in bodies" :key="body.name" :id="'mobile-tabs-1-' + body.name">
        <v-layout px-5 pt-4>
          <!-- <v-flex xs12 md3>
            <engines/>
          </v-flex> -->
          <v-flex xs12 md8>
            <div class="showcase-image">
              <img :src="body.image" alt="">
            </div>
            <div class="blurb">
              {{body.text}}
            </div>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-layout row>
              <v-flex xs12>
                <v-card>
                  <v-card-row img="/static/doc-images/lists/alison.jpeg" height="80px">
                    <v-card-text class="white--text pa-0">
                      <v-card-row height="100%">
                        <div class="display-1 pl-3">Details</div>
                      </v-card-row>
                    </v-card-text>
                  </v-card-row>
                  <v-list>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Years Sold: <span class="primary--text">{{body.years}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Wheelbase: <span class="primary--text">{{body.wheelbase.imperial}} / {{body.wheelbase.metric}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Weight: <span class="primary--text">{{body.weight.imperial}} / {{body.weight.metric}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Length: <span class="primary--text">{{body.length.imperial}} / {{body.length.metric}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Width: <span class="primary--text">{{body.width.imperial}} / {{body.width.metric}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="white--text">
                            Height: <span class="primary--text">{{body.height.imperial}} / {{body.height.metric}}</span>
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tabs-content>
    </v-tabs>
  </v-layout>
</template>

<style lang="scss" src="./bodies.scss"></style>

<script>
import engines from '~components/engines';

export default {
  components: {
    engines
  },
  data: function () {
    return {
      active: null,
      bodies: {
        saloon: {
          name: 'saloon',
          image: '',
          text: 'The mini saloon is the most iconic of the mini body styles being the first introduced in 1959 as the Austin Seven.  This is the longest running production body style ever in the Mini lineup',
          years: '1959 - 2000',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '3054mm',
            imperial: '120.2in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '617kg',
            imperial: '1360lbs'
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        estate: {
          name: 'estate',
          image: '',
          text: 'Sample',
          years: '1969 - 1980',
          wheelbase: {
            metric: '2138mm',
            imperial: '84.2in'
          },
          length: {
            metric: '3299mm',
            imperial: '129.9in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '686kg',
            imperial: '1512lbs'
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        van: {
          name: 'van',
          image: '',
          text: 'Sample',
          years: '1960 - 1964',
          wheelbase: {
            metric: '686kg',
            imperial: '1512lbs'
          },
          length: {
            metric: '3299mm',
            imperial: '129.9in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        pickup: {
          name: 'pickup',
          image: '',
          text: 'Sample',
          years: '1961 - 1969',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '3054mm',
            imperial: '120.2in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        moke: {
          name: 'moke',
          image: '',
          text: 'Sample',
          years: '1964 - 1968',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '3054mm',
            imperial: '120.2in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        countryman: {
          name: 'countryman',
          image: '',
          text: 'Sample',
          years: '1961 - 1967',
          wheelbase: {
            metric: '686kg',
            imperial: '1512lbs'
          },
          length: {
            metric: '3299mm',
            imperial: '129.9in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        clubman: {
          name: 'clubman',
          image: '',
          text: 'Sample',
          years: '1969 - 1980',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '3054mm',
            imperial: '120.2in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '617kg',
            imperial: '1360lbs'
          },
          height: {
            metric: '1346mm',
            imperial: '53in'
          }
        },
        elf: {
          name: 'elf',
          image: '',
          text: '',
          years: '1961 - 1969',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '3300mm',
            imperial: '130in'
          },
          width: {
            metric: '1397mm',
            imperial: '55in'
          },
          weight: {
            metric: '617',
            imperial: '1360lbs'
          },
          height: {
            metric: '1346kg',
            imperial: '53in'
          }
        }
      }
    };
  }
};
</script>

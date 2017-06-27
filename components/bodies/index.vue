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
          Item {{ body.name }}
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-content v-for="body in bodies" :key="body.name" :id="'mobile-tabs-1-' + body.name">
        <v-layout px-5>
          <v-flex xs12 md3>
            <engines/>
          </v-flex>
          <v-flex xs12 md6>
            <div class="blurb">
              {{body.text}}
            </div>
          </v-flex>
          <v-flex xs12 md3 pa-2>
            <v-layout row>
              <v-flex xs12>
                <v-card>
                  <v-card-row img="/static/doc-images/lists/alison.jpeg" height="200px">
                    <v-card-text class="white--text pa-0">
                      <v-card-row height="100%" class="pt-5">
                        <div class="display-1 pl-5 pt-5">Details</div>
                      </v-card-row>
                    </v-card-text>
                  </v-card-row>
                  <v-list two-line>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                          <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>1400 Main Street</v-list-tile-title>
                          <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      // saloonActive: true,
      // estateActive: false,
      // elfActive: false,
      // mokeActive: false,
      // vanActive: false,
      // countrymanActive: false,
      // clubmanActive: false,
      // pickupActive: false,
      bodies: {
        saloon: {
          name: 'saloon',
          text: 'The mini saloon is the most iconic of the mini body styles being the first introduced in 1959 as the Austin Seven.  This is the longest running production body style ever in the Mini lineup',
          years: '1959 - 2000',
          wheelbase: {
            metric: '2036mm',
            imperial: '80.2in'
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        estate: {
          name: 'estate',
          text: 'Sample',
          years: '1969 - 1980',
          wheelbase: {
            metric: '2138mm',
            imperial: '84.2in'
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        van: {
          name: 'van',
          text: 'Sample',
          years: '1960 - 1964',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        pickup: {
          name: 'pickup',
          text: 'Sample',
          years: '1961 - 1969',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        moke: {
          name: 'moke',
          text: 'Sample',
          years: '1964 - 1968',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        countryman: {
          name: 'countryman',
          text: 'Sample',
          years: '1961 - 1967',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        clubman: {
          name: 'clubman',
          text: 'Sample',
          years: '1969 - 1980',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        },
        elf: {
          name: 'elf',
          text: '',
          years: '1961 - 1969',
          wheelbase: {
            metric: '',
            imperial: ''
          },
          length: {
            metric: '',
            imperial: ''
          },
          width: {
            metric: '',
            imperial: ''
          },
          weight: {
            metric: '',
            imperial: ''
          },
          height: {
            metric: '',
            imperial: ''
          }
        }
      },
      'body': {
        'length': {
          'metric': {
            'saloon': 3054,
            'estate': 3299,
            'hornet': 3300
          },
          'imperial': {
            'saloon': 120.2,
            'estate': 129.9,
            'hornet': 130
          }
        },
        'width': {
          'metric': {
            'saloon': 1397,
            'estate': 1397,
            'hornet': 1397
          },
          'imperial': {
            'saloon': 55,
            'estate': 55,
            'hornet': 55
          }
        },
        'height': {
          'metric': {
            'saloon': 1346,
            'estate': 1346,
            'hornet': 1346
          },
          'imperial': {
            'saloon': 53,
            'estate': 53,
            'hornet': 53
          }
        },
        'weight': {
          'metric': {
            'saloon': 617,
            'estate': 686,
            'hornet': 617
          },
          'imperial': {
            'saloon': 1360,
            'estate': 1512,
            'hornet': 1360
          }
        }
      }
    };
  }
};
</script>

<template>
  <v-layout wrap class="electrical">
    <v-flex xs12 sm9 class="pb-5">
      <v-flex xs12>
        <h2 class="headline pl-4 pt-4 mb-0">Wiring Diagrams</h2>
        <aside class="title pl-4 pt-0 pb-0 mb-0 subheader">Documents redrawn by Mike L on The Mini Forum</aside>
        <aside class="subheader pl-4 pt-0">
          <a href="http://www.theminiforum.co.uk/forums/topic/324929-wire-diagrams-redrawn/"> Source </a>
        </aside>
      </v-flex>
      <!-- POSITIVE GROUND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Positive Ground</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.positiveGround">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- NEGATIVE GROUND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Negative Ground</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.negativeGround">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- BRITISH LEYLAND SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From British Leyland AKD 4935 (9th edition)</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.britishLeyland">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- EARLY ROVER SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From Rover Repair Manual AKM 6353</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.earlyRover">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- LATER ROVER SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">From Rover repair manual AKM 7169</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.laterRover">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- HORNET ELF SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">BMC Hornet and Elf  AKM 4062D</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.hornetElf">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
      <!-- AUS MINI SECTION -->
      <v-flex xs12>
        <h3 class="title pl-5 pt-4">Australian Workshop Manual Supplement Publication TP 759 A</h3>
      </v-flex>
      <v-flex xs12>
        <v-list class="pl-4" dense>
          <template v-for="diagram in diagrams.ausMinis">
            <v-list-item v-bind:key="diagram.name">
              <v-list-tile avatar :href="diagram.link" target="_blank">
                <v-list-tile-avatar>
                  <v-icon>picture_as_pdf</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                  <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} to {{diagram.to}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
    </v-flex>
    <v-flex xs12 sm3>
      <!-- SECTION FOR ADS IF I CAN EVER FIGURE THE OUT -->
    </v-flex>
  </v-layout>
</template>

<style lang="scss" src="./electricaldocs.scss"></style>

<script>
export default {
  data: function () {
    return {
      diagrams: {
        positiveGround: [
          {
            name: 'Mini Super/Super Deluxe/Countryman/Traveller/Cooper',
            from: 1959,
            to: 1964,
            link: ''
          },
          {
            name: 'Mini Standard and Deluxe',
            from: 1959,
            to: 1964,
            link: ''
          },
          {
            name: 'Mini Saloon/Van/Pickup',
            from: 1964,
            to: 1967,
            link: ''
          },
          {
            name: 'Mini Cooper/Cooper S/Countryman/Traveller/Super Deluxe',
            from: 1964,
            to: 1967,
            link: ''
          },
          {
            name: 'Mini Super Deluxe/Countryman/Traveller/Cooper/Cooper S Mk2',
            from: '',
            to: '',
            link: ''
          },
          {
            name: 'Mini Standard Saloon/Van/Pickup Mk2',
            from: '',
            to: '',
            link: ''
          },
          {
            name: 'Mini Moke',
            from: '1959',
            to: '1967',
            link: ''
          },
          {
            name: 'Mini Moke Mk2',
            from: '',
            to: '',
            link: ''
          }
        ],
        negativeGround: [
          {
            name: 'Mini 850 Deluxe Saloon/Van/Pickup',
            from: '',
            to: '',
            link: 'https://coolstuff.com'
          },
          {
            name: 'Mini 1000 Special Deluxe Saloon/Cooper S Mk3',
            from: '',
            to: '',
            link: ''
          },
          {
            name: 'Mini 1275 GT',
            from: '',
            to: '',
            link: ''
          },
          {
            name: 'Mini Clubman Saloon/Estate',
            from: '',
            to: '',
            link: ''
          }
        ],
        britishLeyland: [
          {
            name: 'Mini 1000 Saloon(Canada)',
            from: '',
            to: '1976',
            link: ''
          },
          {
            name: 'Mini 850 Deluxe/Van/Pickup with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: ''
          },
          {
            name: 'Mini Saloon/Estate with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: ''
          },
          {
            name: 'Mini Clubman Saloon/Estate with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: ''
          },
          {
            name: 'Mini 1275 GT with Alternator and Rocker Switches',
            from: '',
            to: '1976',
            link: ''
          }
        ],
        earlyRover: [
          {
            name: 'Mini 850 Saloon/Van/Pickup',
            from: '1976',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini 1000 - Mini Special',
            from: '1976',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini Clubman/Estate/1275GT',
            from: '1976',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini Special',
            from: '1977',
            to: '1978',
            link: ''
          },
          {
            name: 'Mini Single Instrument Pack',
            from: '1984',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini Multi-Instrument Pack',
            from: '1984',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini',
            from: '1988',
            to: '1989',
            link: ''
          },
          {
            name: 'Twin Gauge Instrument Pack With Integral Voltage Stabilizer',
            from: '',
            to: '1989',
            link: ''
          },
          {
            name: 'Triple Gauge Instrument Pack With Intergral Voltage Stabilizer',
            from: '',
            to: '1989',
            link: ''
          },
          {
            name: 'Mini Turbo Model',
            from: '',
            to: '1989',
            link: ''
          }
        ],
        laterRover: [
          {
            name: 'Power Distribution - Carburetter Models',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Power Distribution - SPI Models',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Exterior Lamps and Horn',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Driving and Fog Lamps',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Reverse Lamps/Brake Lamps/Heated Rear Window Circuit',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Direction Indicator and Hazard Warning',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Instruments',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Interior Lamp Circuit',
            from: '',
            to: '1992',
            link: '1996'
          },
          {
            name: 'Heater & Automatic Gearbox Selector Illumination Circuitsheater & Automatic Gearbox Selector Illumination Circuits',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Engine Management',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Anti-Theft Alarm',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Wash Wipe Circuit',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Auxiliary Cooling Fan and Brake Test Circuits',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Radio Cassette Player',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Sunroof Circuit',
            from: '1992',
            to: '1996',
            link: ''
          },
          {
            name: 'Headlamp Levelling Circuit(Germany)',
            from: '1992',
            to: '1996',
            link: ''
          }
        ],
        hornetElf: [
          {
            name: 'Hornet and Elf',
            from: '1961',
            to: '1964',
            link: ''
          },
          {
            name: 'Hornet and Elf',
            from: '1964',
            to: '1967',
            link: ''
          },
          {
            name: 'Hornet and Elf',
            from: '1967',
            to: 'onwards',
            link: ''
          }
        ],
        ausMinis: [
          {
            name: 'Australian Standard Saloon/Van',
            from: '1969',
            to: '',
            link: ''
          },
          {
            name: 'Australian BMC Moke with Alternator',
            from: '1969',
            to: '',
            link: ''
          },
          {
            name: 'Australian Mini and BMC Moke with Generator',
            from: '1969',
            to: '',
            link: ''
          },
          {
            name: 'Australian Mini 100k/1100STD/Van/Mini Matic(1100)/Cooper S(Alternator)',
            from: '1969',
            to: '',
            link: ''
          },
          {
            name: 'Australian Mini Cooper S with Generator',
            from: '1969',
            to: '',
            link: ''
          }
        ]
      }
    };
  }
};
</script>

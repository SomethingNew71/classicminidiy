<template>
  <section class="techincal">
    <v-layout class="hero" row>
      <v-flex xs12 md6>
        <h1 class="display-1 py-2 pl-3">Technical References</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-bottom-nav
            value="true"
            absolute
            :class="{
              'blue-grey': e2 === 1,
              'teal': e2 === 2,
              'primary': e2 === 3
            }"
          >
            <v-btn flat light @click.native="e2 = 1" :value="e2 === 1">
              <span>Torque Settings</span>
              <v-icon>build</v-icon>
            </v-btn>
            <v-btn flat light @click.native="e2 = 2" :value="e2 === 2">
              <span>Technical Documents</span>
              <v-icon>library_books</v-icon>
            </v-btn>
            <v-btn flat light @click.native="e2 = 3" :value="e2 === 3">
              <span>Wiring Diagrams</span>
              <v-icon>battery_charging_full</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="e2 === 1" class="torques">
      <v-flex xs12>
        <h2 class="headline pl-5 pt-4">Common Torque Settings</h2>
      </v-flex>
      <v-flex xs12 offset-sm1 sm10 class="mt-4">
        <v-card>
          <v-card-title class="pl-4 pt-4">
            <h3 class="title">
              Suspension
              <br>
              <span class="body-1">Mk1/2</span>
            </h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="suspensionItems"
              v-bind:search="search"
            >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.lbft }}</td>
              <td class="text-xs-right">{{ props.item.kgm }}</td>
              <td class="text-xs-right">
                {{props.item.notes}}
              </td>
            </template>
            <template slot="pageText" scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-md1 md5 class="pt-5">
        <v-card>
          <v-card-title>
            <h3 class="title pl-4 pt-4">
              Gearbox
              <br>
              <span class="body-1">All Models</span>
            </h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="gearboxItems"
              v-bind:search="search"
            >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.lbin }}</td>
              <td class="text-xs-right">{{ props.item.kgm }}</td>
            </template>
            <template slot="pageText" scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md5 class="pt-5">
        <v-card>
          <v-card-title>
            <h3 class="title pl-4 pt-4">
              Electrical
              <br>
              <span class="body-1">All Models</span>
            </h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="specialHeaders"
              v-bind:items="electricalItems"
              v-bind:search="search"
            >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.lbin }}</td>
              <td class="text-xs-right">{{ props.item.kgm }}</td>
            </template>
            <template slot="pageText" scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-sm1 sm10 class="mt-4">
        <v-card>
          <v-card-title class="pl-4 pt-4">
            <h3 class="title">
              Suspension
              <br>
              <span class="body-1">Mk1/2</span>
            </h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="engineItems"
              v-bind:search="search"
            >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.lbft }}</td>
              <td class="text-xs-right">{{ props.item.kgm }}</td>
              <td class="text-xs-right">
                {{props.item.notes}}
              </td>
            </template>
            <template slot="pageText" scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<style lang="scss" src="./technical.scss"></style>
<script>
export default {
  data: function () {
    return {
      e2: 1,
      search: '',
      pagination: {},
      // This is where you put all the titles
      headers: [
        {
          text: 'Fastener',
          left: true,
          sortable: false,
          value: 'fastener'
        },
        { text: 'Torque (lb/ft)', value: 'lbft' },
        { text: 'Torque (kgm)', value: 'kgm' },
        { text: 'Notes', value: 'notes' }
      ],
      specialHeaders: [
        {
          text: 'Fastener',
          left: true,
          sortable: false,
          value: 'fastener'
        },
        { text: 'Torque (lb/In)', value: 'lbin' },
        { text: 'Torque (kgm)', value: 'kgm' }
      ],
      suspensionItems: [
        {
          value: false,
          name: 'Drive shaft coupling U bolts (rubber cross inner joints)',
          lbft: '8 to 12',
          kgm: '1.11 to 1.66',
          notes: ''
        },
        {
          value: false,
          name: 'Drive shaft nut (front hub, drum brakes)',
          lbft: '20 to 24',
          kgm: '2.8 to 3.3',
          notes: 'Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!'
        },
        {
          value: false,
          name: 'Tie rod to front sub-frame',
          lbft: '17-20',
          kgm: '2.8 to 3.3',
          notes: ''
        },
        {
          value: false,
          name: 'Tie rod to lower front suspension wishbone',
          lbft: '17-20',
          kgm: '2.8 to 3.3',
          notes: ''
        },
        {
          value: false,
          name: 'Gingerbread',
          lbft: 16.0,
          kgm: 49,
          notes: ''
        },
        {
          value: false,
          name: 'Jelly bean',
          lbft: 0.0,
          kgm: 94,
          notes: ''
        },
        {
          value: false,
          name: 'Lollipop',
          lbft: 0.2,
          kgm: 98,
          notes: ''
        },
        {
          value: false,
          name: 'Honeycomb',
          lbft: 3.2,
          kgm: 87,
          notes: ''
        },
        {
          value: false,
          name: 'Donut',
          lbft: 25.0,
          kgm: 51,
          notes: ''
        },
        {
          value: false,
          name: 'KitKat',
          lbft: 26.0,
          kgm: 65,
          notes: ''
        }
      ],
      electricalItems: [
        {
          value: false,
          name: 'Alternator (11AC) Brush box fixing screws',
          lbin: '10',
          kgm: '0.115',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) Diode heat sink fixings',
          lbin: '25',
          kgm: '0.288',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) through-bolts',
          lbin: '45 to 50',
          kgm: '0.518 to 0.576',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (16ACR) Shaft nut',
          lbin: '25 to 30',
          kgm: '3.5 to 4.2',
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed nut type)',
          lbin: 50,
          kgm: 0.576,
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed bolt type)',
          lbin: 30,
          kgm: 0.345,
          notes: ''
        }
      ],
      gearboxItems: [
        {
          value: false,
          name: 'Alternator (11AC) Brush box fixing screws',
          lbft: '10',
          kgm: '0.115',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) Diode heat sink fixings',
          lbft: '25',
          kgm: '0.288',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) through-bolts',
          lbft: '45 to 50',
          kgm: '0.518 to 0.576',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (16ACR) Shaft nut',
          lbft: '25 to 30',
          kgm: '3.5 to 4.2',
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed nut type)',
          lbft: 50,
          kgm: 0.576,
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed bolt type)',
          lbft: 30,
          kgm: 0.345,
          notes: ''
        }
      ],
      engineItems: [
        {
          value: false,
          name: 'Alternator (11AC) Brush box fixing screws',
          lbft: '10',
          kgm: '0.115',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) Diode heat sink fixings',
          lbft: '25',
          kgm: '0.288',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) through-bolts',
          lbft: '45 to 50',
          kgm: '0.518 to 0.576',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (16ACR) Shaft nut',
          lbft: '25 to 30',
          kgm: '3.5 to 4.2',
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed nut type)',
          lbft: 50,
          kgm: 0.576,
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed bolt type)',
          lbft: 30,
          kgm: 0.345,
          notes: ''
        }
      ]
    };
  }
};
</script>

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
              v-model="suspensionSearch"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="suspensionItems"
              v-bind:search="suspensionSearch"
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
          <v-card-title class="pl-4 pt-4">
            <h3 class="title">
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
              v-model="gearSearch"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="specialHeaders2"
              v-bind:items="gearboxItems"
              v-bind:search="gearSearch"
            >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.lbft }}</td>
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
          <v-card-title class="pl-4 pt-4">
            <h3 class="title">
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
              v-model="electricalSearch"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="specialHeaders"
              v-bind:items="electricalItems"
              v-bind:search="electricalSearch"
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
              Engine
              <br>
              <span class="body-1">All Models</span>
            </h3>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="engineSearch"
              class="pr-4"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="engineItems"
              v-bind:search="engineSearch"
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
      engineSearch: '',
      gearSearch: '',
      electricalSearch: '',
      suspensionSearch: '',
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
      specialHeaders2: [
        {
          text: 'Fastener',
          left: true,
          sortable: false,
          value: 'fastener'
        },
        { text: 'Torque (lb/ft)', value: 'lbft' },
        { text: 'Torque (kgm)', value: 'kgm' }
      ],
      // This is all the table data
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
          name: 'Drive shaft nut (Front Drums Only)',
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
          name: 'Front suspension upper support arm pivot shaft nut',
          lbft: '45 to 60',
          kgm: '6.2 to 8.3',
          notes: ''
        },
        {
          value: false,
          name: 'Front suspension lower wishbone pivot shaft nut',
          lbft: '30 to 35',
          kgm: '4.1 to 4.8',
          notes: ''
        },
        {
          value: false,
          name: 'Wheel nuts',
          lbft: '40 to 45',
          kgm: '5.5 to 6.2',
          notes: ''
        },
        {
          value: false,
          name: 'Steering column/rack pinion clamp bolt',
          lbft: '8 to 10',
          kgm: '1.11 to 1.38',
          notes: ''
        },
        {
          value: false,
          name: 'Steering arm to swivel hub',
          lbft: '30 to 35',
          kgm: '4.1 to 4.8',
          notes: ''
        },
        {
          value: false,
          name: 'Steering track-rod end to steering arm',
          lbft: '20 to 24',
          kgm: '2.8 to 3.3',
          notes: ''
        },
        {
          value: false,
          name: 'Steering-wheel nut',
          lbft: '32 to 37',
          kgm: '4.5 to 5.1',
          notes: ''
        },
        {
          value: false,
          name: 'Swivel hub ball joint socket',
          lbft: '70 to 80',
          kgm: '9.6 to 11.1',
          notes: ''
        },
        {
          value: false,
          name: 'Swivel hub ball joint to suspension arms',
          lbft: '35 to 40',
          kgm: '4.8 to 5.5',
          notes: ''
        },
        {
          value: false,
          name: 'Track rod end to steering rack lock nut',
          lbft: '35 to 40',
          kgm: '4.8 to 5.5',
          notes: ''
        },
        {
          value: false,
          name: 'Steering rack U-bolts to floor',
          lbft: '10 to 12',
          kgm: '1.4 to 1.7',
          notes: ''
        },
        {
          value: false,
          name: 'Steering-column clip bracket to column clip and parcel shelf',
          lbft: '13 to 18',
          kgm: '1.8 to 2.5',
          notes: ''
        },
        {
          value: false,
          name: 'Rear suspension rear hub nut',
          lbft: '60',
          kgm: '8.3',
          notes: 'Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!'
        },
        {
          value: false,
          name: 'Rear radius arm pivot shaft nut',
          lbft: '45 to 60',
          kgm: '6.2 to 8.3',
          notes: ''
        },
        {
          value: false,
          name: 'Backplate to rear radius arm bolts',
          lbft: '18 to 22',
          kgm: '2.5 to 3.0',
          notes: ''
        },
        {
          value: false,
          name: 'Caliper retaining bolts',
          lbft: '35 to 40',
          kgm: '4.8 to 5.5',
          notes: 'Mini Cooper 997/998cc only'
        },
        {
          value: false,
          name: 'Steering Lever ball joint',
          lbft: '25 to 30',
          kgm: '3.4 to 4.1',
          notes: 'Mini Cooper 997/998cc only'
        },
        {
          value: false,
          name: 'Drive Shaft Nut',
          lbft: '150',
          kgm: '20.7',
          notes: 'Disc Brake Hubs Only (Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!)'
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

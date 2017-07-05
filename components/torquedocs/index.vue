<template>
  <v-layout wrap>
    <v-flex xs12>
      <h2 class="headline pl-5 pt-4 mb-0">Common Torque Settings</h2>
      <aside class="title pl-5 pt-0 pb-0 mb-0 subheader">Torque Specs taken from Mini Haynes Manuals</aside>
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
    <v-flex xs10 offset-xs1 class="pt-4">
      <v-card>
        <v-card-text>
          <!-- CMDIY - Torque Specs -->
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-0523971861051053"
               data-ad-slot="4439282592"
               data-ad-format="auto"></ins>
          <script>
          /* eslint-disable */
          (adsbygoogle = window.adsbygoogle || []).push({});
          /* eslint-enable */
          </script>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 offset-sm1 sm10 md5 class="pt-5">
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
    <v-flex xs12 offset-sm1 sm10 md5 class="pt-5 electrical-margin">
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
    <v-flex xs12 offset-md1 md10 class="mt-4">
      <v-card>
        <v-card-title class="pl-4 pt-4">
          <h3 class="title">
            Engine
            <br>
            <span class="body-1">Important: See Notes</span>
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
    <v-flex xs10 offset-xs1 class="pt-4">
      <v-card>
        <v-card-text>
          <!-- CMDIY - Torque Specs 2 -->
          <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-0523971861051053"
             data-ad-slot="8531404996"
             data-ad-format="auto"></ins>
          <script>
          /* eslint-disable */
          (adsbygoogle = window.adsbygoogle || []).push({});
          /* eslint-enable */
          </script>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs1></v-flex>
</v-layout>
</template>

<style lang="scss" src="./torquedocs.scss"></style>

<script>
export default {
  data: function () {
    return {
      // This is where you declare the search thingys
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
          name: 'Drive Shaft Nut (disc only)',
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
          name: 'Third Motion Shaft bearing retainer screws',
          lbft: '13',
          kgm: '1.8',
          notes: ''
        },
        {
          value: false,
          name: 'First Motion Shaft nut',
          lbft: '150',
          kgm: '20.7',
          notes: ''
        },
        {
          value: false,
          name: 'Third Motion Shaft nut',
          lbft: '150',
          kgm: '20.7',
          notes: ''
        },
        {
          value: false,
          name: 'Transmission Case to Crankcase',
          lbft: '6',
          kgm: '0.8',
          notes: ''
        },
        {
          value: false,
          name: 'Transmission drain plug',
          lbft: 25,
          kgm: 3.5,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case studs - 3/8in dia. UNC',
          lbft: 8,
          kgm: 1.1,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case studs - 5/16in dia. UNC',
          lbft: 6,
          kgm: 0.8,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case stud nuts 3/8in UNF',
          lbft: 25,
          kgm: 3.4,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case stud nuts 5/16in UNF',
          lbft: 18,
          kgm: 2.5,
          notes: ''
        },
        {
          value: false,
          name: 'Bottom Cover set screws 1/4in dia. UNC (change-speed tower)',
          lbft: 6,
          kgm: 0.8,
          notes: ''
        },
        {
          value: false,
          name: 'Driven Gear to Differential Cage',
          lbft: 60,
          kgm: 8.3,
          notes: ''
        },
        {
          value: false,
          name: 'Driving Flange to Differential nut (tighten to next split pin hole)',
          lbft: 70,
          kgm: 9.6,
          notes: ''
        },
        {
          value: false,
          name: 'Differential Housing End Cover bolts',
          lbft: 18,
          kgm: 2.5,
          notes: ''
        }
      ],
      engineItems: [
        {
          value: false,
          name: 'Camshaft Nut',
          lbft: '60 to 70',
          kgm: '8.3 to 9.7',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Con Rod Big-end Bolts',
          lbft: '35 to 38',
          kgm: '4.8 to 5.3',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Crankshaft Pulley Nut',
          lbft: '70 to 80',
          kgm: '9.7 to 11.1',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Head Stud Nuts',
          lbft: '40',
          kgm: '5.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Side Cover',
          lbft: '3 to 4',
          kgm: '0.42 to 0.55',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Clutch Spring Housing to Pressure Plate set screws',
          lbft: '16',
          kgm: '2.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Driving Strap to Flywheel set screw',
          lbft: '16',
          kgm: '2.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Flywheel Center Bolt',
          lbft: '110 to 115',
          kgm: '15.2 to 15.9',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Flywheel Housing bolts and stud nuts',
          lbft: '18',
          kgm: '2.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Gudgeon Pin Clamp Screws',
          lbft: '22 to 25',
          kgm: '3.0 to 3.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Heater Control to Cylinder Head',
          lbft: '6 to 8',
          kgm: '0.83 to 1.11',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Main Bearing set screws',
          lbft: '60 to 65',
          kgm: '8.3 to 9.0',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Manifold to Cylinder Head',
          lbft: '12 to 16',
          kgm: '1.7 to 2.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Filter Brown Center Bolt',
          lbft: '12 to 16',
          kgm: '1.7 to 2.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pump',
          lbft: '6 to 9',
          kgm: '0.83 to 1.25',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pipe banjo',
          lbft: '35 to 40',
          kgm: '4.8 to 5.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pressure Release Valve - dome nut',
          lbft: '40 to 45',
          kgm: '5.5 to 6.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Rocker Cover',
          lbft: '3 to 4',
          kgm: '0.41 to 0.55',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Rocker Shaft Bracket Nuts',
          lbft: '22 to 25',
          kgm: '3.0 to 3.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Spark Plugs',
          lbft: '18',
          kgm: '2.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Timing Cover and Front Plate 1/4in UNF bolts',
          lbft: '4 to 6',
          kgm: '0.55 to 0.83',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Timing Cover and Front Plate 5/16in UNF bolts',
          lbft: '1.4 to 1.9',
          kgm: '',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Water Pump',
          lbft: '14 to 18',
          kgm: '1.9 to 2.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Water Outlet Elbow',
          lbft: '6 to 9',
          kgm: '0.83 to 1.25',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Thermal Transmitter',
          lbft: '16',
          kgm: '2.2',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Head nuts (11 stud head)',
          lbft: '42',
          kgm: '5.8',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Cylinder Head bolt (11 stud head)',
          lbft: '25',
          kgm: '3.5',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Con Rod Big-end nuts (assemble dry only)',
          lbft: '40',
          kgm: '5.5',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Main Bearing set screws (early type)',
          lbft: '67',
          kgm: '9.3',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Main Bearing nuts (later type)',
          lbft: '57',
          kgm: '7.9',
          notes: '970cc, 1071cc, 1275cc'
        }
      ]
    };
  }
};
</script>

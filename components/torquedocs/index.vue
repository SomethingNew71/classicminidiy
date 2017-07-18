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
            <td class="text-xs-right">{{ props.item.nm }}</td>
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
    <!-- <v-flex xs12 offset-sm1 sm10 md5 class="pt-5"> -->
    <v-flex xs12 offset-sm1 sm10 class="mt-4">
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
            <td class="text-xs-right">{{ props.item.nm }}</td>
          </template>
          <template slot="pageText" scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12 offset-sm1 sm10 md5 class="pt-5 electrical-margin">
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
            <td class="text-xs-right">{{ props.item.nm }}</td>
          </template>
          <template slot="pageText" scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex> -->
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
            <td class="text-xs-right">{{ props.item.nm }}</td>
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
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Torque (lb/ft)', value: 'lbft' },
        { text: 'Torque (Nm)', value: 'nm' },
        { text: 'Notes', value: 'notes', align: 'center' }
      ],
      specialHeaders: [
        {
          text: 'Fastener',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Torque (lb/in)', value: 'lbin' },
        { text: 'Torque (Nm)', value: 'nm' }
      ],
      specialHeaders2: [
        {
          text: 'Fastener',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Torque (lb/ft)', value: 'lbft' },
        { text: 'Torque (Nm)', value: 'nm' }
      ],
      // This is all the table data
      suspensionItems: [
        {
          value: false,
          name: 'Drive shaft coupling U bolts (rubber cross inner joints)',
          lbft: '8 to 12',
          nm: '10.88 to 16.279',
          notes: ''
        },
        {
          value: false,
          name: 'Drive shaft nut (Front Drums Only)',
          lbft: '20 to 24',
          nm: '27.45 to 32.36',
          notes: 'Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!'
        },
        {
          value: false,
          name: 'Tie rod to front sub-frame',
          lbft: '17-20',
          nm: '27.45 to 32.36',
          notes: ''
        },
        {
          value: false,
          name: 'Tie rod to lower front suspension wishbone',
          lbft: '17-20',
          nm: '27.45 to 32.36',
          notes: ''
        },
        {
          value: false,
          name: 'Front suspension upper support arm pivot shaft nut',
          lbft: '45 to 60',
          nm: '60.80 to 81.39',
          notes: ''
        },
        {
          value: false,
          name: 'Front suspension lower wishbone pivot shaft nut',
          lbft: '30 to 35',
          nm: '40.20 to 47.07',
          notes: ''
        },
        {
          value: false,
          name: 'Wheel nuts',
          lbft: '40 to 45',
          nm: '53.93 to 60.80',
          notes: ''
        },
        {
          value: false,
          name: 'Steering column/rack pinion clamp bolt',
          lbft: '8 to 10',
          nm: '11 to 13.5',
          notes: ''
        },
        {
          value: false,
          name: 'Steering arm to swivel hub',
          lbft: '30 to 35',
          nm: '40.20 to 47.07',
          notes: ''
        },
        {
          value: false,
          name: 'Steering track-rod end to steering arm',
          lbft: '20 to 24',
          nm: '27.45 to 32.36',
          notes: ''
        },
        {
          value: false,
          name: 'Steering-wheel nut',
          lbft: '32 to 37',
          nm: '44.12 to 50',
          notes: ''
        },
        {
          value: false,
          name: 'Swivel hub ball joint socket',
          lbft: '70 to 80',
          nm: '94 to 108',
          notes: ''
        },
        {
          value: false,
          name: 'Swivel hub ball joint to suspension arms',
          lbft: '35 to 40',
          nm: '47 to 54',
          notes: ''
        },
        {
          value: false,
          name: 'Track rod end to steering rack lock nut',
          lbft: '35 to 40',
          nm: '47 to 54',
          notes: ''
        },
        {
          value: false,
          name: 'Steering rack U-bolts to floor',
          lbft: '10 to 12',
          nm: '13.7 to 16.6',
          notes: ''
        },
        {
          value: false,
          name: 'Steering-column clip bracket to column clip and parcel shelf',
          lbft: '13 to 18',
          nm: '17.7 to 24.5',
          notes: ''
        },
        {
          value: false,
          name: 'Rear suspension rear hub nut',
          lbft: '60',
          nm: '81.39',
          notes: 'Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!'
        },
        {
          value: false,
          name: 'Rear radius arm pivot shaft nut',
          lbft: '45 to 60',
          nm: '60.80 to 81.39',
          notes: ''
        },
        {
          value: false,
          name: 'Backplate to rear radius arm bolts',
          lbft: '18 to 22',
          nm: '24.5 to 29.4',
          notes: ''
        },
        {
          value: false,
          name: 'Caliper retaining bolts',
          lbft: '35 to 40',
          nm: '47 to 54',
          notes: 'Mini Cooper 997/998cc only'
        },
        {
          value: false,
          name: 'Steering Lever ball joint',
          lbft: '25 to 30',
          nm: '33 to 40',
          notes: 'Mini Cooper 997/998cc only'
        },
        {
          value: false,
          name: 'Drive Shaft Nut (disc only)',
          lbft: '150',
          nm: '20.7',
          notes: 'Disc Brake Hubs Only (Continue tightening until next split pin slot aligns. Do not slacken off until the next slot aligns!)'
        }
      ],
      electricalItems: [
        {
          value: false,
          name: 'Alternator (11AC) Brush box fixing screws',
          lbin: '10',
          nm: '11',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) Diode heat sink fixings',
          lbin: '25',
          nm: '27',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (11AC) through-bolts',
          lbin: '45 to 50',
          nm: '49 to 55',
          notes: ''
        },
        {
          value: false,
          name: 'Alternator (16ACR) Shaft nut',
          lbin: '25 to 30',
          nm: '34 to 41',
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed nut type)',
          lbin: 50,
          nm: 55,
          notes: ''
        },
        {
          value: false,
          name: 'Distributor Clamp Bolt (fixed bolt type)',
          lbin: 30,
          nm: 33,
          notes: ''
        }
      ],
      gearboxItems: [
        {
          value: false,
          name: 'Third Motion Shaft bearing retainer screws',
          lbft: '13',
          nm: '17.6',
          notes: ''
        },
        {
          value: false,
          name: 'First Motion Shaft nut',
          lbft: '150',
          nm: '203',
          notes: ''
        },
        {
          value: false,
          name: 'Third Motion Shaft nut',
          lbft: '150',
          nm: '203',
          notes: ''
        },
        {
          value: false,
          name: 'Transmission Case to Crankcase',
          lbft: '6',
          nm: '7.8',
          notes: ''
        },
        {
          value: false,
          name: 'Transmission drain plug',
          lbft: 25,
          nm: 34,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case studs - 3/8in dia. UNC',
          lbft: 8,
          nm: 10.8,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case studs - 5/16in dia. UNC',
          lbft: 6,
          nm: 7.8,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case stud nuts 3/8in UNF',
          lbft: 25,
          nm: 33,
          notes: ''
        },
        {
          value: false,
          name: 'Transmission case stud nuts 5/16in UNF',
          lbft: 18,
          nm: 24.5,
          notes: ''
        },
        {
          value: false,
          name: 'Bottom Cover set screws 1/4in dia. UNC (change-speed tower)',
          lbft: 6,
          nm: 7.8,
          notes: ''
        },
        {
          value: false,
          name: 'Driven Gear to Differential Cage',
          lbft: 60,
          nm: 81.39,
          notes: ''
        },
        {
          value: false,
          name: 'Driving Flange to Differential nut (tighten to next split pin hole)',
          lbft: 70,
          nm: 94,
          notes: ''
        },
        {
          value: false,
          name: 'Differential Housing End Cover bolts',
          lbft: 18,
          nm: 24.5,
          notes: ''
        }
      ],
      engineItems: [
        {
          value: false,
          name: 'Camshaft Nut',
          lbft: '60 to 70',
          nm: '81.39 to 95',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Con Rod Big-end Bolts',
          lbft: '35 to 38',
          nm: '47 to 52',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Crankshaft Pulley Nut',
          lbft: '70 to 80',
          nm: '95 to 108.8',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Head Stud Nuts',
          lbft: '40',
          nm: '54',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Side Cover',
          lbft: '3 to 4',
          nm: '4 to 5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Clutch Spring Housing to Pressure Plate set screws',
          lbft: '16',
          nm: '21.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Driving Strap to Flywheel set screw',
          lbft: '16',
          nm: '21.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Flywheel Center Bolt',
          lbft: '110 to 115',
          nm: '149 to 156',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Flywheel Housing bolts and stud nuts',
          lbft: '18',
          nm: '24.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Gudgeon Pin Clamp Screws',
          lbft: '22 to 25',
          nm: '29 to 24',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Heater Control to Cylinder Head',
          lbft: '6 to 8',
          nm: '8 to 11',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Main Bearing set screws',
          lbft: '60 to 65',
          nm: '81.39 to 88',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Manifold to Cylinder Head',
          lbft: '12 to 16',
          nm: '16.6 to 21.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Filter Brown Center Bolt',
          lbft: '12 to 16',
          nm: '16.6 to 21.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pump',
          lbft: '6 to 9',
          nm: '8 to 12',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pipe banjo',
          lbft: '35 to 40',
          nm: '47 to 54',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Oil Pressure Release Valve - dome nut',
          lbft: '40 to 45',
          nm: '53.93 to 60.80',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Rocker Cover',
          lbft: '3 to 4',
          nm: '4 to 5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Rocker Shaft Bracket Nuts',
          lbft: '22 to 25',
          nm: '29 to 34',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Spark Plugs',
          lbft: '18',
          nm: '24.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Timing Cover and Front Plate 1/4in UNF bolts',
          lbft: '4 to 6',
          nm: '5 to 8',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Timing Cover and Front Plate 5/16in UNF bolts',
          lbft: '14 to 18.5',
          nm: '19 to 25',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Water Pump',
          lbft: '14 to 18',
          nm: '18.6 to 24.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Water Outlet Elbow',
          lbft: '6 to 9',
          nm: '8 to 12',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Thermal Transmitter',
          lbft: '16',
          nm: '21.5',
          notes: '848cc, 998cc'
        },
        {
          value: false,
          name: 'Cylinder Head nuts (11 stud head)',
          lbft: '42',
          nm: '57',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Cylinder Head bolt (11 stud head)',
          lbft: '25',
          nm: '34',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Con Rod Big-end nuts (assemble dry only)',
          lbft: '40',
          nm: '54',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Main Bearing set screws (early type)',
          lbft: '67',
          nm: '91',
          notes: '970cc, 1071cc, 1275cc'
        },
        {
          value: false,
          name: 'Main Bearing nuts (later type)',
          lbft: '57',
          nm: '77',
          notes: '970cc, 1071cc, 1275cc'
        }
      ]
    };
  }
};
</script>

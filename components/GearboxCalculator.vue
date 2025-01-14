<script setup lang="ts">
  import {
    options,
    tableHeaders,
    chartOptions,
    kphFactor,
    type ISpeedometerTableItem,
    type IGearingTableItem,
    type ISpeedometer,
  } from '../data/models/gearing';

  // Default Values for form elements
  const metric = ref(false);
  const final_drive = ref(3.444);
  const gear_ratios = ref([2.583, 1.644, 1.25, 1.0]);
  const drop_gear = ref(1);
  const speedo_drive = ref(0.3529);
  const max_rpm = ref(6500);
  const tire_type = ref({
    width: 145,
    profile: 80,
    size: 10,
  });

  // Form Options
  const tires = ref(options.tires);
  const diffs = ref(options.diffs);
  const speedosRatios = ref(options.speedosRatios);
  const dropGears = ref(options.dropGears);
  const gearRatios = ref(options.gearRatios);
  const speedos = ref(options.speedos);
  const rpmTicks = ref(options.rpmTicks);

  // Component variables
  const typeCircInMiles = ref<number | null>(null);
  const topSpeed = ref<string>('---');
  const tireInfo = ref({
    width: 0,
    profile: 0,
    size: 0,
    diameter: 0,
    circ: 0,
    tireTurnsPerMile: 0,
  });
  const speedoDetails = ref({
    engineRevsMile: 0,
    turnsPerMile: 0,
  });

  // Section for Table Data
  const tableDataGearing = ref<IGearingTableItem[]>([]);
  const tableDataSpeedos = ref<ISpeedometerTableItem[]>([]);
  const tableHeadersGearing: any[] = tableHeaders.tableHeadersGearing;
  const tableHeadersSpeedos: any[] = tableHeaders.tableHeadersSpeedos;

  // Section for Chart Data
  const chartData = ref<any>([]);
  const mapOptions = ref(chartOptions);

  const YARDS_IN_MILE = 1760;
  const MM_IN_YARD = 914.4;

  function calculateTireDetails() {
    tireInfo.value.width = tire_type.value.width;
    tireInfo.value.profile = tire_type.value.profile;
    tireInfo.value.size = tire_type.value.size;
    tireInfo.value.diameter = Math.round(
      tireInfo.value.width * (tireInfo.value.profile / 100) * 2 + tireInfo.value.size * 25.4
    );
    tireInfo.value.circ = Math.round(3.14159 * tireInfo.value.diameter); // in mm
    typeCircInMiles.value = tireInfo.value.circ / (YARDS_IN_MILE * MM_IN_YARD); // in miles
    tireInfo.value.tireTurnsPerMile = Math.round(YARDS_IN_MILE / (tireInfo.value.circ / MM_IN_YARD));
  }

  function calculateSpeedoDetails() {
    speedoDetails.value.turnsPerMile = Math.round(
      tireInfo.value.tireTurnsPerMile * final_drive.value * speedo_drive.value
    );
    speedoDetails.value.engineRevsMile = Math.round(
      tireInfo.value.tireTurnsPerMile * final_drive.value * drop_gear.value
    );
  }

  function calculateSpeedometerData() {
    const speedometers = metric.value ? speedos.value.metric : speedos.value.imperial;
    const factor = metric.value ? kphFactor : 1;

    tableDataSpeedos.value = speedometers.map((speedometer: ISpeedometer) => {
      const turnsPer = speedoDetails.value.turnsPerMile / factor;
      const variation = Math.round((turnsPer / speedometer.turns) * 100 * drop_gear.value);
      let result = '';
      let status = '';

      if (variation > 100) {
        status = 'text-red';
        result = `Over ${variation - 100}%`;
      } else if (variation === 100) {
        status = 'text-green';
        result = 'Reads correctly!';
      } else {
        status = 'text-primary';
        result = `Under ${100 - variation}%`;
      }
      return {
        status,
        speedometer: speedometer.name,
        turns: speedometer.turns,
        speed: speedometer.speed,
        result,
      };
    });
  }

  function calculateGearingData() {
    tableDataGearing.value = gear_ratios.value.map((gear: number, index) => {
      let parsedMaxSpeed: string;
      let maxSpeed = 0;
      if (typeCircInMiles.value !== null) {
        maxSpeed = Math.round(
          (max_rpm.value / drop_gear.value / gear / final_drive.value) * typeCircInMiles.value * 60
        );
      }
      parsedMaxSpeed = metric.value ? `${Math.round(maxSpeed * kphFactor)}km/h` : `${maxSpeed}mph`;

      if (index === 3) {
        topSpeed.value = parsedMaxSpeed;
      }

      return {
        gear: index + 1,
        ratio: gear,
        maxSpeed: parsedMaxSpeed,
      };
    });
  }

  function calculateRatio() {
    tableHeadersGearing[2].label = metric.value ? 'Max Speed (km/h)' : 'Max Speed (mph)';
    mapOptions.value.yAxis.title.text = metric.value ? 'Speed (km/h)' : 'Speed (mph)';

    calculateTireDetails();
    calculateSpeedoDetails();
    calculateSpeedometerData();
    calculateGearingData();
    generateChartData();
  }

  function generateChartData() {
    chartData.value = [];
    const gearNames = ['1st Gear', '2nd Gear', '3rd Gear', '4th Gear'];

    gear_ratios.value.forEach((gear, index) => {
      const speedData: number[] = [];
      for (let rpm = 1000; rpm <= max_rpm.value; rpm += 500) {
        let speed = 0;
        if (typeCircInMiles.value !== null) {
          speed = Math.round((rpm / drop_gear.value / gear / final_drive.value) * typeCircInMiles.value * 60);
          if (metric.value) {
            speed = Math.round(speed * kphFactor);
          }
        }
        speedData.push(speed);
      }
      chartData.value.push({
        name: gearNames[index],
        data: speedData,
      });
    });
    mapOptions.value.series = chartData.value;
  }

  calculateRatio();
</script>

<template>
  <v-row>
    <v-col cols="12" class="py-4"></v-col>
    <v-col cols="4">
      <v-switch
        v-model="metric"
        color="primary"
        label="Imperial or Metric"
        @update:modelValue="calculateRatio()"
      ></v-switch>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-tire"
        v-model="tire_type"
        label="Tire Size"
        item-title="label"
        item-value="value"
        :items="tires"
        @update:modelValue="calculateRatio()"
      >
      </v-select>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-gear"
        v-model="final_drive"
        label="Final Drive Gear Size"
        item-title="label"
        item-value="value"
        :items="diffs"
        @update:modelValue="calculateRatio()"
      >
      </v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-percent"
        v-model="speedo_drive"
        label="Speedo Drive Ratio"
        item-title="label"
        item-value="value"
        :items="speedosRatios"
        @update:modelValue="calculateRatio()"
      >
      </v-select>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-gear"
        v-model="drop_gear"
        label="Drop Gear Size"
        item-title="label"
        item-value="value"
        :items="dropGears"
        @update:modelValue="calculateRatio()"
      >
      </v-select>
    </v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-gear"
        v-model="gear_ratios"
        label="Gearset"
        item-title="label"
        item-value="value"
        :items="gearRatios"
        @update:modelValue="calculateRatio()"
      >
      </v-select>
    </v-col>
    <v-col cols="12" md="6">
      <h3>Maximum RPM</h3>
      <v-slider
        v-model="max_rpm"
        :min="6000"
        :max="9000"
        :step="500"
        show-ticks="always"
        tick-size="4"
        :ticks="rpmTicks"
        @update:modelValue="calculateRatio()"
      ></v-slider>
    </v-col>
    <v-col cols="12" md="10" offset-md="1">
      <div class="divider">Results</div>
    </v-col>
    <v-col cols="12">
      <nav class="level pb-5">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Revolutions per/Mile</p>
            <p class="title">{{ speedoDetails.engineRevsMile || '---' }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Cable Turns per/Mile</p>
            <p class="title">{{ speedoDetails.turnsPerMile || '---' }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Top Speed</p>
            <p class="title">{{ topSpeed || '---' }}</p>
          </div>
        </div>
      </nav>
    </v-col>
    <v-col cols="12">
      <nav class="level pb-5">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Width</p>
            <p class="subtitle has-text-weight-bold">{{ tireInfo.width || '---' }}mm</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Profile</p>
            <p class="subtitle has-text-weight-bold">{{ tireInfo.profile || '---' }}%</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Wheel Size</p>
            <p class="subtitle has-text-weight-bold">{{ tireInfo.size || '---' }}in</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Diameter</p>
            <p class="subtitle has-text-weight-bold">{{ tireInfo.diameter || '---' }}mm</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Circumfrence</p>
            <p class="subtitle has-text-weight-bold">{{ tireInfo.circ || '---' }}mm</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Turns Per Mile</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.tireTurnsPerMile || '---' }}
            </p>
          </div>
        </div>
      </nav>
    </v-col>
    <v-col cols="12" md="7">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            <span class="icon is-size-4">
              <i class="fa-duotone fa-gauge"></i>
            </span>
            <span class="pl-3 has-text-weight-bold">Speedo Information</span>
          </p>
        </div>
        <div class="card-content">
          <v-data-table
            :class="'speedo-table'"
            :headers="tableHeadersSpeedos"
            :items="tableDataSpeedos"
            density="compact"
            :items-per-page="20"
          >
            <template v-slot:item.speed="{ item }">
              <p class="pr-5">{{ item.speed }}{{ metric ? 'kph' : 'mph' }}</p>
            </template>
            <template v-slot:item.speedometer="{ item }">
              <p class="font-weight-bold">{{ item.speedometer }}</p>
            </template>
            <template v-slot:item.result="{ item }">
              <p class="font-weight-bold" :class="item.status">{{ item.result }}</p>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="5">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            <span class="icon is-size-4">
              <i class="fa-duotone fa-gear fa-spin"></i>
            </span>
            <span class="pl-3 has-text-weight-bold">Gearing Information</span>
          </p>
        </div>
        <div class="card-content">
          <v-data-table-virtual :headers="tableHeadersGearing" :items="tableDataGearing" density="compact">
          </v-data-table-virtual>
        </div>
      </div>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-col>
    <v-col cols="12">
      <div class="card">
        <ClientOnly fallback-tag="p">
          <highcharts ref="gearSpeedChart" :options="mapOptions"></highcharts>
          <template #fallback>
            <p class="pa-10 text-center text-h5">Chart is loading</p>
          </template>
        </ClientOnly>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="content has-text-centered">
        <p>
          Please note the above figures are <strong>approximate values</strong>. Before purchasing parts and building
          your engine we recommend <strong>doublechecking</strong> your calculations multiple times using more than one
          source. The mathematical equations used in this tool can be found here:
          <a
            href="https://github.com/SomethingNew71/classicminidiy/blob/dev/components/SpeedoDriveCalculator.vue#L512"
            target="_blank"
            rel="noopener noreferrer"
          >
            Equation Source Code</a
          >
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss">
  .speedo-table {
    tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.02);
    }
    .v-data-table-footer,
    .v-divider {
      display: none;
    }
  }
</style>

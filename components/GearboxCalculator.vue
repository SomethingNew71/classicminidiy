<script setup lang="ts">
  import { options, tableHeaders, chartOptions } from '../data/models/gearing';

  // Default Values for form elements _ values are form values
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
  let typeCircInMiles: any = ref();
  const topSpeed = ref();
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
  let tableDataGearing: any = ref([]);
  let tableDataSpeedos: any = ref([]);
  const tableHeadersGearing: any[] = tableHeaders.tableHeadersGearing;
  const tableHeadersSpeedos: any[] = tableHeaders.tableHeadersSpeedos;
  // Section for Chart Data
  let chartData: any = [];
  const mapOptions = ref(chartOptions);

  function calculateRatio() {
    // Assign headers to match metric/imperial
    if (metric.value) {
      tableHeadersGearing[2].label = 'Max Speed (km/h)';
      mapOptions.value.yAxis.title.text = 'Speed (km/h)';
    } else {
      tableHeadersGearing[2].label = 'Max Speed (mph)';
      mapOptions.value.yAxis.title.text = 'Speed (mph)';
    }
    // Assign tire Details and working values
    tireInfo.value.width = tire_type.value.width;
    tireInfo.value.profile = tire_type.value.profile;
    tireInfo.value.size = tire_type.value.size;
    tireInfo.value.diameter = Math.round(
      tireInfo.value.width * (tireInfo.value.profile / 100) * 2 + tireInfo.value.size * 25.4
    );
    tireInfo.value.circ = Math.round(3.14159 * tireInfo.value.diameter); // in mm
    typeCircInMiles.value = tireInfo.value.circ / (1760 * 914.4); // in miles

    // calculate tire turns per mile 1760 yards in a mile, 914.4 mm in a yard
    tireInfo.value.tireTurnsPerMile = Math.round(1760 / (tireInfo.value.circ / 914.4));

    // calculate tire turns per mile
    speedoDetails.value.turnsPerMile = Math.round(
      tireInfo.value.tireTurnsPerMile * final_drive.value * speedo_drive.value
    );
    // calculate engine revs per mile including drop gear
    speedoDetails.value.engineRevsMile = Math.round(
      tireInfo.value.tireTurnsPerMile * final_drive.value * drop_gear.value
    );

    tableDataSpeedos.value = speedos.value.map((speedometer: any) => {
      const variation = Math.round((speedoDetails.value.turnsPerMile / speedometer.tpm) * 100 * drop_gear.value);
      let result = '';
      let status = '';

      if (variation > 100) {
        status = 'text-red';
        result = `Over ${variation - 100}%`;
      } else if (variation === 100) {
        status = 'text-green';
        result = 'Reads correctly!';
      } else if (variation < 100) {
        status = 'text-primary';
        result = `Under ${100 - variation}%`;
      }
      return {
        status,
        speedometer: speedometer.name,
        tpm: speedometer.tpm,
        result,
      };
    });

    tableDataGearing.value = gear_ratios.value.map((gear, index) => {
      let parsedMaxSpeed: string;
      const maxSpeed = Math.round(
        (max_rpm.value / drop_gear.value / gear / final_drive.value) * typeCircInMiles.value * 60
      );
      // Correctly display max speed in mph or kph
      if (metric.value) {
        parsedMaxSpeed = `${Math.round(maxSpeed * 1.60934)}km/h`;
      } else {
        parsedMaxSpeed = `${maxSpeed}mph`;
      }

      // Assign the topspeed value for display based on top gear max speed
      if (index === 3) {
        topSpeed.value = parsedMaxSpeed;
      }

      return {
        gear: index + 1,
        ratio: gear,
        maxSpeed: parsedMaxSpeed,
      };
    });

    generateChartData();
  }

  function generateChartData() {
    chartData = [];
    gear_ratios.value.forEach((gear, index) => {
      const speedData = [];
      let gearName = '';
      for (let rpm = 1000; rpm <= max_rpm.value; rpm = rpm + 500) {
        let speed = Math.round((rpm / drop_gear.value / gear / final_drive.value) * typeCircInMiles.value * 60);
        // Correctly display max speed in mph or kph
        if (metric.value) {
          speed = Math.round(speed * 1.60934);
        }

        speedData.push(speed);
      }
      switch (index) {
        case 0:
          gearName = '1st Gear';
          break;
        case 1:
          gearName = '2nd Gear';
          break;
        case 2:
          gearName = '3rd Gear';
          break;
        case 3:
          gearName = '4th Gear';
          break;
        default:
          break;
      }
      chartData.push({
        name: gearName,
        data: speedData,
      });
    });
    mapOptions.value.series = chartData;
  }

  calculateRatio();
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-12 py-4"></div>
    <div class="column is-4">
      <v-switch
        v-model="metric"
        color="primary"
        label="Imperial or Metric"
        @update:modelValue="calculateRatio()"
      ></v-switch>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
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
    </div>
    <div class="column is-6">
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
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
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
    </div>
    <div class="column is-6">
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
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
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
    </div>
    <div class="column is-6">
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
    </div>
    <div class="column is-10 is-offset-1">
      <div class="divider">Results</div>
    </div>
    <div class="column is-12">
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
    </div>
    <div class="column is-12">
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
    </div>
    <div class="column is-7">
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
          <v-data-table-virtual :headers="tableHeadersSpeedos" :items="tableDataSpeedos" density="compact">
            <template v-slot:item.result="{ item }">
              <p class="font-weight-bold" :class="item.status">{{ item.result }}</p>
            </template>
          </v-data-table-virtual>
        </div>
      </div>
    </div>
    <div class="column is-5">
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
      <div class="card mt-2">
        <div class="card-content">
          <patreon-card size="small" />
        </div>
      </div>
    </div>
    <div class="column is-12">
      <div class="card">
        <client-only>
          <highcharts ref="gearSpeedChart" :options="mapOptions"></highcharts>
        </client-only>
      </div>
    </div>
    <div class="column is-12">
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    options,
    tableHeaders,
    chartOptions,
    kphFactor,
    type ISpeedometerTableItem,
    type IGearingTableItem,
    type ISpeedometer,
  } from '../../../data/models/gearing';

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

  // Component variables with proper typing
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
  // Use type assertion to fix TypeScript errors with Vuetify table headers
  const tableHeadersGearing = tableHeaders.tableHeadersGearing as any[];
  const tableHeadersSpeedos = tableHeaders.tableHeadersSpeedos as any[];

  // Section for Chart Data with proper typing
  const chartData = ref<Array<{ name: string; data: number[] }>>([]);
  // Use type assertion to fix TypeScript errors
  const mapOptions = ref(JSON.parse(JSON.stringify(chartOptions)) as typeof chartOptions);

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

  // Make sure chart is properly rendered when component is mounted
  onMounted(() => {
    // Force chart redraw after component is mounted
    nextTick(() => {
      calculateRatio();
    });
  });

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
        name: gearNames[index] || '',
        data: speedData,
      });
    });
    // Use type assertion to fix TypeScript error
    mapOptions.value.series = chartData.value as any;
  }

  calculateRatio();
</script>

<template>
  <div class="grid grid-cols-1 gap-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="col-span-1 md:col-span-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Imperial or Metric</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="metric" @change="calculateRatio()" />
          </label>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text"
              >Tire Size <span><i class="fad fa-tire"></i></span
            ></span>
          </label>
          <div class="input-group">
            <select class="select select-bordered w-full" v-model="tire_type" @change="calculateRatio()">
              <option v-for="item in tires" :key="item.label" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-control col-span-12 md:col-span-6">
        <label class="label">
          <span class="label-text"
            >Speedo Drive Ratio <span><i class="fad fa-percent"></i></span
          ></span>
        </label>
        <div class="input-group">
          <select class="select select-bordered w-full" v-model="speedo_drive" @change="calculateRatio()">
            <option v-for="item in speedosRatios" :key="item.label" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-control col-span-12 md:col-span-6">
        <label class="label">
          <span class="label-text"
            >Drop Gear Ratio <span><i class="fad fa-gears"></i></span
          ></span>
        </label>
        <div class="input-group">
          <select class="select select-bordered w-full" v-model="drop_gear" @change="calculateRatio()">
            <option v-for="item in dropGears" :key="item.label" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-control col-span-12 md:col-span-6">
        <label class="label">
          <span class="label-text"
            >Gearset <span><i class="fad fa-gear"></i></span
          ></span>
        </label>
        <div class="input-group">
          <select class="select select-bordered w-full" v-model="gear_ratios" @change="calculateRatio()">
            <option v-for="item in gearRatios" :key="item.label" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-control col-span-12 md:col-span-6">
        <label class="label">
          <span class="label-text"
            >Final Drive <span><i class="fad fa-gears"></i></span
          ></span>
        </label>
        <div class="input-group">
          <select class="select select-bordered w-full" v-model="final_drive" @change="calculateRatio()">
            <option v-for="item in diffs" :key="item.label" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-control col-span-12 md:col-span-6">
        <label class="label">
          <span class="label-text"
            >Max RPM <span><i class="fad fa-tachometer-alt"></i></span
          ></span>
        </label>
        <div class="w-full">
          <select class="select select-bordered w-full" v-model.number="max_rpm" @change="calculateRatio()">
            <option value="5000">5000 RPM</option>
            <option value="5500">5500 RPM</option>
            <option value="6000">6000 RPM</option>
            <option value="6500">6500 RPM</option>
            <option value="7000">7000 RPM</option>
            <option value="7500">7500 RPM</option>
            <option value="8000">8000 RPM</option>
            <option value="8500">8500 RPM</option>
            <option value="9000">9000 RPM</option>
          </select>
        </div>
      </div>
    </div>

    <div class="divider">Results</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card bg-stone-400 shadow-sm">
        <div class="card-body text-center">
          <h3 class="text-lg text-white opacity-70">Revolutions per/Mile</h3>
          <p class="text-3xl text-white font-bold">{{ speedoDetails.engineRevsMile || '---' }}</p>
        </div>
      </div>
      <div class="card bg-secondary shadow-sm">
        <div class="card-body text-center">
          <h3 class="text-lg text-white opacity-70">Turns per/Mile</h3>
          <p class="text-3xl text-white font-bold">{{ speedoDetails.turnsPerMile || '---' }}</p>
        </div>
      </div>
      <div class="card bg-primary shadow-sm">
        <div class="card-body text-center">
          <h3 class="text-lg text-white opacity-70">Top Speed</h3>
          <p class="text-3xl text-white font-bold">{{ topSpeed || '---' }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Tire Width</h3>
          <p class="text-lg font-bold">{{ tireInfo.width || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Tire Profile</h3>
          <p class="text-lg font-bold">{{ tireInfo.profile || '---' }}%</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Tire Size</h3>
          <p class="text-lg font-bold">{{ tireInfo.size || '---' }}"</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Tire Diameter</h3>
          <p class="text-lg font-bold">{{ tireInfo.diameter || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Circumference</h3>
          <p class="text-lg font-bold">{{ tireInfo.circ || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">Turns Per Mile</h3>
          <p class="text-lg font-bold">{{ tireInfo.tireTurnsPerMile || '---' }}</p>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body">
          <ClientOnly fallback-tag="span">
            <highcharts
              ref="gearSpeedChart"
              :options="mapOptions"
              :updateArgs="[true, true, true]"
              :constructorType="'chart'"
            ></highcharts>
            <template #fallback>
              <div class="skeleton h-96 w-full"></div>
              <p class="py-10 text-center text-2xl">Chart is loading</p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
      <div class="col-span-1 md:col-span-7">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">
              <i class="fa-duotone fa-gauge mr-2"></i>
              Speedo Information
            </h2>
            <div class="overflow-x-auto">
              <table class="table table-zebra table-compact w-full">
                <thead>
                  <tr>
                    <th v-for="header in tableHeadersSpeedos" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableDataSpeedos" :key="index">
                    <td class="font-bold">{{ item.speedometer }}</td>
                    <td>{{ item.turns }}</td>
                    <td>{{ item.speed }}{{ metric ? 'kph' : 'mph' }}</td>
                    <td :class="item.status">{{ item.result }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 md:col-span-5">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h2 class="card-title">
              <i class="fa-duotone fa-gear fa-spin mr-2"></i>
              Gearing Information
            </h2>
            <div class="overflow-x-auto">
              <table class="table table-zebra table-compact w-full">
                <thead>
                  <tr>
                    <th v-for="header in tableHeadersGearing" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableDataGearing" :key="index">
                    <td>{{ item.gear }}</td>
                    <td>{{ item.ratio }}</td>
                    <td>{{ item.maxSpeed }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <div class="divider">Support</div>
          <patreon-card size="large" />
        </div>
      </div>
    </div>

    <div class="mt-6 text-center max-w-3xl mx-auto">
      <p>
        Please note the above figures are <strong>approximate values</strong>. Before purchasing parts and building your
        engine we recommend <strong>doublechecking</strong> your calculations multiple times using more than one source.
        The mathematical equations used in this tool can be found here:
        <a
          href="https://github.com/SomethingNew71/classicminidiy/blob/dev/components/SpeedoDriveCalculator.vue#L512"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-primary"
        >
          Equation Source Code
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  .text-red {
    color: #ff5252;
  }
  .text-green {
    color: #4caf50;
  }
  .text-primary {
    color: #2196f3;
  }
</style>

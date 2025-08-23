<script setup lang="ts">
  import {
    options,
    tableHeaders,
    chartOptions,
    kphFactor,
    type ISpeedometerTableItem,
    type IGearingTableItem,
    type ISpeedometer,
    type TireValue,
  } from '../../../data/models/gearing';

  // Default Values for form elements
  const metric = ref(false);
  const final_drive = ref(3.444);
  const gear_ratios = ref([2.583, 1.644, 1.25, 1.0]);
  const drop_gear = ref(1);
  const speedo_drive = ref(0.3529);
  const max_rpm = ref(6500);
  const tire_type = ref<TireValue>({
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

  // Debounced calculation trigger
  const debouncedUpdate = ref(0);
  let debounceTimer: NodeJS.Timeout | null = null;

  const triggerDebouncedUpdate = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debouncedUpdate.value++;
    }, 150); // 150ms debounce
  };

  // Section for Table Data - these will be computed now
  // Use type assertion to fix TypeScript errors with Vuetify table headers
  const tableHeadersGearing = tableHeaders.tableHeadersGearing as any[];
  const tableHeadersSpeedos = tableHeaders.tableHeadersSpeedos as any[];

  // Memoized chart options - avoiding expensive deep clone
  const mapOptions = computed(() => {
    const options = {
      ...chartOptions,
      yAxis: {
        ...chartOptions.yAxis,
        title: {
          ...chartOptions.yAxis.title,
          text: metric.value ? 'Speed (km/h)' : 'Speed (mph)',
        },
      },
      series: chartData.value,
    };
    return options;
  });

  const YARDS_IN_MILE = 1760;
  const MM_IN_YARD = 914.4;

  // Memoized calculations - only recalculate when inputs change
  const tireCalculations = computed(() => {
    // Watch for debounced updates
    debouncedUpdate.value; // This makes the computed depend on debounced updates

    let diameter: number;
    if (tire_type.value.diameter) {
      diameter = tire_type.value.diameter;
    } else {
      diameter = Math.round(tire_type.value.width * (tire_type.value.profile / 100) * 2 + tire_type.value.size * 25.4);
    }

    const circ = Math.round(3.14159 * diameter);
    const typeCircInMiles = circ / (YARDS_IN_MILE * MM_IN_YARD);
    const tireTurnsPerMile = Math.round(YARDS_IN_MILE / (circ / MM_IN_YARD));

    return {
      width: tire_type.value.width,
      profile: tire_type.value.profile,
      size: tire_type.value.size,
      diameter,
      circ,
      tireTurnsPerMile,
      typeCircInMiles,
    };
  });

  const speedoCalculations = computed(() => {
    const tireCalcs = tireCalculations.value;
    return {
      turnsPerMile: Math.round(tireCalcs.tireTurnsPerMile * final_drive.value * speedo_drive.value),
      engineRevsMile: Math.round(tireCalcs.tireTurnsPerMile * final_drive.value * drop_gear.value),
    };
  });

  const gearingTableData = computed(() => {
    const tireCalcs = tireCalculations.value;
    return gear_ratios.value.map((gear: number, index) => {
      let maxSpeed = 0;
      if (tireCalcs.typeCircInMiles !== null) {
        maxSpeed = Math.round(
          (max_rpm.value / drop_gear.value / gear / final_drive.value) * tireCalcs.typeCircInMiles * 60
        );
      }

      const parsedMaxSpeed = metric.value ? `${Math.round(maxSpeed * kphFactor)}km/h` : `${maxSpeed}mph`;

      return {
        gear: index + 1,
        ratio: gear,
        maxSpeed: parsedMaxSpeed,
      };
    });
  });

  const speedometerTableData = computed(() => {
    const speedometers = metric.value ? speedos.value.metric : speedos.value.imperial;
    const factor = metric.value ? kphFactor : 1;
    const speedoCalcs = speedoCalculations.value;

    return speedometers.map((speedometer: ISpeedometer) => {
      const turnsPer = speedoCalcs.turnsPerMile / factor;
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
  });

  const chartData = computed(() => {
    const tireCalcs = tireCalculations.value;
    const data: Array<{ name: string; data: number[] }> = [];
    const gearNames = ['1st Gear', '2nd Gear', '3rd Gear', '4th Gear'];

    gear_ratios.value.forEach((gear, index) => {
      const speedData: number[] = [];
      for (let rpm = 1000; rpm <= max_rpm.value; rpm += 500) {
        let speed = 0;
        if (tireCalcs.typeCircInMiles !== null) {
          speed = Math.round((rpm / drop_gear.value / gear / final_drive.value) * tireCalcs.typeCircInMiles * 60);
          if (metric.value) {
            speed = Math.round(speed * kphFactor);
          }
        }
        speedData.push(speed);
      }
      data.push({
        name: gearNames[index] || '',
        data: speedData,
      });
    });

    return data;
  });

  // Template-compatible computed properties
  const topSpeed = computed(() => {
    const gearingData = gearingTableData.value;
    return gearingData[3]?.maxSpeed || '---';
  });

  const tireInfo = computed(() => tireCalculations.value);
  const speedoDetails = computed(() => speedoCalculations.value);
  const tableDataGearing = computed(() => gearingTableData.value);
  const tableDataSpeedos = computed(() => speedometerTableData.value);

  // Computed properties for metric conversion of "per Mile" values
  const displayEngineRevs = computed(() => {
    if (!speedoDetails.value.engineRevsMile) return '---';
    const value = metric.value
      ? Math.round(speedoDetails.value.engineRevsMile / kphFactor)
      : speedoDetails.value.engineRevsMile;
    return value.toString();
  });

  const displayGearTurns = computed(() => {
    if (!speedoDetails.value.turnsPerMile) return '---';
    const value = metric.value
      ? Math.round(speedoDetails.value.turnsPerMile / kphFactor)
      : speedoDetails.value.turnsPerMile;
    return value.toString();
  });

  const displayTireTurns = computed(() => {
    if (!tireInfo.value.tireTurnsPerMile) return '---';
    const value = metric.value
      ? Math.round(tireInfo.value.tireTurnsPerMile / kphFactor)
      : tireInfo.value.tireTurnsPerMile;
    return value.toString();
  });

  const distanceUnit = computed(() => (metric.value ? 'Km' : 'Mile'));

  // Update table headers reactively
  watch(
    metric,
    () => {
      tableHeadersGearing[2].label = metric.value ? 'Max Speed (km/h)' : 'Max Speed (mph)';
    },
    { immediate: true }
  );

  // Initialize debounced update on mount
  onMounted(() => {
    nextTick(() => {
      triggerDebouncedUpdate();
    });
  });
</script>

<template>
  <div class="grid grid-cols-1 gap-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="col-span-1 md:col-span-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Imperial or Metric</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="metric" @change="triggerDebouncedUpdate" />
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
            <select class="select select-bordered w-full" v-model="tire_type" @change="triggerDebouncedUpdate">
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
          <select class="select select-bordered w-full" v-model="speedo_drive" @change="triggerDebouncedUpdate">
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
          <select class="select select-bordered w-full" v-model="drop_gear" @change="triggerDebouncedUpdate">
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
          <select class="select select-bordered w-full" v-model="gear_ratios" @change="triggerDebouncedUpdate">
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
          <select class="select select-bordered w-full" v-model="final_drive" @change="triggerDebouncedUpdate">
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
          <select class="select select-bordered w-full" v-model.number="max_rpm" @change="triggerDebouncedUpdate">
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
          <h3 class="text-lg text-white opacity-70">
            <i class="fa-jelly-duo fa-regular fa-arrows-rotate fa-spin text-white"></i> Revolutions per/{{
              distanceUnit
            }}
          </h3>
          <p class="text-3xl text-white font-bold">{{ displayEngineRevs }}</p>
        </div>
      </div>
      <div class="card bg-secondary shadow-sm">
        <div class="card-body text-center">
          <h3 class="text-lg text-white opacity-70">
            <i class="fa-jelly-duo fa-regular fa-arrow-rotate-right fa-spin"></i> Gear Turns per/{{ distanceUnit }}
          </h3>
          <p class="text-3xl text-white font-bold">{{ displayGearTurns }}</p>
        </div>
      </div>
      <div class="card bg-primary shadow-sm">
        <div class="card-body text-center">
          <h3 class="text-lg text-white opacity-70"><i class="fa-jelly-duo fa-regular fa-gauge"></i> Top Speed</h3>
          <p class="text-3xl text-white font-bold">{{ topSpeed || '---' }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70"><i class="fa-jelly-duo fa-regular fa-arrow-down-to-line"></i> Tire Width</h3>
          <p class="text-lg font-bold">{{ tireInfo.width || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70"><i class="fa-jelly fa-regular fa-circle"></i> Tire Profile</h3>
          <p class="text-lg font-bold">{{ tireInfo.profile || '---' }}%</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70"><i class="fa-jelly-duo fa-regular fa-expand"></i> Tire Size</h3>
          <p class="text-lg font-bold">{{ tireInfo.size || '---' }}"</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">
            <i class="fa-jelly-duo fa-regular fa-arrow-right-to-bracket"></i> Tire Diameter
          </h3>
          <p class="text-lg font-bold">{{ tireInfo.diameter || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70"><i class="fa-jelly-duo fa-regular fa-circle"></i> Circumference</h3>
          <p class="text-lg font-bold">{{ tireInfo.circ || '---' }}mm</p>
        </div>
      </div>
      <div class="card bg-base-300 shadow-sm">
        <div class="card-body p-4 text-center">
          <h3 class="text-sm opacity-70">
            <i class="fa-duotone fa-solid fa-tire fa-spin"></i> Tire Turns per/{{ distanceUnit }}
          </h3>
          <p class="text-lg font-bold">{{ displayTireTurns }}</p>
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

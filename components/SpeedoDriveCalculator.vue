<template>
  <div class="columns is-multiline">
    <div class="column is-12 py-4"></div>
    <div class="column is-6">
      <b-field label="Tire Size">
        <b-select
          v-model="tire_type"
          expanded
          icon-pack="fad"
          icon="tire"
          placeholder="Choose your tire size"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in tireOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Final Drive Size(pinion/crownwheel)">
        <b-select
          v-model="final_drive"
          expanded
          icon-pack="fad"
          icon="gear"
          placeholder="Choose your final drive gear size"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in diffOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <b-field label="Speedo Drive Ratio">
        <b-select
          v-model="speedo_drive"
          expanded
          icon-pack="fad"
          icon="percent"
          placeholder="Select the ratio of your current speedo drive"
          @input="calculateRatio()"
        >
          <option
            v-for="option in speedoRatioOptions"
            :key="option.label"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Drop Gear Size">
        <b-select
          v-model="drop_gear"
          expanded
          icon-pack="fad"
          icon="gear"
          placeholder="Select the size of your drop gear"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in dropGearOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <b-field label="Gearbox Gear Ratio">
        <b-select
          v-model="gear_ratios"
          expanded
          icon-pack="fad"
          icon="gear"
          placeholder="Choose ratio of your actual gearsets"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in gearRatioOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Maximum RPM">
        <b-slider
          v-model="max_rpm"
          size="is-medium pl-3 pr-3"
          :min="6000"
          :max="9000"
          :step="500"
          @input="calculateRatio()"
        >
          <b-slider-tick
            v-for="val in [6000, 6500, 7000, 7500, 8000, 8500, 9000]"
            :key="val"
            :value="val"
            >{{ val }}</b-slider-tick
          >
        </b-slider>
      </b-field>
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
            <p class="title">{{ topSpeed || '---' }}mph</p>
          </div>
        </div>
      </nav>
    </div>
    <div class="column is-12">
      <nav class="level pb-5">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Width</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.width || '---' }}mm
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Profile</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.profile || '---' }}in
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Wheel Size</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.size || '---' }}in
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Diameter</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.diameter || '---' }}mm
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Circumfrence</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireInfo.circ || '---' }}mm
            </p>
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
          <b-table :data="tableDataSpeedos">
            <b-table-column
              v-slot="props"
              field="status"
              label=""
              narrowed="false"
            >
              <i class="fas fa-circle pt-1" :class="props.row.status"></i>
            </b-table-column>
            <b-table-column v-slot="props" field="tpm" label="TPM">
              {{ props.row.tpm }}
            </b-table-column>
            <b-table-column
              v-slot="props"
              field="speedometer"
              label="Speedometer"
            >
              {{ props.row.speedometer }}
            </b-table-column>
            <b-table-column v-slot="props" field="result" label="Result">
              {{ props.row.result }}
            </b-table-column>
          </b-table>
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
          <b-table
            :data="tableDataGearing"
            :columns="tableHeadersGearing"
          ></b-table>
        </div>
      </div>
    </div>
    <div class="column is-12">
      <div class="card">
        <highcharts ref="gearSpeedChart" :options="mapOptions"></highcharts>
      </div>
    </div>
    <div class="column is-12">
      <div class="content has-text-centered">
        <p>
          Please note the above figures are <strong>approximate values</strong>.
          Before purchasing parts and building your engine we recommend
          <strong>doublechecking</strong> your calculations multiple times using
          more than one source. The mathematical equations used in this tool can
          be found here:
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
<script>
  export default {
    data() {
      return {
        tireOptions: [
          {
            label: '10 inch',
            options: [
              {
                label: '145/80r10',
                value: {
                  width: 145,
                  profile: 80,
                  size: 10,
                },
              },
              {
                label: '165/70r10',
                value: {
                  width: 165,
                  profile: 70,
                  size: 10,
                },
              },
            ],
          },
          {
            label: '12 inch',
            options: [
              {
                label: '145/70r12',
                value: {
                  width: 145,
                  profile: 70,
                  size: 12,
                },
              },
              {
                label: '145/80r12',
                value: {
                  width: 145,
                  profile: 80,
                  size: 12,
                },
              },
              {
                label: '155/70r12',
                value: {
                  width: 155,
                  profile: 70,
                  size: 12,
                },
              },
              {
                label: '155/80r12',
                value: {
                  width: 155,
                  profile: 80,
                  size: 12,
                },
              },
              {
                label: '160/65r12',
                value: {
                  width: 155,
                  profile: 80,
                  size: 12,
                },
              },
              {
                label: '165/55r12',
                value: {
                  width: 165,
                  profile: 55,
                  size: 12,
                },
              },
              {
                label: '165/60r12',
                value: {
                  width: 165,
                  profile: 60,
                  size: 12,
                },
              },
            ],
          },
          {
            label: '13 inch',
            options: [
              {
                label: '150/65r13',
                value: {
                  width: 150,
                  profile: 65,
                  size: 13,
                },
              },
              {
                label: '160/65r13',
                value: {
                  width: 160,
                  profile: 65,
                  size: 13,
                },
              },
              {
                label: '175/50r13',
                value: {
                  width: 175,
                  profile: 50,
                  size: 13,
                },
              },
              {
                label: '185/55r13',
                value: {
                  width: 185,
                  profile: 55,
                  size: 13,
                },
              },
              {
                label: '185/70r13',
                value: {
                  width: 185,
                  profile: 70,
                  size: 13,
                },
              },
              {
                label: '195/45r13',
                value: {
                  width: 195,
                  profile: 45,
                  size: 13,
                },
              },
              {
                label: '195/50r13',
                value: {
                  width: 195,
                  profile: 50,
                  size: 13,
                },
              },
            ],
          },
        ],
        diffOptions: [
          {
            label: 'Factory Options',
            options: [
              { value: 2.76, label: '2.760:1 21/58 ' },
              { value: 2.95, label: "2.950:1 20/59 ( Metro 1.3 HLE '85 on )" },
              {
                value: 3.105,
                label: "3.105:1 19/59 ( Metro 1.0 HLE and Some 1.3 HLE's )",
              },
              { value: 3.211, label: '3.211:1 19/61 ( MG Metro Turbo )' },
              {
                value: 3.444,
                label: "3.444:1 18/62 ( Most Mini's and post '84 Metro's )",
              },
              {
                value: 3.647,
                label: '3.647:1 17/62 ( Metro City, L and Van ) ',
              },
              {
                value: 3.765,
                label: "3.765:1 17/64 ( MKI Mini, 850's and Vans) ",
              },
              {
                value: 3.939,
                label: '3.939:1 16/63 ( Option on Cooper "S" MKI/II/III )',
              },
            ],
          },
          {
            label: 'Aftermarket Options',
            options: [
              { value: 4.133, label: '4.133:1 15/62' },
              { value: 4.267, label: '4.267:1 15/64' },
              { value: 4.35, label: '4.350:1 15/65' },
            ],
          },
          {
            label: 'Special Options',
            options: [
              { value: 3.667, label: '3.667:1 15/55 ( Straight Cut )' },
              { value: 3.875, label: '3.875:1 16/62 ( Special )' },
              { value: 4.35, label: '4.307:1 13/56 ( Special )' },
              { value: 4.571, label: '4.571:1 14/64 ( Special )' },
            ],
          },
        ],
        speedoRatioOptions: [
          { value: 0.2777, label: '5/18 - 12" Mini / 3.2 diff' },
          { value: 0.2941, label: '5/17 - Metro 1275 / 3.44 diff' },
          { value: 0.375, label: '6/16' },
          { value: 0.3529, label: '6/17 - 10" Mini / 3.44 diff' },
          { value: 0.4667, label: '7/15' },
          { value: 0.4375, label: '7/16 - 12" Mini / 3.105 diff' },
          { value: 0.4117, label: '7/17 - 10" Mini / 2.95 diff' },
        ],
        dropGearOptions: [
          {
            label: 'Standard',
            options: [
              {
                value: 1,
                label: 'Standard 1:1 (29 tooth)',
              },
              {
                value: 0.967,
                label: 'Overdrive 0.9670:1 (30 tooth)',
              },
            ],
          },
          {
            label: 'Aftermarket Helical',
            options: [
              {
                value: 0.9655,
                label: '0.9666:1 (30/29)',
              },
              {
                value: 0.9655,
                label: '0.9655:1 (29/28)',
              },
              {
                value: 0.9333,
                label: '0.9333:1 (30/28)',
              },
            ],
          },
          {
            label: 'Aftermarket Straight Cut',
            options: [
              { value: 0.958, label: '0.9580:1 (24/23)' },
              { value: 1.0416, label: '1.0416:1 (24/25)' },
              { value: 1.0435, label: '1.0435:1 (23/24)' },
              { value: 1.045, label: '1.0450:1 (22/23)' },
              { value: 1.0869, label: '1.0869:1 (23/25)' },
              { value: 1.09, label: '1.0900:1 (22/24)' },
              { value: 1.1364, label: '1.1364:1 (22/25)' },
            ],
          },
        ],
        gearRatioOptions: [
          {
            label: '3 Synchro Gearsets',
            options: [
              {
                value: [3.627, 2.172, 1.412, 1.0],
                label: "MKI Mini Pre '64 (Magic Wand)",
              },
              {
                value: [3.52, 2.21, 1.43, 1.0],
                label: "MKI/II Mini Post '64 (Magic Wand)",
              },
              {
                value: [3.2, 1.916, 1.357, 1.0],
                label: "MkI/II Cooper &amp; MkI/II/III Cooper 'S'",
              },
              {
                value: [2.573, 1.722, 1.255, 1.0],
                label: "MkI/II/III Cooper 'S' (Close Ratio / Straight Cut)",
              },
            ],
          },
          {
            label: '4 Synchro Gearsets',
            options: [
              {
                value: [3.33, 2.094, 1.353, 1.0],
                label: "MkIII Cooper 'S' &amp; 1275 GT (Close Ratio)",
              },
              {
                value: [3.52, 2.21, 1.43, 1.0],
                label: "MKIII/IV Mini &amp; Metro (pre A+ <'84)",
              },
              {
                value: [3.647, 2.185, 1.425, 1.0],
                label: "MKV/VI/VII Mini, ERA Turbo &amp; Metro (A+ >'84)",
              },
              { value: [4.004, 2.307, 1.435, 1.0], label: 'Metro 1.0 HLE' },
            ],
          },
          {
            label: 'Aftermarket SyncroHub Gearsets',
            options: [
              {
                value: [2.583, 1.644, 1.25, 1.0],
                label: 'Minispares Evolution Helical Heavy Duty Kit - C-STN48',
              },
              {
                value: [2.583, 1.711, 1.25, 1.0],
                label:
                  'Minispares (Clubman ratios CR/SC) C-STN39 or TRAN-X (Clubman ratios CR/SC)',
              },
              {
                value: [2.544, 1.731, 1.258, 1.0],
                label:
                  'Minispares (Abingdon ST ratios CR/SC) C-STN77 or GRBMS4014 or TRAN-X (Abingdon ST ratios CR/SC)',
              },
              {
                value: [2.313, 1.567, 1.187, 1.0],
                label: 'Minispares (Metro Challenge CR/SC)',
              },
            ],
          },
          {
            label: 'Aftermarket Dogbox Gearsets',
            options: [
              {
                value: [2.173, 1.493, 1.197, 1.0],
                label: 'KAD 4 speed Dog Kit (2.173:1 1st)',
              },
              {
                value: [2.239, 1.568, 1.244, 1.0],
                label: 'MED 4 speed Dog Kit (2.239:1 1st)',
              },
              {
                value: [2.309, 1.56, 1.197, 1.0],
                label: 'Quaife 4 speed Dog Kit (2.3:1 1st)',
              },
              {
                value: [2.093, 1.493, 1.197, 1.0],
                label: 'Quaife 4 speed Dog Kit (2.1:1 1st)',
              },
              {
                value: [1.692, 1.441, 1.197, 1.0],
                label: 'Quaife/Swiftune 4 speed Dog Kit (US Spec 1.692:1 1st)',
              },
            ],
          },
        ],
        speedoMeterOptions: [
          { tpm: 1440, name: '100mph Smiths' },
          { tpm: 1408, name: "110mph Smiths central ('60s Cooper)" },
          { tpm: 1376, name: '90mph Smiths central (850)' },
          { tpm: 1312, name: "90mph Smiths Early tri'clock" },
          { tpm: 1300, name: 'Late Cooper 110mph Nippon Seiki' },
          { tpm: 1280, name: '120mph Cooper S Smiths central' },
          { tpm: 1280, name: "90mph Smiths central Pre '84" },
          { tpm: 1248, name: '900mph Smiths central' },
          { tpm: 1248, name: '100mph Smiths (Austin 1300GT)' },
          { tpm: 1248, name: '120mph Smiths (1275 GT/25/1100 Special)' },
          { tpm: 1242, name: '90mph Nippon Seike' },
          { tpm: 1216, name: "90mph Smiths post '84" },
          { tpm: 1000, name: "All Metro's and Most modern aftermarket" },
        ],
        // Default Values for form elements _ values are form values
        final_drive: 3.444,
        gear_ratios: [2.583, 1.644, 1.25, 1.0],
        drop_gear: 1,
        speedo_drive: 0.3529,
        max_rpm: 6500,
        tire_type: {
          width: 145,
          profile: 80,
          size: 10,
        },
        // Component variables
        typeCircInMiles: undefined,
        topSpeed: undefined,
        // Object for displaying Tire Facts
        tireInfo: {
          width: undefined,
          profile: undefined,
          size: undefined,
          diameter: undefined,
          circumfrence: undefined,
          tireTurnsPerMile: undefined,
        },
        // Object for displaying Speedo Facts
        speedoDetails: {
          engineRevsMile: undefined,
          turnsPerMile: undefined,
        },
        // Section for Table Data
        tableDataGearing: undefined,
        tableDataSpeedos: undefined,
        tableHeadersGearing: [
          {
            field: 'gear',
            label: 'Gear',
          },
          {
            field: 'ratio',
            label: 'Ratio',
          },
          {
            field: 'maxSpeed',
            label: 'Max Speed (mph)',
            centered: true,
          },
        ],
        tableHeadersSpeedos: [
          {
            field: 'status',
            label: '',
          },
          {
            field: 'speedometer',
            label: 'Speedometer',
          },
          {
            field: 'tpm',
            label: 'TPM',
          },
          {
            field: 'result',
            label: 'Result',
            centered: true,
          },
        ],
        // Section for Chart Data
        chartData: [],
        mapOptions: {
          chart: { zoomType: 'x' },
          title: { text: 'Speed and RPM' },
          exporting: {
            buttons: {
              contextButton: {
                symbol: 'download',
              },
            },
          },
          // subtitle: {
          //   text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>',
          // },
          // This is the data decleration
          series: [],
          plotOptions: {
            series: {
              // label: {
              //   connectorAllowed: false,
              // },
              pointStart: 1000,
              pointInterval: 500,
            },
          },
          yAxis: {
            title: { text: 'Speed (MPH)' },
            labels: {
              enabled: true,
            },
          },
          xAxis: {
            title: { text: 'RPM' },
            labels: {
              enabled: true,
              step: 0.5,
            },
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          tooltip: { headerFormat: 'Speed:<br>', shared: true },
          responsive: {
            rules: [
              {
                condition: { maxWidth: 500 },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                  },
                },
              },
            ],
          },
        },
      };
    },
    created() {
      this.calculateRatio();
    },
    methods: {
      calculateRatio() {
        this.isLoading = true;
        // Assign tire Details and working values
        this.tireInfo.width = this.tire_type.width;
        this.tireInfo.profile = this.tire_type.profile;
        this.tireInfo.size = this.tire_type.size;
        this.tireInfo.diameter = Math.round(
          this.tireInfo.width * (this.tireInfo.profile / 100) * 2 +
            this.tireInfo.size * 25.4
        );
        this.tireInfo.circ = Math.round(3.14159 * this.tireInfo.diameter); // in mm
        this.typeCircInMiles = this.tireInfo.circ / (1760 * 914.4); // in miles

        // calculate tire turns per mile 1760 yards in a mile, 914.4 mm in a yard
        this.tireInfo.tireTurnsPerMile = Math.round(
          1760 / (this.tireInfo.circ / 914.4)
        );

        // calculate tire turns per mile
        this.speedoDetails.turnsPerMile = Math.round(
          this.tireInfo.tireTurnsPerMile * this.final_drive * this.speedo_drive
        );
        // calculate engine revs per mile including drop gear
        this.speedoDetails.engineRevsMile = Math.round(
          this.tireInfo.tireTurnsPerMile * this.final_drive * this.drop_gear
        );

        this.tableDataSpeedos = this.speedoMeterOptions.map((speedometer) => {
          const variation = Math.round(
            (this.speedoDetails.turnsPerMile / speedometer.tpm) *
              100 *
              this.drop_gear
          );
          let result = '';
          let status = '';

          if (variation > 100) {
            status = 'has-text-danger';
            result = `Over ${variation - 100}%`;
          } else if (variation === 100) {
            status = 'has-text-success';
            result = `Read correct!`;
          } else if (variation < 100) {
            status = 'has-text-info';
            result = `Under ${100 - variation}%`;
          }
          return {
            status,
            speedometer: speedometer.name,
            tpm: speedometer.tpm,
            result,
          };
        });

        this.tableDataGearing = this.gear_ratios.map((gear, index) => {
          const maxSpeed = Math.round(
            (this.max_rpm / this.drop_gear / gear / this.final_drive) *
              this.typeCircInMiles *
              60
          );
          if (index === 3) {
            this.topSpeed = maxSpeed;
          }
          return {
            gear: index + 1,
            ratio: gear,
            maxSpeed: `${maxSpeed}mph`,
          };
        });

        this.generateChartData();
      },

      generateChartData() {
        this.chartData = [];
        this.gear_ratios.forEach((gear, index) => {
          const speedData = [];
          let gearName = '';
          for (let rpm = 1000; rpm <= this.max_rpm; rpm = rpm + 500) {
            speedData.push(
              Math.round(
                (rpm / this.drop_gear / gear / this.final_drive) *
                  this.typeCircInMiles *
                  60
              )
            );
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
          this.chartData.push({
            name: gearName,
            data: speedData,
          });
        });
        this.mapOptions.series = this.chartData;
      },
    },
  };
</script>
<style lang="scss">
  .b-slider.is-medium .b-slider-tick-label {
    top: calc(0.625rem * 0.5 + 10px);
  }
</style>

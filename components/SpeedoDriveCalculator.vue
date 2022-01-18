<template>
  <div class="columns is-multiline">
    <div class="column is-12 py-4"></div>
    <div class="column is-6">
      <b-field label="Tire Size">
        <b-select
          v-model="tyre_type"
          expanded
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
          placeholder="Choose your final drive gear size"
          @input="calculateRatio()"
        >
          <option
            v-for="option in diffOptions"
            :key="option.label"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <b-field label="Speedo Drive Ratio">
        <b-select
          v-model="speedo_drive"
          expanded
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
          placeholder="Select the size of your drop gear"
          @input="calculateRatio()"
        >
          <option
            v-for="option in dropGearOptions"
            :key="option.label"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <b-field label="Gearbox Gear Ratio">
        <b-select
          v-model="gear_ratios"
          expanded
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
    <div class="column is-10 is-offset-1">
      <div class="divider">Results</div>
    </div>
    <div class="column is-12">
      <nav class="level pb-5">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Width</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.tireWidth || '---' }}mm
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Profile</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.tireProfile || '---' }}in
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Wheel Size</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.wheelSize || '---' }}in
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tire Diameter</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.tireDiameter || '---' }}mm
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Circumfrence</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.circumfrence || '---' }}mm
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Turns Per Mile</p>
            <p class="subtitle has-text-weight-bold">
              {{ tireDetails.tireTurnsPerMile || '---' }}
            </p>
          </div>
        </div>
      </nav>
    </div>
    <div class="column is-6">
      <nav class="panel">
        <p class="panel-heading">Speedo Details</p>
        <p
          v-for="speedo in speedoDetails.speedos"
          :key="speedo.tpm"
          class="panel-block pt-2 pb-2"
        >
          {{ speedo.desc }}:
          <b :class="speedo.class" class="pl-2">{{ speedo.text || '---' }}</b>
        </p>
      </nav>
    </div>
    <div class="column is-6">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">
            <span class="icon">
              <i class="fa-duotone fa-gear"></i>
            </span>
            <span class="has-text-weight-bold">Gearing Information</span>
          </p>
        </div>
        <div class="card-content">
          <b-table :data="tableData" :columns="tableHeaders"></b-table>
        </div>
      </div>
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
      <div class="card">
        <highcharts ref="gearSpeedChart" :options="mapOptions"></highcharts>
      </div>
    </div>
    <!-- <div class="column is-4">
      <nav class="panel">
        <p class="panel-heading">Gearing</p>
        <a class="panel-block is-active">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          Width: {{ tireDetails.tireWidth || '---' }}
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          Profile: {{ tireDetails.tireProfile || '---' }}
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          Wheel Size: {{ tireDetails.wheelSize || '---' }}
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          Tire Diameter: {{ tireDetails.tirediameter || '---' }}
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-circle" aria-hidden="true"></i>
          </span>
          Circumfrence: {{ tireDetails.circumfrence || '---' }}
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-loading" aria-hidden="true"></i>
          </span>
          Tire Turns per Mile: {{ tireDetails.tireTurnsPerMile || '---' }}
        </a>
      </nav>
    </div> -->
    <div class="column is-8"></div>
    <div class="column is-12 py-4"></div>
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
                  tireWidth: 145,
                  tireProfile: 80,
                  wheelSize: 10,
                },
              },
              {
                label: '165/70r10',
                value: {
                  tireWidth: 165,
                  tireProfile: 70,
                  wheelSize: 10,
                },
              },
            ],
          },
          {
            label: '12 inch',
            options: [
              {
                label: '145/80r12',
                value: {
                  tireWidth: 145,
                  tireProfile: 80,
                  wheelSize: 12,
                },
              },
              {
                label: '155/80r12',
                value: {
                  tireWidth: 155,
                  tireProfile: 80,
                  wheelSize: 12,
                },
              },
              {
                label: '165/60r12',
                value: {
                  tireWidth: 165,
                  tireProfile: 60,
                  wheelSize: 12,
                },
              },
            ],
          },
          {
            label: '13 inch',
            options: [
              {
                label: '175/50r13',
                value: {
                  tireWidth: 175,
                  tireProfile: 50,
                  wheelSize: 13,
                },
              },
            ],
          },
        ],
        diffOptions: [
          { value: 4.333, label: '4.333 (15/65)' },
          { value: 3.938, label: '3.938 (16/63)' },
          {
            value: 3.765,
            label:
              '3.765 (17/64) Austin Seven, Minor, Cooper, Countryman/Trav, Pickup, Mini 850',
          },
          {
            value: 3.647,
            label: "3.647 (17/62) Early 1275 GT's (1969 - 1971)",
          },
          { value: 3.444, label: '3.444 (18/62) Most Minis and Metros' },
          { value: 3.27, label: '3.27 (22/72) Mini Automatic' },
          { value: 3.211, label: '3.211 (19/61) Metro Turbo' },
          {
            value: 3.105,
            label:
              '3.105 (19/59) Mini City / Mayfair with 12" Wheels / Metro HLE',
          },
          {
            value: 2.95,
            label: '2.95 (20/59) Mini City / Mayfair with 10" Wheels',
          },
          { value: 2.76, label: '2.76 (21/58) Twin Point Mini' },
        ],
        speedoRatioOptions: [
          { value: 0.4667, label: '7/15' },
          { value: 0.4375, label: '7/16 for a 12" Mini with 3,105 diff' },
          { value: 0.4117, label: '7/17 for a 10" Mini with 2,95 diff' },
          { value: 0.375, label: '6/16' },
          { value: 0.3529, label: '6/17 for a 10" Mini with 3,44 diff' },
          {
            value: 0.2777,
            label: '5/18 for a 12" Mini (12A engine TBi) with 3,2 diff',
          },
          { value: 0.2941, label: '5/17 for a Metro 1275 with 3,44 diff' },
        ],
        dropGearOptions: [
          {
            label: 'Standard (29 tooth)',
            value: 1,
          },
          {
            label: 'Overdrive (30 tooth)',
            value: 0.967,
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
            label: 'Aftermarket Gearsets',
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
                label: 'Minispares (Metro Challenge CR/SC) nla?',
              },
            ],
          },
        ],
        // Default Values for form elements
        final_drive: 3.444,
        gear_ratios: [2.583, 1.644, 1.25, 1.0],
        drop_gear: 1,
        speedo_drive: 0.3529,
        tyre_type: {
          tireWidth: 145,
          tireProfile: 80,
          wheelSize: 10,
        },
        typeCircInMiles: undefined,
        topSpeed: undefined,
        // Object for displaying Tire Facts
        tireDetails: {
          tireWidth: undefined,
          tireProfile: undefined,
          wheelSize: undefined,
          tireDiameter: undefined,
          circumfrence: undefined,
          tireTurnsPerMile: undefined,
        },
        // Object for displaying Speedo Facts
        speedoDetails: {
          engineRevsMile: undefined,
          turnsPerMile: undefined,
          speedos: [],
        },
        // Section for Table Data
        tableData: undefined,
        tableHeaders: [
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
        // return;
        /* eslint-disable no-unreachable */
        this.isLoading = true;
        // Assign tire Details and working values
        this.tireDetails.tireWidth = this.tyre_type.tireWidth;
        this.tireDetails.tireProfile = this.tyre_type.tireProfile;
        this.tireDetails.wheelSize = this.tyre_type.wheelSize;
        this.tireDetails.tireDiameter = Math.round(
          this.tireDetails.tireWidth *
            (this.tireDetails.tireProfile / 100) *
            2 +
            this.tireDetails.wheelSize * 25.4
        );
        this.tireDetails.circumfrence = Math.round(
          3.14159 * this.tireDetails.tireDiameter
        ); // in mm
        this.typeCircInMiles = this.tireDetails.circumfrence / (1760 * 914.4); // in miles

        // calculate tyre turns per mile 1760 yards in a mile, 914.4 mm in a yard
        this.tireDetails.tireTurnsPerMile = Math.round(
          1760 / (this.tireDetails.circumfrence / 914.4)
        );

        // calculate tyre turns per mile
        this.speedoDetails.turnsPerMile = Math.round(
          this.tireDetails.tireTurnsPerMile *
            this.final_drive *
            this.speedo_drive
        );
        // calculate engine revs per mile including drop gear
        this.speedoDetails.engineRevsMile = Math.round(
          this.tireDetails.tireTurnsPerMile * this.final_drive * this.drop_gear
        );

        this.speedoDetails.speedos = [
          {
            tpm: '1408',
            desc: '1408 TPM Smiths Centre',
            vari: this.calculateVariation(1408),
            text: '',
            class: '',
          },
          {
            tpm: '1300',
            desc: '1300 TPM 110Mph Nippon Seiki',
            vari: this.calculateVariation(1300),
            text: '',
            class: '',
          },
          {
            tpm: '1280',
            desc: '1280 TPM Smiths centre',
            vari: this.calculateVariation(1280),
            text: '',
            class: '',
          },
          {
            tpm: '1248',
            desc: '1248 TPM Smiths centre',
            vari: this.calculateVariation(1248),
            text: '',
            class: '',
          },
          {
            tpm: '1242',
            desc: '1242 TPM 90Mph Nippon Seiki',
            vari: this.calculateVariation(1242),
            text: '',
            class: '',
          },
          {
            tpm: '1216',
            desc: '1216 TPM 90Mph Smiths (clubman)',
            vari: this.calculateVariation(1216),
            text: '',
            class: '',
          },
        ];

        this.speedoDetails.speedos.forEach((speedo) => {
          speedo.text = this.generateSpeedoText(speedo);
        });

        this.tableData = this.gear_ratios.map((gear, index) => {
          const maxSpeed = Math.round(
            (6500 / this.drop_gear / gear / this.final_drive) *
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
      generateSpeedoText(speedo) {
        if (speedo.vari > 100) {
          speedo.class = 'has-text-danger';
          return `read over ${speedo.vari - 100}%`;
        } else if (speedo.vari === 100) {
          speedo.class = 'has-text-success';
          return `will be correct!`;
        } else if (speedo.vari < 100) {
          speedo.class = 'has-text-info';
          return `read under ${100 - speedo.vari}%`;
        }
      },
      calculateVariation(vari) {
        return Math.round(
          (this.speedoDetails.turnsPerMile / vari) * 100 * this.drop_gear
        );
      },
      generateChartData() {
        this.chartData = [];
        this.gear_ratios.forEach((gear, index) => {
          const speedData = [];
          let gearName = '';
          for (let rpm = 1000; rpm <= 6500; rpm = rpm + 500) {
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

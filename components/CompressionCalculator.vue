<template>
  <div class="columns is-multiline">
    <div class="column is-12 py-4"></div>
    <div class="column is-6">
      <o-field label="Piston Size">
        <o-select
          v-model="bore"
          expanded
          placeholder="Select a piston size in mm"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in pistonOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </o-select>
      </o-field>
    </div>
    <div class="column is-6">
      <o-field label="Crankshaft">
        <o-select
          v-model="stroke"
          expanded
          placeholder="Select the stroke of your crankshaft"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in crankshaftOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </o-select>
      </o-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <o-field label="Head Gasket">
        <o-select
          v-model="gasket"
          expanded
          placeholder="Choose your head gasket"
        >
          <option
            v-for="option in headGasketOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </o-select>
      </o-field>
      <o-field v-if="gasket === 'custom'" label="Custom Head Gasket Volume">
        <o-input v-model="customGasket"> </o-input>
      </o-field>
    </div>
    <div class="column is-6">
      <o-field label="Decompression Plate">
        <o-select
          v-model="decomp"
          expanded
          placeholder="Choose your de-comp plate if being used"
          @input="calculateRatio()"
        >
          <optgroup
            v-for="group in decompPlateOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </o-select>
      </o-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-4">
      <o-field :label="`Piston Dish size (cc)`">
        <o-slider
          v-model="pistonDish"
          size="is-medium"
          :min="0"
          :max="20"
        ></o-slider>
      </o-field>
      <o-field message="Please choose a value between 0 and 20">
        <o-input
          v-model="pistonDish"
          placeholder="Piston Dish"
          type="text"
          lazy
        >
        </o-input>
      </o-field>
    </div>
    <div class="column is-4">
      <o-field label="Cylinder Head Chamber Volume (cc)">
        <o-slider
          v-model="headVolume"
          size="is-medium"
          :min="15"
          :max="35"
          :step="0.1"
        ></o-slider>
      </o-field>
      <o-field message="Please type a decimal value between 15 and 35">
        <o-input
          v-model="headVolume"
          placeholder="Head Volume"
          type="text"
          lazy
        >
        </o-input>
      </o-field>
    </div>
    <div class="column is-4">
      <o-field label="Piston Deck Height (thou)">
        <o-slider
          v-model="deckHeight"
          size="is-medium"
          :min="0"
          :max="80"
        ></o-slider>
      </o-field>
      <o-field message="Please choose a value between 0 and 80">
        <o-input
          v-model="deckHeight"
          placeholder="Deck Height"
          type="text"
          lazy
        >
        </o-input>
      </o-field>
    </div>
    <div class="column is-12">
      <a @click="isCardModalActive = true">
        <o-icon pack="fas" :icon="'question'" /> How do I measure these values?
      </a>
    </div>
    <div class="column is-12">
      <h2 class="title is-4">Results:</h2>
    </div>
    <div class="column is-6">
      <div class="card py-5">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Compression Ratio</p>
              <p class="title">
                {{ ratio || '?' }}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="column is-6">
      <div class="card py-5">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Engine Capacity</p>
              <p class="title">
                {{ capacity || '?' }}
              </p>
            </div>
          </div>
        </nav>
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
            href="https://github.com/SomethingNew71/classicminidiy/blob/master/components/CompressionCalculator.vue#L344"
            target="_blank"
            rel="noopener noreferrer"
          >
            Equation Source Code</a
          >
        </p>
        <p>
          Alternate Source:
          <a
            href="https://www.calverst.com/technical-info/compression-ratio-%E2%80%93-working-it-out/"
            target="_blank"
            rel="noopener noreferrer"
            >Calver Compression Ratio</a
          >,
          <a
            href="https://www.jepistons.com/blog/how-to-calculate-engine-compression-ratio-and-displacement"
            target="_blank"
            rel="noopener noreferrer"
            >JE Pistons Compression Ratio</a
          >
        </p>
      </div>
    </div>
    <o-modal v-model:active="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Measuring your chambers and deck</p>
          <div class="card-header-icon">
            <span class="icon">
              <i class="fad fa-ruler-triangle" aria-hidden="true"></i>
            </span>
          </div>
        </header>
        <div class="card-image">
          <figure class="image is-16by9">
            <iframe
              class="has-ratio"
              allowfullscreen
              width="560"
              height="315"
              src="https://www.youtube.com/embed/GxlgkbrfK2Y"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <nuxt-picture
                  format="webp,jpg"
                  src="/img/hre.jpg"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Our Friend Paul Hickey</p>
              <p class="subtitle is-6">
                <a href="https://www.youtube.com/watch?v=GxlgkbrfK2Y"
                  >@hreirl</a
                >
                on Youtube
              </p>
            </div>
          </div>

          <div class="content">
            <p>
              If you need any assistance measuring these values for the
              calculator, check out the video above by Paul Hickey at HRE IRL.
              Where he covers the entire measurement process on the Classic
              Mini.
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="isCardModalActive = false"
            >Close</a
          >
        </footer>
      </div>
    </o-modal>
  </div>
</template>
<script>
  export default defineComponent({
    data() {
      return {
        pistonOptions: [
          {
            label: '850cc',
            options: [
              {
                label: '62.9mm',
                value: 6.29,
              },
            ],
          },
          {
            label: '998/1098cc',
            options: [
              {
                label: 'Stock 64.58mm',
                value: 6.458,
              },
              {
                label: '998/1098 +20 - 65.08mm',
                value: 6.5088,
              },
              {
                label: '998/1098 +40 - 65.59mm',
                value: 6.5596,
              },
              {
                label: '998/1098 +60 - 66.10mm',
                value: 6.6104,
              },
              {
                label: '998/1098 +80 - 66.61mm',
                value: 6.6612,
              },
            ],
          },
          {
            label: '1275cc',
            options: [
              {
                label: 'Stock 70.60mm',
                value: 7.06,
              },
              {
                label: '1275 +20 - 71.10mm',
                value: 7.1108,
              },
              {
                label: '1275 +40 - 71.61mm',
                value: 7.1616,
              },
              {
                label: '1275 +60 - 72.12mm',
                value: 7.2124,
              },
              {
                label: '1275 +80 - 72.62mm',
                value: 7.262,
              },
            ],
          },
          {
            label: '1360cc',
            options: [
              {
                label: '73mm',
                value: 7.3,
              },
            ],
          },
          {
            label: '1380cc',
            options: [
              {
                label: '73.5mm',
                value: 7.35,
              },
            ],
          },
          {
            label: '1400cc',
            options: [
              {
                label: '74mm',
                value: 7.4,
              },
            ],
          },
          {
            label: 'Special - Non-Standard',
            options: [
              {
                label: 'Russel Engineering 72.5mm',
                value: 7.25,
              },
            ],
          },
        ],
        crankshaftOptions: [
          {
            label: 'Standard',
            options: [
              {
                label: '850cc - 68.26mm',
                value: 6.826,
              },
              {
                label: '998cc - 76.2mm',
                value: 7.62,
              },
              {
                label: '1100cc - 83.72mm',
                value: 8.372,
              },
              {
                label: '1275cc - 81.28mm',
                value: 8.128,
              },
            ],
          },
          {
            label: 'Special',
            options: [
              {
                label: 'South African 1275cc - 70.2mm',
                value: '7.02',
              },
            ],
          },
          {
            label: 'Stroked',
            options: [
              {
                label: '61.91mm',
                value: '6.191',
              },
              {
                label: '68.26mm',
                value: '6.826',
              },
              {
                label: '76mm',
                value: '7.6',
              },
              {
                label: '84mm',
                value: '8.4',
              },
              {
                label: '86mm',
                value: '8.6',
              },
            ],
          },
        ],
        headGasketOptions: [
          {
            label: '850 - 2.4cc',
            value: 2.4,
          },
          {
            label: '998 - 2.8cc',
            value: 2.8,
          },
          {
            label: '1275 - 3.4cc',
            value: 3.4,
          },
          {
            label: 'MED Cometic 1275 - 3.01cc',
            value: 3.01,
          },
          {
            label: 'MED Cometic 1380 - 3.15cc',
            value: 3.15,
          },
          {
            label: 'Specialist Components GEG300 - 3.4cc',
            value: 3.4001,
          },
          {
            label: 'Custom Volume',
            value: 'custom',
          },
        ],
        decompPlateOptions: [
          {
            label: 'No Plate',
            options: [
              {
                label: 'None (0cc)',
                value: '0',
              },
            ],
          },
          {
            label: '998cc Plates',
            options: [
              {
                label: '3cc + Extra Head Gasket (5.8cc)',
                value: 5.8,
              },
              {
                label: '6cc + Extra Head Gasket (8.8cc)',
                value: 8.8,
              },
              {
                label: '9cc + Extra Head Gasket (11.8cc)',
                value: 11.8,
              },
            ],
          },
          {
            label: '1275cc Plates',
            options: [
              {
                label: '3cc + Extra Head Gasket (6.4cc)',
                value: 6.4,
              },
              {
                label: '3cc + Extra Head Gasket 9.4cc)',
                value: 9.4,
              },
              {
                label: '3cc + Extra Head Gasket (12.4cc)',
                value: 12.4,
              },
            ],
          },
        ],
        pistonDish: 6.5,
        headVolume: 25.5,
        deckHeight: 20,
        bore: 7.1108,
        stroke: 8.128,
        gasket: 3.4,
        decomp: 0,
        customGasket: 0.1,
        isDisabled: true,
        ratio: null,
        capacity: null,
        isCardModalActive: false,
      };
    },
    created() {
      this.calculateRatio();
    },
    watch: {
      pistonDish() {
        this.calculateRatio();
      },
      deckHeight() {
        this.calculateRatio();
      },
      headVolume() {
        this.calculateRatio();
      },
      customGasket() {
        this.calculateRatio();
      },
      gasket() {
        this.calculateRatio();
      },
    },
    methods: {
      calculateRatio() {
        this.isLoading = true;
        const pi = Math.PI;
        const boreRadius = this.bore / 2;
        const deckHeight = this.deckHeight * 0.0254;
        const deckVolume = boreRadius * boreRadius * (deckHeight / 10) * pi;
        const ringland = this.bore * 0.047619; // Correct for 18cc Accrallite 73.5mm pistons
        let gasketVolume;
        if (this.gasket === 'custom') {
          gasketVolume = this.customGasket;
        } else {
          gasketVolume = this.gasket;
        }
        const vc =
          this.pistonDish +
          +gasketVolume +
          +this.headVolume +
          +deckVolume +
          +ringland +
          +this.decomp;
        const preRoundratio =
          (this.stroke * (boreRadius * boreRadius) * pi + vc) / vc;
        const preRoundcap = this.stroke * (boreRadius * boreRadius) * pi * 4;
        this.ratio = Math.round((preRoundratio + Number.EPSILON) * 100) / 100;
        this.capacity = Math.round((preRoundcap + Number.EPSILON) * 100) / 100;
      },
    },
  });
</script>
<style lang="scss" scoped>
  .card {
    box-shadow: none;
    background-color: #fafafa;
  }
</style>

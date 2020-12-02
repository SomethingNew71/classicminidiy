<template>
  <div class="columns is-multiline">
    <div class="column is-12 card py-5 mb-5">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              Compression Ratio
            </p>
            <p v-if="!isLoading" class="title">
              {{ ratio || '?' }}
            </p>
            <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              Engine Capacity
            </p>
            <p v-if="!isLoading" class="title">
              {{ capacity || '?' }}
            </p>
            <b-skeleton v-if="isLoading" :size="'is-large'" animated></b-skeleton>
          </div>
        </div>
      </nav>
    </div>
    <div class="column is-6">
      <b-field label="Piston Size">
        <b-select v-model="bore" expanded placeholder="Select a piston size in mm">
          <optgroup
            v-for="group in pistonOptions"
            :key="group.label"
            :label="group.label"
          >
            <option v-for="option in group.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Crankshaft">
        <b-select v-model="stroke" expanded placeholder="Select the stroke of your crankshaft">
          <optgroup
            v-for="group in crankshaftOptions"
            :key="group.label"
            :label="group.label"
          >
            <option v-for="option in group.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12"></div>
    <div class="column is-6">
      <b-field label="Head Gasket">
        <b-select v-model="gasket" expanded placeholder="Choose your head gasket">
          <option
            v-for="option in headGasketOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Decompression Plate">
        <b-select v-model="decomp" expanded placeholder="Choose your de-comp plate if being used">
          <optgroup
            v-for="group in decompPlateOptions"
            :key="group.label"
            :label="group.label"
          >
            <option v-for="option in group.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
    </div>
    <div class="column is-12">
      <b-field :label="`Piston Dish size (cc) - ${pistonDish}`">
        <b-slider
          v-model="pistonDish"
          :min="0"
          :max="20"
        ></b-slider>
      </b-field>
      <b-field :label="`Cylinder Head Chamber Volume (cc) - ${headVolume}`">
        <b-slider
          v-model="headVolume"
          :min="15"
          :max="35"
          :step="0.1"
        ></b-slider>
      </b-field>
      <b-field :label="`Piston Deck Height (thou) - ${deckHeight}`">
        <b-slider
          v-model="deckHeight"
          :min="0"
          :max="80"
        ></b-slider>
      </b-field>
    </div>
    <div class="column is-12 has-text-centered">
      <b-button type="is-primary" size="is-large" :loading="isLoading" @click="calculateRatio">
        Calculate your Ratio
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pistonOptions: [
        {
          label: '850cc',
          options: [
            {
              label: '62.9mm',
              value: 6.29
            }

          ]
        },
        {
          label: '998/1098cc',
          options: [
            {
              label: 'Stock 64.58mm',
              value: 6.458
            },
            {
              label: '+20 65.08mm',
              value: 6.5088
            },
            {
              label: '+40 65.59mm',
              value: 6.5596
            },
            {
              label: '+60 66.10mm',
              value: 6.6104
            },
            {
              label: '+80 66.61mm',
              value: 6.6612
            }
          ]
        },
        {
          label: '1275cc',
          options: [
            {
              label: 'Stock 70.60mm',
              value: 7.06
            },
            {
              label: '+20 71.10mm',
              value: 7.1108
            },
            {
              label: '+40 71.61mm',
              value: 7.1616
            },
            {
              label: '+60 72.12mm',
              value: 7.2124
            },
            {
              label: '+80 72.62mm',
              value: 7.262
            }
          ]
        },
        {
          label: '1360cc',
          options: [
            {
              label: '73mm',
              value: 7.3
            }

          ]
        },
        {
          label: '1380cc',
          options: [
            {
              label: '73.5mm',
              value: 7.35
            }

          ]
        },
        {
          label: '1400cc',
          options: [
            {
              label: '74mm',
              value: 7.4
            }

          ]
        }
      ],
      crankshaftOptions: [
        {
          label: 'Standard',
          options: [
            {
              label: '850cc - 68.26mm',
              value: 6.826
            },
            {
              label: '998cc - 76.2mm',
              value: 7.62
            },
            {
              label: '1100cc - 83.72mm',
              value: 8.372
            },
            {
              label: '1275cc - 81.28mm',
              value: 8.128
            }
          ]
        },
        {
          label: 'Special',
          options: [
            {
              label: 'South African 1275cc - 70.2mm',
              value: '7.02'
            }
          ]
        },
        {
          label: 'Stroked',
          options: [
            {
              label: '61.91mm',
              value: '6.191'
            },
            {
              label: '68.26mm',
              value: '6.826'
            },
            {
              label: '76mm',
              value: '7.6'
            },
            {
              label: '84mm',
              value: '8.4'
            },
            {
              label: '86mm',
              value: '8.6'
            }
          ]
        }
      ],
      headGasketOptions: [
        {
          label: '850 - 2.4cc',
          value: 2.4
        },
        {
          label: '998 - 2.8cc',
          value: 2.8
        },
        {
          label: '1275 - 3.4cc',
          value: 3.4
        }
      ],
      decompPlateOptions: [
        {
          label: 'No Plate',
          options: [
            {
              label: 'None (0cc)',
              value: '0'
            }
          ]
        },
        {
          label: '998cc Plates',
          options: [
            {
              label: '3cc + Extra Head Gasket (5.8cc)',
              value: 5.8
            },
            {
              label: '6cc + Extra Head Gasket (8.8cc)',
              value: 8.8
            },
            {
              label: '9cc + Extra Head Gasket (11.8cc)',
              value: 11.8
            }
          ]
        },
        {
          label: '1275cc Plates',
          options: [
            {
              label: '3cc + Extra Head Gasket (6.4cc)',
              value: 6.4
            },
            {
              label: '3cc + Extra Head Gasket 9.4cc)',
              value: 9.4
            },
            {
              label: '3cc + Extra Head Gasket (12.4cc)',
              value: 12.4
            }
          ]
        }
      ],
      pistonDish: 0,
      headVolume: 25.5,
      deckHeight: 20,
      bore: 6.29,
      stroke: 6.826,
      gasket: 2.4,
      decomp: 0,
      ratio: null,
      capacity: null,
      isLoading: false
    };
  },
  methods: {
    calculateRatio () {
      this.isLoading = true;
      const boreRadius = this.bore / 2;
      const deckHeight = this.deckHeight * 0.0254;
      const deckVolume = boreRadius * boreRadius * (deckHeight / 10) * 3.14125;
      const ringland = this.bore * 0.0476190; // Correct for 18cc Accrallite 73.5mm pistons
      const vc = this.pistonDish + +this.gasket + +this.headVolume + +deckVolume + +ringland + +this.decomp;
      const preRoundratio = (this.stroke * (boreRadius * boreRadius) * 3.14125 + vc) / vc;
      const preRoundcap = (this.stroke * (boreRadius * boreRadius) * 3.14125) * 4;

      setTimeout(() => {
        this.ratio = Math.round((preRoundratio + Number.EPSILON) * 100) / 100;
        this.capacity = Math.round((preRoundcap + Number.EPSILON) * 100) / 100;
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
  .card {
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  }
</style>

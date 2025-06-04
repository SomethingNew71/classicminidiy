<script lang="ts" setup>
  import { formOptions } from '~/data/models/compression';
  const reactiveFormOptions = ref(formOptions);

  const rules = ref({
    required: (value: any) => value >= 0 || 'Field is required',
    number: (value: any) => {
      const pattern = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
      return pattern.test(value) || 'Must be a Number';
    },
  });

  // All Form Inputs
  const pistonDish = ref<number>(6.5);
  const headVolume = ref<number>(25.5);
  const deckHeight = ref<number>(20);
  const bore = ref<number>(6.29);
  const stroke = ref<number>(6.826);
  const gasket = ref<number>(2.4);
  const decomp = ref<number>(0);
  const customGasket = ref<number>(0.1);

  const pi = Math.PI;
  const boreRadius = computed(() => bore.value / 2);
  const deck = computed(() => deckHeight.value * 0.0254);
  const deckVolume = computed(() => boreRadius.value * boreRadius.value * (deck.value / 10) * pi);
  const ringland = computed(() => bore.value * 0.047619); // Correct for 18cc Accrallite 73.5mm pistons
  const gasketVolume = computed(() => (gasket.value === 0 ? customGasket.value : gasket.value));

  const vc = computed(
    () => pistonDish.value + gasketVolume.value + headVolume.value + deckVolume.value + ringland.value + decomp.value
  );

  const ratio = computed(() => {
    const preRoundratio = (stroke.value * (boreRadius.value * boreRadius.value) * pi + vc.value) / vc.value;
    return Math.round((preRoundratio + Number.EPSILON) * 100) / 100;
  });

  const capacity = computed(() => {
    const preRoundcap = stroke.value * (boreRadius.value * boreRadius.value) * pi * 4;
    return Math.round((preRoundcap + Number.EPSILON) * 100) / 100;
  });
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-dialog width="800">
        <template v-slot:activator="{ props }">
          <v-btn
            class="has-text-weight-bold mb-5"
            prepend-icon="fad fa-question-circle"
            size="small"
            variant="flat"
            color="brand-green-3"
            v-bind="props"
          >
            How do I measure these values?
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Measuring your chambers and deck">
            <v-card-item>
              <iframe
                class="has-ratio"
                allowfullscreen
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/GxlgkbrfK2Y"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </v-card-item>
            <v-card-text>
              <p class="title is-4">Our Friend Paul Hickey</p>
              <p class="subtitle is-6">
                <a href="https://www.youtube.com/watch?v=GxlgkbrfK2Y">@hreirl</a>
                on Youtube
              </p>
              <p>
                If you need any assistance measuring these values for the calculator, check out the video above by Paul
                Hickey at HRE IRL. Where he covers the entire measurement process on the Classic Mini.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="flat" color="brand-green-3" text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-engine"
        v-model="bore"
        label="Piston Size"
        item-title="label"
        item-value="value"
        :items="reactiveFormOptions.pistonOptions"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props">
            <v-list-item-subtitle class="text-primary font-weight-bold">
              {{ item.raw.subtitle }}
            </v-list-item-subtitle></v-list-item
          >
        </template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-arrows-rotate fa-spin"
        v-model="stroke"
        label="Crankshaft"
        item-title="label"
        item-value="value"
        :items="reactiveFormOptions.crankshaftOptions"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props">
            <v-list-item-subtitle class="text-primary font-weight-bold">
              {{ item.raw.subtitle }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-select>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-head-side-gear"
        v-model="gasket"
        label="Head Gasket"
        item-title="label"
        item-value="value"
        :items="reactiveFormOptions.headGasketOptions"
      >
      </v-select>
      <v-text-field
        :rules="[rules.required, rules.number]"
        class="ml-10"
        label="Custom Gasket Size"
        v-if="gasket === 0"
        v-model.number="customGasket"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-select
        variant="outlined"
        prepend-icon="fad fa-arrow-down-to-line"
        v-model="decomp"
        label="Decompression Plate"
        item-title="label"
        item-value="value"
        :items="reactiveFormOptions.decompPlateOptions"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :subtitle="item.raw.subtitle"></v-list-item>
        </template>
      </v-select>
      <v-input></v-input>
    </v-col>
    <v-col cols="12" md="4">
      <h3>Piston Dish size (cc)</h3>
      <v-slider color="brand-green-3" v-model="pistonDish" :min="0" :max="20" :step="0.1"></v-slider>
      <v-number-input
        :reverse="false"
        controlVariant="split"
        :step="0.1"
        :min="0"
        :max="20"
        :hideInput="false"
        :inset="false"
        v-model="pistonDish"
        :rules="[rules.required]"
        prepend-icon="fas fa-circle-half fa-rotate-270"
        variant="outlined"
      ></v-number-input>
    </v-col>
    <v-col cols="12" md="4">
      <h3>Cylinder Head Chamber Volume (cc)</h3>
      <v-slider color="brand-green-3" v-model="headVolume" :min="15" :max="35" :step="0.1"></v-slider>
      <v-number-input
        :reverse="false"
        controlVariant="split"
        :step="0.1"
        :min="15"
        :max="35"
        :hideInput="false"
        :inset="false"
        v-model="headVolume"
        :rules="[rules.required]"
        prepend-icon="fad fa-arrows-to-dot"
        variant="outlined"
      ></v-number-input>
    </v-col>
    <v-col cols="12" md="4">
      <h3>Piston Deck Height (thou)</h3>
      <v-slider color="brand-green-3" v-model="deckHeight" :min="0" :max="80" :step="1"></v-slider>
      <v-number-input
        :reverse="false"
        controlVariant="split"
        :step="1"
        :min="0"
        :max="80"
        :hideInput="false"
        :inset="false"
        v-model="deckHeight"
        :rules="[rules.required]"
        prepend-icon="fad fa-arrow-up-to-line"
        variant="outlined"
      ></v-number-input>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="py-4"></v-col>
    <v-col cols="12">
      <h2 class="title is-4">Results:</h2>
    </v-col>
    <v-col cols="12" md="6">
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
    </v-col>
    <v-col cols="12" md="6">
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
    </v-col>
    <v-col cols="12">
      <div class="content has-text-centered">
        <p>
          Please note the above figures are <strong>approximate values</strong>. Before purchasing parts and building
          your engine we recommend <strong>doublechecking</strong> your calculations multiple times using more than one
          source. The mathematical equations used in this tool can be found here:
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
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
  .card {
    box-shadow: none;
    background-color: #fafafa;
  }
</style>

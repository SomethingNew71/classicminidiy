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
  const showHelpModal = ref(false);

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
  <div class="grid grid-cols-1 gap-6">
    <div class="col-span-1">
      <button class="btn btn-primary mb-5" @click="showHelpModal = true">
        <i class="fad fa-question-circle mr-2"></i>
        How do I measure these values?
      </button>

      <!-- Help Modal -->
      <dialog :class="{ 'modal modal-open': showHelpModal, modal: !showHelpModal }">
        <div class="modal-box w-11/12 max-w-4xl">
          <div class="card bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Measuring your chambers and deck</h2>
              <div class="aspect-video w-full">
                <iframe
                  class="w-full h-full"
                  allowfullscreen
                  src="https://www.youtube.com/embed/GxlgkbrfK2Y"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div class="mt-4">
                <h3 class="text-xl font-bold">Our Friend Paul Hickey</h3>
                <p class="text-sm opacity-70">
                  <a href="https://www.youtube.com/watch?v=GxlgkbrfK2Y" class="link link-primary">@hreirl</a>
                  on Youtube
                </p>
                <p class="mt-2">
                  If you need any assistance measuring these values for the calculator, check out the video above by
                  Paul Hickey at HRE IRL. Where he covers the entire measurement process on the Classic Mini.
                </p>
              </div>
            </div>
            <div class="card-actions justify-end p-4">
              <button class="btn btn-primary" @click="showHelpModal = false">Close</button>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button @click="showHelpModal = false">close</button>
        </form>
      </dialog>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Piston Size Select -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Piston Size</span>
        </label>
        <div class="input-group">
          <span><i class="fad fa-engine"></i></span>
          <select class="select select-bordered w-full" v-model="bore">
            <option v-for="option in reactiveFormOptions.pistonOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Crankshaft Select -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Crankshaft</span>
        </label>
        <div class="input-group">
          <span><i class="fad fa-arrows-rotate fa-spin"></i></span>
          <select class="select select-bordered w-full" v-model="stroke">
            <option v-for="option in reactiveFormOptions.crankshaftOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Head Gasket Select -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Head Gasket</span>
        </label>
        <div class="input-group">
          <span><i class="fad fa-head-side-gear"></i></span>
          <select class="select select-bordered w-full" v-model.number="gasket">
            <option v-for="option in reactiveFormOptions.headGasketOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div v-if="gasket === 0" class="mt-2">
          <label class="label">
            <span class="label-text">Custom Gasket Size (cc)</span>
          </label>
          <div class="input-group">
            <span><i class="fad fa-ruler"></i></span>
            <input
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              v-model.number="customGasket"
              class="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      <!-- Decompression Plate Select -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Decompression Plate</span>
        </label>
        <div class="input-group">
          <span><i class="fad fa-arrow-down-to-line"></i></span>
          <select class="select select-bordered w-full" v-model="decomp">
            <option v-for="option in reactiveFormOptions.decompPlateOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Piston Dish Size -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Piston Dish size (cc)</span>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="0.1"
          v-model.number="pistonDish"
          class="range range-primary range-xs"
        />
        <div class="input-group mt-2">
          <span><i class="fas fa-circle-half fa-rotate-270"></i></span>
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            v-model.number="pistonDish"
            class="input input-bordered w-full"
          />
        </div>
      </div>

      <!-- Cylinder Head Chamber Volume -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Cylinder Head Chamber Volume (cc)</span>
        </label>
        <input
          type="range"
          min="15"
          max="35"
          step="0.1"
          v-model.number="headVolume"
          class="range range-primary range-xs"
        />
        <div class="input-group mt-2">
          <span><i class="fad fa-arrows-to-dot"></i></span>
          <input
            type="number"
            min="15"
            max="35"
            step="0.1"
            v-model.number="headVolume"
            class="input input-bordered w-full"
          />
        </div>
      </div>

      <!-- Piston Deck Height -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Piston Deck Height (thou)</span>
        </label>
        <input
          type="range"
          min="0"
          max="80"
          step="1"
          v-model.number="deckHeight"
          class="range range-primary range-xs"
        />
        <div class="input-group mt-2">
          <span><i class="fad fa-arrow-up-to-line"></i></span>
          <input
            type="number"
            min="0"
            max="80"
            step="1"
            v-model.number="deckHeight"
            class="input input-bordered w-full"
          />
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Results:</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-lg opacity-70">Compression Ratio</h3>
            <p class="text-3xl font-bold">{{ ratio || '?' }}</p>
          </div>
        </div>
        <div class="card bg-base-200 shadow-sm">
          <div class="card-body text-center">
            <h3 class="text-lg opacity-70">Engine Capacity</h3>
            <p class="text-3xl font-bold">{{ capacity || '?' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="text-center mt-4">
      <div class="max-w-3xl mx-auto">
        <p class="mb-2">
          Please note the above figures are <strong>approximate values</strong>. Before purchasing parts and building
          your engine we recommend <strong>doublechecking</strong> your calculations multiple times using more than one
          source. The mathematical equations used in this tool can be found here:
          <a
            href="https://github.com/SomethingNew71/classicminidiy/blob/master/components/CompressionCalculator.vue#L344"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary"
          >
            Equation Source Code
          </a>
        </p>
        <p>
          Alternate Source:
          <a
            href="https://www.calverst.com/technical-info/compression-ratio-%E2%80%93-working-it-out/"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary"
          >
            Calver Compression Ratio </a
          >,
          <a
            href="https://www.jepistons.com/blog/how-to-calculate-engine-compression-ratio-and-displacement"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary"
          >
            JE Pistons Compression Ratio
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

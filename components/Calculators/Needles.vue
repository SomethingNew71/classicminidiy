<script lang="ts" setup>
  import { chartOptions, type Needle, type NeedleResponse } from '~/data/models/needles';

  // Fetch needles data
  const { data: needles, pending }: any = await useFetch(() => '/api/needles/list');

  // Reactive chart options
  const reactiveChartOptions = ref(chartOptions);
  const allNeedles = ref<NeedleResponse>(needles);
  const selectedNeedles = ref<Needle[]>(needles?.value?.initial ? [...needles.value.initial] : []);
  const alreadyExistsError = ref(false);
  const emptyError = ref(false);
  const addNeedleValue: any = ref();

  // DaisyUI specific reactive properties
  const searchText = ref('');

  // Computed property for filtered needles based on search text
  const filteredNeedles = computed(() => {
    if (!allNeedles.value?.all) return [];
    return allNeedles.value.all.filter((needle: Needle) =>
      needle.name.toLowerCase().includes(searchText.value.toLowerCase())
    );
  });

  function updateArrayItem() {
    reactiveChartOptions.value.series = selectedNeedles.value;
  }

  function addArrayItem() {
    alreadyExistsError.value = selectedNeedles.value.some((obj: Needle) => obj.name === addNeedleValue.value?.name);
    emptyError.value = !addNeedleValue.value;
    if (alreadyExistsError.value) {
      window.setTimeout(() => (alreadyExistsError.value = false), 5000);
    } else if (emptyError.value) {
      window.setTimeout(() => (emptyError.value = false), 5000);
    } else {
      selectedNeedles.value.push(addNeedleValue.value as Needle);
      addNeedleValue.value = null;
      searchText.value = '';
      updateArrayItem();
    }
  }

  function removeArrayItem(currentItem: Needle) {
    // Find the index of the item you want to remove
    const itemIndex = selectedNeedles.value.indexOf(currentItem);
    // Remove the specific needle value which automatically triggers a redraw
    selectedNeedles.value.splice(itemIndex, 1);
    updateArrayItem();
  }

  // Watch for changes in needles data and update selectedNeedles
  watch(needles, (newNeedles) => {
    allNeedles.value = newNeedles;
    selectedNeedles.value = newNeedles?.initial ? [...newNeedles.initial] : [];
    updateArrayItem();
  });
</script>

<template>
  <div class="grid grid-cols-12 gap-3 configurator-component">
    <div class="col-span-12 md:col-span-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="fancy-font-bold text-xl pb-3">Add a Needle To Compare</h3>
          <p class="pb-3">
            Start typing the name of the needles you would like to compare. Unsure of what the graph values mean? Check
            out the needle diagram below to learn more.
          </p>
          <!-- Modal dialog for diagram -->
          <div>
            <button class="btn btn-sm btn-neutral mb-5" onclick="diagram_modal.showModal()">Helpful diagram</button>
            <dialog id="diagram_modal" class="modal">
              <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">Diagram of Needle Measurements</h3>
                <img
                  loading="lazy"
                  class="diagram mx-auto"
                  src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/diagram.jpg"
                  alt="Diagram of Needle Measurements"
                />
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <template v-if="pending">
            <!-- Loading state -->
            <div class="skeleton h-32 w-full"></div>
          </template>
          <template v-else-if="allNeedles && selectedNeedles">
            <!-- Needle selection dropdown -->
            <div class="form-control w-full">
              <select class="select select-bordered w-full" v-model="addNeedleValue">
                <option :value="null" disabled selected>Select a needle</option>
                <option v-for="needle in allNeedles.all" :key="needle.name" :value="needle">
                  {{ needle.name }}
                </option>
              </select>
            </div>

            <!-- Alerts -->
            <div v-if="alreadyExistsError" class="alert alert-info mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Needle already exists in your list</span>
            </div>
            <div v-if="emptyError" class="alert alert-info mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>You must select another needle to add before clicking add.</span>
            </div>

            <!-- Add needle button -->
            <button class="btn btn-primary mt-2" @click="addArrayItem()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Needle
            </button>

            <div class="divider"></div>

            <h3 class="text-lg font-medium">Currently selected Needles</h3>
            <div v-if="selectedNeedles" class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="(needle, index) in selectedNeedles"
                :key="index"
                class="badge badge-lg gap-1"
                :class="{ 'badge-neutral': selectedNeedles.length === 1, 'badge-primary': selectedNeedles.length > 1 }"
              >
                <span>{{ needle.name }}</span>
                <button
                  v-if="selectedNeedles.length > 1"
                  @click="removeArrayItem(selectedNeedles[index])"
                  class="btn btn-xs btn-circle btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-2">
          <ClientOnly fallback-tag="span">
            <highcharts ref="needlesChart" :options="reactiveChartOptions"></highcharts>
            <template #fallback>
              <p class="p-10 text-center text-xl">Chart is loading</p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .diagram {
    max-height: 600px;
    width: auto;
    margin: auto;
    display: inline-block;
  }
</style>

<style lang="scss">
  .highcharts-credits {
    display: none !important;
  }
</style>

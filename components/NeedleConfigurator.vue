<script lang="ts" setup>
  import { chartOptions, type Needle, type NeedleResponse } from '~/data/models/needles';

  // Fetch needles data
  const { data: needles, pending }: any = await useFetch(() => '/api/needles/list');

  // Reactive chart options
  const reactiveChartOptions = ref(chartOptions);
  const allNeedles = ref<NeedleResponse>(needles);
  const selectedNeedles = ref<Needle[]>(needles?.initial ? [...needles.initial] : []);
  const alreadyExistsError = ref(false);
  const emptyError = ref(false);
  const addNeedleValue: any = ref();

  function updateArrayItem() {
    reactiveChartOptions.value.series = selectedNeedles.value;
  }

  function addArrayItem() {
    alreadyExistsError.value = selectedNeedles.value.some((obj: Needle) => obj.name === addNeedleValue.value?.name);
    emptyError.value = !addNeedleValue.value;
    if (alreadyExistsError.value) {
      setTimeout(() => (alreadyExistsError.value = false), 5000);
    } else if (emptyError.value) {
      setTimeout(() => (emptyError.value = false), 5000);
    } else {
      selectedNeedles.value.push(addNeedleValue.value as Needle);
      addNeedleValue.value = null;
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
  <v-row class="configurator-component">
    <v-col cols="12" md="4">
      <div class="card">
        <div class="card-content">
          <h3 class="fancy-font-bold is-size-4 pb-3">Add a Needle To Compare</h3>
          <p class="pb-3">
            Start typing the name of the needles you would like to compate. Unsure of what the graph values mean? Check
            out the needle diagram below to learn more.
          </p>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn class="has-text-weight-bold mb-5" size="small" variant="flat" color="grey" v-bind="props"
                >Helpful diagram</v-btn
              >
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Diagram of Needle Measurements">
                <img
                  loading="lazy"
                  class="diagram"
                  src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/diagram.jpg"
                  alt="Diagram of Needle Measurements"
                />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn variant="flat" color="brand-green-3" text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <template v-if="pending">
            <!-- <v-col cols="12" md="3">
              <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
            </v-col> -->
          </template>
          <template v-else-if="allNeedles && selectedNeedles">
            <v-autocomplete
              v-model="addNeedleValue"
              label="Add a Needle"
              return-object
              :items="allNeedles.all"
              item-title="name"
              item-value="name"
              variant="outlined"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="item.raw.name"> </v-list-item>
              </template>
            </v-autocomplete>

            <v-alert
              v-if="alreadyExistsError"
              icon="fad fa-circle-info"
              color="info "
              variant="tonal"
              class="mb-4"
              text="Needle already exists in your list"
            ></v-alert>
            <v-alert
              v-if="emptyError"
              icon="fad fa-circle-info"
              color="info "
              variant="tonal"
              class="mb-4"
              text="You must select another needle to add before clicking add."
            ></v-alert>

            <v-btn prepend-icon="fa:fad fa-plus" color="brand-green-3" variant="flat" @click="addArrayItem()">
              Add Needle
            </v-btn>
            <v-divider></v-divider>
            <h3 class="text-h6">Currently selected Needles</h3>
            <v-chip-group v-if="selectedNeedles" class="mt-3" column>
              <template v-for="(needle, index) in selectedNeedles" :key="index">
                <v-chip
                  :disabled="selectedNeedles.length === 1"
                  append-icon="fad fa-close"
                  @click="removeArrayItem(selectedNeedles[index])"
                >
                  {{ needle.name }}
                </v-chip>
              </template>
            </v-chip-group>
          </template>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <div class="card">
        <ClientOnly fallback-tag="span">
          <highcharts ref="needlesChart" :options="reactiveChartOptions"></highcharts>
          <template #fallback>
            <p class="pa-10 text-center text-h5">Chart is loading</p>
          </template>
        </ClientOnly>
      </div>
    </v-col>
  </v-row>
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

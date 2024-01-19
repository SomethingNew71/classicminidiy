<script lang="ts" setup>
  import { chartOptions, type Needle } from '~/data/models/needles';
  const { data: needles, pending, error }: any = await useFetch(() => '/api/needles/list');
  const reactiveChartOptions = ref(chartOptions);
  const selectedNeedles = ref([...needles.value.initial]);
  const alreadyExistsError = ref(false);
  const emptyError = ref(false);
  const addNeedleValue: any = ref([]);

  function updateArrayItem() {
    reactiveChartOptions.value.series = selectedNeedles.value;
  }
  function addArrayItem() {
    alreadyExistsError.value = selectedNeedles.value.some((obj) => obj.name === addNeedleValue._rawValue.name);
    emptyError.value = addNeedleValue.value.length === 0;
    if (alreadyExistsError.value) {
      setTimeout(() => (alreadyExistsError.value = false), 5000);
    } else if (emptyError.value) {
      setTimeout(() => (emptyError.value = false), 5000);
    } else {
      selectedNeedles.value.push(addNeedleValue._rawValue);
      addNeedleValue.value = [];
      updateArrayItem();
    }
  }
  function removeArrayItem(currentItem: Needle) {
    // Find the index of the item you wanna remove
    const itemIndex = selectedNeedles.value.indexOf(currentItem);
    // Remove the specific needle value which automatically triggers a redraw
    needles.value.initial.splice(itemIndex, 1);
    selectedNeedles.value.splice(itemIndex, 1);
    updateArrayItem();
  }
</script>

<template>
  <div class="columns is-multiline configurator-component">
    <div class="column is-4 card">
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
              <img loading="lazy" class="diagram" src="/img/diagram.jpg" alt="Diagram of Needle Measurements" />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="flat" color="brandLightGreen" text="Close" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-autocomplete
          v-model="addNeedleValue"
          label="Add a Needle"
          return-object
          :items="needles.all"
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

        <v-btn prepend-icon="fa:fad fa-plus" color="brandLightGreen" variant="flat" @click="addArrayItem()">
          Add Needle
        </v-btn>
        <v-divider></v-divider>
        <h3 class="text-h6">Currently selected Needles</h3>
        <v-chip-group class="mt-3">
          <v-chip
            v-for="(value, needle) in selectedNeedles"
            :key="needle"
            :disabled="selectedNeedles.length === 1"
            append-icon="fad fa-close"
            @click="removeArrayItem(selectedNeedles[needle])"
          >
            {{ value.name }}
          </v-chip>
        </v-chip-group>
      </div>
    </div>
    <div class="column is-8">
      <div class="card">
        <client-only>
          <highcharts ref="needlesChart" :options="reactiveChartOptions"></highcharts>
        </client-only>
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

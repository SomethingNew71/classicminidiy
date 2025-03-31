<script lang="ts" setup>
  import { chassisRanges } from '~/data/models/decoders';
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  import * as _ from 'lodash';
  const reactiveChassisFormOptions = ref(chassisRanges);
  const yearRange: any = ref(reactiveChassisFormOptions.value[0].value);
  const reactiveForm: any = ref({
    options: {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
    },
    numbers: '',
    last: '',
  });

  function resetForm() {
    reactiveForm.value.options = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
    };
    reactiveForm.value.numbers = '';
    reactiveForm.value.last = '';
  }

  useHead({
    title: 'Tech - Mini Chassis Plate Decoder',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          "Decode your Classic Mini's chassis plate to determine the model year, assembly plant, and sequential build number of the car. The chassis plate is also known as the VIN plate, VIN tag, or VIN plate depending on the generation.",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Mini Chassis Plate Decoder',
    ogDescription:
      "Decode your Classic Mini's chassis plate to determine the model year, assembly plant, and sequential build number of the car. The chassis plate is also known as the VIN plate, VIN tag, or VIN plate depending on the generation.",
    ogUrl: 'classicminidiy.com/technical/chassis-decoder',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Chassis Decoder'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Chassis Decoder"></breadcrumb>

        <v-row>
          <v-col cols="12" md="7">
            <h1 class="title">Chassis Plate Decoder</h1>
            <p>
              The chassis plate is a series of numbers and letters that are stamped on a metal plate that is riveted to
              the body of the car. This plate is located in different places across all mini generations and is used to
              identify the model year, assembly plant, and sequential build number of the car. The chassis plate is also
              known as the VIN plate, VIN tag, or VIN plate depending on the generation.
            </p>
          </v-col>
          <v-col cols="12" md="5">
            <NuxtLink :to="'/technical/engine-decoder'" :title="'Link to Engine Plate decoder'">
              <div class="card callout-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png"
                            alt="Image of magnifying glass"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">Trying to decode your engine number?</h2>
                      <p>Click here to identify your engine using our new engine number decoding table.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="decoder-component">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <h3 class="fancy-font-bold is-size-4 pb-3">Select the year range for your car</h3>
            <p class="pb-3">
              <v-select
                variant="outlined"
                v-model="yearRange"
                label="Year Range"
                item-title="title"
                :items="chassisRanges"
                @update:modelValue="resetForm()"
              >
              </v-select>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="text-center">
            <h3 class="fancy-font-bold is-size-4 pb-3">Example Chassis Code</h3>
            <p class="pb-3 text-body-1">
              For the year range selected, here is an example of what a chassis code could look like.
            </p>
            <p class="fancy-font-bold is-size-4 example pt-5 pb-5">
              <span v-for="(item, i) in yearRange.PrimaryExample" class="position" :class="'position-' + i">
                {{ item }}
              </span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Your Chassis Code</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <h3 class="fancy-font-bold is-size-4 pb-3">Build your Chassis Code</h3>
                <p class="pb-3 text-body-1">
                  Choose the options to decode your chassis code.
                  <strong
                    >Please note that some fields will be disabled if those positions do not exist on your model year
                    chassic code.</strong
                  >
                </p>
              </v-col>
            </v-row>
            <v-row class="select-items">
              <template v-for="(item, i) in yearRange.options">
                <v-col cols="12" md="6" v-if="yearRange.options[i] && yearRange.options[i].length > 0">
                  <v-select
                    variant="outlined"
                    v-model="reactiveForm.options[i]"
                    :label="'Position ' + i"
                    item-title="value"
                    item-value="value"
                    :items="yearRange.options[i]"
                  >
                    <template v-slot:prepend="{}">
                      <v-icon
                        hydrate-on-visible
                        icon="fas fa-circle-small"
                        class="position"
                        :class="'position-' + i"
                      ></v-icon>
                    </template>
                  </v-select>
                </v-col>
              </template>
              <v-col cols="12">
                <v-text-field label="Enter your number hash" variant="outlined" v-model="reactiveForm.numbers">
                  <template v-slot:prepend="{}">
                    <v-icon
                      hydrate-on-visible
                      icon="fas fa-circle-small"
                      class="position"
                      :class="'position-numbers'"
                    ></v-icon> </template
                ></v-text-field>
                <h3 v-if="yearRange.last.length < 1" class="fancy-font-bold is-size-6 pb-4">
                  Last position omitted in this year range
                </h3>
                <v-select
                  :disabled="yearRange.last.length < 1"
                  variant="outlined"
                  v-model="reactiveForm.last"
                  label="Last"
                  item-title="value"
                  item-value="value"
                  :items="yearRange.last"
                >
                  <template v-slot:prepend="{}">
                    <v-icon hydrate-on-visible icon="fas fa-circle-small" class="position position-last"></v-icon>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-text>
            <h3 class="text-center fancy-font-bold is-size-4 pb-3">Decoded Chassis Code</h3>
            <p class="text-center fancy-font-bold is-size-4 pt-1 pb-1 decoded-code">
              <span v-for="(item, i) in reactiveForm.options" class="position" :class="'position-' + i">
                <template v-if="yearRange.PrimaryExample[i] !== ''">
                  {{ item !== '' ? item + ' ' : 'X ' }}
                </template>
              </span>
              <span class="position position-numbers">{{ reactiveForm.numbers }}</span>
              <span class="position position-last">{{ reactiveForm.last }}</span>
            </p>
            <v-col cols="12" md="10" offset-md="1">
              <div class="divider">Breakdown</div>
            </v-col>
            <v-list lines="three" item-props class="decoded-code">
              <v-list-item-title v-text="'Primary Positions'"></v-list-item-title>
              <template v-for="(item, i) in reactiveForm.options" :key="i">
                <v-list-item
                  v-if="yearRange.options[i] && yearRange.options[i].length > 0"
                  :subtitle="
                    yearRange.options[i].find((option: any) => option.value === reactiveForm.options[i])?.name || '---'
                  "
                  :title="'Position ' + i + (reactiveForm.options[i] ? ' - ' + reactiveForm.options[i] : '')"
                >
                  <template v-slot:prepend="{}">
                    <v-icon
                      hydrate-on-visible
                      icon="fas fa-circle-small"
                      class="position"
                      :class="'position-' + i"
                    ></v-icon>
                  </template>
                </v-list-item>
              </template>
              <v-list-item-title v-text="'Secondary Positions'"></v-list-item-title>
              <v-list-item :title="reactiveForm.numbers || '---'" :subtitle="'Sequential Build Number'">
                <template v-slot:prepend="{}">
                  <v-icon
                    hydrate-on-visible
                    icon="fas fa-circle-small"
                    class="position"
                    :class="'position-numbers'"
                  ></v-icon>
                </template>
              </v-list-item>
              <v-list-item
                :subtitle="yearRange.last.find((option: any) => option.value === reactiveForm.last)?.name || '---'"
                :title="'Assembly Plant ' + (reactiveForm.last ? ' - ' + reactiveForm.last : '---')"
              >
                <template v-slot:prepend="{}">
                  <v-icon
                    hydrate-on-visible
                    icon="fas fa-circle-small"
                    class="position"
                    :class="'position-last'"
                  ></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Special Notes:</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <h4 class="fancy-font-bold is-size-5 pb-2">Note about Build Number</h4>
            <p class="pb-2">
              The first car at Longbridge was number 101, as was the first at Cowley. From then on, each factory
              continued with their own number sequence regardless of the model; e.g., Saloon, Van, etc. In other words,
              each model did not start at 101 and maintain its own sequence. Saloons and Vans, etc., are mixed in the
              number sequence along with the Cooper and Cooper S models
            </p>
            <h4 class="fancy-font-bold is-size-5 pb-2">Note about Assembly Plant</h4>
            <p>
              This seems to be used inconsistently on English-built cars, and it is understood that the car was built at
              the “normal” factory if the letter is left off; e.g., an Austin, Riley or Wolseley at Longbridge may or
              may not have an "A" after the sequence number. Yes, there were Austin Minis built at the Morris plant in
              Cowley and Morris Minis built at the Austin plant in Longbridge. Note that all English-built Cooper and
              Cooper S models (Austin and Morris) as well as Riley Elf and Wolseley Hornet models were built at the
              Longbridge, Austin plant
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div class="content has-text-centered">
          <p>
            Please note the above details were pulled from <strong>Mini Mania's</strong> technical articles. More
            Details can be found here:
            <a
              href="https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_I__Revised_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chassis Code Technical Articles</a
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .example,
  .select-items,
  .decoded-code {
    .position {
      &.position-1 {
        color: red;
      }
      &.position-2 {
        color: green;
      }
      &.position-3 {
        color: rgb(49, 66, 140);
      }
      &.position-4 {
        color: brown;
      }
      &.position-5 {
        color: orange;
      }
      &.position-6 {
        color: tomato;
      }
      &.position-7 {
        color: royalblue;
      }
      &.position-8 {
        color: teal;
      }
      &.position-9 {
        color: peru;
      }
      &.position-10 {
        color: saddlebrown;
      }
      &.position-11 {
        color: salmon;
      }
      &.position-numbers {
        color: purple;
      }
      &.position-last {
        color: tan;
      }
    }
  }
</style>

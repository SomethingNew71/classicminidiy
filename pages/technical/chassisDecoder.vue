<script lang="ts" setup>
  import { chasisRanges } from '~/data/models/decoders';
  const reactiveChassisFormOptions = ref(chasisRanges);
  const yearRange = ref(reactiveChassisFormOptions.value[0].value);
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

  function selectRange() {
    console.log('Selected range:', yearRange);
  }
</script>

<template>
  <hero :navigation="true" :title="'Chassis Decoder'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb page="Chassis Decoder"></breadcrumb>

        <v-row>
          <v-col cols="12" md="8">
            <h1 class="title">Engine and Chasis Decoders</h1>
            <p>
              Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard
              bore, engine size chart to figure out how big your current engine is, or how big you'd like your next
              build to be!
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <NuxtLink :to="'/technical/compression'" :title="'Link to Compression Calculator'">
              <div class="card callout-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            alt="Image of compression calculator"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">Trying to calculate your compression ratio?</h2>
                      <p>Click here to try out our compression ratio calculator.</p>
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
                :items="chasisRanges"
                @update:modelValue="selectRange()"
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
            <p class="fancy-font-bold is-size-4 example pt-5 pb-5">
              <span v-for="(item, i) in yearRange.PrimaryExample" class="position" :class="'position-' + i">
                {{ item }}
              </span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <h3 class="fancy-font-bold is-size-4 pb-3">Build your Chassis Code</h3>
                <p class="pb-3">
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
                  <!-- <template v-if="yearRange.options[i] && yearRange.options[i].length < 1">
                    <v-select
                      disabled
                      variant="outlined"
                      v-model="reactiveForm.options[i + 1]"
                      :label="'Position ' + (i + 1)"
                      item-title="value"
                      item-value="value"
                      :items="yearRange.options[i]"
                    >
                    </v-select>
                  </template>
                  <template v-else> -->
                  <v-select
                    variant="outlined"
                    v-model="reactiveForm.options[i + 1]"
                    :label="'Position ' + (i + 1)"
                    item-title="value"
                    item-value="value"
                    :items="yearRange.options[i]"
                  >
                    <template v-slot:prepend="{}">
                      <v-icon icon="fas fa-circle-small" class="position" :class="'position-' + (i + 1)"></v-icon>
                    </template>
                  </v-select>
                  <!-- </template> -->
                </v-col>
              </template>
              <v-col cols="12">
                <v-text-field label="Numbers" variant="outlined" v-model="reactiveForm.numbers">
                  <template v-slot:prepend="{}">
                    <v-icon icon="fas fa-circle-small" class="position" :class="'position-numbers'"></v-icon> </template
                ></v-text-field>
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
                    <v-icon icon="fas fa-circle-small" class="position position-last"></v-icon>
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
            <!-- USERS CODE GOES HERE -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .example,
  .select-items {
    .position {
      &.position-1 {
        color: red;
        fill: red;
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
        color: aquamarine;
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

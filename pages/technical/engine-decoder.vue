<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const { data: engineCodes, status } = await useFetch('/api/decoders/engine');
  const engineTableHeaders: any[] = [
    { title: '', key: 'color' },
    { title: 'Code', key: 'code' },
    { title: 'Engine Size', key: 'size' },
    { title: 'Engine Variant', key: 'variant' },
    { title: 'Gearbox Details', key: 'gearbox' },
    { title: 'Details', key: 'description' },
  ];
  const search = ref('');
  useHead({
    title: 'Tech - Mini Engine Plate Decoder',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          "Decode your Classic Mini's Engine plate to determine the engine size and features of your car. This plate is located in the same place across all mini generations and is used to identify the engine size and features.",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Mini Engine Plate Decoder',
    ogDescription:
      "Decode your Classic Mini's Engine plate to determine the engine size and features of your car. This plate is located in the same place across all mini generations and is used to identify the engine size and features.",
    ogUrl: 'classicminidiy.com/technical/chassis-decoder',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Engine Code Decoder'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Engine Sizes"></breadcrumb>

        <v-row>
          <v-col cols="12" md="7">
            <h1 class="title">Engine Plate Decoder</h1>
            <p>
              The engine plate is a series of numbers and letters that are stamped on a metal plate that is riveted to
              the engine near the water pump. This plate is located in the same place across all mini generations and is
              used to identify the engine size and features.
            </p>
            <EnginePlateModal></EnginePlateModal>
          </v-col>
          <v-col cols="12" md="5">
            <NuxtLink :to="'/technical/chassis-decoder'" :title="'Link to Chassis Decoder Tool'">
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
                      <h2 class="subtitle">Need to decode your Chassis Number?</h2>
                      <p>Click here to identify your car using our new chassis number decoding tool.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-col cols="12">
          <i class="fas fa-circle pl-1 color-850"></i> 850cc <i class="fas fa-circle pl-1 color-970"></i> 970cc
          <i class="fas fa-circle pl-1 color-997"></i> 997cc <i class="fas fa-circle pl-1 color-998"></i> 998cc
          <i class="fas fa-circle pl-1 color-1070"></i> 1070cc <i class="fas fa-circle pl-1 color-1100"></i> 1100
          <i class="fas fa-circle pl-1 color-1275"></i> 1275
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-toolbar color="primary">
              <v-icon hydrate-on-visible class="ml-4" icon="fad fa-engine"></v-icon>
              <v-toolbar-title>Engine Codes</v-toolbar-title>
            </v-toolbar>
            <v-toolbar color="primary">
              <v-text-field
                label="Search your engine code"
                v-model="search"
                append-inner-icon="fad fa-search"
                variant="underlined"
                class="pr-4 px-5"
              ></v-text-field>
            </v-toolbar>

            <v-card-text>
              <v-data-table
                :loading="status === 'pending'"
                :items="engineCodes || []"
                density="compact"
                :headers="engineTableHeaders"
                fixed-header
                items-per-page="100"
                :search="search"
              >
                <template v-slot:item.color="{ item }">
                  <p>
                    <i class="fas fa-circle pt-1" :class="'color-' + item.size"></i>
                  </p>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
  .color-850 {
    color: #e24329;
  }
  .color-970 {
    color: #4a7023;
  }
  .color-997 {
    color: #277dc2;
  }
  .color-998 {
    color: #f5c147;
  }
  .color-1070 {
    color: #71784e;
  }
  .color-1100 {
    color: #659cc8;
  }
  .color-1275 {
    color: #c57b57;
  }
</style>

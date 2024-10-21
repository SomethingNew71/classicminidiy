<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { HERO_TYPES } from '~/data/models/generic';
  useHead({
    title: 'Classic Mini ECU Maps',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'After countless hours and time spent porting, converting, and mapping multiple ECUs, I am proud to release my collection of ECU maps with two options for access. Offering support for many popular ECUs used on Classic Minis, with more added in the future. ',
      },
      {
        property: 'og:title',
        content: 'CMDIY - Classic Mini ECU Maps',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Classic Mini ECU Maps',
    ogDescription:
      'After countless hours and time spent porting, converting, and mapping multiple ECUs, I am proud to release my collection of ECU maps with two options for access. Offering support for many popular ECUs used on Classic Minis, with more added in the future. ',
    ogUrl: 'classicminidiy.com/technical',
    ogType: 'website',
  });
  const { data: releases, status: releasesLoading, error: releaseError } = await useFetch('/api/github/releases');
  const { data: commits, status: commitsLoading, error: commitError } = await useFetch('/api/github/commits');
  // const { data: commits, status: commitsLoading } = await useFetch('/api/gitlab/commits');
  // const { data: releases, status: releasesLoading } = await useFetch('/api/gitlab/releases');

  const legend = ref([
    {
      name: 'Included',
      id: 'yes',
      description: 'Included in Map',
    },
    {
      name: 'Not included',
      id: 'no',
      description: 'Supported but not included',
    },
    {
      name: 'Not Available',
      id: 'na',
      description: 'Feature not supported by ECU',
    },
    {
      name: 'Work in progress',
      id: 'wip',
      description: 'Currently still in progress being ported to this ECU',
    },
  ]);
  const items = ref([
    {
      features: 'Ignition Map',
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'yes',
      megaJolt: 'yes',
    },
    {
      features: 'Fuel Map',
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: 'VE Table',
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: 'Target AFR',
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'yes',
      megaJolt: 'yes',
    },
    {
      features: 'Throttle Enrichment',
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: 'Drive by Wire Ready',
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: 'Boost Control Map',
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: 'Idle Map',
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: '16V Engine Version',
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'wip',
      megaJolt: 'wip',
    },
  ]);
</script>

<template>
  <div>
    <hero
      :navigation="true"
      :title="'Classic Mini DIY ECU Maps'"
      :subtitle="'Pay what your want, always'"
      :heroType="HERO_TYPES.MAPS"
      :size="'is-medium'"
    />
    <v-container>
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <h1 class="fancy-font-bold is-size-3 has-text-centered">The Classic Mini ECU Map</h1>
          <h2 class="fancy-font-book-oblique has-text-centered is-size-4">
            Hey folks! Cole here with Classic Mini DIY. After countless hours and time spent porting, converting, and
            mapping multiple ECU's, I am proud to release my collection of ECU maps with two options for access.
            Offering support for many popular ECU's used on Classic Minis, with more added in the future.
          </h2>
        </v-col>
        <v-col cols="12" md="10" offset-md="1" class="pt-10 pb-10">
          <nav class="level">
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-flag-checkered is-size-2 pb-3"></i>
                <h3 class="subtitle">A Safe Start</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-microchip is-size-2 pb-3"></i>
                <h3 class="subtitle">Support for Multiple ECUs</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fa-duotone fa-arrows-rotate fa-spin is-size-2 mb-3"></i>
                <h3 class="subtitle">Lifetime Updates</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-money-bill fa-beat is-size-2 pb-3"></i>
                <h3 class="subtitle">Pay what you want</h3>
              </div>
            </div>
          </nav>
        </v-col>

        <v-col cols="12" md="6" class="has-text-centered">
          <v-card>
            <v-card-text>
              <i class="fad fa-credit-card is-size-2 pb-3"></i>
              <h3 class="fancy-font-bold is-size-3">Option 1 - Purchase</h3>
              <p class="is-size-5 pt-5 pb-8">
                Help support the time and energy that went into creating these by purchasing them directly on my my
                store. All maps are reaosnably priced at <strong>$25</strong> including all future updates.
              </p>
              <h4 v-if="releasesLoading === 'pending'" class="fancy-font-bold is-size-4 pb-4">Loading</h4>
              <h4 v-else-if="releases" class="fancy-font-bold is-size-4 pb-4">
                Latest Releases - {{ releases.latestRelease }}
              </h4>
              <v-btn
                prepend-icon="fad fa-download"
                size="x-large"
                color="primary"
                href="https://store.classicminidiy.com/collections/efi-base-maps"
              >
                Download
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="has-text-centered">
          <v-card class="pb-2">
            <v-card-text>
              <i class="fad fa-download is-size-2 pb-3"></i>
              <h3 class="fancy-font-bold is-size-3">Option 2 - Download</h3>
              <p class="is-size-5 pt-5 pb-5">
                Are you a more of a DIYer? Or perhaps you have a tight budget you are working on? Well no problem
                because all my maps are availble free of charge directly on Github.
              </p>
              <h4 v-if="releasesLoading === 'pending'" class="fancy-font-bold is-size-4 pb-4">Loading</h4>
              <h4 v-else-if="releases" class="fancy-font-bold is-size-4 pb-5">
                Latest Release - {{ releases.latestRelease }}
              </h4>

              <v-btn
                prepend-icon="fab fa-github"
                size="x-large"
                color="secondary"
                href="https://github.com/SomethingNew71/MiniECUMaps"
              >
                View Source
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="10" offset-md="1">
          <div class="divider">More Details</div>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>Features</th>
                    <th class="text-center">Haltech</th>
                    <th class="text-center">Speeduino</th>
                    <th class="text-center">Megasquirt</th>
                    <th class="text-center">Emerald</th>
                    <th class="text-center">ECUMaster</th>
                    <th class="text-center">MaxxECU</th>
                    <th class="text-center">DTAFast</th>
                    <th class="text-center">MegaJolt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in items">
                    <td class="text-center pt-3" v-for="(ecu, index) in row" :key="ecu">
                      <p class="text-left" v-if="index === 'features'">
                        {{ ecu }}
                      </p>

                      <i
                        v-if="ecu === 'wip'"
                        class="text-h6 fa-sharp-duotone fa-solid fa-road-barrier"
                        style="--fa-primary-color: #562b00; --fa-secondary-color: #f5c147; --fa-secondary-opacity: 1"
                      ></i>
                      <i
                        v-if="ecu === 'yes'"
                        class="text-h6 fa-duotone fa-solid fa-octagon-check"
                        style="
                          --fa-primary-color: #71784e;
                          --fa-primary-opacity: 0.1;
                          --fa-secondary-color: #71784e;
                          --fa-secondary-opacity: 1;
                        "
                      ></i>
                      <i v-if="ecu === 'no'" class="text-h6 fa-solid fa-xmark" style="color: #da4d32"></i>
                      <i v-if="ecu === 'na'" class="text-h6 fa-solid fa-dash"></i>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <v-row class="pt-5">
                <v-col v-for="item in legend" cols="12" md="3">
                  <v-list-item :key="item.name" :title="item.name" :subtitle="item.description">
                    <template v-slot:prepend>
                      <i
                        v-if="item.id === 'wip'"
                        class="text-h6 pr-3 fa-sharp-duotone fa-solid fa-road-barrier"
                        style="--fa-primary-color: #562b00; --fa-secondary-color: #f5c147; --fa-secondary-opacity: 1"
                      ></i>
                      <i
                        v-if="item.id === 'yes'"
                        class="text-h6 pr-3 fa-duotone fa-solid fa-octagon-check"
                        style="
                          --fa-primary-color: #71784e;
                          --fa-primary-opacity: 0.1;
                          --fa-secondary-color: #71784e;
                          --fa-secondary-opacity: 1;
                        "
                      ></i>
                      <i v-if="item.id === 'no'" class="text-h6 pr-3 fa-solid fa-xmark" style="color: #da4d32"></i>
                      <i v-if="item.id === 'na'" class="text-h6 pr-3 fa-solid fa-dash"></i>
                    </template>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <nav class="panel is-secondary">
            <h5 class="panel-heading"><i class="fad fa-code-branch" /> Latest Updates</h5>
            <v-progress-circular v-if="commitsLoading === 'pending'"></v-progress-circular>
            <template v-if="commits?.length">
              <template v-for="(commitItem, i) in commits">
                <a class="panel-block has-text-left" :href="commitItem.commit.url" target="_blank" v-if="i < 10">
                  <span class="panel-icon">
                    <i class="fad fa-code-commit" aria-hidden="true"></i>
                  </span>
                  <span class="date pr-2">
                    {{ commitItem.date }}
                  </span>

                  {{ commitItem.commit.message }}
                </a>
              </template>
            </template>
            <template v-else>
              <p class="panel-block has-text-left">
                <span class="panel-icon">
                  <i class="fad fa-code-commit" aria-hidden="true"></i>
                </span>
                <span class="date pr-2"> --- </span>

                Error loading update history from Github
              </p>
              <template v-for="i in 10">
                <p class="panel-block has-text-left" v-if="i < 10">
                  <span class="panel-icon">
                    <i class="fad fa-code-commit" aria-hidden="true"></i>
                  </span>
                  <span class="date pr-2"> --- </span>
                  ---
                </p>
              </template>
            </template>
            <div class="panel-block">
              <v-btn
                prepend-icon="fad fa-code-branch"
                color="grey-darken-3"
                class="mx-auto flex-grow-1"
                href="https://github.com/SomethingNew71/MiniECUMaps"
              >
                View All Commits
              </v-btn>
            </div>
          </nav>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="fancy-font-bold is-size-2 has-text-centered pb-5">Supported ECU's</h3>
          <div class="columns is-multiline">
            <div class="column is-8 is-offset-2">
              <div class="divider">Support for the ecu you need</div>
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/haltech.jpg" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/speeduino.jpg" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/megasquirt.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/emerald.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/megajolt.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/dta.jpg" alt="" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="10" offset-md="1">
          <div class="divider">Other ways to support</div>
        </v-col>
        <v-col cols="12">
          <patreon-card size="large" />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <SpeedInsights />
</template>

<style lang="scss">
  .date {
    min-width: 15%;
    font-weight: bold;
  }

  .fa-code-commit {
    color: #ff9a00;
  }
  .fa-microchip {
    color: #277dc2;
  }
  .fa-arrows-rotate {
    color: #e55f33;
  }
  .fa-money-bill {
    color: #99a078;
  }

  .image img {
    // @media screen and (max-width: 768px) {
    margin: auto;
    width: 50%;
    // }
  }
</style>

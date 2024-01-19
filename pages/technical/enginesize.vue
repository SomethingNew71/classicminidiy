<script lang="ts" setup>
  const { data, pending } = await useFetch('/api/engines');
  const tableHeaders: any[] = [
    { title: 'Size', key: 'color' },
    { title: 'Original Block', key: 'group' },
    { title: 'Engine Size', key: 'engineSize' },
    { title: 'Bore Size', key: 'boreSize' },
    { title: 'Over Bore', key: 'overBore' },
    { title: 'Stroke', key: 'stroke' },
    { title: 'Estimated Power', key: 'power' },
    { title: 'Estimated Torque', key: 'torque' },
  ];

  const grouping = ref([
    {
      key: 'group',
    },
  ]);

  useHead({
    title: 'Tech - Engine Sizes/Displacements',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Engine Sizes/Displacements',
    ogDescription:
      "Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
    ogUrl: 'classicminidiy.com/technical/enginesize',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Engine Sizes'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <breadcrumb page="Engine Sizes"></breadcrumb>

          <div class="columns">
            <div class="column is-8">
              <h1 class="title">Engine Displacement and Sizes</h1>
              <p>
                Determining your next engine size can be quite difficult without a reference. Check out the CMDIY
                standard bore, engine size chart to figure out how big your current engine is, or how big you'd like
                your next build to be!
              </p>
            </div>
            <div class="column is-4">
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
            </div>
          </div>
        </div>
        <v-row v-if="data">
          <v-col cols="12">
            <i class="fas fa-circle pl-1 has-text-success"></i> Standard
            <i class="fas fa-circle pl-1 has-text-primary"></i> Standard Overbore
            <i class="fas fa-circle pl-1 has-text-danger"></i> Different Stroke
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-toolbar>
                <v-icon class="ml-4" icon="fad fa-engine"></v-icon>
                <v-toolbar-title>Engine Variations</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-data-table
                  :loading="pending"
                  :items="data.engines"
                  density="compact"
                  :headers="tableHeaders"
                  fixed-header
                  items-per-page="100"
                >
                  <template v-slot:item.color="{ item }">
                    <p>
                      <i class="fas fa-circle pt-1" :class="item.color"></i>
                    </p>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="card">
              <div class="card-content">
                <patreon-card size="large" />
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .ref-icons {
    font-size: 0.5rem;
    vertical-align: middle;
    padding-bottom: 2px;
    &.mobile-v {
      font-size: 0.75rem;
    }
  }
</style>

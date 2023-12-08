<script lang="ts" setup>
  const { data, pending } = await useFetch('/api/engines');
  import { VSkeletonLoader, VCol, VRow } from 'vuetify/components';

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
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-cogs" aria-hidden="true"></i>
                  </span>
                  <span>Engine Sizes</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

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
        <div class="column is-justify-content-end">
          <i class="fas fa-circle pl-1 has-text-success"></i> Standard
          <i class="fas fa-circle pl-1 has-text-primary"></i> Standard Overbore
          <i class="fas fa-circle pl-1 has-text-danger"></i> Different Stroke
        </div>
        <template v-if="pending">
          <v-row>
            <v-col cols="12">
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-col>
          </v-row>
        </template>
        <div v-if="data" class="column is-12">
          <div class="card">
            <div class="card-content">
              <client-only>
                <o-table
                  :data="data.engines"
                  :hoverable="true"
                  :row-class="(row: any, index: any) => row.group !== '' && 'has-background-light has-text-weight-bold'"
                >
                  <o-table-column v-slot="props" field="group" label="Group" narrowed="false">
                    {{ props.row.group }}
                    <template v-if="props.row.group === ''">
                      <i class="ref-icons mobile-v is-hidden-tablet fas fa-circle pt-1" :class="props.row.color"></i>
                    </template>
                  </o-table-column>
                  <o-table-column v-slot="props" field="engineSize" label="Engine Size">
                    <template v-if="props.row.group === ''">
                      <i class="is-hidden-mobile ref-icons fas fa-circle pl-1" :class="props.row.color"></i>
                    </template>
                    {{ props.row.engineSize }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="overBore" label="Over Bore">
                    {{ props.row.overBore }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="boreSize" label="Bore Size">
                    {{ props.row.boreSize }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="stroke" label="Stroke">
                    {{ props.row.stroke }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="power" label="Power">
                    {{ props.row.power }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="torque" label="Torque">
                    {{ props.row.torque }}
                  </o-table-column>
                </o-table></client-only
              >
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
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

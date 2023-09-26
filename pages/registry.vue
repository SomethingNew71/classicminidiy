<template>
  <div>
    <hero :navigation="true" :title="'Mini Registry'" />
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
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-book" aria-hidden="true"></i>
                  </span>
                  <span>Mini Registry</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="columns">
            <div class="column is-8">
              <h1 class="title">The Classic Mini Registry</h1>
              <p>
                After watching many of the long standing Classic Mini Registry's start to go offline, or no longer get
                maintained. I decided it was time to stand something up I know will be here and maintained for many
                years to come. Classic Mini DIY is proud to now provide a <strong>free</strong> online register for all
                Classic Mini's of all model years and styles.
              </p>
            </div>
            <div class="column is-4">
              <a href="#submitAnchor">
                <div class="card callout-card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <picture>
                            <source
                              srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.webp"
                              type="image/webp"
                            />
                            <source
                              srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                              type="image/png"
                            />
                            <nuxt-img
                              src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                              alt="Image of compression calculator"
                            />
                          </picture>
                        </figure>
                      </div>
                      <div class="media-content">
                        <h2 class="subtitle">Submit Your Mini Today</h2>
                        <p>
                          Click here to fill out our short form to submit your mini to our registry of all classic minis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="card">
            <div class="card-content">
              <client-only>
                <o-table :data="tableData" :hoverable="true" :striped="true">
                  <o-table-column v-slot="props" field="year" label="Year">
                    {{ props.row.year }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="model" label="Model">
                    {{ props.row.model }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="trim" label="Trim">
                    {{ props.row.trim }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="bodyType" label="Body">
                    {{ props.row.bodyType }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="engineSize" label="Engine">
                    {{ props.row.engineSize }}cc
                  </o-table-column>
                  <o-table-column v-slot="props" field="color" label="Color">
                    {{ props.row.color }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="bodyNum" label="Body #">
                    {{ props.row.bodyNum }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="engineNum" label="Engine #">
                    {{ props.row.engineNum }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="buildDate" label="Build Date">
                    <span v-if="typeof props.row.buildDate === 'object'"></span>
                    <span v-else>{{ props.row.buildDate }}</span>
                  </o-table-column>
                  <o-table-column v-slot="props" field="submittedBy" label="Submitted By">
                    {{ props.row.submittedBy }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="notes" label="Notes" class="has-text-centered">
                    <o-tooltip :label="props.row.notes">
                      <o-icon pack="fad" :icon="'circle-info'" />
                    </o-tooltip>
                  </o-table-column>
                </o-table>
              </client-only>
            </div>
          </div>
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider" id="submitAnchor">contribute - Its free!</div>
        </div>
        <div class="column is-8">
          <RegistrySubmission></RegistrySubmission>
        </div>
        <div class="column is-4">
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

<script lang="ts" setup>
  let tableData: any[] = [];

  await useFetch('/api/registry/list').then((response: any) => {
    tableData = response.data._rawValue.Items;
  });

  useHead({
    title: 'The Classic Mini Register',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Complete compendium of all known minis, as submitted by their owners.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'The Classic Mini Register',
    ogDescription: 'Complete compendium of all known minis, as submitted by their owners.',
    ogUrl: 'classicminidiy.com/register',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png',
    ogType: 'website',
  });
</script>

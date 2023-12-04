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
            <header class="card-header">
              <div class="card-header-title">
                <o-field class="mb-4" :position="'left'" label="Search for a mini">
                  <o-input v-model="searchValue" placeholder="Ex. Morris Mini"></o-input>
                  <p class="control">
                    <o-button class="button is-primary search-button" aria-label="Search box for color">
                      <i class="fad fa-search"></i>
                    </o-button>
                  </p>
                </o-field>
              </div>
            </header>
            <div class="card-content">
              <v-data-table
                v-model:expanded="expanded"
                :headers="tableHeaders"
                :items="parsedData"
                :item-value="'uniqueId'"
                show-expand
                expand-on-click
                :search="searchValue"
                items-per-page="50"
              >
                <template v-slot:expanded-row="{ columns, item }">
                  <tr>
                    <td class="has-background-light pt-4 pb-4"></td>
                    <td class="has-background-light pt-4 pb-4" :colspan="2">
                      <strong>Build Date:</strong>
                      <br />
                      {{ item.buildDate || '---' }}
                      <br />
                      <br />
                      <strong>Body #:</strong>
                      <br />
                      {{ item.bodyNum || '---' }}
                      <br />
                      <br />
                      <strong>Engine #:</strong>
                      <br />
                      {{ item.engineNum || '---' }}
                    </td>
                    <td class="has-background-light pt-4 pb-4" :colspan="2">
                      <strong>Submitted by:</strong>
                      <br />
                      {{ item.submittedBy || '---' }}
                      <br />
                      <br />
                      <strong>Notes:</strong>
                      <br />
                      {{ item.notes || '---' }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
              <patreon-card size="small" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { VDataTable } from 'vuetify/components/VDataTable';
  import { DateTime } from 'luxon';
  let tableData: any[] = [];
  let parsedData: any[] = [];
  const tableHeaders: any[] = [
    { title: '', key: 'data-table-expand', align: 'start' },
    { title: 'Year', key: 'year', align: 'start' },
    { title: 'Model', key: 'model', align: 'start' },
    { title: 'Trim', key: 'trim', align: 'start' },
    { title: 'Color', key: 'color', align: 'start' },
  ];

  await useFetch('/api/registry/list').then((response: any) => {
    tableData = response.data._rawValue.Items;
    parsedData = tableData.map((item) => {
      return {
        ...item,
        buildDate:
          typeof item.buildDate !== 'object' ? DateTime.fromISO(item.buildDate).toFormat('LLL dd, yyyy') : '---',
      };
    });
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

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        searchValue: '',
        expanded: [],
      };
    },
  });
</script>

<style lang="scss">
  .v-data-table__td:not(.v-data-table-column--no-padding) {
    padding-top: 12px !important;
  }
</style>

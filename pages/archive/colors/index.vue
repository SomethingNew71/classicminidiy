<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  import type { Color } from '~/data/models/colors';
  import { HERO_TYPES } from '~/data/models/generic';
  let { data: colors, status } = await useFetch<Color[]>(() => `/api/colors/list`);
  const { smAndDown, mdAndUp } = useDisplay();
  const search = ref('');
  const tableHeaders = ref<any[]>([
    {
      title: 'Share',
      key: 'share',
    },
    {
      title: 'Color Name',
      key: 'name',
      sortable: true,

      sort: 'descending',
    },
    {
      title: 'Swatch',
      key: 'imageSwatch',
      sortable: false,
    },
    {
      title: 'Short Code',
      key: 'shortCode',
    },
    {
      title: 'BMC Code',
      key: 'code',
    },
    {
      title: 'Ditzler/PPG Code',
      key: 'ditzlerPpgCode',
    },
    {
      title: 'Dulux Code',
      key: 'duluxCode',
    },
    {
      title: 'Years Used',
      key: 'years',
    },
    {
      title: 'Edit',
      key: 'edit',
      align: 'center',
      sortable: false,
    },
  ]);

  useHead({
    title: 'Archive - Color Picker',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - Color Picker',
    ogDescription:
      'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
    ogUrl: 'classicminidiy.com/archive/colors',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Color Picker'" :heroType="HERO_TYPES.ARCHIVE" />
    <v-container>
      <v-row align="center">
        <v-col cols="8">
          <breadcrumb page="Color Swatches"></breadcrumb>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="8">
          <h2 class="title">Classic Mini Color Picker</h2>
          <p>
            In an effort to make more information availble, Classic Mini DIY has partnered with
            <a href="http://mini-colours.co.uk">mini-colours.co.uk</a> to provide you with a comprehensive list of the
            colors used on the Classic Mini throughout the years.
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card elevation="5">
            <v-card-title class="d-flex align-center pe-2">
              <v-icon hydrate-on-visible icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find your Color
              <v-spacer></v-spacer>
              <v-text-field
                v-if="mdAndUp"
                v-model="search"
                prepend-inner-icon="fad fa-search"
                density="compact"
                placeholder="Search for anything"
                single-line
                flat
                hide-details
                variant="solo-filled"
              ></v-text-field>
            </v-card-title>
            <v-card-text v-if="smAndDown">
              <v-text-field
                v-model="search"
                prepend-inner-icon="fad fa-search"
                density="compact"
                placeholder="Search for anything"
                single-line
                flat
                hide-details
                variant="solo-filled"
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  Use the search above to filter for any field in the table below instantly. Notice some data missing?
                  Click the edit button to contribute!
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-data-table
              :loading="status === 'pending'"
              v-model:search="search"
              :items="colors || []"
              :items-per-page-options="[10, 25]"
              :headers="tableHeaders"
              :item-value="'id'"
              fixed-header
            >
              <template v-slot:item.share="{ item }">
                <v-btn
                  class="text-center"
                  variant="plain"
                  size="large"
                  icon="fad fa-share-from-square"
                  :to="`/archive/colors/${item.id}?name=${item.name}`"
                >
                </v-btn>
              </template>
              <template v-slot:item.name="{ item }">
                <p class="mt-4 text-subtitle-1 text-capitalize">
                  <strong>{{ item.name ? item.name : 'Unknown' }}</strong>
                </p>
              </template>
              <template v-slot:item.imageSwatch="{ item }">
                <picture v-if="item.hasSwatch">
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${item.code}.webp`"
                    type="image/webp"
                  />
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${item.code}.jpg`"
                    type="image/jpg"
                  />
                  <v-img
                    loading="lazy"
                    width="200"
                    alt=""
                    :src="`https://classicminidiy.s3.amazonaws.com/colors/${item.code}.jpg`"
                  />
                </picture>
                <picture v-else class="filler-image">
                  <source srcset="https://classicminidiy.s3.amazonaws.com/misc/noSwatch.jpeg" type="image/jpg" />
                  <v-img
                    loading="lazy"
                    width="200"
                    alt=""
                    src="https://classicminidiy.s3.amazonaws.com/misc/noSwatch.jpeg"
                  />
                </picture>
              </template>
              <template v-slot:item.shortCode="{ item }">
                <p
                  v-if="item.shortCode === 'Unknown' || item.shortCode !== ''"
                  class="mt-4 text-subtitle-2 text-capitalize"
                >
                  <strong>{{ item.shortCode }}</strong>
                </p>
                <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
              </template>
              <template v-slot:item.code="{ item }">
                <p v-if="item.code === 'Unknown' || item.code !== ''" class="mt-4 text-subtitle-2 text-capitalize">
                  <strong>{{ item.code }}</strong>
                </p>
                <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
              </template>
              <template v-slot:item.ditzlerPpgCode="{ item }">
                <p
                  v-if="item.ditzlerPpgCode === 'Unknown' || item.ditzlerPpgCode !== ''"
                  class="mt-4 text-subtitle-2 text-capitalize"
                >
                  <strong>{{ item.ditzlerPpgCode }}</strong>
                </p>
                <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
              </template>
              <template v-slot:item.duluxCode="{ item }">
                <p
                  v-if="item.duluxCode === 'Unknown' || item.duluxCode !== ''"
                  class="mt-4 text-subtitle-2 text-capitalize"
                >
                  <strong>{{ item.duluxCode }}</strong>
                </p>
                <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
              </template>
              <template v-slot:item.years="{ item }">
                <p v-if="item.years === 'Unknown' || item.years !== ''" class="mt-4 text-subtitle-2 text-capitalize">
                  <strong>{{ item.years }}</strong>
                </p>
                <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
              </template>
              <template v-slot:item.edit="{ item }">
                <v-btn
                  class="text-center"
                  variant="plain"
                  size="large"
                  icon="fa-duotone fa-edit"
                  :to="`/archive/colors/contribute?color=${item.id}`"
                >
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

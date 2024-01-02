<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  const { smAndDown, mdAndUp } = useDisplay();
  const search = ref('');
  const tableHeaders: any[] = [
    {
      title: 'Primary Color',
      key: 'primaryColor',
    },
    {
      title: 'Color Name',
      key: 'name',
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
      title: 'edit',
      key: 'Edit',
      align: 'center',
      sortable: false,
    },
  ];
  let { data: colors, pending, error }: any = await useFetch(() => `/api/colors/list`);

  useHead({
    title: 'Tech - Color Picker',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Color Picker',
    ogDescription:
      'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
    ogUrl: 'classicminidiy.com/technical/colors',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Color Picker'" />
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
              <v-icon icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find your Color
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
              :loading="pending"
              v-model:search="search"
              :items="colors"
              :headers="tableHeaders"
              :item-value="'id'"
              fixed-header
            >
              <template v-slot:item.edit="{ item }">
                <v-btn
                  class="text-center"
                  variant="plain"
                  size="large"
                  icon="fa-duotone fa-edit"
                  :to="`/technical/wheels/submit?uuid=${item.id}`"
                >
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

        <!-- <div class="column is-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">Colors</h2>
            </div>
            <div class="card-content">
              <client-only>
                <o-table
                  :data="selectedColors"
                  paginated
                  :per-page="25"
                  v-model:current-page="currentPage"
                  pagination-simple
                  icon-pack="fas"
                  default-sort="name"
                  :sort-icon="'arrow-up'"
                  :sort-icon-size="'small'"
                  :loading="isLoading"
                >
                  <o-table-column v-slot="props" field="name" label="Name" sortable>
                    <strong>{{ props.row.name }}</strong>
                  </o-table-column>
                  <o-table-column v-slot="props" field="hasSwatch" label="Swatch">
                    <picture v-if="props.row.hasSwatch">
                      <source
                        :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${props.row.code}.webp`"
                        type="image/webp"
                      />
                      <source
                        :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${props.row.code}.jpg`"
                        type="image/jpg"
                      />
                      <img
                        loading="lazy"
                        alt=""
                        :src="`https://classicminidiy.s3.amazonaws.com/colors/${props.row.code}.jpg`"
                      />
                    </picture>
                    <picture v-else class="filler-image">
                      <source
                        srcset="https://classicminidiy.s3.amazonaws.com/misc/color-filler.webp"
                        type="image/webp"
                      />
                      <source srcset="https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg" type="image/jpg" />
                      <img loading="lazy" alt="" src="https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg" />
                    </picture>
                  </o-table-column>
                  <o-table-column v-slot="props" field="years" label="Years">
                    {{ props.row.years }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="shortCode" label="Short Code">
                    {{ props.row.shortCode }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="code" label="BMC">
                    {{ props.row.code }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="ditzlerPpgCode" label="PPG">
                    {{ props.row.ditzlerPpgCode }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="duluxCode" label="Dulux">
                    {{ props.row.duluxCode }}
                  </o-table-column>
                  <o-table-column v-slot="props" field="edit" label="Edit">
                    <o-button
                      aria-label="Suggest changes to the details of this color"
                      icon-right="pencil"
                      :icon-pack="'fad'"
                      variant="primary"
                      outlined
                      @click="editColor(props.row)"
                    />
                  </o-table-column>
                </o-table>
              </client-only>
            </div>
          </div>
        </div> -->
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
  .filler-image {
    img,
    source {
      max-height: 114px;
      width: auto;
      filter: grayscale(100%);
    }
  }
  .select {
    width: 100%;
    select {
      width: 100%;
    }
  }
  .notification {
    height: 300px;
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
  .primary-color {
    text-transform: capitalize;

    &.blue {
      color: #3170a2;
    }
    &.black {
      color: #2f2f2f;
    }
    &.beige {
      color: #e1c699;
    }
    &.bronze {
      color: #cd7f32;
    }
    &.brown {
      color: #522b1a;
    }
    &.gold {
      color: #ffd700;
    }
    &.green {
      color: #0d6628;
    }
    &.grey {
      color: #808080;
    }
    &.maroon {
      color: #800000;
    }
    &.orange {
      color: #ffa500;
    }
    &.pink {
      color: #ffc0cb;
    }
    &.purple {
      color: #9f2b68;
    }
    &.red {
      color: #aa4a44;
    }
    &.silver {
      color: #c0c0c0;
    }
    &.turquoise {
      color: #30d5c8;
    }
    &.white {
    }
    &.yellow {
      color: #ffd700;
    }
  }
</style>

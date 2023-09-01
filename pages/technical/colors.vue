<template>
  <div>
    <hero :navigation="true" :title="'Color Picker'" />
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
                    <i class="fad fa-palette" aria-hidden="true"></i>
                  </span>
                  <span>Color Swatches</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <h1 class="title">Classic Mini Color Picker</h1>
          <p>
            In an effort to make more information availble, Classic Mini DIY has partnered with
            <a href="http://mini-colours.co.uk">mini-colours.co.uk</a> to provide you with a comprehensive list of the
            colors used on the Classic Mini throughout the years.
          </p>
          <hr />
          <client-only>
            <o-field class="mb-4" :position="'left'" label="Search for your color below">
              <o-input
                v-model="searchString"
                placeholder="Ex. Willow Green"
                @keyup.enter.native="standardSearch()"
              ></o-input>
              <p class="control">
                <o-button
                  class="button is-primary search-button"
                  aria-label="Search box for color"
                  @click="standardSearch"
                >
                  <i class="fad fa-search"></i>
                </o-button>
              </p>
            </o-field>
          </client-only>
        </div>
        <div class="column is-12">
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
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
  useHead({
    title: 'Technical - Color Picker',
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
    ogTitle: 'Technical - Color Picker',
    ogDescription:
      'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
    ogUrl: 'classicminidiy.com/technical/colors',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
    ogType: 'website',
  });
</script>
<script lang="ts">
  import * as colors from '~/data/colors.json';
  import { Color } from '~/data/models';
  import { useProgrammatic } from '@oruga-ui/oruga-next';
  import ColorEditForm from '~/components/ColorEditForm.vue';
  import Fuse from 'fuse.js';
  const { oruga } = useProgrammatic();

  export default defineComponent({
    data() {
      return {
        colorList: colors.colors as Color[],
        selectedColors: colors.colors as Color[],
        searchString: '',
        isLoading: false,
        noResults: false,
        currentPage: 1,
      };
    },
    methods: {
      editColor(color: Color) {
        oruga.modal.open({
          props: { color },
          component: ColorEditForm,
          trapFocus: true,
          width: '700px',
        });
      },
      searchAll() {
        this.isLoading = true;
        this.searchString = '';
        this.selectedColors = this.colorList;
        setTimeout(() => (this.isLoading = false), 500);
      },

      standardSearch() {
        const currentSearch = this.searchString.toLowerCase();
        if (currentSearch === '') {
          this.searchAll();
        } else {
          this.isLoading = true;
          const keysToSearch = ['name', 'primaryColor', 'code', 'ditzlerPpgCode', 'duluxCode', 'shortCode', 'years'];
          let fuse = new Fuse(this.colorList, {
            keys: keysToSearch,
            threshold: 0.3,
          });
          this.selectedColors = fuse.search(currentSearch).map((result) => result.item);
          setTimeout(() => (this.isLoading = false), 500);
        }
      },
    },
  });
</script>
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

<template>
  <div>
    <hero :navigation="true" />
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
            In an effort to make more information availble, Classic Mini DIY has
            partnered with
            <a href="http://mini-colours.co.uk">mini-colours.co.uk</a> to
            provide you with a comprehensive list of the colors used on the
            Classic Mini throughout the years.
          </p>
          <hr />
        </div>
        <div class="column is-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">Colors</h2>
            </div>
            <div class="card-content">
              <client-only>
                <o-table
                  :data="colors.colors"
                  :hoverable="true"
                  :paginated="true"
                  :per-page="25"
                  :narrowed="true"
                  v-model:current-page="currentPage"
                  :pagination-simple="true"
                  icon-pack="fas"
                  :mobile-cards="false"
                  :striped="true"
                  default-sort="name"
                  :sort-icon="'arrow-up'"
                  :sort-icon-size="'small'"
                >
                  <!-- <o-table-column v-slot="props" field="primaryColor">
                    <i
                      :class="props.row.primaryColor"
                      class="primary-color fas fa-circle fa-xs"
                    ></i>
                  </o-table-column> -->
                  <o-table-column
                    v-slot="props"
                    field="name"
                    label="Name"
                    sortable
                    searchable
                  >
                    <strong>{{ props.row.name }}</strong>
                  </o-table-column>
                  <o-table-column v-slot="props" field="years" label="Years">
                    {{ props.row.years }}
                  </o-table-column>
                  <o-table-column
                    v-slot="props"
                    field="shortCode"
                    label="Short Code"
                  >
                    {{ props.row.shortCode }}
                  </o-table-column>
                  <o-table-column
                    v-slot="props"
                    field="code"
                    label="BMC"
                    searchable
                  >
                    {{ props.row.code }}
                  </o-table-column>
                  <o-table-column
                    v-slot="props"
                    field="ditzlerPpgCode"
                    label="PPG"
                    searchable
                  >
                    {{ props.row.ditzlerPpgCode }}
                  </o-table-column>
                  <o-table-column
                    v-slot="props"
                    field="duluxCode"
                    label="Dulux"
                    searchable
                  >
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
      {
        property: 'og:title',
        content: 'Technical - Color Picker',
      },
      {
        property: 'og:image',
        content:
          'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
      },
    ],
  });
</script>
<script lang="ts">
  import * as colors from '~/data/colors.json';
  import { Color } from '~/data/models';
  import { useProgrammatic } from '@oruga-ui/oruga-next';
  import ColorEditForm from '~/components/ColorEditForm.vue';

  const { oruga } = useProgrammatic();

  export default defineComponent({
    data() {
      return {
        colors: colors.colors as Color[],
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
    },
  });
</script>
<style lang="scss">
  .no-colors {
    img {
      width: 50%;
      margin: auto;
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

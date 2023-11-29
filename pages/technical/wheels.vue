<template>
  <div>
    <hero :navigation="true" :title="'Wheel Dictionary'" />
    <section id="scrollLocation" class="section">
      <div class="columns">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fas fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fas fa-tire" aria-hidden="true" />
                  </span>
                  <span>Wheel Library</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <h2 class="subtitle">
            All data collected and currated by Jan W. from
            <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer">Mini-Forum.de</a>.
          </h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Library comes in. Using the same data from the now retired site,
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can search for the right wheel for your Classic
            Mini Cooper. With <strong>{{ totalAll.amount }} wheels in the library</strong> and growing, we hope you'll
            be able to find exactly the wheel you are looking for.
          </p>

          <!-- <ImageUploader></ImageUploader> -->
        </div>
      </div>
      <v-container>
        <v-row dense>
          <v-col v-for="wheel in wheels[page]" cols="12" md="4" lg="3" xl="2">
            <v-card>
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
              </template>

              <v-img cover height="250" :src="wheel.imagepath"></v-img>

              <v-card-item>
                <v-card-title>{{ wheel.name }}</v-card-title>

                <v-card-subtitle>
                  <span class="me-1">Local Favorite</span>

                  <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <!-- <v-rating
                    :model-value="4.5"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating> -->

                  <!-- <div class="text-grey ms-4">4.5 (413)</div> -->
                </v-row>

                <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

                <div>
                  Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
                </div>
              </v-card-text>

              <v-divider class="mx-4 mb-1"></v-divider>
              <v-expansion-panels>
                <v-expansion-panel
                  title="Title"
                  text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
                >
                </v-expansion-panel>
              </v-expansion-panels>

              <v-divider></v-divider>

              <v-card-actions>
                <!-- <v-btn @click="expand = !expand">
                  {{ !expand ? 'Full Details' : 'Hide Details' }}
                </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-col cols="6">
          <v-pagination v-model="page" :length="wheels?.length" :total-visible="25"></v-pagination>
        </v-col>
        <v-row> </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts" setup>
  let wheels: any[] = [];
  let page = ref(1);
  let expand = ref(false);
  useHead({
    title: 'Tech - Wheel Dictionary',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Wheel Dictionary',
    ogDescription:
      'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
    ogUrl: 'classicminidiy.com/technical/wheels',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
    ogType: 'website',
  });

  await useFetch('/api/wheels/list').then((response: any) => {
    wheels = response.data._rawValue;
  });
</script>

<script lang="ts">
  import { VCard, VCardActions, VCardItem, VCardSubtitle, VCardText, VCardTitle } from 'vuetify/components/VCard';
  import { VCol, VContainer, VRow } from 'vuetify/components/VGrid';
  import { VIcon } from 'vuetify/components/VIcon';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VProgressLinear } from 'vuetify/components/VProgressLinear';
  import { VPagination } from 'vuetify/components/VPagination';
  import {
    VExpansionPanel,
    VExpansionPanelText,
    VExpansionPanelTitle,
    VExpansionPanels,
  } from 'vuetify/components/VExpansionPanel';

  import Fuse from 'fuse.js';
  import { useProgrammatic } from '@oruga-ui/oruga-next';
  import tenInchWheels from '~/data/wheels/10.json';
  import twelveInchWheels from '~/data/wheels/12.json';
  import thirteenInchWheels from '~/data/wheels/13.json';
  // import WheelEditForm from '~/components/WheelEditForm';
  const { oruga } = useProgrammatic();

  export default defineComponent({
    data() {
      return {
        allWheelsVisible: true,
        searchString: '',
        selectedSize: 10,
        selectedWheels: tenInchWheels,
        isLoading: false,
        noResults: false,
        currentPage: 1,
        perPage: 9,
      };
    },
    computed: {
      // Computed value of the total amount of wheels in the selected results.
      totalResults() {
        return this.selectedWheels.length;
      },
      totalAll() {
        return {
          amount: tenInchWheels.length + twelveInchWheels.length + thirteenInchWheels.length,
          induvidualWheels: {
            10: tenInchWheels.length,
            12: twelveInchWheels.length,
            13: thirteenInchWheels.length,
          },
        };
      },
      // Items for the current page you are on.
      paginatedItems() {
        const pageNumber = this.currentPage - 1;
        return this.selectedWheels.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
      },
    },
    watch: {
      // selectedSize() {
      //   if (this.searchString === '') {
      //     this.searchAll();
      //   } else {
      //     this.standardSearch();
      //   }
      // },
    },
    methods: {
      // changePages() {
      //   // Scroll you to the top of the page
      //   document.getElementById('scrollLocation').scrollIntoView();
      //   // Start loading animation
      //   this.isLoading = true;
      //   // Artifically show loading items for 1000ms
      //   setTimeout(() => {
      //     this.isLoading = false;
      //   }, 500);
      // },
      // searchAll() {
      //   this.isLoading = true;
      //   this.allWheelsVisible = true;
      //   document.getElementById('scrollLocation').scrollIntoView();
      //   this.noResults = false;
      //   this.searchString = '';
      //   this.currentPage = 1;
      //   switch (this.selectedSize) {
      //     case 10:
      //       this.selectedWheels = tenInchWheels;
      //       break;
      //     case 12:
      //       this.selectedWheels = twelveInchWheels;
      //       break;
      //     case 13:
      //       this.selectedWheels = thirteenInchWheels;
      //       break;
      //     default:
      //       this.noResults = true;
      //       break;
      //   }
      //   setTimeout(() => {
      //     this.isLoading = false;
      //   }, 500);
      // },
      // standardSearch() {
      //   if (this.searchString === '') {
      //     this.searchAll();
      //   } else {
      //     this.isLoading = true;
      //     this.allWheelsVisible = false;
      //     this.noResults = false;
      //     this.currentPage = 1;
      //     const keysToSearch = ['name', 'notes', 'type', 'size', 'offset'];
      //     let fuse;
      //     switch (this.selectedSize) {
      //       case 10:
      //         fuse = new Fuse(tenInchWheels, { keys: keysToSearch });
      //         break;
      //       case 12:
      //         fuse = new Fuse(twelveInchWheels, { keys: keysToSearch });
      //         break;
      //       case 13:
      //         fuse = new Fuse(thirteenInchWheels, { keys: keysToSearch });
      //         break;
      //       default:
      //         this.noResults = true;
      //         break;
      //     }
      //     this.selectedWheels = fuse.search(this.searchString.toLowerCase()).map((result) => result.item);
      //     this.noResults = this.selectedWheels.length === 0;
      //     setTimeout(() => {
      //       this.isLoading = false;
      //     }, 500);
      //   }
      // },
      // editWheel(wheel) {
      //   oruga.modal.open({
      //     props: { wheel },
      //     component: WheelEditForm,
      //     trapFocus: true,
      //   });
      // },
    },
  });
</script>

<style lang="scss" scoped>
  .fa-expand-arrows-alt {
    color: #ff9a00;
  }
  .fa-box-full {
    color: #522b1a;
  }
  .fa-arrow-alt-from-left {
    color: #0d6628;
  }
  .is-ancestor {
    flex-wrap: wrap;
  }
  .no-results {
    font-size: 1.2rem;
    i {
      font-size: 3.5rem;
    }
  }
  .edit-icon-link {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  .skeleton-image .b-skeleton-item {
    margin: auto;
  }
  .special-notes {
    color: #659cc8;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .search-button {
    border-radius: 0px 4px 4px 0px !important;
  }
  .tooltip-helper {
    transform: rotate(242deg);
  }
  .suggest-changes {
    bottom: 10px;
    position: absolute;
    right: 10px;
  }
  .bottom-details {
    margin-top: auto;
  }
  .b-tooltip.is-primary .tooltip-content {
    background: #ee404f !important;
    &::before {
      border-top-color: #ee404f !important;
    }
  }
</style>

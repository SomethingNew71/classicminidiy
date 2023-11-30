<template>
  <div>
    <hero :navigation="true" :title="'Wheel Dictionary'" />
    <v-container>
      <v-row align="center">
        <v-col cols="8">
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
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
          <h2 class="subtitle">
            All data collected and currated by Jan W. from
            <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer">Mini-Forum.de</a>.
          </h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Library comes in. Using the same data from the now retired site,
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can search for the right wheel for your Classic
            Mini Cooper. With <strong>lots wheels in the library</strong> and growing, we hope you'll be able to find
            exactly the wheel you are looking for.
          </p>
        </v-col>
        <v-col cols="4">
          <NuxtLink :to="'/wheelSubmission'" :title="'Link to new wheel form'">
            <div class="card callout-card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <v-icon icon="fad fa-circle-up" size="large"></v-icon>
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="subtitle">What to add a wheel?</h2>
                    <p>Click here to complete our wheel submission form to get it added to our list.</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-data-iterator :items="wheels" :page="page" :items-per-page="12">
        <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              pack
              icon="fad fa-arrow-left"
              density="comfortable"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>

            <div class="mx-2 text-body-1">Page {{ page }} of {{ pageCount }}</div>

            <v-btn
              :disabled="page >= pageCount"
              icon="fad fa-arrow-right"
              density="comfortable"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
        <template v-slot:default="{ items }">
          <v-row align="center">
            <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" lg="3" xl="2">
              <v-card>
                <template v-if="item.raw?.images?.length >= 1">
                  <v-carousel v-if="item.raw?.images?.length > 1">
                    <template v-for="image in item.raw?.images">
                      <v-carousel-item v-if="!image.inReview" :src="image.src" cover></v-carousel-item>
                    </template>
                  </v-carousel>
                  <v-img
                    v-else-if="item.raw?.images?.length === 1 && !item.raw?.images[0]?.inReview"
                    cover
                    height="250"
                    :src="item.raw?.images[0]?.src"
                  ></v-img>
                </template>
                <template v-else> NO IMAGE FOUND </template>
                <v-card-item>
                  <v-card-title>{{ item.raw?.name }}</v-card-title>

                  <v-card-subtitle>
                    <span class="me-1">{{ item.raw?.type }}</span>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <div class="my-4 text-subtitle-1">
                    <i class="fad fa-arrow-alt-from-left"></i> {{ item.raw.offset ? item.raw.offset : '?' }} •
                    <i class="fad fa-arrow-alt-from-left"></i>
                  </div>
                  <div>
                    Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
                  </div>
                </v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel v-if="item.raw.notes !== ''" title="Notes" :text="item.raw.notes">
                  </v-expansion-panel>
                  <v-expansion-panel v-else title="Notes" text="No additional notes for this wheel">
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              pack
              icon="fad fa-arrow-left"
              density="comfortable"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>

            <div class="mx-2 text-body-1">Page {{ page }} of {{ pageCount }}</div>

            <v-btn
              :disabled="page >= pageCount"
              icon="fad fa-arrow-right"
              density="comfortable"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>
      <!-- <v-row align="center">
        <v-col cols="6">
          <v-pagination v-model="page" :length="wheels.length" :total-visible="5"></v-pagination>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  let wheels: any = [];
  let page = ref(1);
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

  await useFetch('/api/wheels/list')
    .then((response: any) => {
      wheels = response.data._rawValue;
    })
    .catch((error) => console.error(error));
</script>

<script lang="ts">
  import { VCard, VCardItem, VCardSubtitle, VCardText, VCardTitle } from 'vuetify/components/VCard';
  import { VCol, VContainer, VRow } from 'vuetify/components/VGrid';
  import { VIcon } from 'vuetify/components/VIcon';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VProgressLinear } from 'vuetify/components/VProgressLinear';
  import { VDataIterator } from 'vuetify/components/VDataIterator';
  import { VExpansionPanel, VExpansionPanels } from 'vuetify/components/VExpansionPanel';
  import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel';

  // import Fuse from 'fuse.js';

  export default defineComponent({
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {
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

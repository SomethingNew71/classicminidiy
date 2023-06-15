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
            <a
              href="https://www.mini-forum.de/"
              target="_blank"
              rel="noopener noreferrer"
              >Mini-Forum.de</a
            >.
          </h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just
            cant quite find? That's where the Wheel Library comes in. Using the
            same data from the now retired site,
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can
            search for the right wheel for your Classic Mini Cooper. With
            <strong>{{ totalAll.amount }} wheels in the library</strong> and
            growing, we hope you'll be able to find exactly the wheel you are
            looking for.
          </p>

          <div class="columns is-multiline">
            <div class="column is-12"></div>
            <div class="card column is-6">
              <header class="card-header">
                <p class="card-header-title">Find a wheel</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <o-field class="pb-2" label="Wheel Size">
                    <o-select
                      v-model="selectedSize"
                      placeholder="Select a wheel size"
                    >
                      <option :value="10">10 inch</option>
                      <option :value="12">12 inch</option>
                      <option :value="13">13 inch</option>
                    </o-select>
                  </o-field>
                  <p>
                    Use the search below to search by wheel name, offset, size
                    or material.
                  </p>
                  <o-field class="mb-4" :position="'left'">
                    <o-input
                      v-model="searchString"
                      placeholder="Ex. Minilite"
                      @keyup.enter.native="standardSearch()"
                    ></o-input>
                    <p class="control">
                      <o-button
                        class="button is-primary search-button"
                        aria-label="Search box for wheels"
                        @click="standardSearch"
                      >
                        <i class="fad fa-search"></i>
                      </o-button>
                    </p>
                  </o-field>
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <o-button
                    v-if="searchString !== '' && !allWheelsVisible"
                    expanded
                    class="button is-primary"
                    @click="searchAll"
                  >
                    View All {{ selectedSize }}in Wheels
                  </o-button>
                  <o-tooltip
                    v-else
                    :position="'top'"
                    :label="`Already displaying all ${selectedSize} inch wheels`"
                  >
                    <o-button disabled expanded class="button is-primary">
                      View All {{ selectedSize }}in Wheels
                    </o-button>
                  </o-tooltip>
                </div>
              </footer>
            </div>
            <div class="column is-12">
              <div class="columns is-multiline">
                <div class="column is-6">
                  <p
                    v-if="searchString !== '' && !allWheelsVisible"
                    class="has-text-weight-bold"
                  >
                    Displaying
                    <template v-if="!isLoading">
                      {{ totalResults }}
                    </template>
                    <template v-else>
                      <i class="fad fa-spinner fa-spin"></i>
                    </template>
                    filtered results of
                    {{ totalAll.induvidualWheels[selectedSize] }} wheels.
                  </p>
                  <p v-else class="has-text-weight-bold">
                    Displaying all {{ selectedSize }} inch wheels.
                  </p>
                </div>
                <div
                  v-if="selectedWheels && !isLoading && totalResults > perPage"
                  class="column is-6"
                >
                  <o-pagination
                    v-model:current="currentPage"
                    :total="totalResults"
                    :simple="true"
                    :range-before="2"
                    :range-after="2"
                    :order="'is-right'"
                    :per-page="perPage"
                    :icon-pack="'fa'"
                    @change="changePages()"
                  >
                  </o-pagination>
                </div>
              </div>
              <skeleton-loader
                v-if="isLoading && selectedSize !== ''"
                :amount="perPage"
              ></skeleton-loader>
              <div v-if="!isLoading && !noResults" class="columns is-multiline">
                <template v-for="(wheel, index) in paginatedItems" :key="index">
                  <div class="column is-4">
                    <article class="card">
                      <div class="card-image">
                        <o-tooltip
                          label="Suggest changes to the details of this wheel"
                          animated
                          multilined
                          :type="'light'"
                          :position="'left'"
                          class="edit-icon-link"
                        >
                          <o-button
                            aria-label="Suggest changes to the details of this wheel"
                            type="is-primary"
                            icon-right="pencil"
                            :icon-pack="'fad'"
                            @click="editWheel(wheel)"
                          />
                        </o-tooltip>
                        <div class="image is-square">
                          <nuxt-img
                            :src="wheel.imagepath"
                            :alt="`Image of ${wheel.name}`"
                          />
                        </div>
                      </div>
                      <div class="card-content">
                        <div class="media mb-1">
                          <div class="media-content">
                            <o-tooltip
                              label="Wheel Size"
                              animated
                              type="is-dark"
                            >
                              <i class="fad fa-expand-arrows-alt pr-1"></i>
                              {{ wheel.size || 'N/A' }}
                            </o-tooltip>
                            <o-tooltip
                              label="Wheel Offset"
                              animated
                              type="is-dark"
                            >
                              <i
                                class="fad fa-arrow-alt-from-left pr-1 pl-2"
                              ></i>
                              {{ wheel.offset || 'N/A' }}
                            </o-tooltip>
                            <o-tooltip
                              label="Wheel Material"
                              animated
                              type="is-dark"
                            >
                              <i class="fad fa-box-full pr-1 pl-2"></i>
                              {{ wheel.type || 'N/A' }}
                            </o-tooltip>
                            <p
                              class="title is-5 pt-3 pb-1"
                              v-html="wheel.name"
                            ></p>
                          </div>
                        </div>
                        <div v-if="wheel.notes" class="content">
                          <div>
                            <p v-html="wheel.notes"></p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <!--  <div
                    v-if="index === 3 || index === 9 || index === 20"
                    :key="index"
                    class="column is-4"
                  >
                    <article class="card">
                      <div class="card-content">
                        <InFeedAdsense
                          data-ad-layout-key="+2a+rs+2z-6m+25"
                          data-ad-client="ca-pub-0523971861051053"
                          data-ad-slot="4011964258"
                          class="adsbygoogle"
                          style="display: block"
                          data-ad-format="fluid"
                        >
                        </InFeedAdsense>
                      </div>
                    </article>
                  </div> -->
                </template>
              </div>
              <div
                v-if="!isLoading && noResults"
                class="column is-10 is-offset-1 no-results"
              >
                <div class="card">
                  <div class="card-content has-text-centered">
                    <i class="fad fa-sad-tear pb-3"></i>
                    <h3>No Results found for "{{ searchString }}"</h3>
                  </div>
                </div>
              </div>
              <div
                v-if="!isLoading && totalResults > perPage && !noResults"
                class="column is-12"
              >
                <o-pagination
                  v-model:current="currentPage"
                  :total="totalResults"
                  :rangeBefore="2"
                  :rangeAfter="2"
                  :order="'is-centered'"
                  :perPage="perPage"
                  :iconPack="'fad'"
                  @change="changePages()"
                >
                </o-pagination>
              </div>
            </div>
            <div class="column is-12 is-hidden-tablet">
              <div class="column is-10 is-offset-1">
                <div class="divider">Support</div>
              </div>
              <div class="card">
                <div class="card-content">
                  <patreon-card size="large" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js" setup>
  useHead({
    title: 'Technical - Wheel Dictionary',
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
    ogTitle: 'Technical - Wheel Dictionary',
    ogDescription:
      'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
    ogUrl: 'classicminidiy.com/technical/wheels',
    ogImage:
      'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
    ogType: 'website',
  });
</script>

<script lang="js">
  import Fuse from 'fuse.js';
  import { debounce } from 'debounce';
  import { useProgrammatic } from '@oruga-ui/oruga-next';
  import tenInchWheels from '~/data/wheels/10.json';
  import twelveInchWheels from '~/data/wheels/12.json';
  import thirteenInchWheels from '~/data/wheels/13.json';
  import WheelEditForm from '~/components/WheelEditForm';
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
          amount:
            tenInchWheels.length +
            twelveInchWheels.length +
            thirteenInchWheels.length,
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
        return this.selectedWheels.slice(
          pageNumber * this.perPage,
          (pageNumber + 1) * this.perPage
        );
      },
    },
    watch: {
      selectedSize() {
        if (this.searchString === '') {
          this.searchAll();
        } else {
          this.standardSearch();
        }
      },
    },
    created() {
      this.searchAll = debounce(this.searchAll, 500);
      this.standardSearch = debounce(this.standardSearch, 500);
    },
    methods: {
      changePages() {
        // Scroll you to the top of the page
        document.getElementById('scrollLocation').scrollIntoView();
        // Start loading animation
        this.isLoading = true;
        // Artifically show loading items for 1000ms
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },

      searchAll() {
        this.isLoading = true;
        this.allWheelsVisible = true;
        document.getElementById('scrollLocation').scrollIntoView();
        this.noResults = false;
        this.searchString = '';
        this.currentPage = 1;
        switch (this.selectedSize) {
          case 10:
            this.selectedWheels = tenInchWheels;
            break;
          case 12:
            this.selectedWheels = twelveInchWheels;
            break;
          case 13:
            this.selectedWheels = thirteenInchWheels;
            break;
          default:
            this.noResults = true;
            break;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },

      standardSearch() {
        if (this.searchString === '') {
          this.searchAll();
        } else {
          this.isLoading = true;
          this.allWheelsVisible = false;
          this.noResults = false;
          this.currentPage = 1;
          const keysToSearch = ['name', 'notes', 'type', 'size', 'offset'];
          let fuse;
          switch (this.selectedSize) {
            case 10:
              fuse = new Fuse(tenInchWheels, { keys: keysToSearch });
              break;
            case 12:
              fuse = new Fuse(twelveInchWheels, { keys: keysToSearch });
              break;
            case 13:
              fuse = new Fuse(thirteenInchWheels, { keys: keysToSearch });
              break;
            default:
              this.noResults = true;
              break;
          }
          this.selectedWheels = fuse
            .search(this.searchString.toLowerCase())
            .map((result) => result.item);
          this.noResults = this.selectedWheels.length === 0;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      },

      editWheel(wheel) {
        oruga.modal.open({
          props: { wheel },
          component: WheelEditForm,
          trapFocus: true,
        });
      },
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

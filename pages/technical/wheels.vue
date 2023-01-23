<template>
  <section class="section">
    <div class="columns">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fas fa-tire" aria-hidden="true" />
                </span>
                <span>Wheel Library</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 id="scrollLocation" class="title">Wheel Library</h1>
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
          <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can search
          for the right wheel for your Classic Mini Cooper. With
          <strong>{{ totalAll.amount }} wheels in the library</strong> and
          growing, we hope you'll be able to find exactly the wheel you are
          looking for.
        </p>

        <div class="columns is-multiline">
          <div class="column is-12"></div>
          <div class="column is-4-tablet is-3-desktop">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Find a wheel</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <b-field class="pb-2" label="Wheel Size">
                    <b-select
                      v-model="selectedSize"
                      placeholder="Select a wheel size"
                      expanded
                    >
                      <option :value="10">10 inch</option>
                      <option :value="12">12 inch</option>
                      <option :value="13">13 inch</option>
                    </b-select>
                  </b-field>
                  <p>
                    Use the search below to search by wheel name, offset, size
                    or material.
                  </p>
                  <b-field class="mb-4" position="is-left">
                    <b-input
                      v-model="searchString"
                      placeholder="Ex. Minilite"
                      @keyup.enter.native="standardSearch()"
                    ></b-input>
                    <p class="control">
                      <b-button
                        class="button is-primary search-button"
                        aria-label="Search box for wheels"
                        @click="standardSearch"
                      >
                        <i class="fad fa-search"></i>
                      </b-button>
                    </p>
                  </b-field>
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <b-button
                    v-if="searchString !== '' && !allWheelsVisible"
                    expanded
                    class="button is-primary"
                    @click="searchAll"
                  >
                    View All {{ selectedSize }}in Wheels
                  </b-button>
                  <b-tooltip
                    v-else
                    :label="`Already displaying all ${selectedSize} inch wheels`"
                  >
                    <b-button disabled expanded class="button is-primary">
                      View All {{ selectedSize }}in Wheels
                    </b-button>
                  </b-tooltip>
                </div>
              </footer>
            </div>
            <div class="column is-10 is-offset-1 is-hidden-mobile">
              <div class="divider">Support</div>
            </div>
            <div class="card is-hidden-mobile">
              <div class="card-content">
                <patreon-card size="small" />
              </div>
            </div>
          </div>
          <div class="column is-8-tablet is-9-desktop">
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
                <b-pagination
                  v-model="currentPage"
                  :total="totalResults"
                  :simple="true"
                  :range-before="2"
                  :range-after="2"
                  :order="'is-right'"
                  :per-page="perPage"
                  :icon-pack="'fa'"
                  aria-next-label="Next page"
                  aria-previous-label="Previous page"
                  aria-page-label="Page"
                  aria-current-label="Current page"
                  @change="changePages()"
                >
                </b-pagination>
              </div>
            </div>
            <skeleton-loader
              v-if="isLoading && selectedSize !== ''"
              :amount="perPage"
            ></skeleton-loader>
            <div v-if="!isLoading && !noResults" class="columns is-multiline">
              <template v-for="(wheel, index) in paginatedItems">
                <div :key="index" class="column is-4">
                  <article class="card">
                    <div class="card-image">
                      <b-tooltip
                        label="Suggest changes to the details of this wheel"
                        animated
                        multilined
                        type="is-light"
                        position="is-left"
                        class="edit-icon-link"
                      >
                        <b-button
                          aria-label="Suggest changes to the details of this wheel"
                          type="is-primary"
                          icon-right="pencil"
                          :icon-pack="'fad'"
                          @click="editWheel(wheel)"
                        />
                      </b-tooltip>
                      <figure class="image is-square">
                        <img
                          :src="wheel.imagewebp"
                          :webp-fallback="wheel.imagepath"
                          :alt="`Image of ${wheel.name}`"
                        />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media mb-1">
                        <div class="media-content">
                          <b-tooltip label="Wheel Size" animated type="is-dark">
                            <i class="fad fa-expand-arrows-alt pr-1"></i>
                            {{ wheel.size || 'N/A' }}
                          </b-tooltip>
                          <b-tooltip
                            label="Wheel Offset"
                            animated
                            type="is-dark"
                          >
                            <i class="fad fa-arrow-alt-from-left pr-1 pl-2"></i>
                            {{ wheel.offset || 'N/A' }}
                          </b-tooltip>
                          <b-tooltip
                            label="Wheel Material"
                            animated
                            type="is-dark"
                          >
                            <i class="fad fa-box-full pr-1 pl-2"></i>
                            {{ wheel.type || 'N/A' }}
                          </b-tooltip>
                          <p
                            class="title is-5 pt-3 pb-1"
                            v-html="wheel.name"
                          ></p>
                        </div>
                      </div>
                      <div v-if="wheel.notes" class="content">
                        <b-collapse
                          animation="slide"
                          :open="false"
                          position="is-top"
                        >
                          <a slot="trigger" slot-scope="props">
                            <b-icon
                              pack="fad"
                              :icon="
                                !props.open ? 'chevron-down' : 'chevron-up'
                              "
                            ></b-icon>
                            {{
                              !props.open
                                ? 'Additional details'
                                : 'Hide details'
                            }}
                          </a>
                          <p v-html="wheel.notes"></p>
                        </b-collapse>
                      </div>
                    </div>
                  </article>
                </div>
                <div
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
                </div>
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
              <b-pagination
                v-model="currentPage"
                :total="totalResults"
                :range-before="2"
                :range-after="2"
                :order="'is-centered'"
                :per-page="perPage"
                :icon-pack="'fad'"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                @change="changePages()"
              >
              </b-pagination>
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
</template>

<script>
  import Fuse from 'fuse.js';
  import { debounce } from 'debounce';
  import tenInchWheels from '~/static/data/wheels/10.json';
  import twelveInchWheels from '~/static/data/wheels/12.json';
  import thirteenInchWheels from '~/static/data/wheels/13.json';
  import PatreonCard from '~/components/PatreonCard';
  import SkeletonLoader from '~/components/SkeletonLoader';
  import WheelEditForm from '~/components/WheelEditForm';

  export default {
    components: {
      PatreonCard,
      SkeletonLoader,
    },
    data() {
      return {
        allWheelsVisible: true,
        searchString: '',
        selectedSize: 10,
        selectedWheels: tenInchWheels,
        isLoading: false,
        noResults: false,
        currentPage: 1,
        perPage: 10,
      };
    },
    head() {
      return {
        title: 'Technical - Wheel Dictionary',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
          },
          {
            property: 'og:title',
            content: 'Technical - Wheel Dictionary',
          },
          {
            property: 'og:image',
            content:
              'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
          },
        ],
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
        this.$buefy.modal.open({
          parent: this,
          props: {
            wheel,
          },
          component: WheelEditForm,
          hasModalCard: true,
          trapFocus: true,
          canCancel: ['escape', 'outside'],
        });
      },
    },
  };
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

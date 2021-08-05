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
        <h1 class="title">
          Wheel Library
        </h1>
        <h2 class="subtitle">
          All data collected and currated by Jan W. from <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer">Mini-Forum.de</a>.
        </h2>
        <p class="pb-5">
          Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel Library comes in. Using the same data from the now non-functional site www.wheeldictionary.net you can search for the right wheel for your Classic Mini Cooper.
        </p>

        <div id="scrollLocation" class="columns">
          <div class="column is-half mb-3">
            <b-field class="pb-2" position="is-left">
              <b-radio-button v-model="selectedSize" :native-value="10" type="is-primary">
                10 Inch
              </b-radio-button>
              <b-radio-button v-model="selectedSize" :native-value="12" type="is-primary">
                12 Inch
              </b-radio-button>
              <b-radio-button v-model="selectedSize" :native-value="13" type="is-primary">
                13 Inch
              </b-radio-button>
            </b-field>
          </div>
          <div class="column is-hidden-touch">
            <b-field class="mb-4" position="is-right">
              <b-input
                v-model="searchString"
                placeholder="Ex. Minilite"
                type="search"
                @keyup.enter.native="standardSearch()"
              ></b-input>
              <p class="control">
                <b-button v-debounce:500ms="standardSearch" debounce-events="click" class="button is-primary search-button">
                  Search <i class="fad fa-search"></i>
                </b-button>
              </p>
              <p class="pl-3">
                <b-button v-debounce:500ms="searchAll" debounce-events="click" class="button is-secondary">
                  View All {{ selectedSize }} inch Wheels
                </b-button>
              </p>
            </b-field>
          </div>
          <div class="column is-hidden-desktop">
            <b-field class="mb-4" position="is-left">
              <b-input
                v-model="searchString"
                placeholder="Ex. Minilite"
                type="search"
                @keyup.enter.native="standardSearch()"
              ></b-input>
            </b-field>
            <p>
              <b-button v-debounce:500ms="standardSearch" debounce-events="click" class="button is-primary">
                Search <i class="fad fa-search"></i>
              </b-button>
              <b-button v-debounce:500ms="searchAll" debounce-events="click" class="button is-secondary">
                View All {{ selectedSize }} inch Wheels
              </b-button>
            </p>
          </div>
        </div>
        <div class="columns is-multiline">
          <div v-if="selectedWheels" class="column is-12">
            <h3 class="has-text-weight-bold">
              Total Results:
              <template v-if="!isLoading">
                {{ selectedWheels.length }}
              </template>
              <template v-else>
                <i class="fad fa-spinner fa-spin"></i>
              </template>
            </h3>
          </div>
          <div class="column">
            <div v-if="isLoading && selectedSize !== ''" class="tile is-ancestor">
              <div v-for="(item, index) in 8" :key="index" class="tile is-parent is-3">
                <article class="tile is-child card">
                  <div class="card-image">
                    <b-skeleton position="is-centered" height="200px"></b-skeleton>
                  </div>
                  <div class="card-content">
                    <div class="media mb-1">
                      <div class="media-content">
                        <span class="icon is-small"><b-skeleton></b-skeleton></span>
                        <span class="icon is-small"><b-skeleton></b-skeleton></span>
                        <span class="icon is-small"><b-skeleton></b-skeleton></span>
                        <b-skeleton></b-skeleton>
                      </div>
                    </div>
                    <div class="content">
                      <b-skeleton height="80px"></b-skeleton>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div v-if="!isLoading" class="tile is-ancestor">
              <template v-for="(wheel, index) in paginatedItems" class="tile is-parent is-3">
                <div :key="index" class="tile is-parent is-3">
                  <article class="tile is-child card">
                    <div class="card-image">
                      <figure class="image is-square">
                        <img
                          :src="wheel.imagewebp"
                          :webp-fallback="wheel.imagepath"
                          :alt="`Image of ${wheel.name}`"
                        >
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media mb-1">
                        <div class="media-content">
                          <b-tooltip label="Wheel Size" animated type="is-dark">
                            <i class="fad fa-expand-arrows-alt pr-1"></i> {{ wheel.size || "N/A" }}
                          </b-tooltip>
                          <b-tooltip label="Wheel Offset" animated type="is-dark">
                            <i class="fad fa-arrow-alt-from-left pr-1 pl-2"></i> {{ wheel.offset || "N/A" }}
                          </b-tooltip>
                          <b-tooltip label="Wheel Material" animated type="is-dark">
                            <i class="fad fa-box-full pr-1 pl-2"></i> {{ wheel.type || "N/A" }}
                          </b-tooltip>
                          <p class="title is-5 pt-3 pb-1" v-html="wheel.name"></p>
                        </div>
                      </div>
                      <div v-if="wheel.notes" class="content">
                        <b-collapse
                          animation="slide"
                          :open="false"
                          position="is-top"
                        >
                          <a slot="trigger" slot-scope="props">
                            <b-icon pack="fad" :icon="!props.open ? 'chevron-down' : 'chevron-up'"></b-icon>
                            {{ !props.open ? 'Additional details' : 'Hide details' }}
                          </a>
                          <p v-html="wheel.notes"></p>
                        </b-collapse>
                      </div>
                      <p class="suggest-changes">
                        <a :href="`mailto:wheels@classicminidiy.com?subject=Wheel%20Update%20to%20${wheel.name}&body=Current%20Details%3A%0D%0A%0D%0AName%3A%20${wheel.name}%0D%0ASize%3A%20${wheel.size}%0D%0AOffset%3A%20${wheel.offset}%0D%0AMaterial%3A%20${wheel.type}%0D%0A%0D%0A------------------%0D%0APlease%20make%20your%20suggestions%20below%0D%0A%0D%0ASuggested%20Details%3A%0D%0A%0D%0AName%3A%0D%0ASize%3A%0D%0AOffset%3A%0D%0AMaterial%3A%0D%0A%0D%0A`"><i class="fad fa-pencil-alt"></i> Edit</a>
                      </p>
                    </div>
                  </article>
                </div>
              </template>
            </div>
            <div v-if="!isLoading && total > perPage" class="column is-12">
              <b-pagination
                v-model="currentPage"
                :total="total"
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
            <div v-if="!isLoading && noResults" class="column is-10 is-offset-1 no-results">
              <div class="card">
                <div class="card-content has-text-centered">
                  <i class="fad fa-sad-tear pb-3"></i>
                  <h3>No Results found for "{{ searchString }}"</h3>
                </div>
              </div>
            </div>
            <div v-if="!isLoading && (searchString !== '')" class="column is-half is-offset-one-quarter">
              <b-button v-debounce:500ms="searchAll" debounce-events="click" expanded type="is-primary">
                View all {{ selectedSize }} inch Wheels
              </b-button>
            </div>
            <div class="column is-10 is-offset-1">
              <div class="divider">
                Support
              </div>
            </div>
            <div class="column">
              <div class="card">
                <div class="card-content">
                  <patreon-card size="large" />
                </div>
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
import tenInchWheels from '~/static/data/wheels/10.json';
import twelveInchWheels from '~/static/data/wheels/12.json';
import thirteenInchWheels from '~/static/data/wheels/13.json';
import PatreonCard from '~/components/PatreonCard';

export default {
  components: {
    PatreonCard
  },
  data () {
    return {
      searchString: '',
      selectedSize: 10,
      selectedWheels: tenInchWheels,
      isLoading: false,
      noResults: false,
      currentPage: 1,
      perPage: 8
    };
  },
  head () {
    return {
      title: 'Technical - Wheel Dictionary',
      meta: [
        { hid: 'description', name: 'description', content: 'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.' },
        {
          property: 'og:title',
          content: 'Technical - Wheel Dictionary'
        },
        {
          property: 'og:image',
          content: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png'
        }
      ]
    };
  },
  computed: {
    // Computed value of the total amount of wheels in the selected results.
    total () {
      return this.selectedWheels.length;
    },
    // Items for the current page you are on.
    paginatedItems () {
      const pageNumber = this.currentPage - 1;
      return this.selectedWheels.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);
    }
  },
  watch: {
    selectedSize () {
      if (this.searchString === '') {
        this.searchAll();
      } else {
        this.standardSearch();
      }
    }
  },
  methods: {
    changePages () {
      // Scroll you to the top of the page
      document.getElementById('scrollLocation').scrollIntoView();
      // Start loading animation
      this.isLoading = true;
      // Artifically show loading items for 1000ms
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },

    searchAll () {
      this.isLoading = true;
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

    standardSearch () {
      this.isLoading = true;
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
      this.selectedWheels = fuse.search(this.searchString.toLowerCase()).map(result => result.item);
      this.noResults = this.selectedWheels.length === 0;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
  .fa-expand-arrows-alt {
    color: #FF9A00;
  }
  .fa-box-full {
    color: #522B1A;
  }
  .fa-arrow-alt-from-left {
    color: #0D6628;
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
    transform: rotate(242Deg);
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

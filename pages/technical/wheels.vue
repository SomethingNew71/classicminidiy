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

        <div class="columns">
          <div class="column">
            <b-field label="Search for a Wheel" class="mb-0">
              <b-input
                v-model="searchString"
                type="search"
                @keyup.enter.native="requestWheels()"
              ></b-input>
              <p class="control">
                <b-button
                  v-debounce:500ms="requestWheels"
                  debounce-events="click"
                  class="button is-primary"
                >
                  Search
                </b-button>
              </p>
            </b-field>
            <p class="pb-3">
              <a v-debounce:500ms="searchAll" debounce-events="click">
                View All
              </a>
            </p>
            <p class="is-size-6 legend">
              Special Info - <i class="special-notes fad fa-info-circle pr-3"></i>
              Size - <i class="fad fa-expand-arrows-alt pr-3"></i>
              Offset - <i class="fad fa-arrow-alt-from-left pr-3"></i>
              Material - <i class="fad fa-box-full"></i>
            </p>
          </div>
          <div class="column is-half mb-3 has-text-right">
            <b-field class="pb-2" position="is-right">
              <b-radio-button v-model="selectedSize" native-value="10" type="is-primary">
                10 Inch
              </b-radio-button>
              <b-radio-button v-model="selectedSize" native-value="12" type="is-primary">
                12 Inch
              </b-radio-button>
              <b-radio-button v-model="selectedSize" native-value="13" type="is-primary">
                13 Inch
              </b-radio-button>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div v-if="!isLoading && noResults" class="column is-3 no-results">
            <div class="card">
              <header class="card-header has-text-centered">
                <p class="card-header-title has-text-centered">
                  <i class="fad fa-sad-tear pr-2"></i> No Results found
                </p>
              </header>
            </div>
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
              <div v-for="(wheel, name) in selectedWheels" :key="name" class="tile is-parent is-3">
                <article class="tile is-child card">
                  <div class="card-image">
                    <figure class="image is-square">
                      <img
                        :src="wheel._source.imagewebp"
                        :webp-fallback="wheel._source.imagepath"
                        :alt="`Image of ${wheel._source.name}`"
                      >
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media mb-1">
                      <div class="media-content">
                        <b-tooltip label="Wheel Size" animated type="is-dark">
                          <i class="fad fa-expand-arrows-alt pr-1"></i> {{ wheel._source.size || "N/A" }}
                        </b-tooltip>
                        <b-tooltip label="Wheel Offset" animated type="is-dark">
                          <i class="fad fa-arrow-alt-from-left pr-1 pl-2"></i> {{ wheel._source.offset || "N/A" }}
                        </b-tooltip>
                        <b-tooltip label="Wheel Material" animated type="is-dark">
                          <i class="fad fa-box-full pr-1 pl-2"></i> {{ wheel._source.type || "N/A" }}
                        </b-tooltip>
                        <p class="title is-4 pt-3 pb-1" v-html="wheel._source.name"></p>
                      </div>
                    </div>
                    <div class="content">
                      {{ wheel._source.notes }}
                    </div>
                    <p class="suggest-changes">
                      <a :href="`mailto:wheels@classicminidiy.com?subject=Wheel%20Update%20to%20${wheel._source.name}&body=Current%20Details%3A%0D%0A%0D%0AName%3A%20${wheel._source.name}%0D%0ASize%3A%20${wheel._source.size}%0D%0AOffset%3A%20${wheel._source.offset}%0D%0AMaterial%3A%20${wheel._source.type}%0D%0A%0D%0A------------------%0D%0APlease%20make%20your%20suggestions%20below%0D%0A%0D%0ASuggested%20Details%3A%0D%0A%0D%0AName%3A%0D%0ASize%3A%0D%0AOffset%3A%0D%0AMaterial%3A%0D%0A%0D%0A`"><i class="fad fa-pencil-alt"></i> Suggest Changes</a>
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      searchString: 'Minilite',
      selectedSize: '10',
      selectedWheels: null,
      isLoading: true,
      noResults: false
    };
  },
  head () {
    return {
      title: 'Technical - Wheel Dictionary',
      meta: [
        { hid: 'description', name: 'description', content: 'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.' }
      ]
    };
  },
  computed: {},
  watch: {
    selectedSize () {
      this.requestWheels();
    }
  },
  mounted () {
    this.requestWheels();
  },
  methods: {
    searchAll () {
      this.searchString = '';
      this.isLoading = true;
      this.requestWheels();
    },
    async requestWheels () {
      this.isLoading = true;
      this.noResults = false;
      const token = Buffer
        .from(`${process.env.elastisearch.un}:${process.env.elastisearch.pw}`, 'utf8')
        .toString('base64');
      const searchURL = `${process.env.elastisearch.endpoint}/_search`;
      let searchPayload;
      if (this.searchString === '') {
        searchPayload = {
          size: 1000,
          query: {
            bool: {
              must: {
                term: { majorSize: this.selectedSize }
              }
            }
          }
        };
      } else {
        searchPayload = {
          size: 1000,
          query: {
            bool: {
              must: {
                term: { majorSize: this.selectedSize }
              },
              filter: {
                term: { name: this.searchString.toLowerCase() }
              }
            }
          }
        };
      }

      const response = await axios.post(searchURL, searchPayload, {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json'
        }
      });

      this.selectedWheels = response.data.hits.hits;
      setTimeout(() => {
        this.isLoading = false;
        if (this.selectedWheels.length < 1) {
          this.noResults = true;
        }
      }, 1000);
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
  }
  .skeleton-image .b-skeleton-item {
    margin: auto;
  }
  .special-notes {
    color: #659cc8;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .legend {
    .special-notes {
      font-size: 1rem;
      cursor: initial;
    }
  }
  .suggest-changes {
    bottom: 10px;
    position: absolute;
    right: 10px;
  }
  .bottom-details {
    margin-top: auto;
  }
</style>

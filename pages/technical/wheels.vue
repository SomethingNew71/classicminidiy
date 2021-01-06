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
                        <p class="title is-4 pt-3 pb-1" v-html="wheel.name"></p>
                      </div>
                    </div>
                    <div class="content">
                      {{ wheel.notes }}
                    </div>
                    <p class="suggest-changes">
                      <a :href="`mailto:wheels@classicminidiy.com?subject=Wheel%20Update%20to%20${wheel.name}&body=Current%20Details%3A%0D%0A%0D%0AName%3A%20${wheel.name}%0D%0ASize%3A%20${wheel.size}%0D%0AOffset%3A%20${wheel.offset}%0D%0AMaterial%3A%20${wheel.type}%0D%0A%0D%0A------------------%0D%0APlease%20make%20your%20suggestions%20below%0D%0A%0D%0ASuggested%20Details%3A%0D%0A%0D%0AName%3A%0D%0ASize%3A%0D%0AOffset%3A%0D%0AMaterial%3A%0D%0A%0D%0A`"><i class="fad fa-pencil-alt"></i> Suggest Changes</a>
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
import wheels10 from '~/static/data/wheels/10.json';
import wheels12 from '~/static/data/wheels/12.json';
import wheels13 from '~/static/data/wheels/13.json';

export default {
  data () {
    return {
      selectedSize: '10',
      selectedWheels: wheels10,
      isLoading: true
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
      this.loadWheels();
    }
  },
  mounted () {
    this.loadWheels();
  },
  methods: {
    loadWheels () {
      this.isLoading = true;
      switch (this.selectedSize) {
        case '10':
          this.selectedWheels = wheels10;
          break;
        case '12':
          this.selectedWheels = wheels12;
          break;
        case '13':
          this.selectedWheels = wheels13;
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
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

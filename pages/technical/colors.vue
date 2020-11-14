<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fad fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fad fa-info-circle" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fad fa-palette" aria-hidden="true"></i>
                </span>
                <span>Color Swatches</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <h1 class="title">
          Classic Mini Color Picker
        </h1>
        <p>
          In an effort to make more information availble, Classic Mini DIY has partnered with <a href="http://mini-colours.co.uk">mini-colours.co.uk</a> to provide you with a comprehensive list of the colors used on the Classic Mini throughout the years.
        </p>
        <hr>
      </div>
      <div class="column is-3">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Choose a Color
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>Colors are seperated into general color sections. Please choose the closest main color to your Classic Mini color swatch as possible.</p>
              <b-select
                v-model="selectedOption"
                placeholder="Select a Color"
                icon="tint"
                icon-pack="fad"
                @input="getColors()"
              >
                <option
                  v-for="(option, index) in colorRefs"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </b-select>
            </div>
          </div>
          <footer v-if="currentColors" class="card-footer">
            <div v-if="currentColors" class="card-footer-item">
              <h3>
                <span class="is-size-4 fad fa-swatchbook pr-5"></span>
                Total {{ selectedOption }} Swatches:
                <strong>{{ currentColors.length }}</strong>
              </h3>
            </div>
          </footer>
        </div>
      </div>
      <div class="column is-9">
        <div
          v-if="!currentColors && !loading"
          class="has-text-centered no-colors"
        >
          <h2 class="title">
            Choose a color
          </h2>
          <img :src="require('assets/img/color-filler.png')" alt="">
        </div>
        <div v-if="loading">
          <b-notification :closable="false">
            <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
          </b-notification>
        </div>
        <div v-if="!loading" class="columns is-multiline">
          <div
            v-for="(color, index) in currentColors"
            :key="index"
            class="column is-3"
          >
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ color[3] }}
                </p>
              </header>
              <div class="card-image">
                <figure
                  class="image is-4x4"
                >
                  <img
                    v-if="color[6]"
                    :src="require(`assets/img/colors/${color[2]}.jpg`)"
                    :alt="`Image of color ${color[2]}`"
                  >
                  <img
                    v-if="!color[6]"
                    src="~assets/img/colors/no-swatch.png"
                    :alt="`No image exists for color ${color[2]}`"
                  >
                </figure>
              </div>
              <hr v-if="!color[6]">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5">
                      {{ color[2] }}
                    </p>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <p class="card-footer-item">
                  <span class="is-size-4 fad fa-calendar-alt pr-5"></span>
                  <span class="subtitle is-7">
                    {{ color[5] }}
                  </span>
                </p>
                <p class="card-footer-item">
                  <span class="is-size-4 fad fa-brackets pr-5"></span>
                  <span class="subtitle is-7">
                    ({{ color[4] }})
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import colors from '~/static/data/colors.json';

export default {
  data () {
    return {
      title: 'Technical Information',
      subtitle: 'YOUR DIGITAL MINI TOOLBOX',
      background: '/technical.jpg',
      size: 'is-medium',
      centered: true,
      colors,
      colorRefs: ['Beige', 'Black', 'Blue', 'Bronze', 'Brown', 'Gold', 'Green', 'Grey', 'Maroon', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Turquoise', 'White', 'Yellow'],
      selectedOption: null,
      currentColors: null,
      loading: false
    };
  },
  head () {
    return {
      title: 'Technical - Color Picker',
      meta: [
        { hid: 'description', name: 'description', content: 'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.' },
        {
          property: 'og:title',
          content: 'Technical - Color Picker'
        }
      ]
    };
  },
  methods: {
    getColors () {
      /*
      // This is the order the colors appear in the JSON object
      "columns": [
        "colour_id",
        "base_id",
        "colour_code",
        "colour_name",
        "colour_short",
        "colour_years",
        "colour_swatch",
        "colour_approved"
      ]
    */
      this.loading = true;
      this.currentColors = colors[this.selectedOption.toString().toLowerCase()];
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>
<style lang="scss">
.no-colors {
  img {
    width: 50%;
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
</style>

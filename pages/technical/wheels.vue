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
        <div class="columns">
          <div class="column">
            <h1 class="title">
              Wheel Library
            </h1>
          </div>
          <div class="column is-one-third"></div>
          <div class="column">
            <p class="is-size-7 px-2 py-2 card legend">
              Special Info - <i class="special-notes fad fa-info-circle pr-3"></i>
              Size - <i class="fad fa-expand-arrows-alt pr-3"></i>
              Offset - <i class="fad fa-arrow-alt-from-left pr-3"></i>
              Material - <i class="fad fa-box-full pr-3"></i>
            </p>
          </div>
        </div>
        <p class="pb-5">
          Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel Library comes in. Using the same data from the now non-functional site www.wheeldictionary.net you can search for the right wheel for your Classic Mini Cooper.
        </p>
        <b-tabs v-model="activeTab" type="is-centered is-toggle is-medium">
          <b-tab-item v-for="(wheelSet, property) in wheels" :key="property" :label="property">
            <div class="tile is-ancestor">
              <div v-for="(wheel, name) in wheelSet" :key="name" class="tile is-parent is-3">
                <article class="tile is-child box">
                  <div class="columns">
                    <div class="column has-text-left">
                      <p class="is-size-5">
                        <i class="fad fa-expand-arrows-alt"></i> {{ wheel.size || "N/A" }}
                      </p>
                    </div>
                    <div class="column has-text-right">
                      <b-tooltip
                        v-if="wheel.notes !== ''"
                        :label="wheel.notes"
                        multilined
                        animated
                        position="is-bottom"
                      >
                        <i class="special-notes fad fa-info-circle"></i>
                        <!-- <b-button class="button is-primary" icon-right="info-circle" icon-pack="fad" /> -->
                      </b-tooltip>
                    </div>
                  </div>
                  <img :src="require('assets/img' + wheel.imagepath)" alt="">
                  <div class="hover-content has-text-centered pt-3">
                    <h2 class="title is-4">
                      {{ wheel.name }}
                    </h2>
                    <div class="columns bottom-details">
                      <div class="column has-text-left">
                        <i class="fad fa-arrow-alt-from-left"></i> {{ wheel.offset || "N/A" }}
                      </div>
                      <div class="column has-text-right">
                        <i class="fad fa-box-full"></i>  {{ wheel.type || "N/A" }}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
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
      activeTab: 0,
      isLoading: true,
      wheels: {
        '10 inch': wheels10,
        '12 inch': wheels12,
        '13 inch': wheels13
      }
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
  computed: {
    computedLabel (index) {
      let label;
      switch (index) {
        case 0:
          label = '10 inch';
          break;
        case 1:
          label = '12 inch';
          break;
        case 2:
          label = '13 inch';
          break;
        default:
          break;
      }
      return label;
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
  img {
    display: block;
    max-width: 190px;
    border-radius: 50%;
    margin: auto;
  }
  .special-notes {
    color: #659cc8;
    cursor: pointer;
    font-size: 1.5rem;
  }
  .legend {
    max-width: 348px;

    .special-notes {
      font-size: 0.75rem
    }
  }
  .bottom-details {
    margin-top: auto;
  }
</style>

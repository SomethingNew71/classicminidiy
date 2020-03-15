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
        <b-tabs v-model="activeTab" type="is-centered is-toggle is-medium">
          <b-tab-item label="10 Inch">
            <div class="tile is-ancestor">
              <div v-for="(wheel, name) in wheels.ten" :key="name" class="tile is-parent is-3">
                <article class="tile is-child box">
                  <img :src="require('assets/img' + wheel.imagepath)" alt="">
                  <div class="hover-content pl-5">
                    <h1 class="title is-4 pt-10">
                      {{ wheel.name }}
                    </h1>
                    <p class="is-size-5">
                      Size: {{ wheel.size }}
                    </p>
                    <p class="is-size-6">
                      Offset: {{ wheel.offset }}
                    </p>
                    <p class="is-size-6">
                      Material: {{ wheel.type }}
                    </p>
                    <b-tooltip
                      v-if="wheel.notes !== ''"
                      :label="wheel.notes"
                      multilined
                      animated
                      position="is-bottom"
                    >
                      <button class="button is-primary">
                        Special Notes
                      </button>
                    </b-tooltip>
                  </div>
                </article>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="12 Inch">
            <div class="tile is-ancestor">
              <div v-for="(wheel, name) in wheels.twelve" :key="name" class="tile is-parent is-3">
                <article class="tile is-child box">
                  <img :src="require('assets/img' + wheel.imagepath)" alt="">
                  <div class="hover-content pl-5">
                    <h1 class="title is-4 pt-10">
                      {{ wheel.name }}
                    </h1>
                    <p class="is-size-5">
                      Size: {{ wheel.size }}
                    </p>
                    <p class="is-size-6">
                      Offset: {{ wheel.offset }}
                    </p>
                    <p class="is-size-6">
                      Material: {{ wheel.type }}
                    </p>
                    <b-tooltip
                      v-if="wheel.notes !== ''"
                      :label="wheel.notes"
                      multilined
                      animated
                      position="is-bottom"
                    >
                      <button class="button is-primary">
                        Special Notes
                      </button>
                    </b-tooltip>
                  </div>
                </article>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="13 Inch">
            <div class="tile is-ancestor">
              <div v-for="(wheel, name) in wheels.thirteen" :key="name" class="tile is-parent is-3">
                <article class="tile is-child box">
                  <img :src="require('assets/img' + wheel.imagepath)" alt="">
                  <div class="hover-content pl-5">
                    <h1 class="title is-4 pt-10">
                      {{ wheel.name }}
                    </h1>
                    <p class="is-size-5">
                      Size: {{ wheel.size }}
                    </p>
                    <p class="is-size-6">
                      Offset: {{ wheel.offset }}
                    </p>
                    <p class="is-size-6">
                      Material: {{ wheel.type }}
                    </p>
                    <b-tooltip
                      v-if="wheel.notes !== ''"
                      :label="wheel.notes"
                      multilined
                      animated
                      position="is-bottom"
                    >
                      <button class="button is-primary">
                        Special Notes
                      </button>
                    </b-tooltip>
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
function getWheels (size) {
  return import(`~/static/data/wheels/${size}.json`).then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const wheels = {};
    wheels.ten = await getWheels(10);
    wheels.twelve = await getWheels(12);
    wheels.thirteen = await getWheels(13);
    return { wheels };
  },
  data () {
    return {
      activeTab: 0,
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
  }
};
</script>

<style lang="scss">
 .is-ancestor {
   flex-wrap: wrap;
 }
 img {
   display: block;
   margin: auto;
 }
</style>

<template>
  <section class="section">
    <div class="columns">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true"></i>
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fas fa-tire" aria-hidden="true"></i>
                </span>
                <span>Wheel Library</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title">Wheel Library</h1>
        <b-tabs type="is-centered is-boxed is-medium">
          <b-tab-item label="10 Inch"></b-tab-item>
          <b-tab-item label="12 Inch"></b-tab-item>
          <b-tab-item label="13 Inch"></b-tab-item>
        </b-tabs>
        <div class="tile is-ancestor">
          <div class="tile is-parent is-3" v-for="(wheel, name) in wheels.thirteen" :key="name">
            <article class="tile is-child box">
              <img :src="wheel.imagepath" alt="">
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
function getWheels (size) {
  return import(`~/static/data/wheels/${size}.json`).then(m => m.default || m)
}
export default {
  data () {
    return { }
  },
  async asyncData ({ req }) {
    const wheels = {}
    wheels.ten = await getWheels(10)
    wheels.twelve = await getWheels(12)
    wheels.thirteen = await getWheels(13)
    return { wheels }
  }
}
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

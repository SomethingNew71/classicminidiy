<template>
  <section class="section">
    <div class="columns is-multiline">
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
            <li class="is-active">
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h3 class="fancy-font-book-oblique">
          KEEPING MINIS DRIVING
        </h3>
        <h4 class="fancy-font-bold is-size-3">
          Technical Information for the DIY Mechanic
        </h4>
      </div>
      <div class="mobile-list column is-4">
        <nav class="panel">
          <p class="panel-heading">
            Classic Mini Toolbox
          </p>
          <nuxt-link
            v-for="(card, index) in cards"
            :key="index"
            :to="card.to"
            class="panel-block is-active"
          >
            <span class="panel-icon">
              <img :src="card.image">
            </span>
            {{ card.title }}
          </nuxt-link>
        </nav>
      </div>
      <div class="column is-8">
        <p class="is-size-5 pt-20">
          One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com.
        </p>
        <h3 class="fancy-font-book-oblique pt-20 is-size-4">
          SUPPORT THE SITE
        </h3>
        <p class="is-size-5 pt-20">
          Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel alive, or covering hosting costs consider supporting on Patreon.
        </p>
        <a class="mt-25 button is-medium is-patreon" href="https://patreon.com/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fab fa-patreon" />
          </span>
          <span>Support</span>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      cards: [
        {
          title: 'Torque Specs',
          image: '/icons/Settings-5.svg',
          to: '/technical/torque'
        },
        {
          title: 'Manuals',
          image: '/icons/Checklist.svg',
          to: '/technical/manuals'
        },
        {
          title: 'Electrical Diagrams',
          image: '/icons/Battery-Charging.svg',
          to: '/technical/electrical'
        },
        {
          title: 'SU Needle Comparison',
          image: '/icons/Graph-Magnifier.svg',
          to: '/technical/needles'
        },
        {
          title: 'Wheel Dictionary',
          image: '/icons/Bus.svg',
          to: '/technical/wheels'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-image {
  max-width: 50%;
  margin: auto;
}
.panel-icon {
  height: 3em;
  width: 3em;
}
</style>
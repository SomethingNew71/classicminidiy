<template>
  <section class="section">
    <div class="columns is-multiline">
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
            <li class="is-active">
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h3 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h3>
        <h4 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h4>
        <p class="is-size-5  pt-20">One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com.</p>
      </div>
      <div v-for="(card, index) in cards" :key="index" class="column">
        <nuxt-link :to="card.to">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="card.image" class="icon-image pt-30 pb-20" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4 has-text-centered">{{ card.title }}</p>
              <div class="content">
                {{ card.aside }}
              </div>
            </div>
          </div>
        </nuxt-link>
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
          aside: '',
          to: '/technical/torque'
        },
        {
          title: 'Manuals',
          image: '/icons/Checklist.svg',
          aside: '',
          to: '/technical/manuals'
        },
        {
          title: 'Electrical Diagrams',
          image: '/icons/Battery-Charging.svg',
          aside: '',
          to: '/technical/electrical'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.icon-image {
  max-width: 50%;
  margin: auto;
}
</style>

<template>
  <div>
    <hero></hero>
    <section class="main-content full-width">
      <div class="container column is-12">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import hero from '~/components/Hero'
export default {
  data() {
    return {
      items: [
        {
          title: 'About',
          icon: 'home',
          to: { name: 'about' }
        },
        {
          title: 'Videos',
          icon: 'home',
          to: { name: 'videos' }
        },
        {
          title: 'Merch',
          icon: 'home',
          to: { name: 'merch' }
        },
        {
          title: 'Support Me',
          icon: 'lightbulb',
          to: { name: 'support' }
        }
      ]
    }
  },
  components: {
    hero
  }
}
</script>

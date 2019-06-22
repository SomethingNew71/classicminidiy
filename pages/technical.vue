<template>
  <div>
    <hero
      v-bind:title="title"
      v-bind:size="size"
      v-bind:subtitle="subtitle"
      v-bind:background="background"
      v-bind:centered="centered"
    />
    <div class="container">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import Hero from '~/components/Hero'

export default {
  data() {
    return {
      title: 'Technical Information',
      subtitle: 'YOUR DIGITAL MINI TOOLBOX',
      background: '/technical.jpg',
      size: 'is-medium',
      centered: true
    }
  },
  components: {
    Hero
  }
}
</script>
<style lang="scss">
.hero-technical {
  background: #2f2f2f url('/technical.jpg') no-repeat center;
  background-size: cover;
}
</style>

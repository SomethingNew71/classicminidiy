<template>
  <div>
    <hero
      :title="title"
      :size="size"
      :subtitle="subtitle"
      :background="background"
      :centered="centered"
      :navigation="true"
    />
    <div class="container">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import Hero from '~/components/Hero'

export default {
  components: {
    Hero
  },
  data () {
    return {
      title: 'Technical Information',
      subtitle: 'YOUR DIGITAL MINI TOOLBOX',
      background: '/technical.jpg',
      size: 'is-medium',
      centered: true
    }
  }
}
</script>

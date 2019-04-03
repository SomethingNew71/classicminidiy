<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="DIY Videos" icon="github-circle">
        Open source on <a href="https://github.com/buefy/buefy"> GitHub</a>
      </card>

      <card title="Online Store" icon="cellphone-link">
        <b class="has-text-grey">Every</b> component is responsive
      </card>

      <card title="Instagram" icon="alert-decagram">
        Built with <a href="https://vuejs.org/">Vue.js</a> and
        <a href="http://bulma.io/">Bulma</a>
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>

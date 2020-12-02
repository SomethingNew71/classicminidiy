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
                  <i class="fad fa-wrench" aria-hidden="true"></i>
                </span>
                <span>Compression Ratio Calculator</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <h1 class="title">
          Compression Ratio Calculator
        </h1>
        <p>
          Below you’ll find a curated list of recommended tools for working with Classic Mini Coopers. Make difficult jobs easy by adding these essential tools to your workshop.
        </p>
      </div>
      <div class="column is-12">
        <compressionCalc />
      </div>
    </div>
  </section>
</template>

<script>
import compressionCalc from '~/components/CompressionCalculator';
export default {
  components: {
    compressionCalc
  },
  head () {
    return {
      title: 'Technical - Compression Ratio Calculator',
      meta: [
        { hid: 'description', name: 'description', content: 'Planning your next engine build? Use our brand new compression ratio calculator to generate the new ratio for your Classic Mini\'s engine.' },
        {
          property: 'og:title',
          content: 'Technical - Compression Ratio Calculator'
        }
      ]
    };
  }
};
</script>
<style lang="scss">

</style>

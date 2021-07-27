<template>
  <div class="columns is-multiline">
    <div class="column is-two-thirds">
      <h3 class="fancy-font-book-oblique">
        <i class="fad fa-store"></i> MERCH FOR THE MINI OWNER
      </h3>
      <h4 class="fancy-font-bold is-size-3 pt-2 pb-3">
        The CMDIY Store
      </h4>
      <p class="is-size-5 pb-5">
        Looking for the next upgrade to your Classic Mini? Or perhaps you need some new shirts for working in the garage? The Classic Mini merch store is a great way to support the channel, while getting some awesome stuff at the same time!
      </p>
      <p class="pt-5">
        <a class="mt-25 button is-medium is-primary" rel="noopener" href="https://store.classicminidiy.com/" target="_blank">
          <span class="icon">
            <i class="fad fa-store" />
          </span>
          <span>Check out the Merch</span>
        </a>
      </p>
    </div>
    <div class="column is-one-third">
      <div class="card">
        <div class="card-content">
          <b-carousel
            :autoplay="true"
            :pause-hover="false"
          >
            <b-carousel-item v-for="(carousel, i) in cardElements" :key="i">
              <span class="image">
                <nuxt-picture :src="carousel.image"></nuxt-picture>
              </span>
              <!-- <section :class="`hero is-medium is-${carousel.color}`">
                <div class="hero-body has-text-centered">
                  <h1 class="title">{{ carousel.text }}</h1>
                </div>
              </section> -->
            </b-carousel-item>
          </b-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cardElements: [
        {
          image: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mini-donuts-poster-207317_1000x.jpg?v=1617765892',
          title: 'Posters'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2474/8534/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt-950233_1000x.jpg?v=1615385821',
          title: 'Apparel'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2474/8534/products/classic-mini-gt1752-stigen-turbo-965931_988x.jpg?v=1617679393',
          title: 'Mini Parts'
        },
        {
          image: 'https://cdn.shopify.com/s/files/1/2474/8534/products/the-classic-mini-diy-mug-881726_1000x.jpg?v=1579879365',
          title: 'Mugs and more'
        }
      ]
    };
  }
};
</script>

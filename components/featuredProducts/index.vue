<template>
  <div class="pt-5">
    <v-layout wrap>
      <v-flex xs12 class="pb-4">
        <h2 class="display-1">Classic Mini Merch</h2>
      </v-flex>
      <v-flex v-for="(product, index) in featuredProducts" :key=index xs12 sm6 v-bind:class="{ borderRight: index === 'product1'}">
        <v-layout>
          <v-flex xs6 class="pa-4">
            <img :src="product.img" alt="" class="responsive-img">
          </v-flex>
          <v-flex xs6 class="pa-3">
            <h3 class="headline">{{product.name}}</h3>
            <p class="grey--text darken-3 pt-1">{{product.details}}</p>
            <span class="red--text display-1">{{product.price}}</span>
            <br>
            <br>
            <a :href="product.link" class="pt-3">View More Details</a>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        v-for="(product, key, index) in regularProducts"
        :key=index
        xs12 sm4 md2
        class="regular-products text-xs-center pt-5"
        v-bind:class="{ 'hidden-xs-only': index >= 2, 'hidden-sm-and-down': index >= 4}">
        <v-layout wrap>
          <v-flex xs12class="">
            <img :src="product.img" alt="" class="responsive-img">
          </v-flex>
          <v-flex xs12 class="pa-3">
            <h3 class="body-1">{{product.name}} - <span class="red--text"> {{product.price}}</span></h3>
            <p class="grey--text darken-3 pt-1">{{product.details}}</p>
            <p>
              <a :href="product.link">View More Details</a>
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss">
  @media (min-width: 600px) {
   .borderRight {
      border-right: 1px solid lightgrey;
    }
  }

  .regular-products {
    img {
      max-width: 70% !important;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        featuredProducts: {
          product1: {
            name: 'New Logo T-Shirt',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-d57635f8_360x.png',
            details: 'The new Classic Mini DIY logo printed and shipped directly to you on a shirt!',
            price: '$19'
          },
          product2: {
            name: 'Embroidered Trucker Hat',
            link: 'https://merch.classicminidiy.com/collections/mens-apparel/products/classic-mini-diy-embroidered-trucker-cap',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-37d7f17d_360x.png',
            details: 'This six-panel trucker cap with a mesh back will be a comfy and classic choice for a perfect day in the sun. ',
            price: '$19'
          }
        },
        regularProducts: {
          product1: {
            name: 'Classic Logo Shirt',
            link: 'https://merch.classicminidiy.com/collections/apparel/products/classic-logo-short-sleeve-unisex-t-shirt',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-af8ba20a_360x.png',
            price: '$19'
          },
          product2: {
            name: 'Big One Mug',
            link: 'https://merch.classicminidiy.com/collections/odds-and-ends/products/you-dont-need-a-big-one-to-be-happy-mug',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-b7942610_360x.png',
            price: '$15'
          },
          product3: {
            name: 'Beanie',
            link: 'https://merch.classicminidiy.com/collections/apparel/products/cuffed-beanie',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-8db3a0ac_360x.png',
            price: '$19'
          },
          product4: {
            name: 'Sweatshirt',
            link: 'https://merch.classicminidiy.com/collections/apparel/products/hooded-sweatshirt',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-03c3dac7_360x.png',
            price: '$19'
          },
          product5: {
            name: 'Classic Mini Dad Hat',
            link: 'https://merch.classicminidiy.com/collections/apparel/products/classic-mini-diy-dad-hat',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-d95be21c_360x.png',
            price: '$21'
          },
          product6: {
            name: 'Alps Mini',
            link: 'https://merch.classicminidiy.com/products/light-classic-mini-in-the-alps-cmdiy-exclusive',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-eb400f61_360x.png',
            price: '$20'
          }
        }
      };
    }
  };
</script>

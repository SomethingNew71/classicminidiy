<template>
  <div class="pt-5">
    <v-layout wrap>
      <v-flex xs12 class="pb-4">
        <h2 class="display-1">Featured Products</h2>
      </v-flex>
      <v-flex v-for="(product, index) in featuredProducts" v-bind:key=product xs12 sm6 v-bind:class="{ borderRight: index === 'product1'}">
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
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-d57635f8_360x.png?v=1529624842',
            details: 'The new Classic Mini DIY logo printed and shipped directly to you on a shirt!',
            price: '$19'
          },
          product2: {
            name: 'Embroidered Trucker Hat',
            link: 'https://merch.classicminidiy.com/collections/mens-apparel/products/classic-mini-diy-embroidered-trucker-cap',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-37d7f17d_720x.png?v=1529625968',
            details: 'This six-panel trucker cap with a mesh back will be a comfy and classic choice for a perfect day in the sun. ',
            price: '$19'
          }
        },
        regularProducts: {
          product1: {
            name: 'Classic Logo Shirt',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          },
          product2: {
            name: 'Big One Mug',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          },
          product3: {
            name: 'Beanie',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          },
          product4: {
            name: 'Sweatshirt',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          },
          product5: {
            name: 'Sweatshirt',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          },
          product6: {
            name: 'Sweatshirt',
            link: 'https://merch.classicminidiy.com/products/classic-mini-diy-new-logo-short-sleeve-unisex-t-shirt?variant=12097615036517&nopreview',
            img: 'https://cdn.shopify.com/s/files/1/2474/8534/products/mockup-2b40d52d_360x.jpg?v=1527810860',
            price: '$19'
          }
        }
      };
    }
  };
</script>

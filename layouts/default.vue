<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer height="auto">
      <v-card
        flat
        tile
        class="grey darken-3 white--text text-xs-center"
      >
        <v-card-text>
          <v-btn
            v-for="link in socialLinks"
            :key="link"
            icon
            class="mx-3 white--text"
            :class="link.color"
            :href='link.to'
            :target="'_blank'"
          >
            <v-icon size="24px">{{ link.icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-flex xs12 class="px-5 pb-1">
          <v-divider class="white"></v-divider>
        </v-flex>
        <v-card-text class="white--text">
          &copy;{{ new Date().getFullYear() }} — <strong>Classic Mini DIY, LLC.</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
// Styles applied to the entire app.
main.content {
  padding-top: 0 !important;
}
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
.footer .card {
  width: 100%;
}
</style>

<script>
  export default {
    data: () => ({
      socialLinks: {
        youtube: {
          name: 'youtube',
          color: 'red--text',
          icon: 'fab fa-youtube',
          to: 'https://www.youtube.com/c/classicminidiy'
        },
        facebook: {
          name: 'facebook',
          color: 'blue--text lighten-1',
          icon: 'fab fa-facebook',
          to: 'https://www.facebook.com/classicminidiy'
        },
        instagram: {
          name: 'instagram',
          color: 'orange--text darken-1',
          icon: 'fab fa-instagram',
          to: 'https://www.instagram.com/classicminidiy59/'
        },
        github: {
          name: 'github',
          color: 'green--text lighten-5',
          icon: 'fab fa-github',
          to: 'https://github.com/SomethingNew71/classicminidiy'
        },
        patreon: {
          name: 'patreon',
          color: 'red--text lighten-3',
          icon: 'fab fa-patreon',
          to: 'http://bit.ly/cmdiypatreon'
        }
      }
    })
  };
</script>

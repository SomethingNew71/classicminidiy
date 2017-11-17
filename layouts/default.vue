<template>
  <v-app dark>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer class="pa-4 secondary footer">
      <div>
        <a class="social-link" target='_blank' :href='urls.youtube'>
          <span class="icon"><i class="white--text fa fa-youtube"></i></span>
        </a>
        <a class="social-link" target='_blank' :href='urls.facebook'>
          <span class="icon"><i class="white--text fa fa-facebook"></i></span>
        </a>
        <a class="social-link"  target='_blank' :href='urls.instagram'>
          <span class="icon"><i class="white--text fa fa-instagram"></i></span>
        </a>
        <a class="social-link" target='_blank' :href='urls.github'>
          <span class="icon"><i class="white--text fa fa-github"></i></span>
        </a>
        <a class="social-link" target='_blank' :href='urls.patreon'>
          <span class="icon"><i class="white--text fa fa-dollar"></i></span>
        </a>
      </div>
      <v-spacer></v-spacer>
      <div class="white--text">
        Classic Mini DIY © - {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data: function () {
    return {
      urls: {
        instagram: 'https://www.instagram.com/classicminidiy59/',
        facebook: 'https://www.facebook.com/classicminidiy',
        github: 'https://github.com/SomethingNew71/classicminidiy',
        youtube: 'https://www.youtube.com/c/classicminidiy',
        sevenMini: 'http://www.7ENT.com/store?af=cmdiy1959',
        patreon: 'http://bit.ly/cmdiypatreon'
      }
    };
  }
};
</script>

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
.footer {
  text-align: center;
  position: static;
  bottom: 0;
  width: 100%;

  .social-link {
    padding-left: .5rem;
    padding-right: .5rem;
    text-decoration: none;
    color: #fff;

    &:hover {
      color: #279BFB;
    }
  }
}
</style>

<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer class="pa-4 secondary footer">
      <div>
        <a class="social-link" target='_blank' href='https://www.youtube.com/c/classicminidiy'>
          <span class="icon"><i class="white--text fab fa-youtube"></i></span>
        </a>
        <a class="social-link" target='_blank' href='https://www.facebook.com/classicminidiy'>
          <span class="icon"><i class="white--text fab fa-facebook"></i></span>
        </a>
        <a class="social-link"  target='_blank' href='https://www.instagram.com/classicminidiy59/'>
          <span class="icon"><i class="white--text fab fa-instagram"></i></span>
        </a>
        <a class="social-link" target='_blank' href='https://github.com/SomethingNew71/classicminidiy'>
          <span class="icon"><i class="white--text fab fa-github"></i></span>
        </a>
        <a class="social-link" target='_blank' href='http://bit.ly/cmdiypatreon'>
          <span class="icon"><i class="white--text fab fa-patreon"></i></span>
        </a>
      </div>
      <v-spacer></v-spacer>
      <div class="white--text">
        Classic Mini DIY © - {{ new Date().getFullYear() }}
      </div>
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

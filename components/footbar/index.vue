<template>
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
    </div>
    <v-spacer></v-spacer>
    <div class="white--text">
      Classic Mini DIY © - {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<style lang="scss">
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

<script>
export default {
  data: function () {
    return {
      urls: {
        instagram: 'https://www.instagram.com/classicminidiy59/',
        facebook: 'https://www.facebook.com/classicminidiy',
        github: 'https://github.com/SomethingNew71/classicminidiy',
        youtube: 'https://www.youtube.com/c/classicminidiy',
        sevenMini: 'http://www.7ENT.com/store?af=cmdiy1959'
      }
    };
  }
};
</script>

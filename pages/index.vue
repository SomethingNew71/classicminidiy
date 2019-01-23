<template>
  <section class="home">
    <!-- HERO SECTION -->
    <v-responsive class="hero pb-5">
      <v-container fill-height>
        <v-layout align-center row wrap class="pb-5 mt-5">
          <v-flex xs12 class="text-xs-center px-5 pb-5">
            <img class="pt-5 text-xs-center responsive-img" src="/img/logo-white.png" alt="Classic Mini DIY Logo image">
            <p class="headline white--text pt-5">
              The best place to learn how to get your hands dirty
              <br>
              and working on your Classic Mini Cooper since 2015.
            </p>
            <youtube-sub-button></youtube-sub-button>
          </v-flex>
          <v-flex xs12 class="pt-5">
            <service-section></service-section>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
    <v-container fluid secondary>
      <v-layout>
        <v-flex xs12 py-5 class="white--text text-xs-center">
          <h2 class="display-1">Want to stay up to date on new videos?</h2>
          <p class="title pt-4">Sign up for the Classic Mini DIY Newsletter</p>
          <div>
            <!-- Begin Mailchimp Signup Form -->
            <div id="mc_embed_signup">
              <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
              <form action="https://classicminidiy.us16.list-manage.com/subscribe/post?u=8c4cae17c7a50111c3fe1a26a&amp;id=6a5daeee77" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
                  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email Address" required>
                    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                      <input type="text" name="b_8c4cae17c7a50111c3fe1a26a_6a5daeee77" tabindex="-1" value="">
                    </div>
                    <div class="clear">
                      <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                    </div>
                </div>
              </form>
            </div>
            <!--End mc_embed_signup-->
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- PAGE CONTENTS BEGIN -->
    <v-container class="pt-2 page-container">
      <youtubeVideos></youtubeVideos>
      <div class="pt-5"></div>
      <supportSection></supportSection>
      <div class="pt-5"></div>
    </v-container>
  </section>
</template>

<script>
import youtubeSubButton from '~/components/youtubeSubButton';
import youtubeVideos from '~/components/youtubeVideos';
// import featuredProducts from '~/components/featuredProducts';
import supportSection from '~/components/supportSection';
import serviceSection from '~/components/serviceSection';

export default {
  components: {
    youtubeSubButton,
    youtubeVideos,
    // featuredProducts,
    supportSection,
    serviceSection
  }
};
</script>

<style lang="scss">
.home {
  .seven-card {
    background-image: url('/img/seven-card.jpg') !important;
    background-size: cover;
  }

  .responsive-img {
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    display: block;
  }

  #mc_embed_signup {
    form {
      padding: 0;

      input {
        height: inherit;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        max-width: 400px;
      }
      #mc-embedded-subscribe {
        max-width: 100px;
      }
    }
  }

  .hero {
    background: linear-gradient(to bottom, #1867c0, #5CBBF6);
  }
}

</style>

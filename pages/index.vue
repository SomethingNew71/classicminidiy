<template>
  <section class="home">
    <v-layout class="hero" row>
      <v-flex xs12 md6>
        <h1 class="display-1 py-5 my-5 pl-3">The Best Source of Classic Mini Information</h1>
      </v-flex>
      <v-flex md6>
        <img class="is-hidden-mobile" src="/backgrounds/home/logo.png" alt="Classic Mini DIY Logo image">
      </v-flex>
    </v-layout>
    <v-container fluid>
      <v-layout row wrap class="mission">
        <v-flex xs12 md4>
          <h2>The Mission</h2>
          <hr>
        </v-flex>
        <v-flex xs12 md8 class="mission-list">
          <v-layout wrap>
            <v-flex xs12>
              <h3><img src="/supplementary/youtube-icon-small.png"> Create DIY Videos</h3>
              <br>
              <p>
                Classic Mini DIY first and foremost is about creating DIY videos for new and inexperiences Classic Mini owners to use and reference when fixing their own cars.
              </p>
            </v-flex>
            <v-flex xs12>
              <h3><img src="/pages/home/books.png"> Consolidate Mini Knowledge</h3>
              <br>
              <p>
                As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.
              </p>
            </v-flex>
            <v-flex xs12>
              <h3><img src="/pages/home/grow.png"> Keep the Mini World Growing</h3>
              <br>
              <p>
                Our main mission is to keep the Classic minis out there on the road for many years to come and for countless others to find joy and excitement from these little cars built so many years ago.
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="latest-video">
        <v-flex xs12 md4>
          <h2>Latest Videos</h2>
          <hr>
        </v-flex>
        <v-flex xs12 md8>
          <div class='embed-container'>
            <iframe width='1280' height='720' src='https://www.youtube.com/embed/videoseries?list=PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi' frameborder='0' allowfullscreen>
            </iframe>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
// import footer from '~components/footer';

export default {
  components: {
    // footer
  }
};
</script>

<style lang="scss" src="./home.scss"></style>

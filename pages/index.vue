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
      <v-layout row wrap class="mission" pt-4>
        <v-flex xs12 md4 class="mission-header">
          <h2>The Mission</h2>
          <hr>
        </v-flex>
        <v-flex xs12 md8 class="mission-list">
          <v-layout row>
            <v-flex xs1>
              <img class="youtube" src="/supplementary/youtube-icon-small.png" alt="">
            </v-flex>
            <v-flex xs11>
              <h3>Create DIY Videos</h3>
              <br>
              <p>
                Classic Mini DIY first and foremost is about creating DIY videos for new and inexperiences Classic Mini owners to use and reference when fixing their own cars.
              </p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1>
              <img class="books" src="/pages/home/books.png" alt="">
            </v-flex>
            <v-flex xs11>
              <h3>Consolidate Mini Knowledge</h3>
              <br>
              <p>
                As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.
              </p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1>
              <img class="grow" src="/pages/home/grow.png" alt="">
            </v-flex>
            <v-flex xs11>
              <h3>Keep the Mini World Growing</h3>
              <br>
              <p>
                Our main mission is to keep the Classic minis out there on the road for many years to come and for countless others to find joy and excitement from these little cars built so many years ago.
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="latest-video">
        <v-flex xs12 md4 class="latest-video-header">
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
  data () {
    return {
      items: [
        // { header: '' },
        {
          avatar: '/supplementary/youtube-icon-small.png',
          title: 'Brunch this weekend?',
          subtitle: '<h3 class="books">Consolidate Mini Knowledge</h3><p>As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.</p>'
        },
        { divider: true, inset: true },
        {
          avatar: '/pages/home/books.png',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: '/pages/home/grow.png',
          title: 'Oui oui',
          subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  },
  components: {
    // footer
  }
};
</script>

<style lang="scss" src="./home.scss"></style>

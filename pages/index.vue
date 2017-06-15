<template>
  <section class="home">
    <section class="hero is-dark is-medium is-bold is-full-width">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">The Best Source of Classic Mini Information</h1>
            </div>
            <div class="column">
              <img class="is-hidden-mobile" src="/backgrounds/home/logo.png" alt="Classic Mini DIY Logo image">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- WHAT WE DO SECTION -->
    <section class="section what-we-do">
      <div class="columns is-hidden-desktop">
        <div class="column first">
          <h2>The Mission</h2>
          <hr>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third first is-hidden-touch">
          <h2>
            The
            <br>
            Mission
          </h2>
          <hr>
        </div>
        <div class="column is-two-third-tablet last">
          <!-- ITEM ONE -->
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="/supplementary/youtube-icon-small.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h3>Create DIY Videos</h3>
                <br>
                <p>
                  Classic Mini DIY first and foremost is about creating DIY videos for new and inexperiences Classic Mini owners to use and reference when fixing their own cars.
                </p>
              </div>
            </div>
          </article>
          <!-- ITEM TWO -->
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="/pages/home/books.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h3>Consolidate Mini Knowledge</h3>
                <br>
                <p>
                  As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.
                </p>
              </div>
            </div>
          </article>
          <!-- ITEM THREE -->
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="/pages/home/grow.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h3>Keep the Mini World Growing</h3>
                <br>
                <p>
                  Our main mission is to keep the Classic minis out there on the road for many years to come and for countless others to find joy and excitement from these little cars built so many years ago.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <!-- OUR LATEST VIDEO SECTION -->
    <section class="section latest-video">
      <div class="columns is-hidden-desktop">
        <div class="column first">
          <h2>Latest Videos</h2>
          <hr>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third first is-hidden-touch">
          <h2>
            Latest
            <br>
            Videos
          </h2>
          <hr>
        </div>
        <div class="column">
          <div class='embed-container'>
            <iframe width='1280' height='720' src='https://www.youtube.com/embed/videoseries?list=PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi' frameborder='0' allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
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

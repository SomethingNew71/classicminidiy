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
          <style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe width='1280' height='720' src='https://www.youtube.com/embed/videoseries?list=PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi' frameborder='0' allowfullscreen></iframe></div>
        </div>
      </div>
    </section>
    <!-- CONTACT SECTION -->
    <section id="contact-section" class="section contact">
      <div class="columns">
        <div class="column">
          <h2>
            Classic Mini DIY
          </h2>
          <h3>
            DIY Videos for your Classic Car
          </h3>
          <nav class="social-icons level is-mobile">
            <div class="level-left">
              <a class="level-item" href="https://www.youtube.com/c/classicminidiy">
                <span class="icon is-medium"><i class="fa fa-youtube"></i></span>
              </a>
              <a class="level-item" href="https://www.facebook.com/classicminidiy">
                <span class="icon is-medium"><i class="fa fa-facebook"></i></span>
              </a>
              <a class="level-item" href="https://www.instagram.com/somethingnew71/">
                <span class="icon is-medium"><i class="fa fa-instagram"></i></span>
              </a>
              <a class="level-item" href="https://github.com/SomethingNew71/classicminidiy">
                <span class="icon is-medium"><i class="fa fa-github"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div class="column ad-block">

        </div>
        <div class="column sponsors">
          <h2>Sponsors</h2>
          <a href="http://www.7ent.com">
            <img src="/pages/home/seven-mini.png" alt="Seven Mini Parts">
          </a>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import hero from '~components/hero';

export default {
  components: {
    // hero
  }
};
</script>

<style lang="scss" src="./home.scss"></style>

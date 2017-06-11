<template>
  <section class="home">
    <hero/>
    <!-- WHAT WE DO SECTION -->
    <section class="section what-we-do">
      <div class="columns">
        <div class="column is-one-third first">
          <h2>
            The
            <br>
            Mission
          </h2>
          <hr>
        </div>
        <div class="column is-two-thirds last">
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
                <img src="/supplementary/books.png">
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
                <img src="/supplementary/grow.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <h3>Keep the Mini World Strong</h3>
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
      <div class="columns">
        <div class="column is-one-third first">
          <h2>
            Latest
            <br>
            Videos
          </h2>
          <hr>
        </div>
        <div class="column">


        </div>
      </div>
    </section>
    <!-- SPONSORS SECTION -->
    <section class="section sponsors">
      <div class="columns">
        <div class="column">
          <h2>
            Sponsors
          </h2>
          <hr>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <img src="" alt="">
        </div>
        <div class="column">
          <img src="" alt="">
        </div>
      </div>
    </section>
    <!-- CONTACT SECTION -->
    <section class="section contact">
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
              <a class="level-item">
                <span class="icon is-medium"><i class="fa fa-youtube"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-medium"><i class="fa fa-facebook"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-medium"><i class="fa fa-instagram"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <img src="" alt="">
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import hero from '~components/hero';

export default {
  components: {
    hero
  }
};
</script>

<style lang="scss" src="./home.scss"></style>

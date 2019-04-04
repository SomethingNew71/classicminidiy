<template>
  <section class="hero is-info is-bold is-medium">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          <img src="/img/logo.png" alt>
        </p>
        <p class="subtitle">
          The best source for DIY knowledge on your Classic Mini Cooper
        </p>
        <p class="subtitle">
          <a alt="instagram" class="hero-item" href="https://instagram.com/classicminidiy59">
            <span class="icon is-large">
              <i class="fab fa-2x fa-instagram"></i>
            </span>
          </a>
          <a alt="Patreon" class="hero-item" href="https://patreon.com/classicminidiy">
            <span class="icon is-large">
              <i class="fab fa-2x fa-patreon"></i>
            </span>
          </a>
          <a alt="Facebook" class="hero-item" href="https://facebook.com/classicminidiy">
            <span class="icon is-large">
              <i class="fab fa-2x fa-facebook-f"></i>
            </span>
          </a>
          <a alt="Youtube" class="hero-item" href="https://youtube.com/c/classicminidiy">
            <span class="icon is-large">
              <i class="fab fa-2x fa-youtube"></i>
            </span>
          </a>
        </p>
        <p class="subtitle">
          <a class="button is-youtube" target='_blank' href='https://www.youtube.com/c/classicminidiy?sub_confirmation=1'>
            <span class="icon">
              <i class="fab fa-youtube"></i>
            </span>
            <span>Subscribe</span>
          </a>
        </p>
      </div>
    </div>
    <div class="hero-foot">
      <nav class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Producing Videos for</p>
            <p class="title">4 years</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Videos</p>
            <p class="title">{{videos}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Subscribers</p>
            <p class="title">{{subscribers}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total Views</p>
            <p class="title">{{views}}</p>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" scoped>
 .hero-foot {
   padding-bottom: 10px;
 }
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      subscribers: null,
      videos: null,
      views: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const apiKey = 'AIzaSyCbmPC-gSOA2g9xQOAeBboTTwz4tSVRQZ8'
      const baseURL = 'https://www.googleapis.com/youtube/v3/channels'
      const channelId = 'UCZIUfOFhrQ9nrR06IOoAJ2Q'
      const details = 'statistics'
      const feed = `${baseURL}?key=${apiKey}&id=${channelId}&part=${details}`
      const vueScope = this
      axios.get(feed).then((response) => {
        // Subscriber Count for Youtube Channel
        vueScope.subscribers = new Intl.NumberFormat().format(response.data.items[0].statistics.subscriberCount)
        vueScope.videos = new Intl.NumberFormat().format(response.data.items[0].statistics.videoCount)
        vueScope.views = new Intl.NumberFormat().format(response.data.items[0].statistics.viewCount)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .hero-item {
    padding-left: 5px;
    padding-right: 5px;
  }
  .is-youtube {
    background-color: #ff0201;
    border: #ff0201 1px;
    color: white;
  }
</style>

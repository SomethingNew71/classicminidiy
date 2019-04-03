<template>
  <section class="hero is-info is-bold is-medium">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div id="" class="navbar-menu">
            <div class="navbar-end">

              <span class="navbar-item">

              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">
          <img src="/img/wheel-logo.png" alt>
        </p>
        <p class="subtitle">
          <a alt="instagram" class="hero-item">
            <span class="icon is-large">
              <i class="fab fa-2x fa-instagram"></i>
            </span>
          </a>
          <a class="hero-item">
            <span class="icon is-large">
              <i class="fab fa-2x fa-facebook-f"></i>
            </span>
          </a>
          <a class="hero-item">
            <span class="icon is-large">
              <i class="fab fa-2x fa-youtube"></i>
            </span>
          </a>
        </p>
        <p>
          <a class="button is-medium is-youtube" target='_blank' href='https://www.youtube.com/c/classicminidiy?sub_confirmation=1'>
            <span class="icon">
              <i class="fab fa-youtube"></i>
            </span>
            <span>{{ youtubeSubs }} - Subscribe</span>
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      youtubeSubs: null
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      const apiKey = 'AIzaSyCbmPC-gSOA2g9xQOAeBboTTwz4tSVRQZ8'
      const baseURL = 'https://www.googleapis.com/youtube/v3/channels'
      const channelId = 'UCZIUfOFhrQ9nrR06IOoAJ2Q'
      const details = 'statistics'
      const feed = `${baseURL}?key=${apiKey}&id=${channelId}&part=${details}`
      const vueScope = this
      axios.get(feed).then(function (response) {
        // Subscriber Count for Youtube Channel
        vueScope.youtubeSubs =
          response.data.items[0].statistics.subscriberCount
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

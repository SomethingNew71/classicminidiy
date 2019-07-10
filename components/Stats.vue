<template>
  <div class="card mb-20">
    <nav class="level pt-20 pb-20">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Minutes Watched</p>
          <p class="title" v-if="!isLoading" >{{ views }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Subscribers</p>
          <p class="title" v-if="!isLoading" >{{ subscribers }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">videos</p>
          <p class="title" v-if="!isLoading" >{{ videos }}</p>
        </div>
      </div>
      <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      views: null,
      subscribers: null,
      videos: null,
      data: null,
      isLoading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const apiKey = 'AIzaSyCbmPC-gSOA2g9xQOAeBboTTwz4tSVRQZ8'
      const baseURL = 'https://www.googleapis.com/youtube/v3/channels'
      const id = 'UCZIUfOFhrQ9nrR06IOoAJ2Q'
      const details = 'snippet,contentDetails,statistics'
      const feed = `${baseURL}?key=${apiKey}&id=${id}&part=${details}`

      axios.get(feed).then((response) => {
        const items = response.data.items[0].statistics
        this.views = Number(items.viewCount).toLocaleString()
        this.subscribers = Number(items.subscriberCount).toLocaleString()
        this.videos = Number(items.videoCount).toLocaleString()
        this.isLoading = false
      })
    }
  }
}
</script>

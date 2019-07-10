<template>
  <div>
    <hero
      v-bind:title="title"
      v-bind:subtitle="subtitle"
      v-bind:size="size"
      v-bind:background="background"
      v-bind:navigation="false"
    />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12 has-text-centered">
          <h2 class="title">Subscribe to our Channels</h2>
          <p>The Classic Mini crew is a tight knit group of awesome people. Consider subscribing and checking out the goup below!</p>
        </div>
        <div v-if="loading" class="column is-12">
          <progress class="progress is-small is-primary" max="100">15%</progress>
        </div>
        <div v-for="(youtuber, name) in youtubers" class="column is-3" :key="name">
          <div class="card" v-if="!loading">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48 is-rounded">
                    <img :src="youtuber.image" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{youtuber.channel}}</p>
                  <p class="subtitle is-6">@{{youtuber.name}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a :href="youtuber.subscribeLink" class="card-footer-item button is-medium is-inverted is-danger">Subscribe</a>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from '~/components/Hero'

export default {
  data () {
    return {
      loading: false,
      title: 'The Classic Mini Youtube Crew',
      subtitle: 'SUBSCRIBE TO',
      background: '/youtube/camera.jpg',
      size: 'is-medium',
      youtubers: [
        {
          channel: 'William Murfitt',
          name: 'William Murfitt',
          image: '/youtube/williamMurfitt.jpg',
          subscribeLink: 'https://youtube.com/channel/UCrIuLBVW6ywi8Y1MkkC7OFw?sub_confirmation=1'
        },
        {
          channel: 'Total Car Reviews',
          name: 'Tom Shorrock',
          image: '/youtube/tcr.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCzAOF4YbQpDkypu3gBXh0rg?sub_confirmation=1'
        },
        {
          channel: 'The DJSE',
          name: 'Alex Hart',
          image: '/youtube/djse.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCQtoUZ0bxb78Rd5MTgveDEA?sub_confirmation=1'
        },
        {
          channel: 'Alex Toon',
          name: 'Alex Toon',
          image: '/youtube/toon.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UC4Rr_JlWij_yg2_a2V3KEiw?sub_confirmation=1'
        },
        {
          channel: 'DaveJaguar',
          name: 'Dave Turner',
          image: '/youtube/daveJag.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCeZ7zeteiRQT8HAXBmSWLfA?sub_confirmation=1'
        },
        {
          channel: 'Classic Mini Workshop',
          name: 'Keith Miller',
          image: '/youtube/miniWorkshop.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UChhedkliH9PraTNsN1DhyLg?sub_confirmation=1'
        },
        {
          channel: 'Paul P. Mini Build',
          name: 'Paul Parsons',
          image: '/youtube/paul.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UC3a2Sm-PJjENRLcEpaRQ8ww?sub_confirmation=1'
        },
        {
          channel: 'Mini Tom',
          name: 'Tom Mason',
          image: '/youtube/tom.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCRe8aMjaz37biKRIvn8n2Pg?sub_confirmation=1'
        },
        {
          channel: 'Classic Mini DIY',
          name: 'Cole Gentry',
          image: '/youtube/classicminidiy.png',
          subscribeLink: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1'
        },
        {
          channel: 'Lone Star Mini',
          name: 'Randy Almand',
          image: '/youtube/randy.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCKc7VsPJLI-6otszoEzBOog?sub_confirmation=1'
        },
        {
          channel: 'Mini Matt TV',
          name: 'Matt Carter',
          image: '/youtube/matt.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCIUWgvq_IaU5Ek7WoQ5YMEg?sub_confirmation=1'
        },
        {
          channel: 'Adam Campion',
          name: 'Adam Campion',
          image: '/youtube/adam.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCoEoPxYk6xElZNF4HO0v7tw?sub_confirmation=1'
        },
        {
          channel: 'Jeffries Performance',
          name: 'Paul Jeffries',
          image: '/youtube/jeffries.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UC10hzPPQVcDHbtba9oV0zLA?sub_confirmation=1'
        },
        {
          channel: 'Gentleman\'s Motor Racing Team',
          name: 'Kevin Richardson',
          image: '/youtube/kevin.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCKlZgt09qLBxtJjaDEc1JlQ?sub_confirmation=1'
        },
        // {
        //   channel: 'George Knapp',
        //   name: 'George Knapp',
        //   image: '/youtube/george.jpg',
        //   subscribeLink: '?sub_confirmation=1'
        // },
        {
          channel: 'DB Mini DIY',
          name: 'Dale',
          image: '/youtube/dbmini.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UC-OSNyZfXYQhd0cSdZm095A?sub_confirmation=1'
        },
        {
          channel: 'Sean C',
          name: 'Sean C',
          image: '/youtube/seanC.jpg',
          subscribeLink: 'https://www.youtube.com/channel/UCA7LiDkJWz8let3pMbvOkmg?sub_confirmation=1'
        }
      ]
    }
  },
  components: {
    Hero
  },
  created () {
    // this.shuffle(this.youtubers)
  },
  methods: {
    shuffle (array) {
      this.randomYoutubers = array.sort(() => Math.random() - 0.5)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card img {
  border-radius: 50%;
}
/deep/ {
  .hero-body {
    .title {
      font-size: 3rem;
    }
  }
}
</style>

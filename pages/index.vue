<template>
  <div>
    <hero/>
    <div class="container column is-12">
      <section class="section">
        <div class="columns">
          <div class="column is-4" v-for="card in cards" :key="card">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="card.image" alt="Placeholder image">
                </figure>
              </div>
              <header class="card-header">
                <p class="card-header-title">
                  {{card.title}}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  {{ card.body }}
                </div>
              </div>
              <footer class="card-footer">
                <a v-for="link in card.footerLinks" :key="link" :href="link.url" class="card-footer-item has-text-info">{{link.title}}</a>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import hero from '~/components/Hero'

export default {
  name: 'HomePage',
  data() {
    return {
      cards: {
        0: {
          title: 'DIY Videos',
          body: 'The primary work of Classic Mini DIY is creating videos outlining the way to work on your Classic Mini Cooper.',
          image: '/img/camera.gif',
          footerLinks: [
            {
              title: 'Start Watching',
              url: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1'
            }
          ]
        },
        1: {
          title: 'Practical Approach to DIY',
          body: 'By making these videos, we hope to keep the Classic Mini alive, as well as keeping the entire online community thriving for years to come.',
          image: '/img/mini.gif',
          footerLinks: [
            {
              title: 'Learn More',
              url: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1'
            }
          ]
        },
        2: {
          title: 'Mail in Repair Service',
          body: 'A recent addition to our lineup, is the option to send your old or broken Classic Mini parts for a top notch repair and recondition service.',
          image: '/img/tools.gif',
          footerLinks: [
            {
              title: 'Email for details',
              url: 'mailto:classicminidiy@gmail.com'
            }
          ]
        }
      }
    }
  },
  components: {
    hero
  }
}
</script>

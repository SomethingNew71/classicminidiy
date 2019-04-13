<template>
  <div>
    <b-notification :active.sync="showNotify" aria-close-label="Close notification">
      <a class="button patreon-support" href="https://www.patreon.com/bePatron?u=3749975" target="_blank">
        <span class="icon">
          <i class="fab fa-patreon" />
        </span>
        <span>Consider Supporting on Patreon</span>
      </a>
    </b-notification>
    <hero />
    <div class="container column is-12">
      <section class="section">
        <div class="columns">
          <div v-for="(card, i) in cards" :key="i" class="column is-4">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="card.image" alt="Placeholder image">
                </figure>
              </div>
              <header class="card-header">
                <p class="card-header-title">
                  {{ card.title }}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  {{ card.body }}
                </div>
              </div>
              <footer class="card-footer">
                <a
                  v-for="(link, index) in card.footerLinks"
                  :key="index"
                  :href="link.url"
                  target="_blank"
                  class="card-footer-item has-text-info"
                >
                  {{ link.title }}</a>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .notification {
    position: fixed;
    right: 5px;
    top: 5px;

    .patreon-support {
      background: #F96854;
      color: white;
    }
  }
</style>

<script>
import hero from '~/components/Hero';

export default {
  name: 'HomePage',
  components: {
    hero
  },
  data() {
    return {
      showNotify: false,
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
    };
  },
  mounted() {
    setTimeout(() => {
      this.showNotify = true;
    }, 2500);
  }
};
</script>

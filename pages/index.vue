<template>
  <div>
    <hero
      :title="title"
      :subtitle="subtitle"
      :size="size"
      :special="true"
      :background="background"
      :navigation="true"
    />
    <div class="spacer layer"></div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline pb-5">
          <div class="column is-12"></div>
          <div class="column is-8">
            <h3 class="fancy-font-book-oblique">
              <i class="fad fa-book"></i> THE MINI MISSION
            </h3>
            <h4 class="fancy-font-bold is-size-3 pt-2 pb-3">
              Keeping the Classics on the Road
            </h4>
            <p class="is-size-5">
              Classic Mini DIY started out of my small driveway workshop in
              2015. I always focus on two things: keeping your Classic Mini on
              the road and making DIY car work accessible for all skill levels.
              I make DIY videos and tutorials showing exactly how to complete a
              wide range of jobs on your Classic Mini. I also partner with
              world-class manufacturers to deliver top-of-the-line products to
              personalize and ensure the performance of your Classic Mini.
            </p>
            <p class="pt-3">
              <contact-form></contact-form>
            </p>
          </div>
          <div class="column is-4">
            <h3 class="fancy-font-book-oblique">
              <i class="fad fa-gift"></i> SUPPORT THE MISSION
            </h3>
            <h4 class="fancy-font-bold is-size-3 pt-2 pb-3">
              Support
            </h4>
            <p class="is-size-5 pt-2 pb-3">
              Classic Mini DIY is supported by our viewers. If you are
              interested in helping to keep the channel alive, consider
              supporting on Patreon or if you have skills in JS and modern web
              technologies, please consider supporting the open source codebase
              on github.
            </p>
            <a
              class="mt-25 button is-medium is-patreon"
              rel="noopener"
              href="https://patreon.com/classicminidiy"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-patreon" />
              </span>
              <span>Donate</span>
            </a>
            <a
              class="mt-25 button is-medium"
              rel="noopener"
              href="https://patreon.com/classicminidiy"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-github" />
              </span>
              <span>Contribute</span>
            </a>
          </div>
          <div class="column is-10 is-offset-1 pt-6">
            <stats />
          </div>
          <div class="column is-12 pt-20">
            <recent-videos></recent-videos>
          </div>
        </div>
      </div>
    </section>
    <div class="spacer layer1"></div>
    <section class="section animation-section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-5">
            <video autoplay loop muted playsinline>
              <source
                src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.webm"
                type="video/webm"
              />
              <source
                src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div class="column is-7">
            <h3 class="fancy-font-book-oblique">
              <i class="fad fa-handshake-alt"></i> THE COMPLETELY FREE
            </h3>
            <h3 class="fancy-font-bold is-size-3">
              Classic Mini Toolbox
            </h3>
            <h4 class="fancy-font-book-oblique pt-20">
              THE TOOLKIT FOR THE DIY MECHANIC
            </h4>
            <p>
              One of the largest reasons for starting this channel, was about
              making infromation related to working your Mini Cooper more
              accessible. In service to this goal I have created the Classic
              Mini Toolbox. Combining information from all over the web to bring
              you one location to find anything you need.
            </p>
            <div class="column is-hidden-touch">
              <div class="columns is-centered pt-50 is-multiline">
                <div
                  v-for="(item, index) in toolboxItems"
                  :key="index"
                  class="column is-3"
                >
                  <nuxt-link :to="item.to" :title="'Link to ' + item.to">
                    <article class="tile grow is-child has-text-centered">
                      <b-image
                        class="panel-icon-home"
                        :src="item.webp"
                        :webp-fallback="item.image"
                        aria-hidden="true"
                        :alt="item.title + ' image'"
                      />
                      <p class="heading has-text-black">
                        {{ item.title }}
                      </p>
                    </article>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="is-hidden-desktop mobile-list column is-12">
            <nav class="panel">
              <p class="panel-heading has-background-grey-lighter">
                Find the Tool You Need
              </p>
              <nuxt-link
                v-for="(item, index) in toolboxItems"
                :key="index"
                :to="item.to"
                class="panel-block is-active"
              >
                <span class="panel-icon">
                  <b-image
                    :src="item.webp"
                    :webp-fallback="item.image"
                    :alt="item.title + ' image'"
                  />
                </span>
                {{ item.title }}
              </nuxt-link>
            </nav>
          </div>
          <div class="column is-10 is-offset-1">
            <div class="divider">
              More
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12-mobile is-8-tablet is-6-desktop">
              <h3 class="fancy-font-book-oblique">
                <i class="fad fa-hands-heart"></i> SUPPORT THE CHANNEL
              </h3>
              <h3 class="fancy-font-bold is-size-3">
                Become a Patreon
              </h3>
              <p class="is-size-5">
                Classic Mini DIY is <strong>completely free resource</strong> supported by our viewers. If you are interested in helping to keep the channel alive, consider supporting on Patreon.
              </p>
              <a class="mt-4 button is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
                <span class="icon">
                  <i class="fab fa-patreon" />
                </span>
                <span>Become a Member</span>
              </a>
              <div class="column is-8 pl-0 pt-6 benefits-list">
                <nav class="panel">
                  <p class="panel-heading has-background-grey-lighter">
                    Membership Includes
                  </p>
                  <div
                    class="panel-block"
                  >
                    <span class="panel-icon">
                      <i class="is-size-4 fab fa-discord pt-2"></i>
                    </span>
                    Access to Live DIY Chat
                  </div>
                  <div
                    class="panel-block"
                  >
                    <span class="panel-icon">
                      <i class="is-size-4 fad fa-video pt-2"></i>
                    </span>
                    Early Access to videos
                  </div>
                  <div
                    class="panel-block"
                  >
                    <span class="panel-icon">
                      <i class="is-size-4 fas fa-gift pt-2"></i>
                    </span>
                    Free gifts and merch
                  </div>
                  <div
                    class="panel-block"
                  >
                    <span class="panel-icon">
                      <i class="is-size-4 fas fa-circle-info pt-2"></i>
                    </span>
                    Insider information and much more...
                  </div>
                </nav>
              </div>
            </div>
            <div class="column is-3-touch is-6-desktop">
              <phone class="phone is-hidden-mobile" />
              <browser class="browser is-hidden-touch" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="spacer layer2"></div>
    <section class="section">
      <div class="container pb-6">
        <div class="columns is-multiline">
          <div class="column is-7">
            <h3 class="fancy-font-bold is-size-3">
              <i class="fad fa-address-card"></i> About Me
            </h3>
            <h4 class="fancy-font-book-oblique pt-20">
              MY NAME IS COLE
            </h4>
            <p>
              I am a 30-year-old Web Developer working in the financial
              industry. My experience in the automotive industry comes from 2
              years of training on heavy diesel machinery and 8 years of Classic
              Mini ownership. With this experience, I do my best to provide the
              most comprehensive and technically correct information I can.
            </p>
            <h3 class="fancy-font-book-oblique pt-30">
              MY PROMISE
            </h3>
            <p>
              I will provide you with all the knowledge I can to the best of my
              ability. I will also accept feedback in the event that I get
              something incorrect. I am an enthusiast and not a complete expert
              so from time to time I will make mistakes.
            </p>
            <p class="pt-3">
              <contact-form></contact-form>
            </p>
          </div>
          <div class="column is-5 avatar-container">
            <b-image
              src="https://classicminidiy.s3.amazonaws.com/misc/avatar.png"
              alt="Image of my car on jack stands"
            />
          </div>
        </div>
      </div>
    </section>
    <div class="spacer layer1"></div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Classic Mini DIY</strong> by
          <a rel="noopener" target="_blank" href="https://youtube.com/c/classicminidiy?sub_confirmation=1">Cole Gentry</a>.
        </p>
        <p>
          <strong>YouTube API</strong> used under <strong>YouTube</strong>
          <a rel="noopener" target="_blank" href="https://www.youtube.com/t/terms">TOS</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Stats from '~/components/Stats';
import RecentVideos from '~/components/RecentVideos';
import Hero from '~/components/Hero';
import Phone from '~/components/Phone';
import Browser from '~/components/Browser';
import ContactForm from '~/components/ContactForm';
export default {
  components: {
    Hero,
    Stats,
    RecentVideos,
    Phone,
    Browser,
    ContactForm
  },
  data () {
    return {
      title: 'Classic Mini <br> DIY',
      subtitle: 'YOUR FRIENDLY NEIGHBORHOOD',
      background: '/hero',
      size: 'is-medium',
      toolboxItems: [
        {
          title: 'Torque Specs',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp',
          to: '/technical/torque'
        },
        {
          title: 'Electrical Diagrams',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp',
          to: '/technical/electrical'
        },
        {
          title: 'Engine Sizes',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp',
          to: '/technical/enginesize'
        },
        {
          title: 'SU Needle Comparison',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp',
          to: '/technical/needles'
        },
        {
          title: 'Wheel Library',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp',
          to: '/technical/wheels'
        },
        {
          title: 'Compression Ratio Calculator',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
          to: '/technical/compression'
        },
        {
          title: 'Color Picker',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp',
          to: '/technical/colors'
        },
        {
          title: 'Manuals',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.webp',
          to: '/technical/manuals'
        },
        {
          title: 'Compression Ratio Calculator',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
          to: '/technical/compression'
        },
        {
          title: 'Recommended Tools',
          image:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-toolbox-100.png',
          webp:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-toolbox-100.webp',
          to: '/technical/tools'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.animation-section, .footer {
  background-color: #f1f1f1;
}
.avatar-container img {
  max-width: 50%;
  margin: auto;
  padding-top: 35px;
  display: block;
}
</style>

<style lang="scss" scoped>
.benefits-list {
  .fa-discord {
    color: #7289da;
  }
  .fa-video {
    color: #ff5500;
  }
  .fa-gift {
    color: #45a65e;
  }
  .fa-circle-info {
    color: #ff9900;
  }
}

.phone {
  z-index: 2;
  position: relative;
}
.browser {
  z-index: 1;
  position: absolute;
  bottom: 110px;
  right: -250px;
}
.panel-icon-home {
  max-width: 70px;
  margin: auto;
}
.panel-icon {
  height: 3em;
  width: 3em;
}
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
}
.footer {
  a {
    font-weight: bold;
  }
}
.spacer {
  aspect-ratio: 900/100;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  &.layer {
    margin-top: -10%;
    background-image: url('~assets/img/layer.svg');
  }
  &.layer1 {
    margin-top: -5%;
    background-image: url('~assets/img/layer1.svg');
  }
  &.layer2 {
    background-image: url('~assets/img/layer2.svg');
  }
}
</style>

<script lang="ts" setup>
  import { DateTime } from 'luxon';
  import { HERO_TYPES, LandingPageToolboxItems } from '~/data/models/generic';
  const birthday = DateTime.local(1989, 5, 11);
  const today = DateTime.now();
  const age = ref<string | undefined>(today.diff(birthday, 'years').toObject().years?.toFixed(0));

  // Enhanced SEO metadata
  useHead({
    title: 'Classic Mini DIY - Your Friendly Neighborhood Mini Resource',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Classic Mini DIY provides DIY videos, tutorials, and tools to help keep your Classic Mini on the road. Resources for all skill levels of Classic Mini owners and enthusiasts.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: 'Classic Mini, DIY, tutorials, videos, car maintenance, Mini Cooper, automotive',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'Classic Mini DIY - Your Friendly Neighborhood Mini Resource',
    ogDescription:
      'Classic Mini DIY provides DIY videos, tutorials, and tools to help keep your Classic Mini on the road. Resources for all skill levels of Classic Mini owners and enthusiasts.',
    ogUrl: 'https://classicminidiy.com/',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/home-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini DIY - Your Friendly Neighborhood Mini Resource',
    twitterDescription:
      'Classic Mini DIY provides DIY videos, tutorials, and tools to help keep your Classic Mini on the road.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/misc/home-seo.jpg',
  });

  // Add structured data for homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Classic Mini DIY',
    url: 'https://classicminidiy.com/',
    description:
      'Classic Mini DIY provides DIY videos, tutorials, and tools to help keep your Classic Mini on the road.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://classicminidiy.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Add organization structured data
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Classic Mini DIY',
    url: 'https://classicminidiy.com/',
    logo: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
    sameAs: [
      'https://www.youtube.com/c/classicminidiy',
      'https://patreon.com/classicminidiy',
      'https://github.com/Classic-Mini-DIY/classicminidiy',
    ],
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationJsonLd),
      },
    ],
  });
</script>

<template>
  <v-container fluid class="px-0 pb-0">
    <hero
      :title="'Classic Mini <br> DIY'"
      :subtitle="'YOUR FRIENDLY NEIGHBORHOOD'"
      :size="'is-medium'"
      :special="true"
      :heroType="HERO_TYPES.HOME"
      :background="'/backdrop2'"
      :navigation="true"
    />
    <div class="spacer layer"></div>
    <v-container>
      <div class="container">
        <v-row class="pb-5">
          <v-col cols="12" md="8">
            <h2 class="fancy-font-book-oblique"><i class="fad fa-book"></i> THE MINI MISSION</h2>
            <h3 class="fancy-font-bold is-size-3 pt-2 pb-3">Keeping the Classics on the Road</h3>
            <p class="is-size-5">
              Classic Mini DIY started out of my small driveway workshop in 2015. I always focus on two things: keeping
              your Classic Mini on the road and making DIY car work accessible for all skill levels. I make DIY videos
              and tutorials showing exactly how to complete a wide range of jobs on your Classic Mini. I also partner
              with world-class manufacturers to deliver top-of-the-line products to personalize and ensure the
              performance of your Classic Mini.
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="fancy-font-book-oblique"><i class="fad fa-gift"></i> SUPPORT THE MISSION</h3>
            <h4 class="fancy-font-bold is-size-3 pt-2 pb-3">Support</h4>
            <p class="is-size-5 pt-2 pb-3">
              Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel alive,
              consider supporting on Patreon or if you have skills in JS and modern web technologies, please consider
              supporting the open source codebase on github.
            </p>
            <a
              class="mr-3 button is-medium is-patreon"
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
              class="button is-medium"
              rel="noopener"
              href="https://github.com/Classic-Mini-DIY/classicminidiy"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-github" />
              </span>
              <span>Contribute</span>
            </a>
          </v-col>

          <v-col cols="12" md="10" offset-md="1">
            <stats />
          </v-col>
          <recent-videos></recent-videos>
        </v-row>
      </div>
    </v-container>
    <div class="spacer layer1"></div>
    <div class="bg-color-section">
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <video autoplay loop muted playsinline aria-label="Classic Mini Toolbox animation">
              <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.webm" type="video/webm" />
              <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.mp4" type="video/mp4" />
            </video>
          </v-col>
          <v-col cols="12" md="7">
            <h3 class="fancy-font-book-oblique"><i class="fad fa-handshake-alt"></i> THE COMPLETELY FREE</h3>
            <h3 class="fancy-font-bold is-size-3">Classic Mini Toolbox</h3>
            <h4 class="fancy-font-book-oblique pt-20">THE TOOLKIT FOR THE DIY MECHANIC</h4>
            <p>
              One of the largest reasons for starting this channel, was about making infromation related to working your
              Mini Cooper more accessible. In service to this goal I have created the Classic Mini Toolbox. Combining
              information from all over the web to bring you one location to find anything you need.
            </p>
            <div class="column is-hidden-touch">
              <div class="columns is-centered pt-50 is-multiline">
                <div v-for="(item, index) in LandingPageToolboxItems" :key="index" class="column is-3">
                  <NuxtLink :to="item.to" :title="'Link to ' + item.to">
                    <article class="tile grow is-child has-text-centered">
                      <nuxt-img
                        class="panel-icon-home"
                        format="webp"
                        :src="item.image"
                        loading="lazy"
                        aria-hidden="true"
                        :alt="item.title + ' image'"
                      />
                      <p class="heading has-text-black">
                        {{ item.title }}
                      </p>
                    </article>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" class="is-hidden-desktop mobile-list">
            <nav class="panel">
              <p class="panel-heading">Find the Tool You Need</p>
              <NuxtLink
                v-for="(item, index) in LandingPageToolboxItems"
                :key="index"
                :to="item.to"
                class="panel-block is-active"
              >
                <span class="panel-icon">
                  <nuxt-img loading="lazy" format="webp" :src="item.image" :alt="item.title + ' image'" />
                </span>
                {{ item.title }}
              </NuxtLink>
            </nav>
          </v-col>
          <v-col cols="10" offset="1">
            <div class="divider">More</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" lg="6">
            <h2 class="fancy-font-book-oblique"><i class="fad fa-hands-heart"></i> SUPPORT THE CHANNEL</h2>
            <h3 class="fancy-font-bold is-size-3">Become a Patreon</h3>
            <p class="is-size-5">
              Classic Mini DIY is
              <strong>completely free resource</strong> supported by our viewers. If you are interested in helping to
              keep the channel alive, consider supporting on Patreon.
            </p>
            <a class="mt-4 button is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
              <span class="icon">
                <i class="fab fa-patreon" />
              </span>
              <span>Become a Member</span>
            </a>
            <v-card class="mt-10">
              <v-toolbar color="brand-green-2">
                <v-toolbar-title>Membership Includes</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-list lines="one" class="benefits-list">
                <v-list-item :title="'Access to Live DIY Chat'">
                  <template v-slot:prepend>
                    <v-avatar size="large">
                      <i class="is-size-3 fab fa-discord pt-2"></i>
                    </v-avatar>
                  </template>
                </v-list-item>
                <v-list-item :title="'Early Access to videos'">
                  <template v-slot:prepend>
                    <v-avatar size="large">
                      <i class="is-size-3 fad fa-video pt-2"></i>
                    </v-avatar>
                  </template>
                </v-list-item>
                <v-list-item :title="'Free gifts and merch'">
                  <template v-slot:prepend>
                    <v-avatar size="large">
                      <i class="is-size-3 fas fa-gift pt-2"></i>
                    </v-avatar>
                  </template>
                </v-list-item>
                <v-list-item :title="'Insider information and much more...'">
                  <template v-slot:prepend>
                    <v-avatar size="large">
                      <i class="is-size-3 fas fa-circle-info pt-2"></i>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <browser class="browser is-hidden-touch" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="spacer layer2"></div>
    <v-container class="mb-5">
      <v-row>
        <v-col cols="12" md="7">
          <h3 class="fancy-font-bold is-size-3"><i class="fad fa-address-card"></i> About Me</h3>
          <h4 class="fancy-font-book-oblique pt-20">MY NAME IS COLE</h4>
          <p>
            I am a {{ age }}-year-old Web Developer working in the financial industry. My experience in the automotive
            industry comes from 2 years of training on heavy diesel machinery and 8 years of Classic Mini ownership.
            With this experience, I do my best to provide the most comprehensive and technically correct information I
            can.
          </p>
          <h3 class="fancy-font-book-oblique pt-30">MY PROMISE</h3>
          <p>
            I will provide you with all the knowledge I can to the best of my ability. I will also accept feedback in
            the event that I get something incorrect. I am an enthusiast and not a complete expert so from time to time
            I will make mistakes.
          </p>
        </v-col>
        <v-col cols="12" md="5" class="avatar-container">
          <nuxt-img
            loading="lazy"
            src="https://classicminidiy.s3.amazonaws.com/misc/about-me.webp"
            alt="Image of my car on jack stands"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style lang="scss">
  .animation-section,
  .avatar-container img {
    max-width: 90%;
    margin: auto;
    margin-top: 35px;
    display: block;
    border-radius: 50px;
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

  .bg-color-section {
    background-color: #f0f0f0;
  }

  .phone {
    z-index: 2;
    position: relative;
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
</style>

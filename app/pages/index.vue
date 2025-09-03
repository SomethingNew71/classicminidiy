<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { DateTime } from 'luxon';
  import { HERO_TYPES } from '../../data/models/generic';

  const { t } = useI18n();
  const birthday = DateTime.local(1989, 5, 11);
  const today = DateTime.now();
  const age = ref<string | undefined>(today.diff(birthday, 'years').toObject().years?.toFixed(0));

  useHead({
    title: t('pages.home.title'),
    meta: [
      {
        name: 'description',
        content: t('pages.home.description'),
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.home.title'),
    ogDescription: t('pages.home.description'),
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/root.jpg',
    ogUrl: 'https://classicminidiy.com',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.home.title'),
    twitterDescription: t('pages.home.description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/root.jpg',
  });
</script>

<template>
  <hero
    :titleKey="'hero.home_title'"
    :subtitleKey="'hero.home_subtitle'"
    :size="'is-medium'"
    :special="true"
    :heroType="HERO_TYPES.HOME"
    :background="'/backdrop2'"
    :navigation="true"
  />
  <div class="spacer layer"></div>
  <div class="container mx-auto px-4 pt-10">
    <div class="grid grid-cols-12 gap-4 pb-5">
      <div class="col-span-12"></div>
      <div class="col-span-12 md:col-span-8">
        <h2 class="fancy-font-book-oblique"><i class="fad fa-book"></i> {{ $t('pages.home.mission.title') }}</h2>
        <h3 class="text-3xl font-bold pt-2 pb-3">{{ $t('pages.home.mission.heading') }}</h3>
        <p class="text-lg pb-5">
          {{ $t('pages.home.mission.content') }}
        </p>
        <stats />
      </div>
      <div class="col-span-12 md:col-span-4">
        <h3 class="fancy-font-book-oblique"><i class="fad fa-gift"></i> {{ $t('pages.home.support.title') }}</h3>
        <h4 class="text-3xl font-bold pt-2 pb-3">{{ $t('pages.home.support.heading') }}</h4>
        <p class="text-lg pt-2 pb-3">
          {{ $t('pages.home.support.content') }}
        </p>
        <a class="mr-3 btn text-lg is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fab fa-patreon" />
          </span>
          <span>{{ $t('common.donate') }}</span>
        </a>
        <a class="btn text-lg" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fab fa-github" />
          </span>
          <span>{{ $t('common.contribute') }}</span>
        </a>
      </div>
      <div class="pt-20 pb-10 grid grid-cols-subgrid col-span-12 gap-4">
        <recent-videos></recent-videos>
      </div>
    </div>
  </div>
  <div class="spacer layer1"></div>
  <div class="bg-color-section">
    <div class="container mx-auto px-4 pt-10">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-5">
          <video autoplay loop muted playsinline>
            <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.webm" type="video/webm" />
            <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="col-span-12 md:col-span-7">
          <h3 class="fancy-font-book-oblique">
            <i class="fad fa-handshake-alt"></i> {{ $t('pages.home.toolbox.title') }}
          </h3>
          <h3 class="text-3xl font-bold">{{ $t('pages.home.toolbox.heading') }}</h3>
          <h4 class="fancy-font-book-oblique pt-5 pb-5">{{ $t('pages.home.toolbox.subtitle') }}</h4>
          <p class="pb-5 text-lg">
            {{ $t('pages.home.toolbox.content') }}
          </p>
          <nuxt-link class="btn btn-primary text-lg" to="/technical"> {{ $t('pages.home.toolbox.button') }} </nuxt-link>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-8 lg:col-span-6">
          <h3 class="fancy-font-book-oblique pb-5">
            <i class="fad fa-hands-heart"></i> {{ $t('pages.home.patreon.title') }}
          </h3>
          <h3 class="text-3xl font-bold pb-5">{{ $t('pages.home.patreon.heading') }}</h3>
          <p class="text-lg">
            {{ $t('pages.home.patreon.content') }}
          </p>
          <a class="mt-5 mb-5 btn is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
            <span class="icon">
              <i class="fab fa-patreon" />
            </span>
            <span>{{ $t('pages.home.patreon.button') }}</span>
          </a>

          <div class="max-w-2xl mx-auto">
            <div class="p-4 mt-5 max-w-md bg-white rounded-lg shadow-md sm:p-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold leading-none">{{ $t('pages.home.patreon.benefits.title') }}</h3>
              </div>
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 benefits-list">
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fab fa-discord pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">{{ $t('pages.home.patreon.benefits.discord') }}</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-video pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">{{ $t('pages.home.patreon.benefits.early_access') }}</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-gift pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">{{ $t('pages.home.patreon.benefits.gifts') }}</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-circle-info pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">{{ $t('pages.home.patreon.benefits.insider') }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <browser class="browser is-hidden-touch" />
        </div>
      </div>
    </div>
  </div>
  <div class="spacer layer2"></div>
  <div class="mb-5">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-7 mb-5 pb-10">
          <h3 class="fancy-font-bold text-2xl">
            <i class="fad fa-address-card"></i> {{ $t('pages.home.about.title') }}
          </h3>
          <h4 class="fancy-font-book-oblique pt-5">{{ $t('pages.home.about.name') }}</h4>
          <p>
            {{ $t('pages.home.about.bio', { age: age }) }}
          </p>
          <h3 class="fancy-font-book-oblique pt-10">{{ $t('pages.home.about.promise_title') }}</h3>
          <p>
            {{ $t('pages.home.about.promise') }}
          </p>
        </div>
        <div class="col-span-12 md:col-span-5 avatar-container">
          <nuxt-img
            src="https://classicminidiy.s3.amazonaws.com/misc/about-me.webp"
            alt="Image of my car on jack stands"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Chat Input -->
  <FloatingChatInput />
  <SpeedInsights />
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

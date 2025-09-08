<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';

  const route = useRoute();
  const uuid = ref(route.query.uuid?.toString());
  const newWheel = route.query.newWheel === 'true' ? true : false;

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/archive/wheels/submit',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/wheels/submit',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/wheels.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/wheels.png',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
    <section id="scrollLocation" class="py-4">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
            <div class="breadcrumbs text-base">
              <ul>
                <li>
                  <NuxtLink to="/">
                    <i class="fas fa-home mr-1"></i>
                    {{ $t('breadcrumb.home') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/archive/wheels">
                    <i class="fas fa-tire mr-1"></i>
                    {{ $t('breadcrumb.wheels') }}
                  </NuxtLink>
                </li>
                <li>
                  <span>
                    <i class="fas fa-tire mr-1"></i>
                    {{ $t('breadcrumb.submission') }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <div class="col-span-12">
            <WheelSubmit v-if="!newWheel" :uuid="uuid"></WheelSubmit>
            <WheelSubmit v-if="newWheel" :newWheel="newWheel"></WheelSubmit>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Submit Wheel - Classic Mini DIY",
    "description": "Submit a wheel to the Classic Mini wheels database",
    "hero_title": "Submit Wheel",
    "breadcrumb": {
      "home": "Home",
      "wheels": "Wheels",
      "submission": "Submit"
    },
    "seo": {
      "og_title": "Submit Wheel - Classic Mini DIY",
      "og_description": "Submit a wheel to the Classic Mini wheels database",
      "twitter_title": "Submit Wheel - Classic Mini DIY",
      "twitter_description": "Submit a wheel to the Classic Mini wheels database"
    }
  }
}
</i18n>

<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';

  const route = useRoute();
  const uuid = ref(route.query.uuid?.toString());
  const newWheel = route.query.newWheel === 'true' ? true : false;

  useHead({
    title: 'Submit a Wheel',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Submit a wheel to the Classic Mini DIY wheel dictionary.',
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
    ogTitle: 'Submit a Wheel',
    ogDescription: 'Submit a wheel to the Classic Mini DIY wheel dictionary.',
    ogUrl: 'https://classicminidiy.com/archive/wheels/submit',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/wheels.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Submit a Wheel',
    twitterDescription: 'Submit a wheel to the Classic Mini DIY wheel dictionary.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/wheels.png',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Submit a Wheel'" :heroType="HERO_TYPES.ARCHIVE" />
    <section id="scrollLocation" class="py-4">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
            <div class="breadcrumbs text-base">
              <ul>
                <li>
                  <NuxtLink to="/">
                    <i class="fas fa-home mr-1"></i>
                    Home
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/archive/wheels">
                    <i class="fas fa-tire mr-1"></i>
                    Wheels
                  </NuxtLink>
                </li>
                <li>
                  <span>
                    <i class="fas fa-tire mr-1"></i>
                    Wheel Submission
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

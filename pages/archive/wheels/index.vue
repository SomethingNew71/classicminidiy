<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { HERO_TYPES } from '~/data/models/generic';
  useHead({
    title: 'Archive - Wheel Dictionary',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - Wheel Dictionary',
    ogDescription:
      'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
    ogUrl: 'classicminidiy.com/archive/wheels',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Wheel Dictionary'" :heroType="HERO_TYPES.ARCHIVE" />
    <v-container>
      <v-row align="center">
        <v-col cols="8">
          <breadcrumb page="Wheel Library"></breadcrumb>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="8">
          <h2 class="subtitle">The Classic Mini DIY Wheel Dictionary</h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Library comes in. You can now search for the right wheel for your Classic Mini Cooper. With
            <strong>about 1,000 wheels</strong> and growing, we hope you'll be able to find exactly the wheel you are
            looking for.
          </p>
        </v-col>
        <v-col cols="12" md="4">
          <NuxtLink :to="'/archive/wheels/submit?newWheel=true'" :title="'Link to new wheel form'">
            <div class="card callout-card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image">
                      <v-icon icon="fad fa-rectangle-history-circle-plus" size="x-large"></v-icon>
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="subtitle">Want to add a wheel?</h2>
                    <p>Click here to complete our wheel submission form to get it added to our list.</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mb-4">
        <v-col cols="12">
          <WheelGrid></WheelGrid>
        </v-col>
      </v-row>
      <v-footer class="bg-light-grey-lighten-1 text-center d-flex flex-column">
        <div class="pt-0">
          <h2 class="subtitle">
            All data collected and currated by Jan W. from
            <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer">Mini-Forum.de</a>.
          </h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Library comes in. Using the same data from the now retired site,
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can search for the right wheel for your Classic
            Mini Cooper. With <strong>lots wheels in the library</strong> and growing, we hope you'll be able to find
            exactly the wheel you are looking for.
          </p>
        </div>
      </v-footer>
      <v-divider></v-divider>
    </v-container>
    <SpeedInsights />
  </div>
</template>

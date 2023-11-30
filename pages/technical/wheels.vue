<template>
  <div>
    <hero :navigation="true" :title="'Wheel Dictionary'" />
    <v-container>
      <v-row align="center">
        <v-col cols="8">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fas fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fas fa-book" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fas fa-tire" aria-hidden="true" />
                  </span>
                  <span>Wheel Library</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="8">
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
        </v-col>
        <v-col cols="4">
          <NuxtLink :to="'/wheelSubmission'" :title="'Link to new wheel form'">
            <div class="card callout-card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <v-icon icon="fad fa-circle-up" size="xlarge"></v-icon>
                    </figure>
                  </div>
                  <div class="media-content">
                    <h2 class="subtitle">What to add a wheel?</h2>
                    <p>Click here to complete our wheel submission form to get it added to our list.</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <Wheels></Wheels>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import { VCol, VContainer, VRow } from 'vuetify/components/VGrid';
  import { VIcon } from 'vuetify/components/VIcon';
  import { VDivider } from 'vuetify/components/VDivider';
  useHead({
    title: 'Tech - Wheel Dictionary',
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
    ogTitle: 'Tech - Wheel Dictionary',
    ogDescription:
      'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
    ogUrl: 'classicminidiy.com/technical/wheels',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
    ogType: 'website',
  });
</script>

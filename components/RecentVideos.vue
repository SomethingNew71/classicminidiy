<template>
  <v-row>
    <h3 class="fancy-font-bold is-size-3 has-text-centered pb-5">Recent Videos</h3>

    <template v-if="pending">
      <v-row>
        <v-col cols="12" md="3" v-for="item in 3">
          <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>

    <template v-else-if="error">
      <p>Unable to load youtube data</p>
    </template>

    <v-row v-else-if="videos">
      <v-col cols="12" md="4" v-for="video in videos">
        <v-card class="mx-auto" max-width="344" :href="video.videoUrl">
          <v-img :src="video.thumbnails.maxres" height="250px">
            <template #sources>
              <source media="(max-width: 799px)" :srcset="video.thumbnails.medium" />
              <source media="(max-width: 992px)" :srcset="video.thumbnails.high" />
              <source media="(max-width: 1200px)" :srcset="video.thumbnails.standard" />
            </template>
          </v-img>
          <v-card-title>{{ video.title }}</v-card-title>
          <v-card-subtitle class="pb-5"> published on {{ video.publishedOn }} </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script setup lang="ts">
  import { VCol, VRow } from 'vuetify/components/VGrid';
  import { VCard, VCardTitle, VCardSubtitle } from 'vuetify/components/VCard';
  import { VImg } from 'vuetify/components/VImg';
  import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
  const { data: videos, pending, error } = await useFetch('/api/youtube/videos');
</script>

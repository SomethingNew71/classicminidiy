<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  const loading = ref(true);
  const companies = await queryContent('archive/companies')
    .find()
    .then((response) =>
      response.sort((a, b) => {
        const k1 = a.download === null ? 0 : 1;
        const k2 = b.download === null ? 0 : 2;
        return k2 - k1;
      })
    )
    .finally(() => (loading.value = false));

  const crumbs = ref([
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: 'Archive',
      disabled: false,
      href: '/archive',
    },
    {
      title: 'Aftermarket',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Aftermarket Companies',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Currated collection of Classic Mini Aftermarket Companies and their contributions to the mini over the years',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Aftermarket Companies',
    ogDescription:
      'Currated collection of Classic Mini Aftermarket Companies and their contributions to the mini over the years',
    ogUrl: 'classicminidiy.com/archive/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="9">
        <h1 class="title">Aftermarket Companies</h1>
        <p>
          Evolving historical record of all the various aftermarket companies who provided contributions to the Classic
          Mini over the years.
        </p>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col v-for="company in companies" cols="12" md="4">
        <v-card>
          <v-img width="60%" height="100" class="mx-auto py-10" :src="company.image"></v-img>
          <div>
            <v-card-title class="text-body-1 font-weight-bold text-center text-capitalize">
              {{ company.title?.toLowerCase() }}
            </v-card-title>
            <v-card-actions>
              <v-btn
                block
                color="brand-green-3"
                class="text-none"
                prepend-icon="fa-duotone fa-solid fa-book"
                variant="flat"
                :to="`/archive/companies/${company.slug}`"
              >
                Explore
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

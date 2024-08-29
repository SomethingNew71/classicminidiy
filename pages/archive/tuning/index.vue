<script setup lang="ts">
  const { data: archives } = await useFetch(() => '/api/archive/tuning-archives');
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
      title: 'Tuning & Accessories',
      disabled: true,
    },
  ]);

  async function sharePage(title: string = '', url: string) {
    try {
      await navigator.share({ title, url });
    } catch (error) {
      console.error('cannot share', error);
    }
  }
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="12">
        <h1 class="title pb-3">The Tuning & Accessory Archive</h1>
        <h1 class="subtitle">
          The most comprehensive archive of companies involved in improving the Mini & other cars of the 60's.
        </h1>
        <p>
          This is a continuously growing archive of original advertising and sales material from a variety of tuning &
          accessory companies of the 1960's & early 1970's. It is by no means a comprehensive list, it is merely a list
          of companies I have some records for. Most of the companies featured played an important part in the success
          of the Mini as a competition or fun car. As you will be able to see from the companies & items listed below.
          The Mini modifying market really did span from the totally sublime to the patently ridiculous.
        </p>
      </v-col>
      <v-divider></v-divider>
      <v-row class="pt-5">
        <template v-for="(archive, index) in archives">
          <v-col cols="12" md="3">
            <v-card class="text-center text-capitalize">
              <v-img class="mt-3" height="100" :src="archive.image"></v-img>
              <v-card-title class="text-capitalize py-5"> {{ archive.companyName.toLowerCase() }} </v-card-title>
              <!-- <v-card-subtitle> {{ archive.description }} </v-card-subtitle> -->
              <v-card-actions>
                <v-btn width="100%" color="primary" text="Explore" :variant="'tonal'" :to="archive.link"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-row>
  </v-container>
</template>

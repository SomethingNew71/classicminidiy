<script setup lang="ts">
  import { ARCHIVE_TYPES, shareArchiveItem, submitArchiveFile } from '~/data/models/helper-utils';
  const loading = ref(true);
  const manuals = await queryContent('archive/manuals')
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
      title: 'Workshop Manuals',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Workshop Manuals',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini workshop manuals, parts lists and more.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Workshop Manuals',
    ogDescription: 'Currated collection of Classic Mini workshop manuals, parts lists and more.',
    ogUrl: 'classicminidiy.com/archive/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
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
      <v-col cols="9">
        <h1 class="title">Parts Lists & Workshop Manuals</h1>
        <p>
          Free copies of the unabridged workshop manuals. Including early manuals as well as later workshop manuals used
          on the final production cars.
        </p>
      </v-col>
      <v-col v-for="manual in manuals" cols="12" md="6">
        <v-card elevation="4">
          <v-row>
            <v-col cols="4" class="text-center">
              <v-icon
                class="mx-auto pt-10"
                size="88"
                v-if="!manual.image || manual.image === ''"
                icon="fad fa-image-slash"
              ></v-icon>
              <v-img v-else :src="manual.image" class="pa-10 mx-auto my-auto mt-3"></v-img>
            </v-col>
            <v-col cols="8">
              <h2 class="text-h5 pt-5 pb-2 px-5" :class="{ 'pb-5': manual.download }">
                {{ manual.title }}
              </h2>
              <p v-if="!manual.download || manual.download === ''" class="px-5 pb-5">
                <v-chip prepend-icon="fa-duotone fa-solid fa-question" color="error"> File Missing </v-chip>
              </p>
              <p class="px-5">{{ manual.description }}</p>
              <v-divider></v-divider>

              <div class="pa-4 d-flex justify-end">
                <client-only>
                  <template v-if="!manual.download || manual.download === ''">
                    <v-btn
                      class="me-2 text-none"
                      color="secondary"
                      prepend-icon="fa-duotone fa-solid fa-plus-large"
                      variant="elevated"
                      border
                      @click="
                        submitArchiveFile(
                          ARCHIVE_TYPES.MANUAL,
                          manual.title,
                          manual._path,
                          manual.code,
                          manual.description
                        )
                      "
                    >
                      Contribute
                    </v-btn>
                    <v-btn
                      disabled
                      color="primary"
                      class="text-none"
                      prepend-icon="fa-duotone fa-solid fa-question"
                      variant="flat"
                    >
                      Missing File
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-btn
                      class="me-2 text-none"
                      color="accent"
                      prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                      variant="flat"
                      border
                      @click="shareArchiveItem(manual.title, manual._path)"
                    >
                      Share
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="text-none"
                      prepend-icon="fa-duotone fa-solid fa-download"
                      variant="flat"
                      :href="manual.download"
                    >
                      Download
                    </v-btn>
                  </template>
                </client-only>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

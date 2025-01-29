<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  import { ARCHIVE_TYPES, shareArchiveItem, submitArchiveFile } from '~/data/models/helper-utils';

  const { data: adverts, status } = await useAsyncData(() => queryCollection('adverts').all());
  const search = ref('');

  adverts?.value?.sort((a, b) => {
    const k1 = a.download === null ? 0 : 1;
    const k2 = b.download === null ? 0 : 2;
    return k2 - k1;
  });

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
      title: 'Advertisments',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Advertisments',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini original Advertisments',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Advertisments',
    ogDescription: 'Currated collection of Classic Mini original Advertisments',
    ogUrl: 'classicminidiy.com/archive/adverts',
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
        <h1 class="title">Original Advertisments</h1>
        <p>Free copies of the unabridged Advertisments.</p>
      </v-col>

      <v-col cols="12">
        <v-data-iterator :loading="status === 'pending'" :items="adverts || []" :items-per-page="12" :search="search">
          <template v-slot:header>
            <v-card-text class="pb-10">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="fad fa-search"
                    placeholder="Search for anything (ex. Momos, 10in, ET20)"
                    hide-details
                    variant="solo-filled"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </template>

          <template v-slot:default="{ items }">
            <v-row class="px-2">
              <v-col v-for="{ raw: advert } in items" :key="advert.id" cols="12" md="6">
                <v-card elevation="4">
                  <v-row>
                    <v-col cols="4" class="text-center">
                      <v-icon
                        class="mx-auto pt-10"
                        size="88"
                        v-if="!advert.image || advert.image === ''"
                        icon="fad fa-image-slash"
                      ></v-icon>
                      <v-img v-else :src="advert.image" class="pa-10 mx-auto my-auto mt-3"></v-img>
                    </v-col>
                    <v-col cols="8">
                      <h2 class="text-h5 pt-5 pb-2 px-5" :class="{ 'pb-5': advert.download }">
                        {{ advert.title }}
                      </h2>
                      <h4 v-if="advert.download" class="px-5 pb-2">
                        <v-icon color="secondary" icon="fad fa-file" start></v-icon>
                        <span class="text-button ms-1"> Type: {{ advert?.download?.split('.').pop() }} </span>
                      </h4>
                      <h4 v-if="!advert.download || advert.download === ''" class="px-5 pb-2">
                        <v-chip prepend-icon="fa-duotone fa-solid fa-question" color="error"> File Missing </v-chip>
                      </h4>
                      <h4 class="px-5 pb-5">
                        <v-icon color="primary" icon="fad fa-list-timeline" start></v-icon>
                        <span class="text-button ms-1"> {{ advert.code }} </span>
                      </h4>
                      <p class="px-5">{{ advert.description }}</p>
                      <v-divider></v-divider>

                      <div class="pa-4 d-flex justify-end">
                        <ClientOnly>
                          <template v-if="!advert.download || advert.download === ''">
                            <v-btn
                              disabled
                              color="primary"
                              class="text-none me-1"
                              prepend-icon="fa-duotone fa-solid fa-question"
                              variant="flat"
                            >
                              Missing File
                            </v-btn>
                            <v-btn
                              class="me-1 text-none"
                              color="secondary"
                              prepend-icon="fa-duotone fa-solid fa-plus-large"
                              variant="elevated"
                              border
                              @click="
                                submitArchiveFile(
                                  ARCHIVE_TYPES.ADVERT,
                                  advert.title,
                                  advert.path,
                                  advert.code,
                                  advert.description
                                )
                              "
                            >
                              Contribute
                            </v-btn>
                          </template>
                          <template v-else>
                            <v-btn
                              class="me-2 text-none"
                              color="brand-blue-1"
                              prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                              variant="flat"
                              border
                              @click="shareArchiveItem(advert.title, advert.path)"
                            >
                              Share
                            </v-btn>
                            <v-btn
                              class="me-1 text-none"
                              color="secondary"
                              prepend-icon="fa-duotone fa-solid fa-plus-large"
                              variant="elevated"
                              border
                              @click="
                                submitArchiveFile(
                                  ARCHIVE_TYPES.ADVERT,
                                  advert.title,
                                  advert.path,
                                  advert.code,
                                  advert.description
                                )
                              "
                            >
                              Contribute
                            </v-btn>
                            <v-btn
                              color="primary"
                              class="text-none"
                              prepend-icon="fa-duotone fa-solid fa-download"
                              variant="flat"
                              :href="advert.download"
                            >
                              Download
                            </v-btn>
                          </template>
                        </ClientOnly>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <v-col v-if="adverts?.length === 0" cols="12" class="text-center">
              <v-card flat>
                <v-card-text class="text-body">No wheels meeting current filters exist</v-card-text>
              </v-card>
            </v-col>
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="fad fa-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              ></v-btn>
              <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>
              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="fad fa-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              ></v-btn>
            </div>
          </template>

          <template v-slot:loader>
            <v-row>
              <v-col v-for="(_, k) in 12" :key="k" cols="12" sm="3">
                <v-skeleton-loader class="border" type="image, article"></v-skeleton-loader>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

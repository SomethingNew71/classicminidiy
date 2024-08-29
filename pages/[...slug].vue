<script setup lang="ts">
  import type { Post } from '~/data/models/archive';
  const { path, fullPath } = await useRoute();
  const currentPostData = ref<Post>();
  const isLoading = ref(true);
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
      disabled: false,
      href: '/archive/workshop-manuals',
    },
  ]);

  await queryContent(path)
    .findOne()
    .then(async (res: Post) => {
      currentPostData.value = { ...res, slug: path };
      crumbs.value.push({
        title: currentPostData.value.title || '',
        disabled: true,
        href: '',
      });
      useHead({
        title: `Classic Mini Archive - ${currentPostData.value.title}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: currentPostData.value.description,
          },
        ],
      });
      useSeoMeta({
        ogTitle: `Classic Mini Archive - ${currentPostData.value.title}`,
        ogDescription: currentPostData.value.description,
        ogUrl: fullPath,
        // ogImage: `https://classicminidiy.com${currentPostData.value.image}`,
        ogType: 'article',
        author: currentPostData.value.author,
      });
    })
    .catch((e) => console.log(e))
    .finally(() => {
      isLoading.value = false;
    });
</script>

<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" />
  <v-container>
    <v-row class="pt-5 mt-5" v-if="currentPostData">
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="12" md="3">
        <v-img :src="currentPostData.image"></v-img>
      </v-col>
      <v-col cols="12" md="9" class="post">
        <h2 class="text-h5 pt-5 pb-5 px-5">{{ currentPostData.title }}</h2>
        <p class="px-5">{{ currentPostData.description }}</p>
        <v-divider></v-divider>

        <div class="pa-4 d-flex align-center">
          <client-only>
            <v-icon color="primary" icon="fad fa-list-timeline" start></v-icon>

            <span class="text-button ms-1"> {{ currentPostData.code }} </span>

            <v-spacer></v-spacer>

            <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>

            <v-btn
              class="me-2 text-none"
              color="accent"
              prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
              variant="text"
              border
            >
              Share
            </v-btn>

            <v-btn
              color="primary"
              class="text-none"
              prepend-icon="fa-duotone fa-solid fa-download"
              variant="flat"
              :href="currentPostData.download"
            >
              Download
            </v-btn>
          </client-only>
        </div>
        <!-- <ContentDoc /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

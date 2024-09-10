<script setup lang="ts">
  import type { Post } from '~/data/models/archive';
  import { ARCHIVE_TYPES, shareArchiveItem, submitArchiveFile } from '~/data/models/helper-utils';
  const { path, fullPath } = await useRoute();
  const currentPostData = ref<Post | null>(null);
  const isLoading = ref(true);
  const crumbs = ref([
    {
      title: 'Archive',
      disabled: false,
      href: '/archive',
    },
  ]);

  await queryContent(path.toLowerCase())
    .findOne()
    .then(async (res: Post) => {
      currentPostData.value = { ...res, slug: path };
      crumbs.value.push({
        title: currentPostData.value.title || '',
        disabled: true,
        href: '',
      });
    })
    .catch((e) => console.log(e))
    .finally(() => {
      isLoading.value = false;
    });

  await useHead({
    title: `Classic Mini Archive - ${currentPostData.value?.title}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: currentPostData.value?.description,
      },
    ],
  });
  await useSeoMeta({
    ogTitle: `Classic Mini Archive - ${currentPostData.value?.title}`,
    ogDescription: currentPostData.value?.description,
    ogUrl: fullPath,
    ogImage: currentPostData.value?.image,
    ogType: 'article',
    author: currentPostData.value?.author,
  });
</script>

<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" />
  <v-container>
    <v-row class="pt-5 mt-5" v-if="currentPostData">
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-book"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="5" sm="3" md="2">
        <v-img :src="currentPostData.image"></v-img>
      </v-col>
      <v-col cols="12" sm="9" md="10" class="post">
        <h2 class="text-h4 text-capitalize pb-2 px-5">{{ currentPostData.title?.toLowerCase() }}</h2>
        <h3 class="px-5 pb-5" v-if="currentPostData._path?.includes('manuals')">
          <v-icon color="primary" icon="fad fa-list-timeline" start></v-icon>
          <span class="text-button ms-1"> {{ currentPostData.code }} </span>
        </h3>
        <template v-if="currentPostData._path?.includes('manuals')">
          <p class="px-5">{{ currentPostData.description }}</p>
        </template>
        <template v-if="currentPostData._path?.includes('companies')">
          <div class="companies-content px-5 pt-4">
            <ContentDoc />
          </div>
        </template>
        <v-divider></v-divider>

        <div class="pa-4 d-flex flex-wrap">
          <client-only>
            <v-btn
              class="m-1 text-none"
              color="brand-blue-1"
              prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
              variant="flat"
              border
              @click="shareArchiveItem(currentPostData.title, currentPostData._path)"
            >
              Share
            </v-btn>
            <v-btn
              class="m-1 text-none"
              color="secondary"
              prepend-icon="fa-duotone fa-solid fa-plus-large"
              variant="elevated"
              border
              @click="
                submitArchiveFile(
                  ARCHIVE_TYPES.MANUAL,
                  currentPostData.title,
                  currentPostData._path,
                  currentPostData.code,
                  currentPostData.description
                )
              "
            >
              Contribute
            </v-btn>
            <v-btn
              v-if="
                (!currentPostData.download || currentPostData.download === '') &&
                !currentPostData._path?.includes('companies')
              "
              disabled
              color="primary"
              class="text-none"
              prepend-icon="fa-duotone fa-solid fa-question"
              variant="flat"
            >
              Missing File
            </v-btn>
            <v-btn
              color="primary"
              class="text-none m-1"
              prepend-icon="fa-duotone fa-solid fa-download"
              variant="flat"
              :href="currentPostData.download"
              v-else-if="!currentPostData._path?.includes('companies')"
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

<style lang="scss">
  .companies-content {
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      padding-bottom: 1rem;
    }
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      padding-bottom: 1rem;
    }
    p {
      padding-bottom: 1.5rem;
    }
  }
</style>

<script setup lang="ts">
  import type { Post } from '~/data/models/archive';
  import { ARCHIVE_TYPES, generateArchiveSubmissionMailto } from '~/data/models/helper-utils';
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
      title: 'Manuals',
      disabled: false,
      href: '/archive/manuals',
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
  async function sharePage(title: string = '', url: string) {
    try {
      await navigator.share({ title, url });
    } catch (error) {
      console.error('cannot share', error);
    }
  }
  async function submitFile(title: string = '', url: string = '', code: string = '', body: string = '') {
    try {
      window.location.href = await generateArchiveSubmissionMailto(ARCHIVE_TYPES.MANUAL, {
        title,
        url,
        body,
        code,
      });
    } catch (error) {
      console.error('cannot contribute', error);
    }
  }
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

            <template v-if="!currentPostData.download || currentPostData.download === ''">
              <v-btn
                class="me-2 text-none"
                color="secondary"
                prepend-icon="fa-duotone fa-solid fa-plus-large"
                variant="elevated"
                border
                @click="
                  submitFile(
                    currentPostData.title,
                    currentPostData.url,
                    currentPostData.code,
                    currentPostData.description
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
                @click="sharePage(currentPostData.title, currentPostData.url)"
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
            </template>
          </client-only>
        </div>
        <!-- <ContentDoc /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

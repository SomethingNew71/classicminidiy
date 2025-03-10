<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  import { determineArchiveType, shareArchiveItem, submitArchiveFile } from '~/data/models/helper-utils';
  const { path, fullPath } = await useRoute();
  const crumbs = ref([
    {
      title: 'Archive',
      disabled: false,
      href: '/archive',
    },
  ]);

  const { data: currentPostData, status } = await useAsyncData(path, () => {
    return queryCollection('content').path(path).first();
  });

  const archiveType = determineArchiveType(path);
  const fileType = currentPostData?.value?.download?.split('.').pop();

  crumbs.value.push({
    title: currentPostData?.value?.title || '',
    disabled: true,
    href: '',
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
  <hero :navigation="true" :title="'Classic Mini Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row class="pt-5 mt-5">
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon hydrate-on-visible size="small" icon="fad fa-book"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <template v-if="status === 'pending'">
        <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
      </template>
      <template v-if="currentPostData && status !== 'pending'">
        <v-col cols="5" sm="3" md="2">
          <v-icon
            hydrate-on-visible
            class="mx-auto pt-10"
            size="88"
            v-if="!currentPostData.image || currentPostData.image === ''"
            icon="fad fa-image-slash"
          ></v-icon>
          <a v-else-if="currentPostData.download && currentPostData.download !== ''" :href="currentPostData.download">
            <v-img :src="currentPostData.image" max-height="150"> </v-img>
          </a>
          <v-img v-else :src="currentPostData.image" class="pa-10 mx-auto my-auto mt-3"></v-img>
        </v-col>
        <v-col cols="12" sm="9" md="10" class="post">
          <h2 class="text-h4 text-capitalize pb-2 px-5">{{ currentPostData.title?.toLowerCase() }}</h2>
          <h3 class="px-5 pb-5">
            <v-icon hydrate-on-visible color="primary" icon="fad fa-list-timeline" start></v-icon>
            <span class="text-button ms-1"> {{ currentPostData.code }} </span>
          </h3>
          <h3 v-if="currentPostData.download" class="px-5 pb-5">
            <v-icon hydrate-on-visible color="secondary" icon="fad fa-file" start></v-icon>
            <span class="text-button ms-1"> Type: {{ fileType }} </span>
          </h3>
          <p class="px-5">{{ currentPostData.description }}</p>

          <v-divider></v-divider>

          <div class="pa-4 d-flex flex-wrap">
            <ClientOnly>
              <v-btn
                class="m-1 text-none"
                color="brand-blue-1"
                prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                variant="flat"
                border
                @click="shareArchiveItem(currentPostData.title, currentPostData.path)"
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
                    archiveType,
                    currentPostData.title,
                    currentPostData.path,
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
                  !currentPostData.path?.includes('companies')
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
                v-else-if="!currentPostData.path?.includes('companies')"
              >
                Download
              </v-btn>
            </ClientOnly>
          </div>
        </v-col>
      </template>
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

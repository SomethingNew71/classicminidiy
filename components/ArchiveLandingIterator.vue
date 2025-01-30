<script lang="ts" setup>
  import type { AdvertsCollectionItem, ContentCollectionItem, ManualsCollectionItem } from '@nuxt/content';
  import type { PropType } from 'vue';
  import { shareArchiveItem, submitArchiveFile, type ARCHIVE_TYPES } from '~/data/models/helper-utils';

  const search = ref('');
  defineProps({
    archiveType: {
      type: String as PropType<ARCHIVE_TYPES>,
      default: '',
    },
    content: {
      type: Array as PropType<AdvertsCollectionItem[] | ManualsCollectionItem[] | ContentCollectionItem[] | null>,
      default: [],
    },
    loading: {
      type: String as PropType<'idle' | 'pending' | 'success' | 'error'>,
    },
  });
</script>

<template>
  <v-data-iterator :loading="loading === 'pending'" :items="content || []" :items-per-page="12" :search="search">
    <template v-slot:header>
      <v-card-text class="pb-10">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              prepend-inner-icon="fad fa-search"
              placeholder="Search for anything (ex. MPI, Cooper S, Carburettor HIF44)"
              hide-details
              variant="solo-filled"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <template v-slot:default="{ items }">
      <v-row dense>
        <v-col v-for="{ raw: item } in items" :key="item.title" cols="auto" md="6" lg="4">
          <v-card class="pb-3 pt-3" border flat>
            <v-icon
              class="mx-auto pt-10 text-center text-h2 d-block pb-10"
              v-if="!item.image || item.image === ''"
              icon="fad fa-image-slash"
            >
            </v-icon>
            <a v-else-if="item.download && item.download !== ''" :href="item.download">
              <v-img :src="item.image" max-height="150"> </v-img>
            </a>
            <v-img v-else :src="item.image" max-height="150"> </v-img>

            <v-icon
              class="text-h4 text-right pr-3 d-flex ms-auto"
              color="secondary"
              :icon="'fa-duotone fa-solid fa-file-' + item?.download?.split('.').pop()?.toLowerCase()"
            >
            </v-icon>

            <v-list-item class="mb-2">
              <template v-slot:title>
                <strong class="text-h6 mb-2">{{ item.title }}</strong>
              </template>
              <v-list-item-subtitle class="d-flex justify-space-between">
                <span>Sort Key: {{ item.code }}</span>
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="pb-3">
              <v-list-item-title class="text-caption">{{ item.description }}</v-list-item-title>
            </v-list-item>

            <div class="d-flex justify-space-between px-4">
              <v-btn
                class="text-none"
                size="small"
                prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                variant="flat"
                border
                @click="shareArchiveItem(item.title, item.path)"
              >
                Share
              </v-btn>
              <v-btn
                class="text-none"
                color="brand-blue-1"
                prepend-icon="fa-duotone fa-solid fa-plus-large"
                variant="elevated"
                size="small"
                border
                @click="submitArchiveFile(archiveType, item.title, item.path, item.code, item.description)"
              >
                Contribute
              </v-btn>
              <v-btn
                v-if="item.download && item.download !== ''"
                class="text-none"
                color="primary"
                size="small"
                text="Download"
                variant="flat"
                prepend-icon="fa-duotone fa-solid fa-download"
                :href="item.download"
                border
              >
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
      <v-col v-if="content?.length === 0" cols="12" class="text-center">
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
</template>

<style lang="scss">
  .v-list-item-title {
    -webkit-hyphens: unset;
    hyphens: unset;
    overflow-wrap: unset;
    overflow: unset;
    white-space: unset;
    text-overflow: unset;
    word-break: unset;
    word-wrap: unset;
  }
</style>

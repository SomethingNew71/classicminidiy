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
      <v-row class="px-2">
        <v-col v-for="{ raw: element } in items" :key="element.id" cols="12" md="6">
          <v-card elevation="4">
            <v-row>
              <v-col cols="4" class="text-center">
                <v-icon
                  class="mx-auto pt-10"
                  size="88"
                  v-if="!element.image || element.image === ''"
                  icon="fad fa-image-slash"
                ></v-icon>
                <v-img v-else :src="element.image" class="pa-10 mx-auto my-auto mt-3"></v-img>
              </v-col>
              <v-col cols="8">
                <h2 class="text-h5 pt-5 pb-2 px-5" :class="{ 'pb-5': element.download }">
                  {{ element.title }}
                </h2>
                <h4 v-if="element.download" class="px-5 pb-2">
                  <v-icon color="secondary" icon="fad fa-file" start></v-icon>
                  <span class="text-button ms-1"> Type: {{ element?.download?.split('.').pop() }} </span>
                </h4>
                <h4 v-if="!element.download || element.download === ''" class="px-5 pb-2">
                  <v-chip prepend-icon="fa-duotone fa-solid fa-question" color="error"> File Missing </v-chip>
                </h4>
                <h4 class="px-5 pb-5">
                  <v-icon color="primary" icon="fad fa-list-timeline" start></v-icon>
                  <span class="text-button ms-1"> {{ element.code }} </span>
                </h4>
                <p class="px-5">{{ element.description }}</p>
                <v-divider></v-divider>

                <div class="pa-4 d-flex justify-end">
                  <ClientOnly>
                    <template v-if="!element.download || element.download === ''">
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
                          submitArchiveFile(archiveType, element.title, element.path, element.code, element.description)
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
                        @click="shareArchiveItem(element.title, element.path)"
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
                          submitArchiveFile(archiveType, element.title, element.path, element.code, element.description)
                        "
                      >
                        Contribute
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="text-none"
                        prepend-icon="fa-duotone fa-solid fa-download"
                        variant="flat"
                        :href="element.download"
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

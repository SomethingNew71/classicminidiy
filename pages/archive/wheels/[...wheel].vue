<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import { shareWheelItem } from '~/data/models/helper-utils';
  import type { IWheelsData } from '~/data/models/wheels';
  const { params } = await useRoute();
  const wheelId = ref(params.wheel);
  let { data: wheel, status } = await useFetch<IWheelsData>(`/api/wheels/wheel`, {
    query: {
      uuid: wheelId.value[0],
    },
  });
  const copied = ref<boolean>(false);
  let shareImage: string;
  if (wheel.value?.images && wheel.value?.images?.length > 0) {
    shareImage = wheel.value.images[0].src;
  } else {
    shareImage = 'no-image';
  }

  async function copyUrl() {
    const url = `https://classicminidiy.com/archive/wheels/${wheel.value?.uuid}`;
    try {
      await navigator.clipboard.writeText(url);
      copied.value = true;
      setTimeout(() => (copied.value = false), 1000);
    } catch ($e) {
      copied.value = false;
    }
  }

  useHead({
    title: `Mini Wheels - ${wheel.value?.name} | ${wheel.value?.size} x ${wheel.value?.width}`,
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Check out the Clasic Mini wheel I am looking at right now.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: `Mini Wheels - ${wheel.value?.name} | ${wheel.value?.size} x ${wheel.value?.width}`,
    ogDescription: 'Check out the Clasic Mini wheel I am looking at right now.',
    ogUrl: `classicminidiy.com/archive/wheels/${wheel.value?.uuid}`,
    ogImage: shareImage,
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Color Swatch'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row align="center">
      <v-col cols="8">
        <breadcrumb :page="wheel?.name" subpage="Wheels" subpage-href="/archive/wheels"></breadcrumb>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="status === 'pending'" elevation="4">
          <template v-if="wheel">
            <v-card-text class="pl-10 py-0 pt-3">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="6" class="top-section">
                  <h1 class="text-h4">{{ wheel.name }}</h1>
                  <h2 class="text-subtitle-1 pt-4">{{ wheel.notes }}</h2>
                </v-col>

                <v-col cols="12" md="6" class="pt-2">
                  <v-carousel v-if="wheel.images && wheel.images.length > 1" height="300" hide-delimiters>
                    <template v-for="image in wheel.images">
                      <v-carousel-item :src="image.src" rounded></v-carousel-item>
                    </template>
                  </v-carousel>
                  <v-img
                    :alt="`Image of the ${wheel.name} wheels`"
                    max-height="300"
                    max-width="300"
                    class="wheel-image"
                    rounded="lg"
                    v-else-if="wheel.images"
                    cover
                    :src="wheel.images[0].src"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-row class="d-flex py-3 justify-space-between">
              <v-col cols="12" sm="6" md="3">
                <v-list-item prepend-icon="fad fa-arrow-right-to-line">
                  <v-list-item-title>Offset</v-list-item-title>
                  <v-list-item-subtitle v-if="wheel.offset">{{ wheel.offset }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" sm="6" md="3">
                <v-list-item prepend-icon="fad fa-arrows-to-line">
                  <v-list-item-title>Diameter</v-list-item-title>
                  <v-list-item-subtitle v-if="wheel.size">{{ wheel.size }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" sm="6" md="3">
                <v-list-item prepend-icon="fad fa-arrows-left-right-to-line">
                  <v-list-item-title>Width</v-list-item-title>
                  <v-list-item-subtitle v-if="wheel.width">{{ wheel.width }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-space-around">
              <v-btn v-if="copied" prepend-icon="fad fa-link" disabled size="large">Copied</v-btn>
              <v-btn v-else prepend-icon="fad fa-link" @click="copyUrl()" size="large">Copy Link</v-btn>
              <v-btn
                @click="shareWheelItem(wheel.name, wheel.uuid)"
                size="large"
                prepend-icon="fad fa-solid fa-arrow-up-from-bracket"
              >
                Share
              </v-btn>
              <v-btn
                class="text-center"
                size="large"
                prepend-icon="fad fa-edit"
                :to="`/archive/wheels/submit?uuid=${wheel.uuid}`"
              >
                Contribute
              </v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  @media (max-width: 600px) {
    .top-section {
      text-align: center;
    }
  }

  .wheel-image {
    margin-left: auto;

    @media (max-width: 600px) {
      margin-left: unset;
      margin: auto;
    }
  }
</style>

<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { HERO_TYPES, SocialShareData } from '~/data/models/generic';
  import type { IWheelsData } from '~/data/models/wheels';
  const { params } = await useRoute();
  const wheelId = ref(params.wheel);
  let { data: wheel, status } = await useFetch<IWheelsData>(`/api/wheels/wheel`, {
    query: {
      uuid: wheelId.value[0],
    },
  });
  const socialShareUrl = ref<string>(`${SocialShareData.preUrl}${wheel.value?.uuid}${SocialShareData.postUrl}`);
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
        hid: 'description',
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
      <v-col cols="12" md="10" offset-md="1">
        <v-card :loading="status === 'pending'" elevation="4">
          <template v-if="wheel">
            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <h2 class="text-h5">{{ wheel.size }}</h2>
                  <p class="text-capitalize pb-5">
                    <v-icon icon="fad fa-ruler" size="18" color="primary" class="me-1 pb-1"></v-icon>
                    {{ wheel.size }} x {{ wheel.width }}
                  </p>
                  <h3 class="text-h2">{{ wheel.name }}</h3>
                </v-col>

                <v-col cols="6" class="pt-2">
                  <WheelImages :images="wheel.images" />
                </v-col>
              </v-row>
            </v-card-text>

            <!-- <v-row class="d-flex py-3 justify-space-between">
              <v-col cols="12" sm="6" md="3">
                <v-list-item density="compact" prepend-icon="fad fa-calendar">
                  <v-list-item-title>Years</v-list-item-title>
                  <v-list-item-subtitle v-if="color.pretty.Years">{{ color.pretty.Years }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-list-item density="compact" prepend-icon="fad fa-code-simple">
                  <v-list-item-title>Short Code</v-list-item-title>
                  <v-list-item-subtitle v-if="color.pretty['Short Code']">{{
                    color.pretty['Short Code']
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-list-item density="compact" prepend-icon="fad fa-square-code">
                  <v-list-item-title>Ditzler PPG Code</v-list-item-title>
                  <v-list-item-subtitle v-if="color.pretty['Ditzler PPG Code']">{{
                    color.pretty['Ditzler PPG Code']
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-list-item density="compact" prepend-icon="fad fa-square-code">
                  <v-list-item-title>Dulux Code</v-list-item-title>
                  <v-list-item-subtitle v-if="color.pretty['Dulux Code']">{{
                    color.pretty['Dulux Code']
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="text-red-darken-2">Missing</v-list-item-subtitle>
                </v-list-item>
              </v-col>
            </v-row> -->
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-space-around">
              <v-btn v-if="copied" prepend-icon="fad fa-link" disabled>Copied</v-btn>
              <v-btn v-else prepend-icon="fad fa-link" @click="copyUrl()">Copy Link</v-btn>
              <!-- <v-btn
                color="brandGreen"
                :href="`mailto:?subject=Mini Color Swatch - ${color.pretty.Name} | ${color.pretty.Code}&body=Color%20Name%20-%20${color.pretty.Name}%20%0ABMC%20Code%20-%20${color.pretty.Code}%20%0ADulux%20Code%20-%20${color.pretty['Dulux Code']}%20%0ADitzler%20Code%20-%20${color.pretty['Ditzler PPG Code']}%20`"
                prepend-icon="fad fa-paper-plane"
                >Email</v-btn
              > -->
              <v-btn color="primary" prepend-icon="fab fa-facebook" :href="socialShareUrl">Share</v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <SpeedInsights />
</template>

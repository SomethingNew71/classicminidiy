<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { SocialShareData } from '~/data/models/generic';
  const { params } = await useRoute();
  const colorId = ref(params.color);
  let { data: color, pending } = await useFetch(`/api/colors/single`, {
    query: {
      id: colorId,
    },
  });
  const socialShareUrl: any = ref(`${SocialShareData.preUrl}${color?.value?.raw.id}${SocialShareData.postUrl}`);
  const copied = ref(false);
  let shareImage: string;
  if (color?.value?.raw.hasSwatch) {
    shareImage = `https://classicminidiy.s3.amazonaws.com/colors/${color?.value?.raw.code}.jpg`;
  } else {
    shareImage = 'https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg';
  }

  async function copyUrl() {
    const url = `https://classicminidiy.com/archive/colors/${color?.value?.raw.id}`;
    try {
      await navigator.clipboard.writeText(url);
      copied.value = true;
      setTimeout(() => (copied.value = false), 1000);
    } catch ($e) {
      copied.value = false;
    }
  }

  useHead({
    title: `Mini Color - ${color.value?.pretty.Name} | ${color.value?.pretty.Code}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Check out the Clasic Mini color I am looking at right now.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: `Mini Color - ${color.value?.pretty.Name} | ${color.value?.pretty.Code}`,
    ogDescription: 'Check out the Clasic Mini color I am looking at right now.',
    ogUrl: `classicminidiy.com/archive/colors/${color?.value?.raw.id}`,
    ogImage: shareImage,
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Color Swatch'" />
  <v-container>
    <v-row align="center">
      <v-col cols="8">
        <breadcrumb page="Swatch" subpage="Colors" subpage-href="/archive/colors"></breadcrumb>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card :loading="pending" elevation="4">
          <template v-if="color">
            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-col cols="6">
                  <h2 class="text-h5">{{ color.pretty.Name }}</h2>
                  <p class="text-capitalize pb-5">
                    <v-icon icon="fad fa-palette" size="18" color="primary" class="me-1 pb-1"></v-icon
                    >{{ color.pretty['Primary Color'] }}
                  </p>
                  <h3 class="text-h2">{{ color.pretty.Code }}</h3>
                </v-col>

                <v-col cols="6" class="pt-2">
                  <v-img
                    v-if="color.raw.hasSwatch"
                    class="rounded-xl"
                    :src="`https://classicminidiy.s3.amazonaws.com/colors/${color.raw.code}.jpg`"
                  >
                    <template #sources>
                      <source :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.raw.code}.webp`" />
                    </template>
                  </v-img>
                  <v-img class="rounded-xl" v-else src="https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg">
                    <template #sources>
                      <source srcset="https://classicminidiy.s3.amazonaws.com/misc/color-filler.webp" />
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-card-text>

            <v-row class="d-flex py-3 justify-space-between">
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
            </v-row>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-space-around">
              <v-btn v-if="copied" prepend-icon="fad fa-link" disabled>Copied</v-btn>
              <v-btn v-else prepend-icon="fad fa-link" @click="copyUrl()">Copy Link</v-btn>
              <v-btn
                color="brandGreen"
                :href="`mailto:?subject=Mini Color Swatch - ${color.pretty.Name} | ${color.pretty.Code}&body=Color%20Name%20-%20${color.pretty.Name}%20%0ABMC%20Code%20-%20${color.pretty.Code}%20%0ADulux%20Code%20-%20${color.pretty['Dulux Code']}%20%0ADitzler%20Code%20-%20${color.pretty['Ditzler PPG Code']}%20`"
                prepend-icon="fad fa-paper-plane"
                >Email</v-btn
              >
              <v-btn color="primary" prepend-icon="fab fa-facebook" :href="socialShareUrl">Share</v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <SpeedInsights />
</template>

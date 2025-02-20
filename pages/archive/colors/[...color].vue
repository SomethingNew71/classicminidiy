<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import { shareColorItem } from '~/data/models/helper-utils';
  const { params } = useRoute();
  const { data: color, status } = await useFetch(`/api/colors/single`, {
    query: {
      id: params.color,
    },
  });
  const copied = ref(false);
  const shareImage = ref('');

  watch(color, (newColor) => {
    if (newColor?.raw.hasSwatch) {
      shareImage.value = `https://classicminidiy.s3.amazonaws.com/colors/${newColor.raw.code}.jpg`;
    } else {
      shareImage.value = 'https://classicminidiy.s3.amazonaws.com/misc/noSwatch.jpeg';
    }
  });

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
        content: 'Check out the Classic Mini color I am looking at right now.',
      },
    ],
    link: [
      {
        rel: 'preload',
        href: shareImage.value,
        as: 'image',
      },
    ],
  });

  useSeoMeta({
    ogTitle: `Mini Color - ${color.value?.pretty.Name} | ${color.value?.pretty.Code}`,
    ogDescription: 'Check out the Classic Mini color I am looking at right now.',
    ogUrl: `classicminidiy.com/archive/colors/${color?.value?.raw.id}`,
    ogImage: shareImage.value,
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Color Swatch'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row align="center">
      <v-col cols="8">
        <breadcrumb page="Swatch" subpage="Colors" subpage-href="/archive/colors"></breadcrumb>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card :loading="status === 'pending'" elevation="4">
          <template v-if="color">
            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-col cols="6" class="text-center">
                  <h2 class="text-h5">{{ color.pretty.Name }}</h2>
                  <p class="text-capitalize pb-5 pt-2 text-body-1">
                    <v-icon icon="fad fa-palette" size="18" color="primary" class="me-1 pb-1"></v-icon>Color Group:
                    {{ color.pretty['Primary Color'] }}
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
            <v-divider></v-divider>
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
            <v-card-actions class="d-flex justify-space-around pb-4">
              <v-btn v-if="copied" prepend-icon="fad fa-link" disabled>Copied</v-btn>
              <v-btn v-else prepend-icon="fad fa-link" @click="copyUrl()">Copy Link</v-btn>
              <v-btn
                color="brandGreen"
                :href="`mailto:?subject=Mini Color Swatch - ${color.pretty.Name} | ${color.pretty.Code}&body=Color%20Name%20-%20${color.pretty.Name}%20%0ABMC%20Code%20-%20${color.pretty.Code}%20%0ADulux%20Code%20-%20${color.pretty['Dulux Code']}%20%0ADitzler%20Code%20-%20${color.pretty['Ditzler PPG Code']}%20`"
                prepend-icon="fad fa-paper-plane"
                >Email</v-btn
              >
              <v-btn
                prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                @click="shareColorItem(color.pretty.Name, color.pretty.ID)"
                >Share</v-btn
              >
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

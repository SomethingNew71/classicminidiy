<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  const route = useRoute();
  const colorId = ref(route.query.colorId?.toString());
  let { data: color, pending }: any = await useFetch(`/api/colors/single`, {
    query: {
      id: colorId,
    },
  });
  const issueCreated = ref();
  const apiError = ref();
  const suggestion = ref();
  const apiMessage = ref();
  const processing = ref();

  const formData = {
    code: '',
    imageSwatch: '',
    ditzlerPpgCode: '',
    duluxCode: '',
    name: '',
    shortCode: '',
    years: '',
  };
  useHead({
    title: 'Contribute Color',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Contribute Color',
    ogDescription:
      'The Classic Mini DIY Color Picker, an interactive tool allowing you to find the matching color code for your Classic Mini color swatch.',
    ogUrl: 'classicminidiy.com/archive/colors',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });

  async function submit() {
    processing.value = true;
    await useFetch('/api/colors/contribute', {
      method: 'POST',
      body: {
        color: color.value.raw,
        newDetails: formData,
      },
    })
      .then((response: any) => {
        issueCreated.value = true;
        apiError.value = false;
        suggestion.value = {
          number: response.data._rawValue.number,
          url: response.data._rawValue.url,
        };
      })
      .catch(() => {
        issueCreated.value = false;
        apiError.value = true;
        apiMessage.value = 'GitHub API is currently unavailable. Please try again later.';
      })
      .finally(() => {
        processing.value = false;
      });
  }
</script>

<template>
  <hero :navigation="true" :title="'Contribute to Colors'" />
  <v-container>
    <v-row align="center">
      <v-col cols="8">
        <breadcrumb page="Color Contribution"></breadcrumb>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="8">
        <h2 class="title">Classic Mini Color Picker</h2>
        <p>
          Looking to make some suggestions to the color database? Fill out the form below to submit any changes you'd
          like. These will be reviewed and published within ~7 days.
        </p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-toolbar color="grey">
            <v-icon class="ml-4" icon="fad fa-list-timeline"></v-icon>
            <v-toolbar-title>Current Data</v-toolbar-title>
          </v-toolbar>
          <v-progress-circular v-if="pending" :indeterminate="true" color="blue"></v-progress-circular>
          <v-card-text>
            <picture v-if="color.hasSwatch">
              <source :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.Code}.webp`" type="image/webp" />
              <source :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.Code}.jpg`" type="image/jpg" />
              <img loading="lazy" alt="" :src="`https://classicminidiy.s3.amazonaws.com/colors/${color.Code}.jpg`" />
            </picture>
            <picture v-else class="filler-image">
              <source srcset="https://classicminidiy.s3.amazonaws.com/misc/color-filler.webp" type="image/webp" />
              <source srcset="https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg" type="image/jpg" />
              <img loading="lazy" alt="" src="https://classicminidiy.s3.amazonaws.com/misc/color-filler.jpg" />
            </picture>
            <v-list lines="one">
              <template v-for="(value, property) in color.pretty">
                <v-list-item v-if="property !== 'hasSwatch'">
                  <v-list-item-title>{{ property }}</v-list-item-title>
                  <v-list-item-subtitle v-if="value" class="text-capitalize">{{ value }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-else><p class="text-red-darken-2">Missing</p></v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar color="primary">
            <v-icon class="ml-4" icon="fad fa-sparkles"></v-icon>
            <v-toolbar-title v-if="issueCreated">Submission Created</v-toolbar-title>
            <v-toolbar-title v-else>New Data</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="issueCreated">
            <i class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"></i>
            <h1 class="is-size-3 py-3">Thank you!</h1>
            <h2 class="is-size-5 py-4">Your suggestion has been submitted</h2>
            <ul class="pb-5">
              <li class="pb-2">
                Your suggestion number is <strong>{{ suggestion.number }}</strong>
              </li>
              <li>
                Track your suggestion here:
                <a target="_blank" :href="suggestion.url"> Suggestion {{ suggestion.number }}</a>
              </li>
            </ul>
          </v-card-text>
          <v-card-text v-else>
            <v-alert
              v-if="apiError"
              density="compact"
              type="warning"
              title="Error Submitting Request"
              text="Please hit submit again or try again later"
            ></v-alert>
            <v-text-field
              prepend-icon="fad fa-id-card"
              variant="solo-filled"
              type="name"
              required
              v-model="formData.name"
              :counter="30"
              label="Color Name"
            ></v-text-field>
            <v-text-field
              prepend-icon="fad fa-brackets-curly"
              variant="solo-filled"
              required
              type="text"
              v-model="formData.code"
              :counter="60"
              label="Primary Code"
            ></v-text-field>
            <v-text-field
              prepend-icon="fad fa-brackets-curly"
              variant="solo-filled"
              required
              type="text"
              v-model="formData.shortCode"
              :counter="60"
              label="Short Code"
            ></v-text-field>
            <v-text-field
              prepend-icon="fad fa-brackets-curly"
              variant="solo-filled"
              required
              type="text"
              v-model="formData.ditzlerPpgCode"
              :counter="60"
              label="Ditzler PPG Code"
            ></v-text-field>
            <v-text-field
              prepend-icon="fad fa-brackets-curly"
              variant="solo-filled"
              required
              type="text"
              v-model="formData.duluxCode"
              :counter="60"
              label="Dulux Code"
            ></v-text-field>
            <v-text-field
              prepend-icon="fad fa-calendar"
              variant="solo-filled"
              required
              type="text"
              v-model="formData.years"
              :counter="60"
              label="Years"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="processing" variant="tonal" color="primary" @click="submit()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <SpeedInsights />
</template>

<style lang="scss">
  .filler-image {
    img,
    source {
      filter: grayscale(100%);
    }
  }
</style>

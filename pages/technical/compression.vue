<script lang="js" setup>
  useHead({
    title: 'Tech - Compression Ratio Calculator',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Planning your next engine build? Use our brand new compression ratio calculator to generate the new ratio for your Classic Mini's engine.",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Compression Ratio Calculator',
    ogDescription:
      "Planning your next engine build? Use our brand new compression ratio calculator to generate the new ratio for your Classic Mini's engine.",
    ogUrl: 'classicminidiy.com/technical/compression',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb page="Compression Ratio Calculator"></breadcrumb>
        <v-row>
          <v-col cols="12" md="8">
            <h1 class="title">Compression Ratio Calculator</h1>
            <p class="pb-4">
              When building a performance Classic Mini engine one of the most important figures to determine is the
              compression ratio. Using the Classic Mini DIY Compression Ratio Calculator below, you can determine the
              ideal compression for your new engine build.
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <NuxtLink :to="'/technical/decoders'" :title="'Link to Engine Sizes'">
              <div class="card callout-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            alt="Engine size table image preview"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">What are standard engine sizes?</h2>
                      <p>Click here to learn about common engine sizes in the classic mini.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <CompressionCalculator />
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">More</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>

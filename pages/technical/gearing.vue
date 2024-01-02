<script lang="ts" setup>
  useHead({
    title: 'Tech - Gearing Calculator',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Gearing Calculator',
    ogDescription:
      "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    ogUrl: 'classicminidiy.com/technical/gearing',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Gearbox Calculator'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <breadcrumb page="Gearbox Calculator"></breadcrumb>
          <div class="columns">
            <div class="column is-8">
              <h1 class="title">Gearbox Calculator</h1>
              <p class="pb-4">
                When building or rebuilding a gearbox, updaing your gear ratios, or changing out your speedometer
                sometimes you need to update some things. Using the Classic Mini DIY Gear Calculator below, you can
                determine the correct gearing for your for your new engine build and find the right speedo gear to use
                as well.
              </p>
            </div>
            <div class="column is-4">
              <NuxtLink :to="'/technical/enginesize'" :title="'Link to Engine Sizes'">
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
            </div>
          </div>
        </div>
        <div class="column is-12">
          <GearboxCalculator />
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider">More</div>
        </div>
        <div class="column is-12">
          <patreon-card size="large" />
        </div>
      </div>
    </section>
  </div>
</template>

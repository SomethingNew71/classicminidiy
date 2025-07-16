<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  useHead({
    title: 'Tech - Gearing Calculator',
    meta: [
      {
        key: 'description',
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
  <hero :navigation="true" :title="'Gearbox Calculator'" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :version="BREADCRUMB_VERSIONS.TECH" page="Gearbox Calculator"></breadcrumb>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">Gearbox Calculator</h1>
            <p class="mb-4">
              When building or rebuilding a gearbox, updaing your gear ratios, or changing out your speedometer
              sometimes you need to update some things. Using the Classic Mini DIY Gear Calculator below, you can
              determine the correct gearing for your for your new engine build and find the right speedo gear to use as
              well.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink :to="'/archive/engines'" :title="'Link to Engine Sizes'" class="block">
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
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
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            class="w-full h-full object-contain"
                            alt="Engine size table image preview"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">What are standard engine sizes?</h2>
                      <p class="mt-1">Click here to learn about common engine sizes in the classic mini.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <CalculatorsGearbox />
      </div>
      <div class="col-span-12 md:col-span-4 md:col-start-5">
        <div class="divider">More</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

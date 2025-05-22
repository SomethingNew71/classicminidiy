<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const { data, status } = await useFetch('/api/engines');
  const tableHeaders: any[] = [
    { title: 'Size', key: 'color' },
    { title: 'Original Block', key: 'group' },
    { title: 'Engine Size', key: 'engineSize' },
    { title: 'Bore Size', key: 'boreSize' },
    { title: 'Over Bore', key: 'overBore' },
    { title: 'Stroke', key: 'stroke' },
    { title: 'Estimated Power', key: 'power' },
    { title: 'Estimated Torque', key: 'torque' },
  ];

  useHead({
    title: 'Tech - Engine Sizes and Displacements',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          "Determining your engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Engine Sizes and Displacements',
    ogDescription:
      "Determining your engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
    ogUrl: 'classicminidiy.com/archive/engines',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Engine Sizes'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" page="Engine Sizes"></breadcrumb>

        <div class="grid grid-cols-12 md:grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-2">Engine Displacement and Sizes</h1>
            <p>
              Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard
              bore, engine size chart to figure out how big your current engine is, or how big you'd like your next
              build to be!
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink :to="'/technical/compression'" :title="'Link to Compression Calculator'">
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body p-4">
                  <div class="flex items-start">
                    <div class="mr-4">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            alt="Image of compression calculator"
                            class="w-full h-full object-contain"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-lg font-semibold">Trying to calculate your compression ratio?</h2>
                      <p>Click here to try out our compression ratio calculator.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="mb-2">
          <i class="fas fa-circle text-primary mr-2"></i> Standard <i class="fas fa-circle text-info mx-2"></i> Standard
          Overbore <i class="fas fa-circle text-error mx-2"></i> Different Stroke
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-title p-4 bg-base-200 flex items-center">
            <i class="fad fa-engine mr-2"></i>
            <span>Engine Variations</span>
          </div>
          <div class="card-body p-4">
            <div class="overflow-x-auto" v-if="data?.engines">
              <table class="table table-zebra w-full table-compact" :class="{ 'opacity-60': status === 'pending' }">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data.engines" :key="index" class="hover">
                    <td>
                      <i class="fas fa-circle" :class="item.color"></i>
                    </td>
                    <td>{{ item.group }}</td>
                    <td>{{ item.engineSize }}</td>
                    <td>{{ item.boreSize }}</td>
                    <td>{{ item.overBore }}</td>
                    <td>{{ item.stroke }}</td>
                    <td>{{ item.power }}</td>
                    <td>{{ item.torque }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="status === 'pending'" class="flex justify-center items-center py-4">
                <span class="loading loading-spinner loading-md"></span>
                <span class="ml-2">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">Support</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ref-icons {
    font-size: 0.5rem;
    vertical-align: middle;
    padding-bottom: 2px;
    &.mobile-v {
      font-size: 0.75rem;
    }
  }

  /* Additional DaisyUI specific styles */
  .table-compact {
    font-size: 0.875rem;
  }
</style>

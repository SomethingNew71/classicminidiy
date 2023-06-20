<template>
  <div>
    <hero :navigation="true" :title="'Torque Specs'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-ruler-triangle" aria-hidden="true" />
                  </span>
                  <span>Torque Specs</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div
          v-for="(table, name, index) in tables"
          :key="`${name}-${index}`"
          class="column is-12"
        >
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">
                <i :class="table.icon"></i>
                <span class="pl-1">{{ table.title }}</span>
              </h2>
            </div>
            <div class="card-content">
              <client-only>
                <o-table
                  :data="table.items"
                  :columns="table.columns"
                  :narrowed="true"
                  :hoverable="true"
                  :paginated="table.items.length >= 14 ? true : false"
                  :per-page="10"
                  icon-pack="fas"
                  :mobile-cards="false"
                />
              </client-only>
            </div>
          </div>
          <div
            v-if="index === 0 || index === 2 || index === 4"
            :key="`${name}-${index}-ad`"
            class="column is-12"
          >
            <adsbygoogle
              class="adsbygoogle"
              :ad-style="{
                display: 'block',
              }"
              ad-slot="2698882588"
              ad-format="auto"
            >
            </adsbygoogle>
          </div>
        </div>
        <div class="column is-12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  const { data: tables } = await useFetch('/api/torque');
  useHead({
    title: 'Technical - Mini Torque Specs',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Detailed torque specifications can be found online right here at Classic Mini DIY.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Technical - Mini Torque Specs',
    ogDescription:
      'Detailed torque specifications for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'classicminidiy.com/technical/torque',
    ogImage:
      'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
  });
</script>

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        pagination: {},
      };
    },
  });
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>

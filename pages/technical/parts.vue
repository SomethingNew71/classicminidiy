<template>
  <div>
    <hero :navigation="true" :title="'Parts Equivalency'" />
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
                    <i class="fad fa-puzzle" aria-hidden="true" />
                  </span>
                  <span>Parts Equivalency</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <template
          v-for="(table, name, index) in tables"
          :key="`${name}-${index}`"
        >
          <div class="column is-12">
            <div class="card" animation="slide">
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
                /></client-only>
              </div>
            </div>
          </div>
          <div
            v-if="index === 1"
            :key="`${name}-${index}-patreon`"
            class="column is-12"
          >
            <div class="card">
              <div class="card-content">
                <patreon-card size="large" />
              </div>
            </div>
          </div>
        </template>
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
  const { data: tables } = await useFetch('/api/parts');
  useHead({
    title: 'Technical - Parts Equivalency',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'A complete list of parts which can be found at local parts sellers',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Technical - Parts Equivalency',
    ogDescription:
      'A complete list of parts which can be found at local parts sellers',
    ogUrl: 'classicminidiy.com/technical/parts',
    ogImage:
      'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png',
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

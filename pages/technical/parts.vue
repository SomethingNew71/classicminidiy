<template>
  <div>
    <hero :navigation="true" />
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
          <h1 class="title">Parts Equivalency</h1>
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
          <!-- <div
            v-if="index === 1 || index === 3"
            :key="`${name}-${index}-ad`"
            class="column is-12"
          >
            <Adsense
              class="adsbygoogle"
              style="display: block"
              data-ad-client="ca-pub-0523971861051053"
              data-ad-slot="9364363281"
              data-ad-format="auto"
              data-full-width-responsive="true"
            >
            </Adsense>
          </div> -->
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
      {
        property: 'og:title',
        content: 'Technical - Parts Equivalency',
      },
      {
        property: 'og:image',
        content:
          'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png',
      },
    ],
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

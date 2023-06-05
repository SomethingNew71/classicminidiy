<template>
  <div>
    <hero :navigation="true" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <nuxt-link to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </nuxt-link>
              </li>
              <li class="is-active">
                <nuxt-link to="">
                  <span class="icon is-small">
                    <i class="fad fa-ruler-triangle" aria-hidden="true" />
                  </span>
                  <span>Torque Specs</span>
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <h1 class="title">Torque Specs</h1>
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
</script>

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        pagination: {},
      };
    },
    head: {
      title: 'Technical - Torque Specs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Detailed torque specifications can be found online right here at Classic Mini DIY.',
        },
        {
          property: 'og:title',
          content: 'Technical - Torque Specs',
        },
        {
          property: 'og:image',
          content:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
        },
      ],
    },
  });
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>

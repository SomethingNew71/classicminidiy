<template>
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
                  <i class="fad fa-puzzle" aria-hidden="true" />
                </span>
                <span>Parts Equivalency</span>
              </nuxt-link>
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
          <o-collapse
            class="card"
            aria-id="contentIdForA11y3"
            animation="slide"
          >
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
            >
              <h2 class="card-header-title">
                <i :class="table.icon"></i>
                <span class="pl-1">{{ table.title }}</span>
              </h2>
              <a href="#" class="card-header-icon" aria-label="more options">
                <o-icon
                  pack="fas"
                  :icon="props.open ? 'chevron-down' : 'chevron-up'"
                />
              </a>
            </div>
            <div class="card-content">
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
            </div>
          </o-collapse>
        </div>
        <div
          v-if="index === 1 || index === 3"
          :key="`${name}-${index}-ad`"
          class="column is-12"
        >
          <!-- <Adsense
            class="adsbygoogle"
            style="display: block"
            data-ad-client="ca-pub-0523971861051053"
            data-ad-slot="9364363281"
            data-ad-format="auto"
            data-full-width-responsive="true"
          >
          </Adsense> -->
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
</template>

<script>
  import PatreonCard from '~/components/PatreonCard';

  function getPartsList() {
    return import('~/public/data/parts.json').then((m) => m.default || m);
  }
  export default {
    components: {
      PatreonCard,
    },
    async asyncData() {
      const tables = await getPartsList();
      return { tables };
    },
    data() {
      return {
        pagination: {},
      };
    },
    head() {
      return {
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
      };
    },
  };
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>

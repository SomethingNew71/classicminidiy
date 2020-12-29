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
                  <i class="fad fa-ruler-triangle" aria-hidden="true" />
                </span>
                <span>Torque Specs</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title">
          Torque Specs
        </h1>
      </div>
      <template v-for="(table, name, index) in tables">
        <div :key="index" class="column is-12">
          <b-collapse
            :open="index > 0 ? false : true"
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
                <b-icon
                  pack="fas"
                  :icon="props.open ? 'chevron-down' : 'chevron-up'"
                />
              </a>
            </div>
            <div class="card-content">
              <b-table
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
          </b-collapse>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
function getTables () {
  return import('~/static/data/torqueSpecs.json').then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const tables = await getTables();
    return { tables };
  },
  data () {
    return {
      pagination: {}
    };
  },
  head () {
    return {
      title: 'Technical - Torque Specs',
      meta: [
        { hid: 'description', name: 'description', content: 'Detailed torque specifications can be found online right here at Classic Mini DIY.' },
        {
          property: 'og:title',
          content: 'Technical - Torque Specs'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.card-header {
  background-color: whitesmoke;
}
</style>

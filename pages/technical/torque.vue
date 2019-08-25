<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fas fa-wrench" aria-hidden="true" />
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
          <b-collapse :open="index > 0 ? false : true" class="card" aria-id="contentIdForA11y3">
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
            >
              <h2 class="card-header-title">
                {{ table.title }}
              </h2>
              <a href="#" class="card-header-icon" aria-label="more options">
                <b-icon
                  pack="fas"
                  :icon="props.open ? 'caret-down' : 'caret-up'"
                />
              </a>
            </div>
            <div class="card-content">
              <b-table
                :data="table.items"
                :columns="table.specialHeaders ? specialHeaders : headers"
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
  return import(`~/static/data/torqueSpecs.json`).then(m => m.default || m)
}
export default {
  data () {
    return {
      pagination: {},
      headers: [
        { label: 'Fastener', field: 'name' },
        { label: 'Torque (lb/ft)', field: 'lbft' },
        { label: 'Torque (Nm)', field: 'nm' },
        { label: 'Notes', field: 'notes' }
      ],
      specialHeaders: [
        { label: 'Fastener', field: 'name' },
        { label: 'Torque (lb/in)', field: 'lbin' },
        { label: 'Torque (Nm)', field: 'nm' }
      ]
    }
  },
  async asyncData ({ req }) {
    const tables = await getTables()
    return { tables }
  }
}
</script>

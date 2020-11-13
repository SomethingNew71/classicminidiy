<template>
  <section class="section">
    <div class="columns">
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
                  <i class="fad fa-bolt" aria-hidden="true" />
                </span>
                <span>Electrical Diagrams</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title">
          Electrical Diagrams
        </h1>
        <template v-for="(diagram, name, index) in diagrams">
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
                  {{ diagram.title }}
                </h2>
                <a class="card-header-icon" aria-label="more options">
                  <b-icon
                    pack="fas"
                    :icon="props.open ? 'chevron-down' : 'chevron-up'"
                  />
                </a>
              </div>
              <div class="card-content pt-0 pb-0 pl-0 pr-0">
                <nav class="panel is-striped">
                  <a
                    v-for="(item, nameItem) in diagram.items"
                    :key="nameItem"
                    :href="item.link"
                    target="_blank"
                    class="panel-block"
                  >
                    <span class="panel-icon">
                      <i class="fad fa-info-circle" aria-hidden="true" />
                    </span>
                    {{ item.name }}
                  </a>
                </nav>
              </div>
            </b-collapse>
          </div>
          <div v-if="index === 2" :key="name" class="column is-12">
            <div class="card">
              <no-ssr>
                <div id="amzn-assoc-ad-e73591bc-42bb-4ff9-9dd2-35ce071552d4"></div>
                <script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=e73591bc-42bb-4ff9-9dd2-35ce071552d4"></script>
              </no-ssr>
            </div>
          </div>
          <div v-if="index === 4" :key="name" class="column is-12">
            <div class="card">
              <no-ssr>
                <div id="amzn-assoc-ad-71247fc3-eadb-470e-a41c-08b0e2db904d"></div>
                <script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=71247fc3-eadb-470e-a41c-08b0e2db904d"></script>
              </no-ssr>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
function getDiagrams () {
  return import('~/static/data/wiringDiagrams.json').then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const diagrams = await getDiagrams();
    return { diagrams };
  },
  head () {
    return {
      title: 'Technical - Electrical Diagrams',
      meta: [
        { hid: 'description', name: 'description', content: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.' },
        {
          property: 'og:title',
          content: 'Technical - Electrical Diagrams'
        },
        {
          property: 'og:image',
          content: '/seo-images/Battery-Charging.svg'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.card-header {
  background-color: whitesmoke;
  .card-header-title {
    font-size: 20px;
  }
}
</style>

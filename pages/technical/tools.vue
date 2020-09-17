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
                  <i class="fad fa-wrench" aria-hidden="true"></i>
                </span>
                <span>Essential Tools</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <h1 class="title">
          Essential Tools
        </h1>
        <p>
          To help make some of the tough jobs easier while you work on your Classic Mini Cooper, I have taken the time to currate a list of recommended tools.
        </p>
      </div>
      <div
        v-for="(tool, name) in tools.tool"
        :key="name"
        class="column is-3"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image is-3by4">
              <img :src="require('assets/img' + tool.imgSource)" :alt="`${tool.name}`">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4 truncate">
                  {{ tool.name }}
                </p>
                <p class="subtitle is-6">
                  {{ tool.desc }}
                </p>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <template v-for="(vendor, i) in tool.vendors">
              <a
                :key="i"
                :href="vendor.urlVendor"
                class="card-footer-item"
                target="_blank"
                :class="{
                  'has-background-amazon has-text-white': vendor.name === 'Amazon',
                  'has-background-seven has-text-white': vendor.name === '7ent'
                }"
              >
                <span class="icon">
                  <i :class="{'fab fa-amazon': vendor.name === 'Amazon', 'fas fa-car': vendor.name === '7ent'}" />
                </span>
                <span>
                  {{ vendor.name }}
                </span>
              </a>
            </template>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
function getTools () {
  return import('~/static/data/tools.json').then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const tools = await getTools();
    return { tools };
  },
  head () {
    return {
      title: 'Technical - Essential Tools',
      meta: [
        { hid: 'description', name: 'description', content: 'Looking for the best tools to make tough jobs easier on your Classic Mini? Here you\'ll find the top picks from Classic Mini DIY' },
        {
          property: 'og:title',
          content: 'Technical - Essential Tools'
        },
        {
          property: 'og:image',
          content: '/icons/Car-Jumper.svg'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
  .is-amazon {
    color: white;
    font-size: 1rem;
    background-color: #FEBD69;
  }
</style>

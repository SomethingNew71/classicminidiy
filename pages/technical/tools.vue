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
          Below you’ll find a curated list of recommended tools for working with Classic Mini Coopers. Make difficult jobs easy by adding these essential tools to your workshop.
        </p>
      </div>

      <template v-for="(group, name, index) in toolGroups.groups">
        <div :key="index" class="column is-12">
          <b-collapse :open="index > 0 ? false : true" class="card">
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
              aria-controls="contentIdForA11y3"
            >
              <h2 class="card-header-title tool-group">
                <i class="icon is-medium" :class="group.icon"></i>
                {{ group.title }}
              </h2>
              <a class="card-header-icon" aria-label="more options">
                <b-icon
                  pack="fas"
                  :icon="props.open ? 'chevron-down' : 'chevron-up'"
                />
              </a>
            </div>
            <div class="card-content columns is-multiline">
              <div
                v-for="(tool, nestedIndex) in group.tools"
                :key="nestedIndex"
                class="column is-12"
              >
                <article class="media">
                  <figure class="media-left is-hidden-mobile">
                    <img class="image" :src="require('assets/img' + tool.imgSource)" :alt="`${tool.name}`">
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <img class="image is-hidden-tablet" :src="require('assets/img' + tool.imgSource)" :alt="`${tool.name}`">
                      <br class="is-hidden-tablet">
                      <h4 class="mb-2">
                        {{ tool.name }}
                      </h4>
                      <p>
                        {{ tool.desc }}
                      </p>
                    </div>
                    <nav class="level is-mobile">
                      <div class="level-left">
                        <template v-for="(vendor, i) in tool.vendors">
                          <a
                            :key="i"
                            :href="vendor.urlVendor"
                            target="_blank"
                            :class="{
                              'is-amazon': vendor.name === 'Amazon',
                              'is-seven': vendor.name === '7ent',
                              'is-guessworks': vendor.name === 'Guessworks'
                            }"
                            class="button level-item"
                          >
                            <span class="icon is-small">
                              <i
                                :class="{
                                  'fab fa-amazon': vendor.name === 'Amazon',
                                  'fad fa-cogs': vendor.name === 'Guessworks',
                                  'fas fa-car': vendor.name === '7ent'
                                }"
                              /></span>
                            <span class="pl-1">{{ vendor.name }}</span>
                          </a>
                        </template>
                      </div>
                    </nav>
                  </div>
                </article>
                <div v-if="nestedIndex !== group.tools.length -1" class="is-divider"></div>
              </div>
            </div>
          </b-collapse>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
function getTools () {
  return import('~/static/data/tools.json').then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const toolGroups = await getTools();
    return { toolGroups };
  },
  head () {
    return {
      title: 'Technical - Essential Tools',
      meta: [
        { hid: 'description', name: 'description', content: 'Looking for the best tools to make tough jobs easier on your Classic Mini? Here you\'ll find the top picks from Classic Mini DIY' },
        {
          property: 'og:title',
          content: 'Technical - Essential Tools'
        }
        // {
        //   property: 'og:image',
        //   content: '/icons/Car-Jumper.svg'
        // }
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
  .media-left .image {
    max-width: 128px;
  }
  .image.is-hidden-tablet {
    margin: auto;
  }
  .is-divider {
    border: 1px solid #ededed;
  }
  .tool-group {
    font-size: 1.0rem;
  }
  .button.is-guessworks {
    border: none;
    color: #2f2f2f;
  }
</style>

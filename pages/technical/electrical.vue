<template>
  <div>
    <hero :navigation="true" :title="'Electrical Diagrams'" />
    <section class="section">
      <div class="columns">
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
                    <i class="fad fa-bolt" aria-hidden="true" />
                  </span>
                  <span>Electrical Diagrams</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <h1 class="title">Electrical Diagrams</h1>
          <template v-for="(diagram, name, index) in diagrams" :key="`${name}-${index}`">
            <div class="column is-12">
              <o-collapse class="card" animation="slide">
                <template #trigger="props">
                  <div class="card-header" role="button">
                    <h2 class="card-header-title">
                      {{ diagram.title }}
                    </h2>
                    <a class="card-header-icon">
                      <o-icon pack="fas" :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
                    </a>
                  </div>
                </template>
                <div class="card-content pt-0 pb-0 pl-0 pr-0">
                  <nav class="panel is-striped">
                    <a
                      v-for="(item, nameItem, diagramIndex) in diagram.items"
                      :key="`${nameItem}-${diagramIndex}`"
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
              </o-collapse>
            </div>
            <div v-if="index === 0" :key="`${name}-${index}-patreon`" class="column is-12">
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
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  const { data: diagrams } = await useFetch('/api/diagrams');

  useHead({
    title: 'Technical - Electrical Diagrams',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Technical - Electrical Diagrams',
    ogDescription: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
    ogUrl: 'classicminidiy.com/technical/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>
<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
    .card-header-title {
      font-size: 20px;
    }
  }
  .panel-block {
    word-break: break-word;
  }
</style>

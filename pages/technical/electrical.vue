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
          <div class="column is-12">
            <v-expansion-panels variant="popout" multiple :color="'grey-lighten-4'">
              <v-expansion-panel
                v-for="(diagram, name, index) in diagrams"
                :key="`${name}-${index}`"
                :title="diagram.title"
              >
                <v-expansion-panel-text>
                  <nav class="panel is-striped p-0">
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
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
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
    title: 'Tech - Electrical Diagrams',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Electrical Diagrams',
    ogDescription: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
    ogUrl: 'classicminidiy.com/technical/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<script lang="ts">
  import {
    VExpansionPanel,
    VExpansionPanelText,
    VExpansionPanelTitle,
    VExpansionPanels,
  } from 'vuetify/components/VExpansionPanel';
  export default defineComponent({
    components: {
      VExpansionPanel,
      VExpansionPanelText,
      VExpansionPanelTitle,
      VExpansionPanels,
    },
  });
</script>

<style lang="scss">
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
  .panel-block {
    word-break: break-word;
  }
</style>

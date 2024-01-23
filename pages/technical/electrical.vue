<script lang="ts" setup>
  const { data: diagrams } = await useFetch('/api/diagrams');
  const panels = ref([]);

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

<template>
  <hero :navigation="true" :title="'Electrical Diagrams'" />
  <v-container>
    <v-row>
      <v-col cols="12" md="10">
        <breadcrumb page="Electrical Diagrams"></breadcrumb>
        <h1 class="title">Electrical Diagrams</h1>
        <p>
          Find the wiring diagrams you need with our collection of fully digitized diagrams sourced directly from The
          Mini Forum. Archived here for postarity and preservation.
        </p>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels v-model="panels" variant="popout" multiple :color="'brand-green-3'">
          <v-expansion-panel
            v-for="(diagram, name, index) in diagrams"
            :key="`${name}-${index}`"
            :value="diagram.title"
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
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-item>
            <patreon-card size="large" />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
  .panel-block {
    word-break: break-word;
  }
</style>

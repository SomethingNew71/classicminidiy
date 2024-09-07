<script lang="ts" setup>
  const { data: diagrams } = await useFetch('/api/diagrams');
  const panels = ref(['Negative Ground']);

  useHead({
    title: 'Archive - Electrical Diagrams',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - Electrical Diagrams',
    ogDescription: 'Manually digitized and updated electrical diagrams for your Classic Mini Cooper.',
    ogUrl: 'classicminidiy.com/archive/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
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
              <v-list lines="two" density="comfortable">
                <v-list-item
                  v-for="(item, nameItem, diagramIndex) in diagram.items"
                  :key="`${nameItem}-${diagramIndex}`"
                  :title="item.name"
                  :href="item.link"
                  target="_blank"
                >
                  <template v-slot:subtitle>
                    <v-icon icon="fad fa-calendar me-3"></v-icon>
                    <template v-if="item.from || item.to"> {{ item.from || '?' }} - {{ item.to || '?' }} </template>
                    <template v-else> Dates Unknown </template>
                  </template>

                  <template v-slot:append>
                    <v-btn icon="fad fa-download" variant="text"></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
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

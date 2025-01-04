<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  useHead({
    title: 'Technical Toolbox',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
      },
      {
        property: 'og:title',
        content: 'Technical Toolbox',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Technical Toolkit',
    ogDescription:
      'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
    ogUrl: 'classicminidiy.com/technical',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Technical Toolbox'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
        <h3 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h3>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-toolbar color="brand-green-2">
            <v-toolbar-title>Toolbox</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list lines="one">
            <v-list-item v-for="item in ToolboxItems" :key="item.title" :title="item.title" :to="item.to">
              <template v-slot:prepend>
                <v-avatar size="large">
                  <span class="is-size-3" v-html="item.iconHtml"> </span>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <p class="is-size-5 pt-5 pb-5">
          One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car.
          So to make this easier for you, I have collected technical information from various sources and consolidated
          it right here on classicminidiy.com.
        </p>
        <v-col cols="12" md="10" offset-md="1">
          <div class="divider">Support</div>
        </v-col>
        <v-col cols="12">
          <patreon-card size="large" />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

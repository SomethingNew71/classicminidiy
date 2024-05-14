<script lang="ts" setup>
  import { ToolboxItems } from '~/data/models/generic';
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
  <hero :navigation="true" :title="'Technical Toolbox'" />
  <v-container>
    <v-row>
      <v-col cols="12">
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
            <li class="is-active">
              <NuxtLink to="/technical">
                <span class="icon is-small">
                  <i class="fad fa-info-circle" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
        <h3 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h3>
      </v-col>
      <v-col cols="12" md="4">
        <nav class="panel">
          <p class="panel-heading">Classic Mini Toolbox</p>
          <NuxtLink v-for="(item, index) in ToolboxItems" :key="index" :to="item.to" class="panel-block is-active">
            <span class="pr-2 is-size-3" v-html="item.iconHtml"> </span>
            {{ item.title }}
          </NuxtLink>
        </nav>
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

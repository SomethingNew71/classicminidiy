<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
</script>

<template>
  <v-col cols="12" md="6">
    <v-card>
      <v-toolbar>
        <v-icon class="ml-4" icon="fad fa-engine"></v-icon>
        <v-toolbar-title>Engine Number Parser</v-toolbar-title>
      </v-toolbar>
      <v-card-text> </v-card-text>
    </v-card>
  </v-col>
  <v-col cols="12" md="6">
    <v-card>
      <v-toolbar>
        <v-icon class="ml-4" icon="fad fa-list"></v-icon>
        <v-toolbar-title>Results</v-toolbar-title>
      </v-toolbar>
      <v-card-text> </v-card-text>
    </v-card>
  </v-col>
  <SpeedInsights />
</template>

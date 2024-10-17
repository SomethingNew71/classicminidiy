<script lang="ts" setup>
  import { SocialItems } from '~/data/models/generic';
  const socials = ref(SocialItems);
</script>
<template>
  <v-footer class="text-center d-flex flex-column pt-10 bg-color-section">
    <div class="pb-2">
      <v-btn
        v-for="(social, i) in socials"
        :key="i"
        :href="social.href"
        class="mx-4"
        :icon="social.icon"
        :title="social.title"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      <h2 class="subtitle">
        <strong class="has-text-primary-00">Classic Mini DIY</strong> by
        <a
          rel="noopener"
          target="_blank"
          href="https://youtube.com/c/classicminidiy?sub_confirmation=1"
          aria-label="Link to my youtube channel"
        >
          Cole Gentry</a
        >.
      </h2>
      <p class="pb-3">
        Classic Mini DIY toolbox is a passion project aligned with the Classic Mini DIY youtube channel. This is a
        completely free resource built to keep the Classic Mini technical knowledgebase alive for years to come.
        Regularly updated and crowd sourced data made to help Classic Mini owners all over the world.
      </p>
    </div>

    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <p>{{ new Date().getFullYear() }} — <strong>Classic Mini DIY LLC</strong></p>
          <div class="divider">Links</div>
          <p>
            <a class="pr-3" href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer"
              >Youtube Privacy Policy</a
            >
            <a href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer"
              >Google Privacy Policy</a
            >
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

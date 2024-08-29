<script setup lang="ts">
  const manuals = await queryContent('archive/manuals').find();
  const crumbs = ref([
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: 'Archive',
      disabled: false,
      href: '/archive',
    },
    {
      title: 'Workshop Manuals',
      disabled: true,
    },
  ]);
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col v-for="manual in manuals" cols="12">
        <v-card>
          <v-row>
            <v-col cols="4" md="2">
              <v-img :src="manual.image" class="pa-10 mx-auto my-auto"></v-img>
            </v-col>
            <v-col cols="8" md="10">
              <h2 class="text-h5 pt-5 pb-5 px-5">{{ manual.title }}</h2>
              <p class="px-5">{{ manual.description }}</p>
              <v-divider></v-divider>

              <div class="pa-4">
                <client-only>
                  <v-btn
                    class="me-2 text-none"
                    color="accent"
                    prepend-icon="fa-duotone fa-solid fa-arrow-up-from-bracket"
                    variant="text"
                    border
                  >
                    Share
                  </v-btn>

                  <v-btn
                    color="primary"
                    class="text-none"
                    prepend-icon="fa-duotone fa-solid fa-download"
                    variant="flat"
                    :href="manual.download"
                  >
                    Download
                  </v-btn>
                </client-only>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

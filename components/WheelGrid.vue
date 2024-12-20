<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  import type { IWheelsData } from '~/data/models/wheels';
  const { smAndDown, mdAndUp, lgAndUp } = useDisplay();
  const search = ref('');
  const size = ref('list');
  const { data: wheels, status } = await useFetch<IWheelsData[]>(() => `/api/wheels/${size.value}`);
</script>

<template>
  <v-card elevation="5">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find Wheels
      <v-spacer></v-spacer>
      <v-text-field
        v-if="mdAndUp"
        v-model="search"
        prepend-inner-icon="fad fa-search"
        density="compact"
        placeholder="Search for anything"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-title>
    <v-card-text v-if="smAndDown">
      <v-text-field
        v-model="search"
        prepend-inner-icon="fad fa-search"
        density="compact"
        placeholder="Search for anything"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          Use the search above to filter for any field in the table below instantly. Notice some data missing? Click the
          edit button to contribute!
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn-toggle v-model="size" mandatory rounded="10" color="primary" group elevation="2">
            <v-btn value="list" :active="size === 'list'"> All </v-btn>
            <v-btn value="ten" :active="size === 'ten'"> 10 </v-btn>
            <v-btn value="twelve" :active="size === 'twelve'"> 12 </v-btn>
            <v-btn value="thirteen" :active="size === 'thirteen'"> 13 </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-iterator :loading="status === 'pending'" :items="wheels || []" :items-per-page="10" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-row class="d-flex justify-center px-2">
          <v-col v-for="{ raw: wheel } in items" :key="wheel.uuid" cols="12" sm="4" md="3">
            <v-card class="pb-3" flat nuxt-link :to="`/archive/wheels/${wheel.uuid}`">
              <template v-if="wheel.images">
                <v-img
                  alt=""
                  class="py-5 my-5 mx-auto rounded-xl align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  aspect-ratio="1"
                  cover
                  :src="wheel.images[0].src"
                >
                  <strong class="text-h6 mb-1 px-4 text-white">
                    {{ wheel.name }}
                    <span class="float-right pr-2">
                      <v-chip v-if="wheel.size === '10'" color="green" class="" variant="flat">
                        {{ wheel.size }}in
                      </v-chip>
                      <v-chip v-if="wheel.size === '12'" color="orange" variant="flat"> {{ wheel.size }}in </v-chip>
                      <v-chip v-if="wheel.size === '13'" color="brown" variant="flat"> {{ wheel.size }}in </v-chip>
                    </span>
                  </strong>
                  <div class="text-right"></div>
                </v-img>
              </template>

              <div class="text-center"></div>
              <div class="d-flex justify-space-between px-4">
                <v-chip color="blue" class="text-caption" :size="'small'"> {{ wheel.size }} x {{ wheel.width }}</v-chip>
                <v-chip color="blue" class="text-caption" :size="'small'">Offset: {{ wheel.offset || '???' }}</v-chip>
              </div>
              <div class="d-flex justify-space-between px-4">
                <v-chip v-if="wheel.type" color="blue" class="text-caption" :size="'small'"
                  >Material: {{ wheel.type || '???' }}</v-chip
                >
                <v-btn class="text-none" size="small" text="More Info" border flat> </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>

      <template v-slot:loader>
        <v-row>
          <v-col v-for="(_, k) in 12" :key="k" cols="12" sm="3">
            <v-skeleton-loader class="border" type="image, article"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <!-- <v-data-table
      :loading="status === 'pending'"
      v-model:search="search"
      :items="wheels || []"
      :headers="tableHeaders"
      :item-value="'uuid'"
      v-model:expanded="expanded"
      fixed-header
      show-expand
    >
      <template v-slot:item.images="{ item }">
        <WheelImages :images="item.images"></WheelImages>
      </template>
      <template v-slot:item.name="{ item }">
        <p class="mt-4 text-subtitle-1 text-capitalize">
          <strong>{{ item.name ? item.name : 'Unknown' }}</strong>
        </p>
      </template>
      <template v-slot:item.size="{ item }">
        <v-chip v-if="item.size === '10'" color="green" class="mt-4"> {{ item.size }}in </v-chip>
        <v-chip v-if="item.size === '12'" color="orange" class="mt-4"> {{ item.size }}in </v-chip>
        <v-chip v-if="item.size === '13'" color="brown" class="mt-4"> {{ item.size }}in </v-chip>
      </template>
      <template v-slot:item.width="{ item }">
        <p v-if="item.width" class="mt-4 text-subtitle-1 text-capitalize">
          {{ item.width }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.offset="{ item }">
        <p v-if="item.offset" class="mt-4 text-subtitle-1 text-capitalize">
          {{ item.offset }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.type="{ item }">
        <p
          v-if="item.type && item.type !== 'other' && item.type !== 'Unknown'"
          class="mt-4 text-subtitle-1 text-capitalize"
        >
          {{ item.type }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn
          class="text-center"
          variant="plain"
          size="large"
          icon="fa-duotone fa-edit"
          :to="`/archive/wheels/submit?uuid=${item.uuid}`"
        >
        </v-btn>
      </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="has-background-light pt-4 pb-4" colspan="8">
            <strong>Extra Notes:</strong>
            <br />
            <div v-html="item.notes || '---'"></div>
          </td>
        </tr>
      </template>
    </v-data-table> -->
  </v-card>
</template>

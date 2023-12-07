<script lang="ts" setup>
  import { VCol, VRow } from 'vuetify/components/VGrid';
  import { VDataIterator } from 'vuetify/components/VDataIterator';
  import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
  import { VBtnToggle } from 'vuetify/components/VBtnToggle';
  import { VTextField } from 'vuetify/components/VTextField';
  import { VBtn } from 'vuetify/components/VBtn';
  const size = ref('ten');
  const search = ref('');

  let { data: wheels, pending, error }: any = await useFetch(() => `/api/wheels/${size.value}`);
  let page = ref(1);
</script>

<template>
  <v-row v-if="pending" class="align-center justify-center">
    <v-row align="center">
      <v-col v-for="(item, i) in 12" :key="i" cols="12" md="4" lg="3" xl="2">
        <v-skeleton-loader class="mx-auto border" max-width="300" type="card,paragraph,actions"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-row>
  <pre v-else-if="error">{{ error }}</pre>
  <v-data-iterator v-else :items="wheels" :page="page" :items-per-page="12" :search="search">
    <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            class="pb-5"
            v-model="search"
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="fad fa-search"
            style="max-width: 300px"
            variant="solo"
          ></v-text-field>
          <v-btn-toggle v-model="size" mandatory rounded="10" color="primary" group elevation="2">
            <v-btn value="list"> All </v-btn>
            <v-btn value="ten" :active="size === 'ten'"> 10 </v-btn>
            <v-btn value="twelve"> 12 </v-btn>
            <v-btn value="thirteen"> 13 </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col class="d-flex justify-center justify-sm-center justify-md-end" cols="12" md="6">
          <v-btn
            :disabled="page === 1"
            pack
            size="small"
            icon="fad fa-arrow-left"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>
          <div class="mx-2 text-body-1">Page {{ page }} of {{ pageCount }}</div>
          <v-btn
            :disabled="page >= pageCount"
            icon="fad fa-arrow-right"
            size="small"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-slot:no-data>
      <v-row>
        <v-col cols="12" class="text-center py-10 my-10">
          <h4 class="text-h5">No items matching your search</h4>
        </v-col>
      </v-row>
    </template>
    <template v-slot:default="{ items }">
      <v-row align="center">
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" xl="3">
          <WheelCard :wheel="item.raw"></WheelCard>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4">
        <v-btn
          :disabled="page === 1"
          icon="fad fa-arrow-left"
          density="comfortable"
          variant="tonal"
          rounded
          @click="prevPage"
        ></v-btn>

        <div class="mx-2 text-body-1">Page {{ page }} of {{ pageCount }}</div>

        <v-btn
          :disabled="page >= pageCount"
          icon="fad fa-arrow-right"
          density="comfortable"
          variant="tonal"
          rounded
          @click="nextPage"
        ></v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>

<script lang="ts" setup>
  import type { IWheelsData } from '~/data/models/wheels';
  const search = ref('');
  const size = ref('list');
  const { data: wheels, status } = await useFetch<IWheelsData[]>(() => `/api/wheels/${size.value}`);
  // const allOffsets = ref<string[]>([]);
  // const selectedOffsets = ref<string[]>([]);
  // const allMaterials = ref<string[]>([]);
  // const selectedMaterials = ref<string[]>([]);

  // function getAllOffsets() {
  //   if (!wheels.value) return;
  //   const offsets = wheels.value.map((wheel) => wheel.offset.trim());
  //   allOffsets.value = Array.from(new Set(offsets))
  //     .sort()
  //     .filter((offset) => offset !== '');
  // }
  // function getAllMaterials() {
  //   if (!wheels.value) return;
  //   const materials = wheels.value.map((wheel) => wheel.type.trim());
  //   allMaterials.value = Array.from(new Set(materials)).sort();
  // }
  // // Watch for changes in wheels data and update offsets
  // watch(wheels, () => {
  //   getAllOffsets();
  //   getAllMaterials();
  // });

  // await getAllOffsets();
  // await getAllMaterials();
</script>

<template>
  <v-data-iterator :loading="status === 'pending'" :items="wheels || []" :items-per-page="12" :search="search">
    <template v-slot:header>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find Wheels
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pb-10">
        <v-row>
          <v-col cols="12" md="3">
            <v-btn-toggle v-model="size" mandatory rounded="10" color="primary" group elevation="2">
              <v-btn value="list" :active="size === 'list'"> All </v-btn>
              <v-btn value="ten" :active="size === 'ten'"> 10 </v-btn>
              <v-btn value="twelve" :active="size === 'twelve'"> 12 </v-btn>
              <v-btn value="thirteen" :active="size === 'thirteen'"> 13 </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="search"
              prepend-inner-icon="fad fa-search"
              density="compact"
              placeholder="Search for anything (ex. Momos, 10in, ET20)"
              single-line
              flat
              hide-details
              variant="solo-filled"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12" md="6">
              <v-select v-model="selectedOffsets" :items="allOffsets" label="Offsets" multiple>
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span v-if="index === 2" class="text-grey text-caption align-self-center">
                    (+{{ selectedOffsets.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="selectedMaterials" :items="allMaterials" label="Material" multiple>
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span v-if="index === 2" class="text-grey text-caption align-self-center">
                    (+{{ selectedMaterials.length - 2 }} others)
                  </span>
                </template>
              </v-select>
            </v-col> -->
        </v-row>
      </v-card-text>
    </template>

    <template v-slot:default="{ items }">
      <v-row class="d-flex justify-center px-2">
        <v-col v-for="{ raw: wheel } in items" :key="wheel.uuid" cols="12" sm="4" md="3">
          <v-card flat nuxt-link :to="`/archive/wheels/${wheel.uuid}`">
            <template v-if="wheel.images">
              <v-img
                alt=""
                class="mx-auto rounded-xl align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                aspect-ratio="1"
                cover
                :src="
                  !wheel.images[0]?.src ||
                  wheel.images[0]?.src === 'https://classicminidiy.s3.amazonaws.com/cloud-icon/missing.svg'
                    ? 'https://classicminidiy.s3.us-east-1.amazonaws.com/wheels/missing-wheel-image.png'
                    : wheel.images[0].src
                "
              >
                <span class="float-right pr-2">
                  <v-chip v-if="wheel.size === '10'" color="green" class="" variant="flat"> {{ wheel.size }}in </v-chip>
                  <v-chip v-if="wheel.size === '12'" color="orange" variant="flat"> {{ wheel.size }}in </v-chip>
                  <v-chip v-if="wheel.size === '13'" color="blue" variant="flat"> {{ wheel.size }}in </v-chip>
                </span>
                <h2 class="text-h6 px-4 mb-4 text-white text-bold">
                  {{ wheel.name }}
                </h2>
              </v-img>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4">
        <v-btn
          :disabled="page === 1"
          density="comfortable"
          icon="fad fa-arrow-left"
          variant="tonal"
          rounded
          @click="prevPage"
        ></v-btn>
        <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>
        <v-btn
          :disabled="page >= pageCount"
          density="comfortable"
          icon="fad fa-arrow-right"
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
</template>

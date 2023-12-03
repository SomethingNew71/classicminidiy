<script lang="ts" setup>
  import { VCard, VCardText } from 'vuetify/components/VCard';
  import { VCol, VRow } from 'vuetify/components/VGrid';
  import { VDataIterator } from 'vuetify/components/VDataIterator';
  import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
  import { VExpansionPanel, VExpansionPanels, VExpansionPanelText } from 'vuetify/components/VExpansionPanel';
  import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel';
  import { VChip } from 'vuetify/components/VChip';
  import { VChipGroup } from 'vuetify/components/VChipGroup';
  const size = ref('ten');
  const tags = ref([
    { key: 'All', value: 'list' },
    { key: '10', value: 'ten' },
    { key: '12', value: 'twelve' },
    { key: '13', value: 'thirteen' },
  ]);

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
  <v-data-iterator v-else :items="wheels" :page="page" :items-per-page="12">
    <template v-slot:header="{ page, pageCount, prevPage, nextPage, items }">
      <v-row dense class="justify-space-between">
        <v-col>
          <v-chip-group mandatory selected-class="text-primary">
            <v-chip v-for="tag in tags" :key="tag.key" @click="size = tag.value">
              {{ tag.key }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col class="d-flex align-center justify-end pa-4 pa-4">
          <v-btn
            :disabled="page === 1"
            pack
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
        </v-col>
      </v-row>
    </template>
    <template v-slot:default="{ items }">
      <v-row align="center">
        <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" lg="3" xl="2">
          <v-card hover :title="item.raw.name">
            <template v-if="item.raw.images?.length >= 1">
              <v-carousel v-if="item.raw.images?.length > 1">
                <template v-for="image in item.raw.images">
                  <v-carousel-item v-if="!image.inReview" :src="image.src" cover></v-carousel-item>
                </template>
              </v-carousel>
              <v-img
                v-else-if="item.raw.images?.length === 1 && !item.raw.images[0].inReview"
                cover
                height="250"
                :src="item.raw.images[0].src"
              ></v-img>
            </template>
            <template v-else> NO IMAGE FOUND </template>
            <v-card-text class="d-flex justify-space-between">
              <p class="text-subtitle-1">
                <i
                  class="fa-duotone fa-ruler-triangle"
                  style="--fa-primary-color: #433016; --fa-secondary-color: #ddbd8d; --fa-secondary-opacity: 1"
                ></i>
                {{ item.raw.size }}in
              </p>
              <NuxtLink :to="`/technical/wheels/submit?uuid=${item.raw.uuid}`">
                <v-btn density="comfortable" icon="fad fa-edit" variant="tonal">Edit</v-btn>
              </NuxtLink>
            </v-card-text>
            <v-card-text>
              <div class="text-subtitle-1">
                <ul>
                  <li>
                    <i
                      class="fa-duotone fa-box-open-full"
                      style="--fa-primary-color: #7c8670; --fa-secondary-color: #0a120b"
                    ></i>
                    Material: {{ item.raw.type === 'other' || item.raw.type === '' ? 'Unknown' : item.raw.type }}
                  </li>
                  <li>
                    <i
                      class="fa-duotone fa-maximize"
                      style="--fa-primary-color: #cfb283; --fa-secondary-color: #421f23; --fa-secondary-opacity: 0.6"
                    ></i>
                    Size - {{ item.raw.width ? `${item.raw.width} x ` : '' }}
                    {{ item.raw.size }}
                  </li>
                  <li>
                    <i
                      class="fa-duotone fa-right-from-line"
                      style="--fa-primary-color: #f4b852; --fa-secondary-color: #f4b852"
                    ></i>
                    Offset - {{ item.raw.offset ? item.raw.offset : 'Unknown' }}
                  </li>
                </ul>
              </div>
            </v-card-text>

            <v-expansion-panels class="pt-2">
              <v-expansion-panel v-if="item.raw.notes !== ''" title="Notes">
                <v-expansion-panel-text>
                  <div v-html="item.raw.notes"></div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel v-else title="Notes" text="No additional notes for this wheel"> </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
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

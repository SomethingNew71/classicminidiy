<script lang="ts" setup>
  import type { IWheelsData } from '~/data/models/wheels';

  defineProps({
    wheel: {
      type: Object as PropType<IWheelsData>,
      required: true,
    },
  });
</script>

<template>
  <v-card hover class="mx-auto" elevation="4">
    <v-card-item :title="wheel.name">
      <template v-slot:subtitle>
        <v-icon icon="fad fa-tire fa-spin" size="24" class="me-1 py-2"></v-icon>
        {{ wheel.width ? wheel.width : '?' }} x {{ wheel.size ? wheel.size : '?' }}
      </template>
      <template v-slot:append>
        <v-btn
          variant="plain"
          size="large"
          icon="fa-duotone fa-edit"
          :to="`/technical/wheels/submit?uuid=${wheel.uuid}`"
        >
        </v-btn>
      </template>
    </v-card-item>

    <v-card-text class="">
      <v-row align="center" no-gutters>
        <v-carousel v-if="wheel.images && wheel.images?.length > 1" height="250">
          <template v-for="image in wheel.images">
            <v-carousel-item :src="image.src"></v-carousel-item>
          </template>
        </v-carousel>
        <v-img
          v-else-if="wheel.images?.length === 1 && !wheel.images[0].inReview"
          cover
          height="250"
          :src="wheel.images[0].src"
        ></v-img>
      </v-row>
    </v-card-text>
    <v-card-item>
      <v-row justify="space-between">
        <v-col>
          <v-list>
            <v-list-item
              :subtitle="wheel.size ? wheel.size : 'Unknown'"
              color="light-green-darken-1"
              prepend-icon="fa-duotone text-yellow-darken-3 fa-ruler-triangle"
              title="Size"
            >
            </v-list-item>
            <v-list-item
              :subtitle="wheel.width ? wheel.width : 'Unknown'"
              prepend-icon="fa-duotone fa-maximize text-blue-darken-4"
              title="Width"
            >
            </v-list-item> </v-list
        ></v-col>
        <v-divider vertical thickness="3"></v-divider>
        <v-col class="text-right">
          <v-list>
            <v-list-item
              :subtitle="wheel.type ? wheel.type : 'Unknown'"
              color="light-green-darken-1"
              append-icon="fa-duotone fa-box-open-full text-brown-darken-4"
              title="Type"
            >
            </v-list-item>
            <v-list-item
              :subtitle="wheel.offset ? wheel.offset : 'Unknown'"
              append-icon="fa-duotone fa-right-from-line text-green-darken-4"
              title="Offset"
            >
            </v-list-item> </v-list
        ></v-col>
      </v-row>
    </v-card-item>
    <v-expansion-panels class="pt-2">
      <v-expansion-panel v-if="wheel.notes !== ''" title="Notes">
        <v-expansion-panel-text>
          <div v-html="wheel.notes"></div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel v-else title="Notes" text="No additional notes for this wheel"> </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts" setup>
  import type { IWheelsData } from '~/data/models/wheels';
  import { VCard, VCardText, VCardItem } from 'vuetify/components/VCard';
  import { VIcon } from 'vuetify/components/VIcon';
  import { VBtn } from 'vuetify/components/VBtn';
  import { VExpansionPanel, VExpansionPanels, VExpansionPanelText } from 'vuetify/components/VExpansionPanel';
  import { VList, VListItem, VListItemSubtitle } from 'vuetify/components/VList';
  import { VRow } from 'vuetify/components/VGrid';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel';

  defineProps({
    wheel: {
      type: Object as PropType<IWheelsData>,
      required: true,
    },
  });
</script>

<template>
  <v-card hover class="mx-auto">
    <v-card-item :title="wheel.name" class="bg-blue-grey-lighten-5">
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

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="fa-duotone text-yellow-darken-3 fa-ruler-triangle">
        <v-list-item-subtitle>Size: {{ wheel.size ? wheel.size : 'Unknown' }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item density="compact" append-icon="fa-duotone fa-maximize text-blue-darken-4">
        <v-list-item-subtitle>Width: {{ wheel.width ? wheel.width : 'Unknown' }}</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-divider></v-divider>

    <v-list class="bg-transparent">
      <v-list-item
        :title="wheel.type ? wheel.type : 'Unknown'"
        color="light-green-darken-1"
        append-icon="fa-duotone fa-box-open-full text-brown-darken-4"
        subtitle="Type"
      >
      </v-list-item>
      <v-list-item
        :title="wheel.offset ? wheel.offset : 'Unknown'"
        append-icon="fa-duotone fa-right-from-line text-green-darken-4"
        subtitle="Offset"
      >
      </v-list-item>
    </v-list>
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

<script lang="ts" setup>
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const { smAndDown, lgAndUp } = useDisplay();
  const height = ref();
  const width = ref();
  defineProps({
    images: {
      type: Array as PropType<{ src: string; inReview: boolean }[]>,
      required: true,
      default: [],
    },
  });
</script>

<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-img
        v-if="smAndDown"
        class="table-wheel py-5"
        cover
        v-bind="props"
        :src="images[0].src"
        height="75"
        width="75"
      ></v-img>
      <v-img
        v-else-if="lgAndUp"
        class="table-wheel py-5"
        cover
        v-bind="props"
        :src="images[0].src"
        height="200"
        width="200"
      ></v-img>
      <v-img
        v-else=""
        class="table-wheel py-5"
        cover
        v-bind="props"
        :src="images[0].src"
        height="100"
        width="100"
      ></v-img>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="More Images">
        <v-card-text>
          <v-carousel v-if="images.length > 1">
            <template v-for="image in images">
              <v-carousel-item :src="image.src"></v-carousel-item>
            </template>
          </v-carousel>
          <v-img v-else cover :src="images[0].src"></v-img>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" color="primary" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss">
  .table-wheel {
    opacity: 1;
    transition: ease-in-out 300ms;
    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  }
</style>

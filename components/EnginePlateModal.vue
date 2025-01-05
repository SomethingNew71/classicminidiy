<script lang="ts" setup></script>

<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <p class="font-weight-bold pt-4 pb-2">Unsure what your engine plate looks like?</p>
      <v-btn v-bind="activatorProps" color="primary" prepend-icon="fa-duotone fa-clipboard-question"
        >Where is my engine plate?</v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Engine Plates">
        <v-card-text>
          <v-carousel>
            <v-carousel-item
              lazy-src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example1.jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example1.jpg"
              cover
            ></v-carousel-item>

            <v-carousel-item
              lazy-src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example2.jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example2.jpg"
              cover
            ></v-carousel-item>

            <v-carousel-item
              lazy-src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example3.jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example3.jpg"
              cover
            ></v-carousel-item>
          </v-carousel>
          <h2 class="text-h5 py-4">Location of Engine Plate</h2>
          <p>
            Engine plates were found in the same place across all model year minis. However these plates are missing in
            some situations:
          </p>
          <v-list lines="one">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="fad fa-circle" :size="'x-small'"></v-icon>
              </template>
              If the engine was rebuilt, and it was removed to deck the block
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend> <v-icon icon="fad fa-circle" :size="'x-small'"></v-icon> </template>
              If the engine was replaced with a used engine, the plate may not have been transferred
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="fad fa-circle" :size="'x-small'"></v-icon>
              </template>
              They were removed by a previous owner for some reason.
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" variant="flat" @click="isActive.value = false">Close Window</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

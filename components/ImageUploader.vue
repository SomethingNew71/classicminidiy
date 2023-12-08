<script lang="ts" setup>
  import { ref } from 'vue';

  const dropFiles: any = ref([]);
  const deleteDropFile = (index: number) => {
    dropFiles.value.splice(index, 1);
  };
</script>

<template>
  <div class="columns">
    <o-field class="column is-12">
      <o-upload v-model="dropFiles" multiple drag-drop class="column is-12">
        <section class="has-text-centered">
          <p>
            <o-icon pack="fad" icon="upload" size="is-large" />
          </p>
          <p>Drop your files here or click to upload</p>
        </section>
      </o-upload>
    </o-field>
    <div class="column is-6 tags">
      <nav class="panel is-striped p-0">
        <p class="panel-heading">Images</p>
        <template v-if="dropFiles.length > 0">
          <div v-for="(file, index) in dropFiles" :key="index" class="panel-block">
            <span class="panel-icon">
              <i class="fad fa-image" aria-hidden="true" />
            </span>
            {{ file.name }}
            <span class="panel-icon">
              <o-button
                class="pl-2"
                variant="primary"
                iconPack="fad"
                icon-left="xmark"
                size="small"
                native-type="button"
                @click="deleteDropFile(index)"
              >
              </o-button>
            </span>
          </div>
        </template>
        <template v-else>
          <div class="panel-block">
            <span class="panel-icon">
              <i class="fad fa-question" aria-hidden="true" />
            </span>
            No images added yet
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
  .upload-draggable.is-hovered {
    border: #659cc8 1px solid;
  }
</style>

<template>
  <v-flex xs12 class="historical">
    <div class="loader">
    </div>
    <div class="iframe-container">
      <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1UBqFp7aZ2qgC1_dlFTXOavaiMN8tSNxS-IPnYgU8e_g&font=PT&lang=en&initial_zoom=2&height=600' width='100%' height='600' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    </div>
  </v-flex>
</template>

<script></script>
<style lang="scss">
.historical {
  .loader {
    z-index: -1;
    border-color: #279BFB;
    border-right-color: transparent;
    border-top-color: transparent;
    font-size: 100px;
    margin-right: auto;
    margin-left: auto;
    top: 20rem;
    left: 48%;
    position: absolute;
  }

  .iframe-container {
    z-index: 1;
    margin-bottom: 5rem;

    .tl-attribution {
      display: none;
    }
  }
}

</style>

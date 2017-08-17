<template>
  <section class="historical">
    <div>
      <div class="loader">
      </div>
      <div class="iframe-container">
        <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1UBqFp7aZ2qgC1_dlFTXOavaiMN8tSNxS-IPnYgU8e_g&font=PT&lang=en&initial_zoom=2&height=600' width='100%' height='600' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    components: {
    }
  };
</script>
<style lang="scss">
.historical {
  .hero {
    background-image: url('/backgrounds/historical/history.jpg') !important;

    .hero-body h1 {
      padding-bottom: 9rem;
    }
  }
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
    margin-top: 5rem;
    margin-bottom: 5rem;

    .tl-attribution {
      display: none;
    }
  }
}

</style>

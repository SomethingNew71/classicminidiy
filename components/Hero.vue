<template>
  <section
    class="hero"
    :class="size"
    :style="[
      blog
        ? {
            backgroundImage: `url(/img/typewriter.jpg)`,
          }
        : {
            backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${background}.webp)`,
          },
      !showImage ? { backgroundImage: 'none' } : {},
    ]"
  >
    <div
      class="hero-body"
      :style="[blog ? { paddingTop: '4rem', paddingBottom: '4rem' } : {}]"
    >
      <div class="container" :class="{ 'has-text-centered': centered }">
        <p
          class="subtitle is-6 has-text-white"
          :class="{ 'has-text-centered': blog }"
        >
          {{ subtitle }}
        </p>
        <h1
          v-if="title"
          class="title fancy-font-bold has-text-white"
          :class="{ 'special-title': special, 'has-text-centered': blog }"
          v-html="title"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },
    showImage: {
      type: Boolean,
      default: true,
    },
    blog: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    special: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '/technical',
    },
    centered: {
      type: Boolean,
      default: false,
    },
  });
</script>
<style lang="scss">
  .hero {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .special-title {
      font-size: 100px;
    }

    @media screen and (max-width: 1023px) {
      .special-title {
        font-size: 2rem;
      }
    }
  }
</style>

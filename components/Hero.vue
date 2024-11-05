<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  let styleObject: any;

  const props = defineProps({
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
    ecuMap: {
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
    heroType: {
      type: String as PropType<HERO_TYPES>,
      required: true,
      default: HERO_TYPES.TECH,
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

  switch (props.heroType) {
    case HERO_TYPES.HOME:
      styleObject = {
        backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${props.background}.webp)`,
        backgroundSize: 'contain',
        backgroundPosition: 'right',
      };
      break;
    case HERO_TYPES.TECH:
      styleObject = {
        backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${props.background}.webp)`,
      };
      break;
    case HERO_TYPES.ARCHIVE:
      styleObject = {
        backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc/archive2.jpg)`,
      };
      break;
    case HERO_TYPES.BLOG:
      styleObject = { backgroundImage: `url(https://classicminidiy.s3.us-east-1.amazonaws.com/misc/typewriter.jpg)` };
      break;
    case HERO_TYPES.MAPS:
      styleObject = { backgroundImage: `url(https://classicminidiy.s3.us-east-1.amazonaws.com/misc/macbook.jpg)` };
      break;
    default:
      styleObject = {
        backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${props.background}.webp)`,
      };
      break;
  }
</script>

<template>
  <section class="hero" :class="size" :style="[!showImage ? { backgroundImage: 'none' } : styleObject]">
    <div class="hero-body" :style="[blog ? { paddingTop: '4rem', paddingBottom: '4rem' } : {}]">
      <div class="container" :class="{ 'has-text-centered': centered }">
        <p class="subtitle is-6 has-text-white" :class="{ 'has-text-centered': blog }">
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
<style lang="scss">
  .hero {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 4rem;
    background-color: #242424;

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

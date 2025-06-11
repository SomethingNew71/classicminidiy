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
    textSize: {
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
  <section
    class="hero flex"
    :class="{
      [textSize]: textSize,
      'md:h-144 sm:h-96': heroType === HERO_TYPES.HOME,
      'md:h-60 sm:h-48': heroType === HERO_TYPES.TECH || heroType === HERO_TYPES.ARCHIVE,
      'md:h-112 sm:h-96': heroType === HERO_TYPES.BLOG || heroType === HERO_TYPES.MAPS,
    }"
    :style="[!showImage ? { backgroundImage: 'none' } : styleObject]"
  >
    <div class="hero-content flex-col" :style="[blog ? { paddingTop: '4rem', paddingBottom: '4rem' } : {}]">
      <div class="pl-20 prose lg:prose-xl" :class="{ 'has-text-centered': centered }">
        <p class="text-white" :class="{ 'has-text-centered': blog }">
          {{ subtitle }}
        </p>
        <h1
          v-if="title"
          class="fancy-font-bold text-white"
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

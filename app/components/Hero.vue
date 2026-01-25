<script setup lang="ts">
  import { HERO_TYPES } from '../../data/models/generic';

  const { t } = useI18n();
  let styleObject: any;

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    titleKey: {
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
    subtitleKey: {
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

  const displayTitle = computed(() => {
    return props.titleKey ? t(props.titleKey) : props.title;
  });

  const displaySubtitle = computed(() => {
    return props.subtitleKey ? t(props.subtitleKey) : props.subtitle;
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
    class="hero-section flex bg-[#242424] bg-cover bg-center bg-no-repeat"
    :class="{
      [textSize]: textSize,
      'md:h-144 sm:h-96': heroType === HERO_TYPES.HOME,
      'md:h-60 sm:h-48': heroType === HERO_TYPES.TECH || heroType === HERO_TYPES.ARCHIVE,
      'md:h-112 sm:h-96': heroType === HERO_TYPES.BLOG || heroType === HERO_TYPES.MAPS,
    }"
    :style="[!showImage ? { backgroundImage: 'none' } : styleObject]"
  >
    <div
      class="hero-content flex flex-col items-start justify-center"
      :style="[blog ? { paddingTop: '4rem', paddingBottom: '4rem' } : {}]"
    >
      <div class="pl-20" :class="{ 'text-center': centered }">
        <p class="text-white text-sm uppercase tracking-wide" :class="{ 'text-center': blog }">
          {{ displaySubtitle }}
        </p>
        <h1
          v-if="displayTitle"
          class="fancy-font-bold text-white text-4xl lg:text-5xl mt-2"
          :class="{ 'special-title': special, 'text-center': blog }"
        >
          <span v-if="heroType === HERO_TYPES.HOME">
            {{ t('home_title') }}
          </span>
          <span v-else>
            {{ displayTitle }}
          </span>
        </h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .hero-section {
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

<i18n lang="json">
{
  "en": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "YOUR FRIENDLY NEIGHBORHOOD"
  },
  "es": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "TU RECURSO AMIGABLE DEL BARRIO"
  },
  "fr": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "VOTRE RESSOURCE AMICALE DE QUARTIER"
  },
  "de": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "IHRE FREUNDLICHE NACHBARSCHAFTSRESSOURCE"
  },
  "it": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "LA TUA RISORSA AMICHEVOLE DI QUARTIERE"
  },
  "ja": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "あなたの親しみやすい近所のリソース"
  },
  "ko": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "당신의 친근한 동네 리소스"
  },
  "pt": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "SEU RECURSO AMIGÁVEL DA VIZINHANÇA"
  },
  "ru": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "ВАШ ДРУЖЕЛЮБНЫЙ СОСЕДСКИЙ РЕСУРС"
  },
  "zh": {
    "home_title": "Classic Mini DIY",
    "home_subtitle": "您友好的邻里资源"
  }
}
</i18n>

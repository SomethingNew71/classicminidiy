<script lang="ts" setup>
  const { t } = useI18n({
    useScope: 'local',
  });
  const route = useRoute();
  const switchLocalePath = useSwitchLocalePath();
  const { locale, locales, setLocale } = useI18n();

  // Get current locale info
  const currentLocale = computed(() => {
    return locales.value.find((i) => i.code === locale.value);
  });

  // Get available locales (excluding current)
  const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
  });

  // Function to handle language change in mobile menu
  const handleMobileLanguageChange = async (localeCode: string) => {
    await setLocale(localeCode as any);
    await navigateTo(switchLocalePath(localeCode as any));
    closeMobileDropdown();
  };

  // Function to check if a route is active
  const isActive = (path: string): boolean => {
    return route.path === path || route.path.startsWith(path + '/');
  };

  // Function to close mobile dropdown
  const closeMobileDropdown = () => {
    // Remove focus from the dropdown trigger to close it
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };
</script>

<template>
  <div class="navbar bg-base-100 py-3">
    <div class="navbar-start">
      <NuxtLink :to="'/'" class="d-inline-block">
        <nuxt-img
          :alt="t('logo_alt')"
          src="https://classicminidiy.s3.amazonaws.com/misc/Small-Black.png"
          class="w-32"
        />
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-base">
        <li>
          <a href="https://classicminidiy.substack.com/" target="_blank">
            <span><i class="fad fa-pencil"></i></span> {{ t('navigation.blog') }}</a
          >
        </li>
        <li>
          <nuxt-link to="/maps" :class="{ active: isActive('/maps') }">
            <span><i class="fad fa-computer-classic"></i></span>
            {{ t('navigation.maps') }}</nuxt-link
          >
        </li>
        <li>
          <a href="https://store.classicminidiy.com/" target="_blank">
            <span><i class="fad fa-store"></i></span> {{ t('navigation.store') }}</a
          >
        </li>
        <li>
          <nuxt-link to="/archive" :class="{ active: isActive('/archive') }">
            <span><i class="fad fa-books"></i></span> {{ t('navigation.archive') }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/technical" :class="{ active: isActive('/technical') }">
            <span><i class="fad fa-toolbox"></i></span> {{ t('navigation.toolbox') }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/chat" :class="{ active: isActive('/chat') }">
            <span><i class="fad fa-comments"></i></span> {{ t('navigation.chat') }}</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end hidden lg:flex items-center gap-2">
      <LanguageSwitcher />
      <a class="btn donate flex-shrink-0" href="https://patreon.com/classicminidiy">
        <i class="fab fa-patreon"></i>{{ t('donate_button') }}</a
      >
    </div>
    <div class="navbar-end lg:hidden">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a href="https://classicminidiy.substack.com/" target="_blank" @click="closeMobileDropdown">
              <span><i class="fad fa-pencil"></i></span> {{ t('navigation.blog') }}</a
            >
          </li>
          <li>
            <nuxt-link to="/maps" :class="{ active: isActive('/maps') }" @click="closeMobileDropdown">
              <span><i class="fad fa-computer-classic"></i></span>
              {{ t('navigation.maps') }}</nuxt-link
            >
          </li>
          <li>
            <a href="https://store.classicminidiy.com/" target="_blank" @click="closeMobileDropdown">
              <span><i class="fad fa-store"></i></span> {{ t('navigation.store') }}</a
            >
          </li>
          <li>
            <nuxt-link to="/archive" :class="{ active: isActive('/archive') }" @click="closeMobileDropdown">
              <span><i class="fad fa-books"></i></span> {{ t('navigation.archive') }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/technical" :class="{ active: isActive('/technical') }" @click="closeMobileDropdown">
              <span><i class="fad fa-toolbox"></i></span> {{ t('navigation.toolbox') }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/chat" :class="{ active: isActive('/chat') }" @click="closeMobileDropdown">
              <span><i class="fad fa-comments"></i></span> {{ t('navigation.chat') }}</nuxt-link
            >
          </li>
          <li class="border-t pt-2 mt-2">
            <div class="dropdown dropdown-end w-full">
              <div tabindex="0" role="button" class="w-full flex items-center justify-between py-2">
                <div class="flex items-center">
                  <i class="fad fa-globe mr-2"></i>
                  <span>{{ currentLocale?.name || t('language_label') }}</span>
                </div>
                <i class="fad fa-chevron-down text-xs"></i>
              </div>
              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] mt-1 w-52 p-2 shadow">
                <li v-for="availableLocale in availableLocales" :key="availableLocale.code">
                  <a href="#" @click.prevent.stop="handleMobileLanguageChange(availableLocale.code)" class="text-sm">
                    {{ availableLocale.name }}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .donate {
    background-color: #f96854;
    color: #fff;
  }
</style>

<i18n lang="json">
{
  "en": {
    "logo_alt": "Classic Mini DIY Logo",
    "navigation": {
      "blog": "Blog",
      "maps": "Maps",
      "store": "Store",
      "archive": "Archive",
      "toolbox": "Toolbox",
      "chat": "Chat"
    },
    "donate_button": "Join CMDIY",
    "language_label": "Language"
  },
  "es": {
    "logo_alt": "Logo de Classic Mini DIY",
    "navigation": {
      "blog": "Blog",
      "maps": "Mapas",
      "store": "Tienda",
      "archive": "Archivo",
      "toolbox": "Herramientas",
      "chat": "Chat"
    },
    "donate_button": "Únete a CMDIY",
    "language_label": "Idioma"
  },
  "fr": {
    "logo_alt": "Logo Classic Mini DIY",
    "navigation": {
      "blog": "Blog",
      "maps": "Cartes",
      "store": "Boutique",
      "archive": "Archive",
      "toolbox": "Outils",
      "chat": "Chat"
    },
    "donate_button": "Rejoindre CMDIY",
    "language_label": "Langue"
  },
  "de": {
    "logo_alt": "Classic Mini DIY Logo",
    "navigation": {
      "blog": "Blog",
      "maps": "Karten",
      "store": "Shop",
      "archive": "Archiv",
      "toolbox": "Werkzeuge",
      "chat": "Chat"
    },
    "donate_button": "CMDIY beitreten",
    "language_label": "Sprache"
  },
  "it": {
    "logo_alt": "Logo Classic Mini DIY",
    "navigation": {
      "blog": "Blog",
      "maps": "Mappe",
      "store": "Negozio",
      "archive": "Archivio",
      "toolbox": "Strumenti",
      "chat": "Chat"
    },
    "donate_button": "Unisciti a CMDIY",
    "language_label": "Lingua"
  },
  "ja": {
    "logo_alt": "Classic Mini DIY ロゴ",
    "navigation": {
      "blog": "ブログ",
      "maps": "マップ",
      "store": "ストア",
      "archive": "アーカイブ",
      "toolbox": "ツールボックス",
      "chat": "チャット"
    },
    "donate_button": "CMDIYに参加",
    "language_label": "言語"
  },
  "ko": {
    "logo_alt": "Classic Mini DIY 로고",
    "navigation": {
      "blog": "블로그",
      "maps": "맵",
      "store": "스토어",
      "archive": "아카이브",
      "toolbox": "도구상자",
      "chat": "채팅"
    },
    "donate_button": "CMDIY 가입",
    "language_label": "언어"
  },
  "pt": {
    "logo_alt": "Logo Classic Mini DIY",
    "navigation": {
      "blog": "Blog",
      "maps": "Mapas",
      "store": "Loja",
      "archive": "Arquivo",
      "toolbox": "Ferramentas",
      "chat": "Chat"
    },
    "donate_button": "Junte-se ao CMDIY",
    "language_label": "Idioma"
  },
  "ru": {
    "logo_alt": "Логотип Classic Mini DIY",
    "navigation": {
      "blog": "Блог",
      "maps": "Карты",
      "store": "Магазин",
      "archive": "Архив",
      "toolbox": "Инструменты",
      "chat": "Чат"
    },
    "donate_button": "Присоединиться к CMDIY",
    "language_label": "Язык"
  },
  "zh": {
    "logo_alt": "Classic Mini DIY 徽标",
    "navigation": {
      "blog": "博客",
      "maps": "地图",
      "store": "商店",
      "archive": "档案",
      "toolbox": "工具箱",
      "chat": "聊天"
    },
    "donate_button": "加入 CMDIY",
    "language_label": "语言"
  }
}
</i18n>

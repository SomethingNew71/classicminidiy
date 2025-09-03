<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const currentLocale = computed(() => {
    return locales.value.find((i) => i.code === locale.value);
  });

  const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
  });

  const handleLanguageChange = async (localeCode: string) => {
    // Set the locale which will persist in cookie/localStorage
    await setLocale(localeCode as any);

    // Navigate to the new locale path
    await navigateTo(switchLocalePath(localeCode as any));
  };

  // Function to close dropdown on mobile
  const closeDropdown = () => {
    const activeElement = document.activeElement;
    if (activeElement && 'blur' in activeElement) {
      (activeElement as any).blur();
    }
  };
</script>

<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
      <i class="fad fa-globe"></i>
      <span class="hidden sm:inline">{{ currentLocale?.name }}</span>
      <i class="fad fa-chevron-down text-xs"></i>
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] mt-1 w-40 p-2 shadow">
      <li v-for="locale in availableLocales" :key="locale.code">
        <a
          href="#"
          @click.prevent.stop="handleLanguageChange(locale.code); closeDropdown()"
          class="text-sm"
        >
          {{ locale.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

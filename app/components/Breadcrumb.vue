<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS } from '../../data/models/generic';

  const { t } = useI18n({
    useScope: 'local',
  });

  const props = defineProps({
    page: {
      type: String,
      default: '',
    },
    version: {
      type: String as PropType<BREADCRUMB_VERSIONS>,
      default: BREADCRUMB_VERSIONS.ARCHIVE,
    },
    root: {
      type: Boolean,
    },
    subpage: {
      type: String,
    },
    subpageHref: {
      type: String,
    },
    href: {
      type: String,
      default: '',
    },
  });

  const crumbs = computed(() => {
    const result: any[] = [];

    if (props.root) {
      result.push(
        {
          title: t('home'),
          disabled: false,
          href: '/',
        },
        {
          title:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? t('technical')
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? t('admin')
                : t('archive'),
          disabled: true,
          href:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? '/technical'
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? '/admin'
                : '/archive',
        }
      );
    } else if (props.subpage) {
      result.push(
        {
          title: t('home'),
          disabled: false,
          href: '/',
        },
        {
          title:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? t('technical')
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? t('admin')
                : t('archive'),
          disabled: false,
          href:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? '/technical'
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? '/admin'
                : '/archive',
        },
        {
          title: props.subpage,
          disabled: false,
          href: props.subpageHref,
        },
        {
          title: props.page,
          disabled: true,
        }
      );
    } else {
      result.push(
        {
          title: t('home'),
          disabled: false,
          href: '/',
        },
        {
          title:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? t('technical')
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? t('admin')
                : t('archive'),
          disabled: false,
          href:
            props.version === BREADCRUMB_VERSIONS.TECH
              ? '/technical'
              : props.version === BREADCRUMB_VERSIONS.ADMIN
                ? '/admin'
                : '/archive',
        },
        {
          title: props.page,
          disabled: true,
        }
      );
    }

    return result;
  });
</script>
<template>
  <div class="text-base breadcrumbs">
    <ul>
      <li v-for="(crumb, index) in crumbs" :key="index">
        <div v-if="index === 0" class="flex items-center">
          <i class="fa-duotone fa-home mr-1"></i>
          <NuxtLink v-if="!crumb.disabled" :to="crumb.href">{{ crumb.title }}</NuxtLink>
          <span v-else class="opacity-60">{{ crumb.title }}</span>
        </div>
        <div v-else>
          <NuxtLink v-if="!crumb.disabled" :to="crumb.href">{{ crumb.title }}</NuxtLink>
          <span v-else class="opacity-60">{{ crumb.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "home": "Home",
    "archive": "Archive",
    "technical": "Technical",
    "admin": "Admin"
  },
  "de": {
    "home": "Startseite",
    "archive": "Archiv",
    "technical": "Technisch",
    "admin": "Verwaltung"
  },
  "es": {
    "home": "Inicio",
    "archive": "Archivo",
    "technical": "Técnico",
    "admin": "Administración"
  },
  "fr": {
    "home": "Accueil",
    "archive": "Archive",
    "technical": "Technique",
    "admin": "Administration"
  },
  "it": {
    "home": "Casa",
    "archive": "Archivio",
    "technical": "Tecnico",
    "admin": "Amministrazione"
  },
  "ja": {
    "home": "ホーム",
    "archive": "アーカイブ",
    "technical": "技術",
    "admin": "管理"
  },
  "ko": {
    "home": "홈",
    "archive": "아카이브",
    "technical": "기술 정보",
    "admin": "관리"
  },
  "pt": {
    "home": "Início",
    "archive": "Arquivo",
    "technical": "Técnico",
    "admin": "Administração"
  },
  "ru": {
    "home": "Главная",
    "archive": "Архив",
    "technical": "Техническая",
    "admin": "Администрирование"
  },
  "zh": {
    "home": "主页",
    "archive": "档案库",
    "technical": "技术",
    "admin": "管理"
  }
}
</i18n>

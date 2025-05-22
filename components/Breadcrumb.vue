<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS } from '~/data/models/generic';

  const crumbs: any = ref([]);
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
  if (props.root) {
    crumbs.value.push(
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: props.version === BREADCRUMB_VERSIONS.TECH ? 'Technical Info' : 'Archive',
        disabled: true,
        href: props.version === BREADCRUMB_VERSIONS.TECH ? '/technical' : '/archive',
      }
    );
  } else if (props.subpage) {
    crumbs.value.push(
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: props.version === BREADCRUMB_VERSIONS.TECH ? 'Technical Info' : 'Archive',
        disabled: false,
        href: props.version === BREADCRUMB_VERSIONS.TECH ? '/technical' : '/archive',
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
    crumbs.value.push(
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: props.version === BREADCRUMB_VERSIONS.TECH ? 'Technical Info' : 'Archive',
        disabled: false,
        href: props.version === BREADCRUMB_VERSIONS.TECH ? '/technical' : '/archive',
      },
      {
        title: props.page,
        disabled: true,
      }
    );
  }
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

<script lang="ts" setup>
  const crumbs: any = ref([]);
  const props = defineProps({
    page: {
      type: String,
      default: '',
    },
    technical: {
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
  if (props.subpage) {
    crumbs.value.push(
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: props.technical ? 'Technical Info' : 'Archive',
        disabled: false,
        href: props.technical ? '/technical' : '/archive',
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
        title: props.technical ? 'Technical Info' : 'Archive',
        disabled: false,
        href: props.technical ? '/technical' : '/archive',
      },
      {
        title: props.page,
        disabled: true,
      }
    );
  }
</script>
<template>
  <v-breadcrumbs :items="crumbs" divider="/">
    <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
  ></v-breadcrumbs>
</template>

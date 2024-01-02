<template>
  <v-breadcrumbs :items="crumbs" divider="/">
    <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
  ></v-breadcrumbs>
</template>

<script lang="ts" setup>
  const props = defineProps({
    page: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  });

  const crumbs = [
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: 'Technical Info',
      disabled: false,
      href: '/technical',
    },
    {
      title: props.page,
      disabled: true,
    },
  ];
</script>

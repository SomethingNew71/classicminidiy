<template>
  <div>
    <nuxt />
    <patreon-popper />
  </div>
</template>
<script>
import patreonPopper from '~/components/PatreonPopper';

export default {
  components: {
    patreonPopper
  }
};
</script>

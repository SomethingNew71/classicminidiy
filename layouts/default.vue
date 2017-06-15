<template>
  <div>
    <navigation/>
    <nuxt/>
    <pagefoot/>
  </div>
</template>

<script>
import navigation from '../components/navigation';
import pagefoot from '../components/pagefoot';

export default {
  components: {
    navigation,
    pagefoot
  }
};

</script>

<style lang="scss" src="../assets/styles/app.scss"></style>

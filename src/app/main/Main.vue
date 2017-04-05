<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <title-component></title-component>
      <techs></techs>
      <manuals></manuals>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Title from './Title.vue';
  import Footer from './Footer.vue';
  // Components
  import Techs from '../components/techs/Techs.vue';
  import manuals from '../components/manuals/manuals.vue';

  export default {
    name: 'Main',
    components: {
      'header-component': Header,
      'title-component': Title,
      'footer-component': Footer,
      'manuals': manuals,
      'techs': Techs
    }
  };
</script>

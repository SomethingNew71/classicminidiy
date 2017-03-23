<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <title-component></title-component>
      <techs></techs>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Title from './Title.vue';
  import Footer from './Footer.vue';
  import Techs from '../components/techs/Techs.vue';

  export default {
    name: 'Main',
    components: {
      'header-component': Header,
      'title-component': Title,
      'footer-component': Footer,
      'techs': Techs
    }
  };
</script>

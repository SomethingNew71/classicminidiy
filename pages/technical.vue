<template>
  <div>
    <hero
      :title="title"
      :subtitle="subtitle"
      :background="background"
      :centered="centered"
      :navigation="true"
    />
    <div class="container">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
  import Hero from '~/components/Hero';

  export default {
    components: {
      Hero,
    },
    data() {
      return {
        title: 'Digital Mini Toolbox',
        subtitle: 'TECHNICAL INFORMATION',
        background: '/technical',
        centered: true,
      };
    },
    head() {
      return {
        title: 'Technical Toolbox',
      };
    },
  };
</script>

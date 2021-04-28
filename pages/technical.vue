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
    <!-- <facebook-chat-overlay /> -->
  </div>
</template>
<script>
import Hero from '~/components/Hero';
// import facebookChatOverlay from '~/components/FacebookChatOverlay';

export default {
  components: {
    Hero
    // facebookChatOverlay
  },
  data () {
    return {
      title: 'Digital Mini Toolbox',
      subtitle: 'TECHNICAL INFORMATION',
      background: '/technical',
      centered: true
    };
  },
  head () {
    return {
      title: 'Technical Toolbox'
    };
  }
};
</script>

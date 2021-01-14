<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import axios from 'axios';

export default {
  mounted () {
    this.attemptAdLoad();
  },
  methods: {
    attemptAdLoad (searchPayload) {
      axios.get('/adblocker.js')
        .then((response) => {
          this.$store.commit('data/setAdStatus', true);
          console.log('Ads served');
        })
        .catch((error) => {
          this.$store.commit('data/setAdStatus', false);
          console.log('Ads blocked', error);
        });
    }
  }
};
</script>

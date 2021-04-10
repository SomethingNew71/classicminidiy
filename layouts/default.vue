<template>
  <div>
    <nuxt />
    <patreon-popper />
  </div>
</template>
<script>
import axios from 'axios';
import patreonPopper from '~/components/PatreonPopper';

export default {
  components: {
    patreonPopper
  },
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

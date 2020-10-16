<template>
  <div class="promo-popper">
    <b-message
      v-model="popperActive"
      class="pr-0 pl-0 pb-0 pt-0"
      title="Like What I'm Doing?"
      aria-close-label="Close message"
      has-icon
      icon-pack="fab"
      icon="patreon"
      type="is-patreon"
      @close="dismissPopper(false)"
    >
      <p>Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel and website alive, please consider supporting ongoing development on Patreon.</p>
      <a
        class="mt-5 button is-patreon"
        rel="noopener"
        href="https://patreon.com/classicminidiy"
        target="_blank"
        @click="dismissPopper(true)"
      >
        <span>Become a Member</span>
      </a>
    </b-message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';

export default {
  data () {
    return {
      popperActive: false
    };
  },
  computed: mapGetters({
    hasUserDismissed: 'data/getPopperStatus'
  }),
  created () {
    setTimeout(() => {
      this.showPopper();
    }, 3000);
  },
  methods: {
    showPopper () {
      const cookieValue = Cookies.get('popperDismissed');
      if (!this.hasUserDismissed && cookieValue === undefined) {
        this.popperActive = true;
      }
    },
    dismissPopper (clickedMember) {
      this.$store.commit('data/updatePopperStatus');
      if (clickedMember) {
        Cookies.set('popperDismissed', 'yes', { sameSite: 'Lax', expires: 90 });
        this.popperActive = false;
      } else {
        Cookies.set('popperDismissed', 'yes', { sameSite: 'Lax', expires: 7 });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .promo-popper {
    width: 40%;
    position: fixed;
    bottom: 10%;
    right: 5%;
    z-index: 100;
    filter: drop-shadow(0 5px 5px #333);

    .fab.fa-patreon {
      color: #f96854;
      &.button-icon {
        color: #fff;
      }
    }
  }
  @media (max-width: 768px) {
    .promo-popper{
      width: 90%;
      .column {
        margin-right: 50px !important;
        margin-left: 50px !important;
      }
    }
  }
</style>

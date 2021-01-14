<template>
  <div>
    <template v-if="size === 'large'">
      <h3 class="fancy-font-book-oblique">
        <i class="fad fa-ad"></i> SUPPORT THE CHANNEL
      </h3>
      <p class="is-size-5 pt-5">
        Classic Mini DIY is <strong>completely free resource</strong> supported by our viewers and ads. If you are interested in helping to keep the channel alive, consider supporting on Patreon or by disabling your adblocker while using the website.
      </p>
      <a class="mt-4 button is-medium is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
        <span class="icon">
          <i class="fab fa-patreon" />
        </span>
        <span>Contribute</span>
      </a>
      <a class="mt-4 button is-medium is-light" rel="noopener" href="https://help.getadblock.com/support/solutions/articles/6000055743-how-to-disable-adblock-on-specific-sites" target="_blank">
        <span class="icon">
          <i class="fad fa-ad" />
        </span>
        <span>Disable AdBlockers</span>
      </a>
    </template>
    <template v-if="size === 'small'">
      <h3 v-if="size === 'small'" class="fancy-font-book-oblique is-size-6">
        <i class="fad fa-ad"></i> CONSIDER DISABLING ADS
      </h3>
      <p v-if="size === 'small'" class="is-size-6 pt-5">
        Classic Mini DIY is <strong>completely free resource</strong> supported by our viewers and ads. Please consider disabling your adblocker.
      </p>
      <a v-if="size === 'small'" class="mt-4 button is-medium is-primary" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
        <span class="icon">
          <i class="fab fa-patreon" />
        </span>
        <span>Contribute</span>
      </a>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'large',
      required: true
    }
  }
};
</script>

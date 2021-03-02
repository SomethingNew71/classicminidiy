<template>
  <cookie-law>
    <div slot-scope="props" class="columns is-multiline">
      <div class="column">
        <h3 class="title is-5 has-text-white">
          Like this website?
        </h3>
        <p>
          Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel and website alive, please consider supporting ongoing development on Patreon.
        </p>
        <p class="mt-5 mb-5">
          <a
            class="button is-patreon"
            rel="noopener"
            href="https://patreon.com/classicminidiy"
            target="_blank"
            @click="props.accept"
          >
            <span>Support the Website</span>
          </a>
          <b-button
            class="skew"
            type="is-secondary"
            icon-pack="fad"
            icon-right="times"
            @click="props.accept"
          >
            Close
          </b-button>
        </p>
      </div>
    </div>
  </cookie-law>
</template>

<style lang="scss" scoped>
  .button.is-text {
    text-decoration: none;
  }
  .Cookie--base {
    background: #2f2f2f;
    color: #fff;
    padding: 0 10px 10px 10px;
  }
</style>

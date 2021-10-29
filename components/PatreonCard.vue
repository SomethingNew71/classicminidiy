<template>
  <div>
    <template v-if="size === 'large'">
      <div class="columns">
        <div class="column is-3 avatar-container">
          <b-image
            src="https://classicminidiy.s3.amazonaws.com/misc/avatar.png"
            alt="Image of my car on jack stands"
          />
        </div>
        <div class="column is-9">
          <h3 class="fancy-font-book-oblique is-size-5">
            <i class="fad fa-hands-heart"></i> SUPPORT THE SITE
          </h3>
          <p class="is-size-5 pt-5">
            Classic Mini DIY is
            <strong>completely free resource</strong> supported by our viewers.
            If you are interested in helping to keep the channel alive, consider
            supporting on Patreon.
          </p>
          <p class="pt-3">
            <strong
              >Membership comes with tons of free perks and benefits!</strong
            >
          </p>
          <p>
            <a
              class="mt-4 button is-medium is-patreon"
              rel="noopener"
              href="https://patreon.com/classicminidiy"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-patreon" />
              </span>
              <span>Contribute Today</span>
            </a>
          </p>
        </div>
      </div>
    </template>
    <template v-if="size === 'small'">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h3 class="fancy-font-book-oblique is-size-5 pt-2">
            <i class="fad fa-hands-heart"></i> SUPPORT THE SITE
          </h3>
        </div>
        <div class="column is-12">
          <p class="is-size-6">
            Classic Mini DIY is
            <strong>completely free resource</strong> supported by our viewers.
            If you are interested in helping to keep the channel alive, consider
            supporting on Patreon.
          </p>
          <p class="pt-3">
            <strong
              >Membership comes with tons of free perks and benefits!</strong
            >
          </p>
          <a
            class="mt-4 button is-patreon"
            rel="noopener"
            href="https://patreon.com/classicminidiy"
            target="_blank"
          >
            <span class="icon">
              <i class="fab fa-patreon" />
            </span>
            <span>Contribute Today</span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'large',
        required: true,
      },
    },
  };
</script>

<script lang="ts" setup>
  import { TRACKING_EVENTS, trackStuff } from '../../data/models/helper-utils';

  const { path } = useRoute();

  defineProps({
    size: {
      type: String,
      default: 'large',
      required: true,
    },
  });
</script>

<template>
  <div>
    <template v-if="size === 'large'">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3 avatar-container">
          <nuxt-img
            format="webp"
            loading="lazy"
            src="https://classicminidiy.s3.amazonaws.com/misc/avatar.png"
            alt="Image of my car on jack stands"
            class="w-full rounded-lg"
          />
        </div>
        <div class="col-span-9">
          <h3 class="fancy-font-book-oblique text-lg font-semibold">
            <i class="fad fa-hands-heart"></i> SUPPORT THE SITE
          </h3>
          <p class="text-lg py-5">
            Classic Mini DIY is
            <strong>completely free resource</strong> supported by our viewers. If you are interested in helping to keep
            the channel alive, consider supporting on Patreon.
          </p>
          <p class="pt-3">
            <strong>Membership comes with tons of free perks and benefits!</strong>
          </p>
          <p class="mt-4">
            <a
              class="btn btn-primary gap-2"
              rel="noopener"
              href="https://patreon.com/classicminidiy"
              target="_blank"
              @click="trackStuff(TRACKING_EVENTS.PATREON, path)"
            >
              <i class="fab fa-patreon"></i>
              <span>Contribute Today</span>
            </a>
          </p>
        </div>
      </div>
    </template>
    <template v-if="size === 'small'">
      <div class="grid grid-cols-1 gap-2">
        <div>
          <h3 class="fancy-font-book-oblique text-lg font-semibold pt-2">
            <i class="fad fa-hands-heart"></i> SUPPORT THE SITE
          </h3>
        </div>
        <div>
          <p class="text-sm">
            Classic Mini DIY is
            <strong>completely free resource</strong> supported by our viewers. If you are interested in helping to keep
            the channel alive, consider supporting on Patreon.
          </p>
          <p class="pt-3">
            <strong>Membership comes with tons of free perks and benefits!</strong>
          </p>
          <a
            class="btn btn-primary btn-sm gap-2 mt-4"
            rel="noopener"
            href="https://patreon.com/classicminidiy"
            target="_blank"
            @click="trackStuff(TRACKING_EVENTS.PATREON, path)"
          >
            <i class="fab fa-patreon"></i>
            <span>Contribute Today</span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
  .btn-primary {
    background-color: #f96854; /* Patreon color */
    border-color: #f96854;
    color: white;
  }

  .btn-primary:hover {
    background-color: #e55b4d;
    border-color: #e55b4d;
  }
</style>

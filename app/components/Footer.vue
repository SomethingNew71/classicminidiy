<script lang="ts" setup>
  import { SocialItems } from '../../data/models/generic';
  const socials = ref(SocialItems);
</script>
<template>
  <footer class="footer p-10 bg-base-200 text-center flex flex-col w-full">
    <div class="container mx-auto">
      <div class="pb-2 mx-auto">
        <div class="flex justify-center">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :href="social.href"
            class="mx-4 btn btn-ghost btn-circle text-2xl"
            :title="social.title"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <div class="pt-0 mx-auto">
        <h2 class="text-xl font-semibold">
          <strong class="text-primary">Classic Mini DIY</strong> by
          <a
            rel="noopener"
            target="_blank"
            href="https://youtube.com/c/classicminidiy?sub_confirmation=1"
            aria-label="Link to my youtube channel"
            class="link link-hover"
          >
            Cole Gentry</a
          >.
        </h2>
        <p class="pb-3 max-w-3xl mx-auto mt-2">
          Classic Mini DIY toolbox is a passion project aligned with the Classic Mini DIY youtube channel. This is a
          completely free resource built to keep the Classic Mini technical knowledgebase alive for years to come.
          Regularly updated and crowd sourced data made to help Classic Mini owners all over the world.
        </p>
      </div>

      <div class="container mx-auto">
        <div class="flex justify-center">
          <div class="w-10/12">
            <p>{{ new Date().getFullYear() }} — <strong>Classic Mini DIY LLC</strong></p>
            <div class="divider">Links</div>
            <p>
              <nuxt-link class="link link-hover mr-3" to="/privacy" rel="noopener noreferrer"
                >CMDIY Website Privacy Policy</nuxt-link
              >
              <a
                class="link link-hover mr-3"
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                >Youtube Privacy Policy</a
              >
              <a
                class="link link-hover"
                href="http://www.google.com/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                >Google Privacy Policy</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1rem 0;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(var(--color-base-300), 0.3);
  }

  .divider::before {
    margin-right: 0.5rem;
  }

  .divider::after {
    margin-left: 0.5rem;
  }
</style>

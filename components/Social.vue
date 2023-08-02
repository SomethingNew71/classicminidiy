<template>
  <nav class="level">
    <div v-for="network in networks" class="level-item has-text-centered">
      <div>
        <a
          :class="network.name.toLowerCase"
          class="share-link"
          :href="network.shareUrl"
          target="blank"
          :alt="'Share to ' + network.name"
          :aria-label="'Share to ' + network.name"
          :style="{
            background: network.color,
          }"
          ><i :class="network.icon"></i
        ></a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        networks: [
          {
            name: 'Email',
            icon: 'far fah fa-envelope',
            shareUrl: '',
            color: '#333333',
          },
          {
            name: 'Facebook',
            icon: 'fab fah fa-facebook-f',
            shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
            color: '#1877f2',
          },
          {
            name: 'instagram',
            icon: 'fab fah fa-instagram',
            shareUrl: '',
            color: '#1877f2',
          },
          {
            name: 'Pinterest',
            icon: 'fab fah fa-pinterest',
            shareUrl: '',
            color: '#bd081c',
          },
          {
            name: 'Reddit',
            icon: 'fab fah fa-reddit-alien',
            shareUrl: '',
            color: '#ff4500',
          },
          {
            name: 'Whatsapp',
            icon: 'fab fah fa-whatsapp',
            shareUrl: '',
            color: '#25d366',
          },
        ],
      };
    },
  });
</script>

<style lang="scss">
  .share-link {
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 8px;
    border-radius: 50%;
    font-size: 14px;
    color: #fff;
    opacity: 0.75;
    transition: opacity 0.15s linear;
    &:hover {
      opacity: 1;
    }
    i {
      position: relative;
      top: 30%;
      transform: translateY(-50%);
    }
  }
</style>

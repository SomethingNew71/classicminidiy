<template></template>

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        networks: [
          {
            name: 'Email',
            icon: 'far fah fa-lg fa-envelope',
            color: '#333333',
          },
          {
            name: 'Facebook',
            icon: 'fab fah fa-lg fa-facebook-f',
            color: '#1877f2',
          },
          {
            name: 'instagram',
            icon: 'fab fah fa-lg fa-instagram-f',
            color: '#1877f2',
          },
          {
            name: 'Messenger',
            icon: 'fab fah fa-lg fa-facebook-messenger',
            color: '#0084ff',
          },
          {
            name: 'Pinterest',
            icon: 'fab fah fa-lg fa-pinterest',
            color: '#bd081c',
          },
          {
            name: 'Reddit',
            icon: 'fab fah fa-lg fa-reddit-alien',
            color: '#ff4500',
          },
          {
            name: 'Whatsapp',
            icon: 'fab fah fa-lg fa-whatsapp',
            color: '#25d366',
          },
        ],
      };
    },
  });
</script>

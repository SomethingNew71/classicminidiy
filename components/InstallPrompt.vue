<template>
  <div>
    <button ref="addBtn" class="add-button" @click="clickCallback">Add</button>
  </div>
</template>

<script>
  export default {
    name: 'AddToHomeScreen',
    data: () => ({
      deferredPrompt: null,
    }),
    mounted() {
      this.captureEvent();
    },
    methods: {
      captureEvent() {
        window.addEventListener('beforeinstallprompt', (e) => {
          // ! Prevent Chrome 67 and earlier from automatically showing the prompt
          e.preventDefault();
          // Stash the event so it can be triggered later.
          this.deferredPrompt = e;
        });
      },
      clickCallback() {
        // Show the prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            // Call another function?
          }
          this.deferredPrompt = null;
        });
      },
    },
  };
</script>

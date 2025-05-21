<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">DaisyUI Test Component</h2>

    <!-- DaisyUI Button Examples -->
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold mb-2">Buttons</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn">Button</button>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-accent">Accent</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-link">Link</button>
        </div>
      </div>

      <!-- DaisyUI Card Example -->
      <div>
        <h3 class="text-lg font-semibold mb-2">Card</h3>
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/seo-images/avatar.jpg"
              alt="Classic Mini DIY"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Classic Mini DIY</h2>
            <p>Technical information, tools, and resources for Classic Mini owners and enthusiasts.</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>

      <!-- DaisyUI Alert Example -->
      <div>
        <h3 class="text-lg font-semibold mb-2">Alerts</h3>
        <div class="space-y-2">
          <div class="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-current shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>DaisyUI is now installed and working!</span>
          </div>
          <div class="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your purchase has been confirmed!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // No additional script needed for this demo component
</script>

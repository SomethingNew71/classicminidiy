<script setup lang="ts">
  const isOpen = ref(false);
  const currentSlide = ref(0);
  const slides = [
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example1.jpg',
      alt: 'Engine plate example 1',
    },
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example2.jpg',
      alt: 'Engine plate example 2',
    },
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example3.jpg',
      alt: 'Engine plate example 3',
    },
  ];

  const openModal = () => {
    isOpen.value = true;
    currentSlide.value = 0;
  };

  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  };

  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  };
</script>

<template>
  <div>
    <p class="font-bold pt-4 pb-2">Unsure what your engine plate looks like?</p>
    <button @click="openModal" class="btn btn-primary gap-2">
      <i class="fas fa-clipboard-question"></i>
      Where is my engine plate?
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Engine Plates</h3>

        <!-- Carousel -->
        <div class="carousel w-full relative mb-4">
          <div class="carousel-item relative w-full h-64 md:h-96">
            <img
              v-for="(slide, index) in slides"
              :key="index"
              :src="slide.src"
              :alt="slide.alt"
              class="w-full h-full object-cover"
              :class="{ hidden: currentSlide !== index }"
            />
          </div>

          <!-- Navigation Buttons -->
          <button @click="prevSlide" class="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm">❮</button>
          <button @click="nextSlide" class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm">❯</button>

          <!-- Indicators -->
          <div class="flex justify-center mt-2 gap-2">
            <button
              v-for="(_, index) in slides"
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full"
              :class="currentSlide === index ? 'bg-primary' : 'bg-gray-300'"
              :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>
        </div>

        <h4 class="text-lg font-semibold py-4">Location of Engine Plate</h4>
        <p class="mb-4">
          Engine plates were found in the same place across all model year minis. However these plates are missing in
          some situations:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>If the engine has been replaced</li>
          <li>If the plate was removed during a rebuild</li>
          <li>If the plate has corroded or fallen off over time</li>
        </ul>

        <div class="modal-action">
          <button @click="isOpen = false" class="btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Add any custom styles here if needed */
  .carousel-item {
    transition: opacity 0.3s ease-in-out;
  }
</style>

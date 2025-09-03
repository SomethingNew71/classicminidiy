<script setup lang="ts">
  const { t } = useI18n();
  const isOpen = ref(false);
  const currentSlide = ref(0);
  const slides = [
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example1.jpg',
      alt: t('components.engine_plate_modal.image_alts.example1'),
    },
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example2.jpg',
      alt: t('components.engine_plate_modal.image_alts.example2'),
    },
    {
      src: 'https://classicminidiy.s3.us-east-1.amazonaws.com/engine-decoder/example3.jpg',
      alt: t('components.engine_plate_modal.image_alts.example3'),
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
    <p class="font-bold pt-4 pb-2">{{ t('components.engine_plate_modal.question_text') }}</p>
    <button @click="openModal" class="btn btn-primary gap-2">
      <i class="fas fa-clipboard-question"></i>
      {{ t('components.engine_plate_modal.button_text') }}
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">{{ t('components.engine_plate_modal.modal_title') }}</h3>

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
              :aria-label="t('components.engine_plate_modal.slide_aria_label', { number: index + 1 })"
            ></button>
          </div>
        </div>

        <h4 class="text-lg font-semibold py-4">{{ t('components.engine_plate_modal.location_title') }}</h4>
        <p class="mb-4">
          {{ t('components.engine_plate_modal.location_description') }}
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>{{ t('components.engine_plate_modal.missing_reasons.replaced') }}</li>
          <li>{{ t('components.engine_plate_modal.missing_reasons.removed') }}</li>
          <li>{{ t('components.engine_plate_modal.missing_reasons.corroded') }}</li>
        </ul>

        <div class="modal-action">
          <button @click="isOpen = false" class="btn">{{ t('components.engine_plate_modal.close_button') }}</button>
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

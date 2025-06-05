<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  useHead({
    title: 'Archive - Wheel Dictionary',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - Wheel Dictionary',
    ogDescription:
      'The Classic Mini DIY wheel dictionary is here to help you compare all the different wheel options sold on the Classic Mini. Whether looking for something stock or race inspired learn about your options here.',
    ogUrl: 'classicminidiy.com/archive/wheels',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Wheel Dictionary'" :heroType="HERO_TYPES.ARCHIVE" />
    <div class="container mx-auto px-4">
      <breadcrumb page="Wheel Dictionary" class="my-6"></breadcrumb>
      <div class="grid grid-cols-12 gap-4 items-center">
        <div class="col-span-12 md:col-span-8">
          <h1 class="text-3xl font-bold mb-2">The Classic Mini DIY Wheel Dictionary</h1>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Dictionary comes in. You can now search for the right wheel for your Classic Mini Cooper. With
            <strong>about 1,000 wheels</strong> and growing, we hope you'll be able to find exactly the wheel you are
            looking for.
          </p>
        </div>
        <div class="col-span-12 md:col-span-4">
          <NuxtLink :to="'/archive/wheels/submit?newWheel=true'" :title="'Link to new wheel form'">
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div class="card-body">
                <div class="flex items-start">
                  <div class="mr-4">
                    <i class="fad fa-rectangle-history-circle-plus text-3xl"></i>
                  </div>
                  <div>
                    <h2 class="card-title">Want to add a wheel?</h2>
                    <p>Click here to complete our wheel submission form to get it added to our list.</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="divider my-4"></div>
      <div class="grid grid-cols-12 gap-4 mb-4">
        <div class="col-span-12">
          <WheelGrid></WheelGrid>
        </div>
      </div>
      <footer class="bg-base-200 text-center p-6 rounded-lg">
        <div>
          <h2 class="text-xl font-bold mb-2">
            All data collected and currated by Jan W. from
            <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer" class="link link-primary"
              >Mini-Forum.de</a
            >.
          </h2>
          <p class="pb-5">
            Looking for that one wheel you saw the other day online but you just cant quite find? That's where the Wheel
            Library comes in. Using the same data from the now retired site,
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net you can search for the right wheel for your Classic
            Mini Cooper. With <strong>lots wheels in the library</strong> and growing, we hope you'll be able to find
            exactly the wheel you are looking for.
          </p>
        </div>
      </footer>
      <div class="divider my-4"></div>
    </div>
  </div>
</template>

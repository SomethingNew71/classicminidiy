<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  const { t } = useI18n();
  useHead({
    title: t('pages.archive.subpages.wheels.index.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.archive.subpages.wheels.index.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: t('pages.archive.subpages.wheels.index.seo.og_title'),
    ogDescription: t('pages.archive.subpages.wheels.index.seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/wheels',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/wheels.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.archive.subpages.wheels.index.seo.twitter_title'),
    twitterDescription: t('pages.archive.subpages.wheels.index.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/wheels.png',
  });
</script>

<template>
  <div>
    <hero
      :navigation="true"
      :title="t('pages.archive.subpages.wheels.index.hero_title')"
      :heroType="HERO_TYPES.ARCHIVE"
    />
    <div class="container mx-auto px-4">
      <breadcrumb :page="t('pages.archive.subpages.wheels.index.breadcrumb_title')" class="my-6"></breadcrumb>
      <div class="grid grid-cols-12 gap-4 items-center">
        <div class="col-span-12 md:col-span-8">
          <h1 class="text-3xl font-bold mb-2">{{ t('pages.archive.subpages.wheels.index.main_heading') }}</h1>
          <p class="pb-5">
            {{ t('pages.archive.subpages.wheels.index.description_text') }}
          </p>
        </div>
        <div class="col-span-12 md:col-span-4">
          <NuxtLink
            :to="'/archive/wheels/submit?newWheel=true'"
            :title="t('pages.archive.subpages.wheels.index.add_wheel_card.link_title')"
          >
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div class="card-body">
                <div class="flex items-start">
                  <div class="mr-4">
                    <i class="fad fa-rectangle-history-circle-plus text-3xl"></i>
                  </div>
                  <div>
                    <h2 class="card-title">{{ t('pages.archive.subpages.wheels.index.add_wheel_card.title') }}</h2>
                    <p>{{ t('pages.archive.subpages.wheels.index.add_wheel_card.description') }}</p>
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
            {{ t('pages.archive.subpages.wheels.index.footer.title') }}
            <a href="https://www.mini-forum.de/" target="_blank" rel="noopener noreferrer" class="link link-primary"
              >Mini-Forum.de</a
            >.
          </h2>
          <p class="pb-5">
            {{ t('pages.archive.subpages.wheels.index.footer.description') }}
            <i class="fad fa-tombstone"></i>www.wheeldictionary.net
          </p>
        </div>
      </footer>
      <div class="divider my-4"></div>
    </div>
  </div>
</template>

<template>
  <div>
    <!-- Hero Section -->
    <Hero :titleKey="'pages.contact.hero_title'" :heroType="HERO_TYPES.CONTACT" textSize="text-4xl" class="pb-7" />

    <!-- Breadcrumb Navigation -->
    <div class="container mx-auto px-4 pt-10">
      <div class="text-base breadcrumbs">
        <ul>
          <li v-for="(item, index) in breadcrumbItems" :key="index">
            <div v-if="index === 0" class="flex items-center">
              <i class="fa-duotone fa-home mr-1"></i>
              <NuxtLink v-if="item.href" :to="item.href">{{ item.text }}</NuxtLink>
              <span v-else class="opacity-60">{{ item.text }}</span>
            </div>
            <div v-else>
              <NuxtLink v-if="item.href" :to="item.href">{{ item.text }}</NuxtLink>
              <span v-else class="opacity-60">{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Contact Cards Grid -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- General Inquiries Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-comments text-2xl text-primary"></i>
              </div>
              <h2 class="card-title text-xl">{{ t('pages.contact.general_inquiries_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ t('pages.contact.general_inquiries_description') }}
            </p>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <i class="fad fa-envelope text-primary"></i>
                <div>
                  <p class="font-medium">Email</p>
                  <a href="mailto:hello@classicminidiy.com" class="text-primary hover:underline">
                    hello@classicminidiy.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-comment-dots text-primary"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.ai_chat_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.ai_chat_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-clock text-primary"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.response_time_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.response_time_description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Archive Submissions Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-archive text-2xl text-success"></i>
              </div>
              <h2 class="card-title text-xl">{{ t('pages.contact.archive_submissions_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ t('pages.contact.archive_submissions_description') }}
            </p>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <i class="fad fa-envelope text-success"></i>
                <div>
                  <p class="font-medium">Email</p>
                  <a href="mailto:archive@classicminidiy.com" class="text-success hover:underline">
                    archive@classicminidiy.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-upload text-success"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.what_to_include_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.what_to_include_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-shield-check text-success"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.rights_attribution_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.rights_attribution_description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical Submissions Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-wrench text-2xl text-info"></i>
              </div>
              <h2 class="card-title text-xl">{{ t('pages.contact.technical_submissions_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ t('pages.contact.technical_submissions_description') }}
            </p>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <i class="fad fa-envelope text-info"></i>
                <div>
                  <p class="font-medium">Email</p>
                  <a href="mailto:technical@classicminidiy.com" class="text-info hover:underline">
                    technical@classicminidiy.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-list-check text-info"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.content_types_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.content_types_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-user-check text-info"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.credit_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.credit_description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bug Reports Card -->
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <i class="fad fa-bug text-2xl text-error"></i>
              </div>
              <h2 class="card-title text-xl">{{ t('pages.contact.bug_reports_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ t('pages.contact.bug_reports_description') }}
            </p>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <i class="fad fa-envelope text-error"></i>
                <div>
                  <p class="font-medium">Email</p>
                  <a href="mailto:bugs@classicminidiy.com" class="text-error hover:underline">
                    bugs@classicminidiy.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-list-ul text-error"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.include_details_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.include_details_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-bolt text-error"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.priority_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.priority_description') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Contact Info -->
    <div class="container mx-auto px-4 py-8">
      <div class="mt-16 text-center">
        <div class="card bg-base-200 shadow-lg max-w-2xl mx-auto">
          <div class="card-body">
            <h3 class="text-2xl font-bold mb-4">{{ t('pages.contact.other_ways_connect') }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fad fa-users text-primary text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.community_forum_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.community_forum_description') }}</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fab fa-patreon text-error text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">{{ t('pages.contact.support_patreon_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ t('pages.contact.support_patreon_description') }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6 text-center">
              <a
                href="https://www.patreon.com/classicminidiy"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-lg"
              >
                <i class="fab fa-patreon mr-2"></i>
                {{ t('pages.contact.support_patreon_button') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HERO_TYPES } from '../../data/models/generic';

  const { t } = useI18n();

  // SEO and meta using proper Nuxt patterns
  useHead({
    title: t('pages.contact.title'),
    meta: [
      {
        name: 'description',
        content: t('pages.contact.description'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/contact',
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.contact.title'),
    ogDescription: t('pages.contact.description'),
    ogUrl: 'https://classicminidiy.com/contact',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/contact.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.contact.title'),
    twitterDescription: t('pages.contact.description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/contact.png',
  });

  // Breadcrumb navigation
  const breadcrumbItems = computed(() => [
    { text: t('pages.contact.breadcrumb_home'), href: '/' },
    { text: t('pages.contact.breadcrumb_contact'), href: '/contact' },
  ]);
</script>

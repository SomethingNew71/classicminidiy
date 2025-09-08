<template>
  <div>
    <!-- Hero Section -->
    <Hero :titleKey="'hero_title'" :heroType="HERO_TYPES.CONTACT" textSize="text-4xl" class="pb-7" />

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
              <h2 class="card-title text-xl">{{ $t('general_inquiries_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ $t('general_inquiries_description') }}
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
                  <p class="font-medium">{{ $t('ai_chat_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('ai_chat_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-clock text-primary"></i>
                <div>
                  <p class="font-medium">{{ $t('response_time_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('response_time_description') }}</p>
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
              <h2 class="card-title text-xl">{{ $t('archive_submissions_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ $t('archive_submissions_description') }}
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
                  <p class="font-medium">{{ $t('what_to_include_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('what_to_include_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-shield-check text-success"></i>
                <div>
                  <p class="font-medium">{{ $t('rights_attribution_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('rights_attribution_description') }}</p>
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
              <h2 class="card-title text-xl">{{ $t('technical_submissions_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ $t('technical_submissions_description') }}
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
                  <p class="font-medium">{{ $t('content_types_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('content_types_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-user-check text-info"></i>
                <div>
                  <p class="font-medium">{{ $t('credit_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('credit_description') }}</p>
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
              <h2 class="card-title text-xl">{{ $t('bug_reports_title') }}</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              {{ $t('bug_reports_description') }}
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
                  <p class="font-medium">{{ $t('include_details_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('include_details_description') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-bolt text-error"></i>
                <div>
                  <p class="font-medium">{{ $t('priority_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('priority_description') }}</p>
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
            <h3 class="text-2xl font-bold mb-4">{{ $t('other_ways_connect') }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fad fa-users text-primary text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">{{ $t('community_forum_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('community_forum_description') }}</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fab fa-patreon text-error text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">{{ $t('support_patreon_label') }}</p>
                  <p class="text-sm text-base-content/70">{{ $t('support_patreon_description') }}</p>
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
                {{ $t('support_patreon_button') }}
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

  // SEO and meta using proper Nuxt patterns
  useHead({
    title: $t('title'),
    meta: [
      {
        name: 'description',
        content: $t('description'),
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
    ogTitle: $t('title'),
    ogDescription: $t('description'),
    ogUrl: 'https://classicminidiy.com/contact',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('title'),
    twitterDescription: $t('description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/png',
  });

  // Breadcrumb navigation
  const breadcrumbItems = computed(() => [
    { text: $t('breadcrumb_home'), href: '/' },
    { text: $t('breadcrumb_contact'), href: '/contact' },
  ]);
</script>

<i18n lang="json">
{
  "en": {
    "title": "Contact Classic Mini DIY - Get Help & Submit Content",
    "description": "Contact Classic Mini DIY for general inquiries, archive submissions, technical contributions, or bug reports. Multiple ways to get in touch with our community.",
    "hero_title": "Get in Touch",
    "breadcrumb_home": "Home",
    "breadcrumb_contact": "Contact",
    "general_inquiries_title": "General Inquiries",
    "general_inquiries_description": "Questions about the site, Classic Mini ownership, or general help? We'd love to hear from you.",
    "email_label": "Email",
    "ai_chat_label": "AI Chat Assistant",
    "ai_chat_description": "Use the chat widget for quick questions",
    "response_time_label": "Response Time",
    "response_time_description": "Usually within 24-48 hours",
    "archive_submissions_title": "Archive Submissions",
    "archive_submissions_description": "Have historical documents, photos, or stories to share? Help preserve Classic Mini history.",
    "what_to_include_label": "What to Include",
    "what_to_include_description": "Photos, documents, stories, or historical info",
    "rights_attribution_label": "Rights & Attribution",
    "rights_attribution_description": "Please confirm you own or have permission to share",
    "technical_submissions_title": "Technical Submissions",
    "technical_submissions_description": "Share repair guides, technical specs, or maintenance tips with the community.",
    "content_types_label": "Content Types",
    "content_types_description": "Repair guides, specs, tips, part numbers",
    "credit_label": "Credit",
    "credit_description": "We'll credit you as the contributor",
    "bug_reports_title": "Bug Reports",
    "bug_reports_description": "Found a problem with the site? Help us fix it by reporting bugs and issues.",
    "include_details_label": "Include Details",
    "include_details_description": "Browser, device, steps to reproduce",
    "priority_label": "Priority",
    "priority_description": "Critical bugs fixed within 24 hours",
    "other_ways_connect": "Other Ways to Connect",
    "community_forum_label": "Community Forum",
    "community_forum_description": "Join discussions with other enthusiasts",
    "support_patreon_label": "Support on Patreon",
    "support_patreon_description": "Help keep the site running",
    "support_patreon_button": "Support on Patreon"
  }
}
</i18n>

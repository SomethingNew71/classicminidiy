<template>
  <div>
    <!-- Hero Section -->
    <Hero title="Get in Touch" :heroType="HERO_TYPES.CONTACT" textSize="text-4xl" class="pb-7" />

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
              <h2 class="card-title text-xl">General Inquiries</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              Questions about the site, Classic Mini ownership, or general help? We'd love to hear from you.
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
                  <p class="font-medium">AI Chat Assistant</p>
                  <p class="text-sm text-base-content/70">Use the chat widget for quick questions</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-clock text-primary"></i>
                <div>
                  <p class="font-medium">Response Time</p>
                  <p class="text-sm text-base-content/70">Usually within 24-48 hours</p>
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
              <h2 class="card-title text-xl">Archive Submissions</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              Have historical documents, photos, or stories to share? Help preserve Classic Mini history.
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
                  <p class="font-medium">What to Include</p>
                  <p class="text-sm text-base-content/70">Photos, documents, stories, or historical info</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-shield-check text-success"></i>
                <div>
                  <p class="font-medium">Rights & Attribution</p>
                  <p class="text-sm text-base-content/70">Please confirm you own or have permission to share</p>
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
              <h2 class="card-title text-xl">Technical Submissions</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              Share repair guides, technical specs, or maintenance tips with the community.
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
                  <p class="font-medium">Content Types</p>
                  <p class="text-sm text-base-content/70">Repair guides, specs, tips, part numbers</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-user-check text-info"></i>
                <div>
                  <p class="font-medium">Credit</p>
                  <p class="text-sm text-base-content/70">We'll credit you as the contributor</p>
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
              <h2 class="card-title text-xl">Bug Reports</h2>
            </div>

            <p class="text-base-content/70 mb-6">
              Found a problem with the site? Help us fix it by reporting bugs and issues.
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
                  <p class="font-medium">Include Details</p>
                  <p class="text-sm text-base-content/70">Browser, device, steps to reproduce</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <i class="fad fa-bolt text-error"></i>
                <div>
                  <p class="font-medium">Priority</p>
                  <p class="text-sm text-base-content/70">Critical bugs fixed within 24 hours</p>
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
            <h3 class="text-2xl font-bold mb-4">Other Ways to Connect</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fad fa-users text-primary text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">Community Forum</p>
                  <p class="text-sm text-base-content/70">Join discussions with other enthusiasts</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center text-center">
                <i class="fab fa-patreon text-error text-4xl mb-3"></i>
                <div>
                  <p class="font-medium">Support on Patreon</p>
                  <p class="text-sm text-base-content/70">Help keep the site running</p>
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
                Support on Patreon
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
    title: 'Contact Classic Mini DIY - Get Help & Submit Content',
    meta: [
      {
        name: 'description',
        content:
          'Contact Classic Mini DIY for general inquiries, archive submissions, technical contributions, or bug reports. Multiple ways to get in touch with our community.',
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
    ogTitle: 'Contact Classic Mini DIY - Get Help & Submit Content',
    ogDescription:
      'Get help, submit content, or report issues. Multiple contact methods for all your Classic Mini DIY needs.',
    ogUrl: 'https://classicminidiy.com/contact',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: 'Contact Classic Mini DIY',
    twitterDescription:
      'Get help, submit content, or report issues. Multiple contact methods for all your Classic Mini DIY needs.',
  });

  // Breadcrumb navigation
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Contact', href: '/contact' },
  ];
</script>

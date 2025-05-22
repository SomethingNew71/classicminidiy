<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';

  useHead({
    title: 'Privacy Policy | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Classic Mini DIY privacy policy regarding data collection, storage, and use of YouTube API Services. Learn how we protect your information.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: 'privacy policy, Classic Mini DIY, data protection, YouTube API, terms of service, data collection',
      },
      {
        key: 'robots',
        content: 'noindex',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/privacy',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'Privacy Policy | Classic Mini DIY',
    ogDescription:
      'Classic Mini DIY privacy policy regarding data collection, storage, and use of YouTube API Services.',
    ogUrl: 'https://classicminidiy.com/privacy',
    ogType: 'website',
  });

  // Add structured data for the privacy policy page
  const privacyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Classic Mini DIY privacy policy regarding data collection, storage, and use of YouTube API Services.',
    publisher: {
      '@type': 'Organization',
      name: 'Classic Mini DIY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/privacy',
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(privacyJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    title="Privacy Policy"
    :subtitle="'Classic Mini DIY'"
    :textSize="'3xl'"
    :special="true"
    :heroType="HERO_TYPES.HOME"
    :background="'/backdrop2'"
    :navigation="true"
  />
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <h1 class="text-3xl font-medium">Privacy Policy</h1>

        <ol class="list-decimal pl-5 pt-5">
          <li>
            <h3 class="text-xl font-medium mb-2">Acceptance of Terms</h3>
            <p class="py-2 mb-4">
              By using our API client, you agree to be bound by the
              <a
                class="link link-primary mr-3"
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                >Youtube Privacy Policy</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Accessibility</h3>
            <p class="py-2 mb-4">
              This Privacy Policy is easily accessible to all users via
              <a
                class="link link-primary"
                href="http://www.google.com/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                >Google Privacy Policy</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Use of YouTube API Services</h3>
            <p class="py-2 mb-4">
              Our API client uses YouTube API Services. By using our API client, you agree to the collection, storage,
              and usage of your data as described in this policy.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Data Collection, Storage, and Use</h3>
            <p class="py-2 mb-4">
              We collect data directly from your device to provide and improve our services. This includes information
              about your device, IP address, and public cookie information. We do not collect any additional personal
              data for our use. This data is stored securely and used to enhance the user experience and ensure the
              smooth operation of our API client. In addition no data is stored on our servers, and thus is deleted each
              time you close your browser.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Data Processing and Sharing</h3>
            <p class="py-2 mb-4">
              We process your data to provide our services. Your data may be shared with internal and external parties
              for the purpose of improving and maintaining our API client. We ensure all external parties comply with
              our strict data protection guidelines.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Data Collection Methods</h3>
            <p class="py-2 mb-4">
              Data is collected through various means such as direct input, cookies, and other tracking technologies.
              This helps us to understand user preferences and provide better service.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">Contact Information</h3>
            <p class="py-2 mb-4">
              Contact Information If you have any questions or concerns about this privacy policy, please contact us at
              <a class="link link-primary" href="mailto:classicminidiy@gmail.com" target="_blank"
                >classicminidiy@gmail.com</a
              >.
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

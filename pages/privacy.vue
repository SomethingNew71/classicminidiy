<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
</script>

<template>
  <hero
    title="Privacy Policy"
    :subtitle="'Classic Mini DIY'"
    :size="'is-medium'"
    :special="true"
    :heroType="HERO_TYPES.HOME"
    :background="'/backdrop2'"
    :navigation="true"
  />
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h4 font-weight-medium">Policy</h2>

        <ol class="pl-5 pt-5">
          <li>
            <h3 class="text-h5">Acceptance of Terms</h3>
            <p class="pt-2 pb-4">
              By using our API client, you agree to be bound by the
              <a class="pr-3" href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer"
                >Youtube Privacy Policy</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Accessibility</h3>
            <p class="pt-2 pb-4">
              This Privacy Policy is easily accessible to all users via
              <a href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer"
                >Google Privacy Policy</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Use of YouTube API Services</h3>
            <p class="pt-2 pb-4">
              Our API client uses YouTube API Services. By using our API client, you agree to the collection, storage,
              and usage of your data as described in this policy.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Data Collection, Storage, and Use</h3>
            <p class="pt-2 pb-4">
              We collect data directly from your device to provide and improve our services. This includes information
              about your device, IP address, usage data, and other related details. This data is stored securely and
              used to enhance the user experience and ensure the smooth operation of our API client.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Data Processing and Sharing</h3>
            <p class="pt-2 pb-4">
              We process your data to provide our services. Your data may be shared with internal and external parties
              for the purpose of improving and maintaining our API client. We ensure all external parties comply with
              our strict data protection guidelines.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Data Collection Methods</h3>
            <p class="pt-2 pb-4">
              Data is collected through various means such as direct input, cookies, and other tracking technologies.
              This helps us to understand user preferences and provide better service.
            </p>
          </li>
          <li>
            <h3 class="text-h5">Contact Information</h3>
            <p class="pt-2 pb-4">
              Contact Information If you have any questions or concerns about this privacy policy, please contact us at
              <a href="mailto:classicminidiy@gmail.com" target="_blank">classicminidiy@gmail.com</a>.
            </p>
          </li>
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

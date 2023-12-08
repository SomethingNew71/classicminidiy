<script lang="ts" setup>
  import { VCol, VContainer, VRow } from 'vuetify/components/VGrid';
  const route = useRoute();
  const uuid = ref(route.query.uuid?.toString());
  const newWheel = route.query.newWheel === 'true' ? true : false;
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Submit a Wheel'" />
    <section id="scrollLocation" class="section">
      <v-container>
        <v-row>
          <v-col cols="8">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li>
                  <NuxtLink to="/">
                    <span class="icon is-small">
                      <i class="fas fa-home" aria-hidden="true" />
                    </span>
                    <span>Home</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/technical/wheels">
                    <span class="icon is-small">
                      <i class="fas fa-tire" aria-hidden="true" />
                    </span>
                    <span>Wheels</span>
                  </NuxtLink>
                </li>
                <li class="is-active">
                  <NuxtLink to="">
                    <span class="icon is-small">
                      <i class="fas fa-tire" aria-hidden="true" />
                    </span>
                    <span>Wheel Submission</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <WheelSubmit v-if="!newWheel" :uuid="uuid"></WheelSubmit>
            <WheelSubmit v-if="newWheel" :newWheel="newWheel"></WheelSubmit>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

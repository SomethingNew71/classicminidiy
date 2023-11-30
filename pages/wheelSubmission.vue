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
            <v-stepper :items="['Wheel Details', 'Images', 'Review']">
              <template v-slot:item.1>
                <v-skeleton-loader v-if="pending" type="list-item-two-line">
                  <v-list-item title="Title" subtitle="Subtitle" lines="two" rounded></v-list-item>
                </v-skeleton-loader>
                <div v-else-if="error">
                  <p>Error loading wheel - {{ error }}</p>
                </div>
                <v-card v-else title="Current Details" flat>
                  {{ wheel.name }}
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card title="Step Two" flat>...</v-card>
              </template>

              <template v-slot:item.3>
                <v-card title="Step Three" flat>...</v-card>
              </template>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { VStepper } from 'vuetify/components/VStepper';
  import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
  import { VListItem } from 'vuetify/components/VList';
  import { VCol, VContainer, VRow } from 'vuetify/components/VGrid';
  import { VCard } from 'vuetify/components/VCard';
  const route = useRoute();
  const {
    data: wheel,
    pending,
    error,
  } = await useFetch(`/api/wheels/getWheel`, {
    query: {
      uuid: route.query.uuid,
    },
  });
</script>

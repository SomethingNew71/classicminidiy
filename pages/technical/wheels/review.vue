<script lang="ts" setup>
  import { VDataIterator } from 'vuetify/components/VDataIterator';
  import { VSheet } from 'vuetify/components/VSheet';
  import { VBtn } from 'vuetify/components/VBtn';
  import { VImg } from 'vuetify/components/VImg';
  import { VListItem } from 'vuetify/components/VList';
  import { VTextField } from 'vuetify/components/VTextField';
  import { VRow, VCol, VContainer } from 'vuetify/components/VGrid';
  import { VTable } from 'vuetify/components/VTable';
  import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VAlert } from 'vuetify/components/VAlert';
  import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel';
  import type { IWheelsData } from '~/data/models/wheels';

  const wheelsToReview: any = ref([]);
  const password = ref('');
  const acceptLoading = ref(false);
  const denyLoading = ref(false);
  const unauthorized = ref();
  const { data: wheels, pending, error }: any = await useFetch(() => `/api/wheels/review/list`);
  await getExistingWheelData(wheels.value);

  async function getExistingWheelData(wheels: IWheelsData[]) {
    wheels.forEach(async (wheel: IWheelsData) => {
      if (wheel.newWheel) {
        wheelsToReview.value.push({
          new: wheel,
          existing: undefined,
        });
      } else {
        await useFetch(`/api/wheels/wheel`, {
          query: {
            uuid: wheel.uuid,
          },
        }).then((res) => {
          wheelsToReview.value.push({
            new: wheel,
            existing: res.data.value,
          });
        });
      }
    });
  }

  async function acceptItem(item: any) {
    acceptLoading.value = true;
    await useFetch(() => `/api/wheels/review/save`, {
      method: 'POST',
      body: { wheel: item, auth: password },
    })
      .then((res: any) => {
        if (res.data.value.response === 'User is not authorized') {
          unauthorized.value = true;
        } else {
          wheelsToReview.value = wheelsToReview.value.filter((wheel: any) => wheel.new.uuid !== item.new.uuid);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => (acceptLoading.value = false));
  }
  async function denyItem(item: any) {
    denyLoading.value = true;
    await useFetch(() => `/api/wheels/review/delete`, {
      method: 'POST',
      body: { uuid: item.new.uuid, auth: password },
    })
      .then((res: any) => {
        if (res.data.value.response === 'User is not authorized') {
          unauthorized.value = true;
        } else {
          wheelsToReview.value = wheelsToReview.value.filter((wheel: any) => wheel.new.uuid !== item.new.uuid);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => (denyLoading.value = false));
  }
</script>

<template>
  <hero :navigation="true" :title="'Review wheel submissions'" />
  <section>
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
                  <span>Wheel Review</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert
          v-if="unauthorized"
          density="compact"
          type="warning"
          title="Unauthorized"
          text="Either no password was provided or the password is wrong"
        ></v-alert>
      </v-col>
      <v-col cols="6">
        <v-text-field
          prepend-icon="fad fa-file-signature"
          variant="solo-filled"
          v-model="password"
          type="password"
          :counter="50"
          label="Password"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row v-if="pending" class="align-center justify-center">
          <v-row align="center">
            <v-col v-for="(item, i) in 12" :key="i" cols="12" md="4" lg="3" xl="2">
              <v-skeleton-loader
                class="mx-auto border"
                max-width="300"
                type="card,paragraph,actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-row>
        <pre v-else-if="error">{{ error }}</pre>
        <v-row v-else-if="wheelsToReview.length === 0">
          <v-col cols="12">
            <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
              <div class="text-truncate">Wheels for review</div>
            </h1>
            <p>No Wheels to Review</p>
          </v-col>
        </v-row>
        <v-data-iterator v-else :items="wheelsToReview" :items-per-page="100">
          <template v-slot:header="">
            <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
              <div class="text-truncate">Wheels for review</div>
            </h1>
          </template>

          <template v-slot:default="{ items }">
            <v-row>
              <v-col v-for="(item, i) in items" :key="i" cols="12" md="4" xl="3">
                <v-sheet border>
                  <template v-if="item.raw.new.images?.length >= 1">
                    <v-carousel height="250">
                      <template v-for="image in item.raw.new.images">
                        <v-carousel-item :src="image"></v-carousel-item>
                      </template>
                    </v-carousel>
                  </template>
                  <template v-else>
                    <v-img height="250" src="https://classicminidiy.s3.amazonaws.com/misc/color-filler.png"></v-img>
                  </template>

                  <v-list-item lines="two" density="comfortable">
                    <template v-slot:title>
                      <strong class="text-h6">
                        {{ item.raw.new.uuid }}
                      </strong>
                    </template>
                  </v-list-item>

                  <v-table density="compact" class="text-body1">
                    <thead>
                      <tr>
                        <td></td>
                        <td align="right">New</td>
                        <td align="right">{{ item.raw.new.newWheel ? 'No Exisitng Wheel' : 'Existing' }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr align="right">
                        <th>Submitter:</th>

                        <td>{{ item.raw.new.userName }}</td>
                        <td>N/A</td>
                      </tr>

                      <tr align="right">
                        <th>Name:</th>

                        <td>{{ item.raw.new.name }}</td>
                        <td>{{ item.raw.new.newWheel ? 'N/A' : item.raw.existing.name }}</td>
                      </tr>

                      <tr align="right">
                        <th>Offset:</th>

                        <td>{{ item.raw.new.offset }}</td>
                        <td>{{ item.raw.new.newWheel ? 'N/A' : item.raw.existing.offset }}</td>
                      </tr>

                      <tr align="right">
                        <th>Size:</th>

                        <td>{{ item.raw.new.size }}</td>
                        <td>{{ item.raw.new.newWheel ? 'N/A' : item.raw.existing.size }}</td>
                      </tr>

                      <tr align="right">
                        <th>Type:</th>

                        <td>{{ item.raw.new.type }}</td>
                        <td>{{ item.raw.new.newWheel ? 'N/A' : item.raw.existing.type }}</td>
                      </tr>

                      <tr align="right">
                        <th>Width:</th>

                        <td>{{ item.raw.new.width }}</td>
                        <td>{{ item.raw.new.newWheel ? 'N/A' : item.raw.existing.width }}</td>
                      </tr>

                      <tr align="right">
                        <th>Referral:</th>

                        <td>{{ item.raw.new.referral }}</td>
                        <td>N/A</td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-divider class="mb-4"></v-divider>

                  <div class="text-end mb-5">
                    <v-btn
                      class="text-none mr-2"
                      :loading="acceptLoading"
                      color="success"
                      rounded
                      variant="flat"
                      @click="acceptItem(item.raw)"
                      >Accept Changes</v-btn
                    >
                    <v-btn
                      class="text-none mr-2"
                      :loading="denyLoading"
                      color="error"
                      rounded
                      variant="flat"
                      @click="denyItem(item.raw)"
                    >
                      Deny Changes
                    </v-btn>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

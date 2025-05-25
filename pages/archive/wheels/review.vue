<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import type { IWheelsData, IWheelToReview } from '~/data/models/wheels';

  const wheelsToReview = ref<IWheelToReview[]>([]);
  const password = ref('');
  const acceptLoading = ref(false);
  const denyLoading = ref(false);
  const unauthorized = ref();
  const choiceRefs: any = ref({});
  const { data: wheels, pending, error }: any = await useFetch(() => `/api/wheels/review/list`);
  await getExistingWheelData(wheels.value);

  async function getExistingWheelData(wheels: IWheelsData[]) {
    wheels.forEach(async (wheel: IWheelsData) => {
      if (wheel.newWheel) {
        wheelsToReview.value.push({
          new: wheel,
        });
        choiceRefs.value[wheel.uuid] = {
          name: false,
          offset: false,
          size: false,
          type: false,
          width: false,
        };
      } else {
        await useFetch(`/api/wheels/wheel`, {
          query: {
            uuid: wheel.uuid,
          },
        }).then(({ data }) => {
          if (data.value) {
            wheelsToReview.value.push({
              new: wheel,
              existing: data.value,
            });
          }
          choiceRefs.value[wheel.uuid] = {
            name: false,
            offset: false,
            size: false,
            type: false,
            width: false,
          };
        });
      }
    });
  }

  async function acceptItem(item: IWheelToReview) {
    acceptLoading.value = true;
    await useFetch(() => `/api/wheels/review/save`, {
      method: 'POST',
      body: { wheel: item, auth: password },
    })
      .then((res: any) => {
        if (res.data.value.response === 'User is not authorized') {
          unauthorized.value = true;
        } else {
          wheelsToReview.value = wheelsToReview.value.filter((wheel: any) => wheel.new.uuid !== item.new?.uuid);
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
  <hero :navigation="true" :title="'Review wheel submissions'" :heroType="HERO_TYPES.ARCHIVE" />

  <section class="py-4">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-8">
          <div class="breadcrumbs text-base">
            <ul>
              <li>
                <NuxtLink to="/">
                  <i class="fas fa-home mr-1"></i>
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/archive/wheels">
                  <i class="fas fa-tire mr-1"></i>
                  Wheels
                </NuxtLink>
              </li>
              <li>
                <span>
                  <i class="fas fa-tire mr-1"></i>
                  Wheel Review
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container mx-auto px-4 py-4">
    <!-- Password section -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div v-if="unauthorized" class="alert alert-warning mb-4">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          <span>Unauthorized: Either no password was provided or the password is wrong</span>
        </div>
        <div class="form-control w-full max-w-md mb-4">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <div class="input-group">
            <span><i class="fad fa-file-signature"></i></span>
            <input
              v-model="password"
              type="password"
              maxlength="50"
              placeholder="Enter password"
              class="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Wheels content section -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <!-- Loading state -->
        <div v-if="pending" class="flex justify-center">
          <div class="grid grid-cols-12 gap-4">
            <div v-for="(item, i) in 12" :key="i" class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
              <div class="skeleton h-48 w-full"></div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <pre v-else-if="error" class="bg-error/10 p-4 rounded-lg overflow-auto">{{ error }}</pre>

        <!-- Empty state -->
        <div v-else-if="wheelsToReview.length === 0" class="text-center py-8">
          <h1 class="text-2xl font-bold mb-4">Wheels for review</h1>
          <p>No Wheels to Review</p>
        </div>

        <!-- Wheels list -->
        <div v-else>
          <h1 class="text-2xl font-bold mb-4">Wheels for review</h1>

          <div v-for="(item, i) in wheelsToReview" :key="i" class="mb-8">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body p-6">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <!-- Image section -->
                  <div class="col-span-1 md:col-span-3">
                    <div v-if="item.new?.images && item.new.images.length >= 1" class="carousel w-full h-[250px]">
                      <div
                        v-for="(image, index) in item.new.images"
                        :key="index"
                        :id="`slide-${i}-${index}`"
                        class="carousel-item relative w-full rounded-lg"
                      >
                        <img :src="image.src" class="w-full h-full object-cover rounded-lg" />
                        <div
                          v-if="item.new.images.length > 1"
                          class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
                        >
                          <a
                            :href="`#slide-${i}-${index === 0 ? item.new.images.length - 1 : index - 1}`"
                            class="btn btn-circle btn-sm"
                            >❮</a
                          >
                          <a
                            :href="`#slide-${i}-${index === item.new.images.length - 1 ? 0 : index + 1}`"
                            class="btn btn-circle btn-sm"
                            >❯</a
                          >
                        </div>
                      </div>
                    </div>
                    <div v-else class="h-[250px] bg-base-200 rounded-lg flex items-center justify-center">
                      <span class="text-base-content/50">No image available</span>
                    </div>
                  </div>

                  <!-- Info section -->
                  <div class="col-span-1 md:col-span-9">
                    <p class="text-lg font-bold mb-4">{{ item.new?.uuid }}</p>

                    <div class="overflow-x-auto">
                      <table class="table table-compact w-full">
                        <thead>
                          <tr>
                            <th></th>
                            <th>New Value</th>
                            <th>Existing Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Name row -->
                          <tr>
                            <th class="font-bold">Name:</th>
                            <td>{{ item.new?.name || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.name || '---' }}</td>
                          </tr>

                          <!-- Offset row -->
                          <tr>
                            <th class="font-bold">Offset:</th>
                            <td>{{ item.new?.offset || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.offset || '---' }}</td>
                          </tr>

                          <!-- Size row -->
                          <tr>
                            <th class="font-bold">Size:</th>
                            <td>{{ item.new?.size || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.size || '---' }}</td>
                          </tr>

                          <!-- Type row -->
                          <tr>
                            <th class="font-bold">Type:</th>
                            <td>{{ item.new?.type || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.type || '---' }}</td>
                          </tr>

                          <!-- Width row -->
                          <tr>
                            <th class="font-bold">Width:</th>
                            <td>{{ item.new?.width || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.width || '---' }}</td>
                          </tr>

                          <!-- Notes row -->
                          <tr>
                            <th class="font-bold">Notes:</th>
                            <td>{{ item.new?.notes || '---' }}</td>
                            <td>{{ item.new?.newWheel ? '---' : item.existing?.notes || '---' }}</td>
                          </tr>

                          <!-- Referral row -->
                          <tr>
                            <th class="font-bold">Referral:</th>
                            <td>{{ item.new?.referral || '---' }}</td>
                            <td>---</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="divider"></div>

                    <div class="flex justify-end gap-2">
                      <button class="btn btn-success" :class="{ loading: acceptLoading }" @click="acceptItem(item)">
                        Accept Changes
                      </button>
                      <button class="btn btn-error" :class="{ loading: denyLoading }" @click="denyItem(item)">
                        Deny Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .end {
    justify-items: end;
  }
</style>

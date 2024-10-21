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
    // let wheel: IWheelsData = {} as IWheelsData;
    // console.log(' wheel', item);
    // if (item.new && item.existing) {
    //   wheel = prepareForSave(item);
    // } else if (item.new) {
    //   wheel = item.new;
    // }
    // console.log('parsed wheel', wheel);

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
    // acceptLoading.value = false;
  }

  // @ts-ignore
  // function prepareForSave(wheelToReview: IWheelToReview): IWheelsData {
  //   if (!wheelToReview.existing && wheelToReview.new) {
  //     return wheelToReview.new;
  //   } else if (wheelToReview.existing && wheelToReview.new) {
  //     const choices = choiceRefs.value[wheelToReview.existing.uuid];
  //     console.log('choices', choices);
  //     console.log('new wheel', wheelToReview.new);
  //     console.log('existing wheel', wheelToReview.existing);

  //     const wheel = {
  //       uuid: wheelToReview.new.uuid,
  //       name: choices.name ? wheelToReview.new.name : wheelToReview.existing.name,
  //       offset: choices.offset ? wheelToReview.new.offset : wheelToReview.existing.offset,
  //       size: choices.size ? wheelToReview.new.size : wheelToReview.existing.size,
  //       type: choices.type ? wheelToReview.new.type : wheelToReview.existing.type,
  //       width: choices.width ? wheelToReview.new.width : wheelToReview.existing.width,
  //       referral: wheelToReview.new.referral,
  //       notes: choices.notes ? wheelToReview.new.notes : wheelToReview.existing.notes,
  //       userName: wheelToReview.existing.userName,
  //       emailAddress: wheelToReview.existing.emailAddress,
  //     };
  //     return wheel;
  //   }
  // }

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
                <NuxtLink to="/archive/wheels">
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
          <template v-slot:header>
            <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
              <div class="text-truncate">Wheels for review</div>
            </h1>
          </template>

          <template v-slot:default="{ items }">
            <v-row>
              <v-col v-for="(item, i) in items" :key="i" cols="12">
                <v-sheet>
                  <v-row>
                    <v-col cols="12" md="3">
                      <template v-if="item.raw.new?.images && item.raw.new.images.length >= 1">
                        <v-carousel height="250">
                          <template v-for="image in item.raw.new.images">
                            <v-carousel-item :src="image"></v-carousel-item>
                          </template>
                        </v-carousel>
                      </template>
                      <template v-else>
                        <v-img height="250" src="https://classicminidiy.s3.amazonaws.com/misc/color-filler.png"></v-img>
                      </template>
                    </v-col>
                    <v-col cols="12" md="9">
                      <p class="text-h5 font-weight-bold mb-4">
                        {{ item.raw.new?.uuid }}
                      </p>

                      <v-table density="compact" class="text-body1 elevation-3">
                        <thead>
                          <tr>
                            <th></th>
                            <th align="right" class="font-weight-bold pt-4 pb-4 text-right">New</th>
                            <th align="right" class="font-weight-bold pt-4 pb-4 text-right">
                              {{ item.raw.new?.newWheel ? 'No Exisitng Wheel' : 'Existing' }}
                            </th>
                            <!-- <th align="right" class="font-weight-bold pt-4 pb-4 text-right">Use New</th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr align="right">
                            <th class="py-2 font-weight-bold">Submitter:</th>
                            <td class="py-2">{{ item.raw.new?.userName || '---' }}</td>
                            <td class="py-2">---</td>
                            <!-- <td class="py-2">---</td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Name:</th>
                            <td class="py-4">{{ item.raw.new?.name || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.name || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].name"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].name"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Offset:</th>
                            <td class="py-4">{{ item.raw.new?.offset || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.offset || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].offset"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].offset"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Size:</th>
                            <td class="py-4">{{ item.raw.new?.size || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.size || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].size"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].size"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Type:</th>
                            <td class="py-4">{{ item.raw.new?.type || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.type || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].type"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].type"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Width:</th>
                            <td class="py-4">{{ item.raw.new?.width || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.width || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].width"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].width"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Notes:</th>
                            <td class="py-4">{{ item.raw.new?.notes || '---' }}</td>
                            <td class="py-4">
                              {{ item.raw.new?.newWheel ? '---' : item.raw.existing?.notes || '---' }}
                            </td>
                            <!-- <td class="end" v-if="item.raw.new">
                              <v-switch
                                v-if="item.raw.existing?.uuid"
                                :model-value="choiceRefs[item.raw.existing.uuid].notes"
                                color="primary"
                              ></v-switch>
                              <v-switch
                                v-else
                                :model-value="choiceRefs[item.raw.new.uuid].notes"
                                color="primary"
                              ></v-switch>
                            </td> -->
                          </tr>

                          <tr align="right">
                            <th class="py-4 font-weight-bold">Referral:</th>
                            <td class="py-4">{{ item.raw.new?.referral || '---' }}</td>
                            <td>---</td>
                            <!-- <td></td> -->
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
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .end {
    justify-items: end;
  }
</style>

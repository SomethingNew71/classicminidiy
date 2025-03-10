<script lang="ts" setup>
  const props = defineProps({
    uuid: {
      type: String,
      default: '',
    },
    newWheel: {
      type: Boolean,
      default: false,
    },
  });
  import type { IWheelsData } from '~/data/models/wheels';
  import { humanFileSize, TRACKING_EVENTS, trackStuff } from '~/data/models/helper-utils';
  const { path } = await useRoute();
  const wheel = ref();
  const pageLoad = ref(true);
  const pageError = ref();
  const loading = ref(false);
  const hasError = ref(false);
  const hasSuccess = ref();
  const detailsValid = ref(false);
  const imagesValid = ref(false);
  const contactValid = ref(false);
  const step = ref(1);
  const name = ref('');
  const type = ref('');
  const width = ref('');
  const size = ref('');
  const offset = ref('');
  const notes = ref('');
  const userName = ref('');
  const emailAddress = ref('');
  const referral = ref('');
  const dropFiles = ref<File[]>([]);
  const contactRules = [
    (value: any) => {
      if (value?.length > 0) return true;
      return 'This field is required';
    },
  ];
  const imageRules = [
    (value: any) => {
      return !value || !value.length || value[0].size < 3000000 || 'Wheel image size should be less than 3 MB!';
    },
    (value: any) => {
      if (value?.length <= 5) return true;
      return 'You cannot upload more than 5 images at a time.';
    },
  ];
  const imageRulesRequired = [
    (value: any) => {
      return !value || !value.length || value[0].size < 3000000 || 'Wheel image size should be less than 3 MB!';
    },
    (value: any) => {
      if (value?.length > 0) return true;
      return 'This field is required';
    },
    (value: any) => {
      if (value?.length <= 5) return true;
      return 'You cannot upload more than 5 images at a time.';
    },
  ];

  if (!props.newWheel) {
    await useFetch(`/api/wheels/wheel`, {
      query: {
        uuid: props.uuid,
      },
    })
      .then(({ data }) => {
        wheel.value = data.value;
      })
      .catch((error) => (pageError.value = error))
      .finally(() => {
        pageLoad.value = false;
      });
  } else {
    pageLoad.value = false;
  }

  async function sendNewInfo() {
    loading.value = true;

    await storeWheelDetails().then(async (res: any) => {
      await storeWheelImages(res?.data?._rawValue.uuid)
        .then(() => {
          hasSuccess.value = true;
          step.value = 5;
        })
        .catch((err) => {
          hasError.value = true;
          console.error(err);
        })
        .finally(() => {
          loading.value = false;
        });
    });
  }

  async function storeWheelDetails() {
    const details: IWheelsData = {
      uuid: props.uuid,
      name: name.value,
      type: type.value,
      width: width.value,
      size: size.value,
      offset: offset.value,
      notes: notes.value,
      userName: userName.value,
      emailAddress: emailAddress.value,
      referral: referral.value,
      newWheel: props.newWheel,
    };
    return await useFetch('/api/wheels/save/details', {
      method: 'POST',
      body: details,
      headers: { 'cache-control': 'no-cache' },
    }).catch((err) => console.error(err));
  }

  async function storeWheelImages(uuid: string) {
    const formData = new FormData();
    await dropFiles.value.forEach((file, i) => {
      formData.append(`file${i}`, file);
    });
    if (uuid === '') {
      console.error('No uuid provided for image upload');
    } else {
      await useFetch('/api/wheels/save/images', {
        method: 'POST',
        body: formData,
        query: { uuid },
        headers: { 'cache-control': 'no-cache' },
      }).catch((err) => console.error(err));
    }
  }
</script>

<template>
  <v-stepper v-model="step" :items="['Wheel Details', 'Images', 'Contact Info', 'Review', 'Submitted']">
    <template v-slot:item.1>
      <v-skeleton-loader v-if="pageLoad" type="list-item-two-line"> </v-skeleton-loader>
      <div v-else-if="pageError">
        <p>Error loading wheel - {{ pageError }}</p>
      </div>
      <v-card v-else-if="wheel || newWheel" :title="newWheel ? 'Submit wheel' : 'Suggested Updates'" flat>
        <v-form v-model="detailsValid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Name:
                  <strong class="pl-1">{{ wheel.name && wheel.name !== '' ? wheel.name : 'No data' }}</strong>
                </v-label>
                <v-text-field
                  prepend-icon="fad fa-file-signature"
                  variant="solo-filled"
                  v-model="name"
                  :rules="newWheel ? contactRules : []"
                  :required="newWheel"
                  :append-inner-icon="newWheel ? 'fad fa-asterisk' : ''"
                  :counter="30"
                  label="Wheel Name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Type:
                  <strong class="pl-1">{{ wheel.type && wheel.type !== '' ? wheel.type : 'No data' }}</strong>
                </v-label>
                <v-text-field
                  prepend-icon="fad fa-box-open-full"
                  variant="solo-filled"
                  v-model="type"
                  :counter="30"
                  label="Wheel Material Type"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Width:
                  <strong class="pl-1">{{ wheel.width }}</strong>
                </v-label>

                <v-text-field
                  prepend-icon="fad fa-ruler-horizontal"
                  variant="solo-filled"
                  v-model="width"
                  :rules="newWheel ? contactRules : []"
                  :required="newWheel"
                  type="number"
                  :append-inner-icon="newWheel ? 'fad fa-asterisk' : ''"
                  label="Wheel Width"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="pb-3">
              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Size:
                  <strong class="pl-1">{{ wheel.size && wheel.size !== '' ? wheel.size : 'No data' }}</strong>
                </v-label>
                <v-select
                  prepend-icon="fad fa-ruler"
                  variant="solo-filled"
                  v-model="size"
                  :rules="newWheel ? contactRules : []"
                  :required="newWheel"
                  :append-inner-icon="newWheel ? 'fad fa-asterisk' : ''"
                  label="Wheel Size"
                  :items="['10', '12', '13']"
                ></v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Offset:
                  <strong class="pl-1">{{ wheel.offset && wheel.offset !== '' ? wheel.offset : 'No data' }}</strong>
                </v-label>
                <v-text-field
                  prepend-icon="fad fa-arrow-right-from-line"
                  variant="solo-filled"
                  v-model="offset"
                  :counter="30"
                  label="Offset Information"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-label class="pb-2" v-if="!newWheel && wheel">
                  Current Notes:
                  <strong class="pl-1">
                    {{ wheel.notes && wheel.notes !== '' ? wheel.notes : 'No data' }}
                  </strong>
                </v-label>
                <v-text-field
                  prepend-icon="fad fa-notebook"
                  variant="solo-filled"
                  v-model="notes"
                  :counter="250"
                  label="Extra Notes"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </template>

    <template v-slot:item.2>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-h5 pb-1">Add your own images</h3>
          <h4 class="text-subtitle pb-4" v-if="newWheel">
            To submit a new wheel, you must include at least one image for the registry
          </h4>
          <v-form v-model="imagesValid">
            <v-file-input
              :rules="newWheel ? imageRulesRequired : imageRules"
              :required="newWheel"
              :append-inner-icon="newWheel ? 'fad fa-asterisk' : ''"
              accept="image/png, image/jpeg"
              label="Upload up to 5 images"
              variant="filled"
              multiple
              prepend-icon="fad fa-camera"
              v-model="dropFiles"
            ></v-file-input>
          </v-form>
          <template v-if="!newWheel">
            <v-list v-if="dropFiles && dropFiles.length > 0" lines="two">
              <v-list-subheader>Files to upload</v-list-subheader>
              <v-list-item
                v-for="(image, i) in dropFiles"
                :key="i"
                :title="image.name"
                :subtitle="humanFileSize(image.size)"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon hydrate-on-visible icon="fad fa-image"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-col>
        <v-col cols="12" md="6">
          <template v-if="newWheel">
            <h3 class="text-h5 pb-1">Your Images</h3>
            <v-list v-if="dropFiles && dropFiles.length > 0" lines="two">
              <v-list-subheader>Files to upload</v-list-subheader>
              <v-list-item
                v-for="(image, i) in dropFiles"
                :key="i"
                :title="image.name"
                :subtitle="humanFileSize(image.size)"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon hydrate-on-visible icon="fad fa-image"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item> </v-list
          ></template>
          <template v-else>
            <h3 class="text-h5 pb-1">Existing Images</h3>
            <v-col v-for="(image, i) in wheel.images" :key="i" class="d-flex child-flex" cols="4">
              <v-img :src="image.src" aspect-ratio="1" cover class="bg-grey-lighten-2">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </template>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.3>
      <v-form v-model="contactValid">
        <v-card title="Your Details" flat>
          <v-row>
            <v-col cols="12" md="12" lg="8">
              <v-label class="pb-2">Your Name</v-label>
              <v-text-field
                prepend-icon="fad fa-id-card"
                variant="solo-filled"
                :rules="contactRules"
                type="name"
                required
                v-model="userName"
                :counter="30"
                label="Your Name"
              ></v-text-field>
              <v-label class="pb-2">Email Address:</v-label>
              <v-text-field
                prepend-icon="fad fa-at"
                variant="solo-filled"
                :rules="contactRules"
                required
                type="email"
                v-model="emailAddress"
                :counter="60"
                label="Your Email"
              ></v-text-field>
              <v-label class="pb-2">How did you hear about CMIDY?</v-label>
              <v-text-field
                prepend-icon="fad fa-user-group"
                variant="solo-filled"
                v-model="referral"
                :counter="20"
                label="ex. Friend, Google, etc"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <h3 class="text-h5 pb-3">Why do we need this?</h3>
              <p>
                We require this information so I can follow up and ask more questions as needed. Your name and email are
                required in order to contribute to this site. This also helps me prevent spam from getting uploaded.
                <strong>We do not sell or share your information.</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </template>
    <template v-slot:item.4>
      <v-card title="Review" flat>
        <v-row dense class="mb-5">
          <v-col cols="12" md="6">
            <v-list lines="two" elevation="2">
              <v-list-subheader> Wheel Information </v-list-subheader>
              <v-list-item title="Wheel Name" :subtitle="name !== '' ? name : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-file-signature"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Type" :subtitle="type !== '' ? type : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-box-open-full"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Width" :subtitle="width !== '' ? size : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-ruler-horizontal"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Size" :subtitle="size !== '' ? size : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-ruler"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Offset" :subtitle="offset !== '' ? offset : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-arrow-right-from-line"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Notes" :subtitle="notes !== '' ? notes : 'N/A'">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-notebook"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-subheader> Contact Information </v-list-subheader>
              <v-list-item title="Your Name" :subtitle="userName">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-id-card"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
              <v-list-item title="Email Address" :subtitle="emailAddress">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon hydrate-on-visible icon="fad fa-at"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="6">
            <v-list density="compact" :lines="false" elevation="2">
              <v-list-subheader> Wheel Images </v-list-subheader>
              <template v-if="dropFiles.length > 0">
                <v-list-item v-for="(image, i) in dropFiles" :title="image.name" :subtitle="humanFileSize(image.size)">
                  <template v-slot:prepend>
                    <v-icon hydrate-on-visible icon="fad fa-image"></v-icon>
                  </template>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item title="No Images" subtitle="No images were uploaded to this submission"></v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <template v-slot:item.5>
      <v-card flat>
        <v-row dense class="mb-5" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon hydrate-on-visible icon="fad check-to-slot" size=""></v-icon>
            <v-img
              alt="Classic Mini DIY Logo"
              src="https://classicminidiy.s3.amazonaws.com/misc/Small-Black.png"
              :width="115"
              class="shrink mx-auto pb-5"
              :transition="false"
            />
            <h2 class="text-h5 pt-10 pb-2">Thank you for contributing!</h2>
            <h3 class="text-h6 pb-5">Your submission has been added to our queue for review.</h3>
            <p class="pb-5">
              Classic Mini DIY's technical site is completely free and supported by people like you! If you like this
              resource and would like to contribute to keeping it online for years to come, please consider supporting
              the monthly hosting.
            </p>
            <v-btn color="primary" href="https://patreon.com/classicminidiy" class="mx-1 my-1"> Support </v-btn>
            <v-btn
              prepend-icon="fa:fad fa-hand-holding-circle-dollar"
              class="me-3"
              :size="'large'"
              target="_blank"
              color="secondary"
              href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
              @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
            >
              Cover Server Costs
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <template v-slot:actions>
      <v-row class="d-flex justify-space-between mx-5 mb-5">
        <v-btn v-if="step !== 5" :disabled="step === 1" @click="step--">Previous</v-btn>
        <v-btn v-if="step === 1" color="primary" @click="step++" :disabled="!detailsValid">Next</v-btn>
        <v-btn v-if="step === 2" color="primary" @click="step++" :disabled="!imagesValid">Next</v-btn>
        <v-btn v-if="step === 3" color="primary" @click="step++" :disabled="!contactValid">Next</v-btn>
        <v-btn v-if="step === 4" color="primary" :loading="loading" @click="sendNewInfo()">Submit</v-btn>
      </v-row>
    </template>
  </v-stepper>
</template>

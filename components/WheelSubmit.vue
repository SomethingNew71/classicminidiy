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

  // Reactive state
  const { path } = await useRoute();
  const wheel = ref();
  const pageLoad = ref(true);
  const pageError = ref();
  const loading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');
  const hasSuccess = ref(false);
  const detailsValid = ref(false);
  const imagesValid = ref(false);
  const contactValid = ref(false);
  const step = ref(1);

  // Form fields
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

  // Available wheel sizes
  const wheelSizes = ['10', '12', '13'];

  // Form validation rules
  const contactRules = [
    (value: any) => {
      if (value?.length > 0) return true;
      return 'This field is required';
    },
  ];

  const emailRules = [
    (value: any) => {
      if (value?.length > 0) return true;
      return 'Email is required';
    },
    (value: any) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || 'Please enter a valid email address';
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

  // Load existing wheel data if editing
  if (!props.newWheel) {
    await useFetch(`/api/wheels/wheel`, {
      query: {
        uuid: props.uuid,
      },
    })
      .then(({ data }) => {
        wheel.value = data.value;
        // Pre-populate form fields with existing data
        if (wheel.value) {
          name.value = wheel.value.name || '';
          type.value = wheel.value.type || '';
          width.value = wheel.value.width || '';
          size.value = wheel.value.size || '';
          offset.value = wheel.value.offset || '';
          notes.value = wheel.value.notes || '';
        }
      })
      .catch((error) => {
        pageError.value = error;
        errorMessage.value = 'Failed to load wheel data. Please try again.';
      })
      .finally(() => {
        pageLoad.value = false;
      });
  } else {
    pageLoad.value = false;
  }

  // Reset form to initial state
  function resetForm() {
    name.value = '';
    type.value = '';
    width.value = '';
    size.value = '';
    offset.value = '';
    notes.value = '';
    userName.value = '';
    emailAddress.value = '';
    referral.value = '';
    dropFiles.value = [];
    step.value = 1;
    hasError.value = false;
    errorMessage.value = '';
    hasSuccess.value = false;
  }

  // Submit wheel data
  async function sendNewInfo() {
    loading.value = true;
    hasError.value = false;
    errorMessage.value = '';

    try {
      const detailsResponse = await storeWheelDetails();
      const uuid = detailsResponse?.data?.value?.uuid;

      if (!uuid) {
        throw new Error('Failed to save wheel details');
      }

      if (dropFiles.value.length > 0) {
        await storeWheelImages(uuid);
      }

      hasSuccess.value = true;
      step.value = 5;
    } catch (err: any) {
      hasError.value = true;
      errorMessage.value = err.message || 'An error occurred while submitting your wheel data';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  // Store wheel details
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
    }).catch((err) => {
      console.error('Error saving wheel details:', err);
      throw new Error('Failed to save wheel details');
    });
  }

  // Store wheel images
  async function storeWheelImages(uuid: string) {
    if (!uuid || uuid === '') {
      throw new Error('No UUID provided for image upload');
    }

    const formData = new FormData();
    dropFiles.value.forEach((file, i) => {
      formData.append(`file${i}`, file);
    });

    return await useFetch('/api/wheels/save/images', {
      method: 'POST',
      body: formData,
      query: { uuid },
      headers: { 'cache-control': 'no-cache' },
    }).catch((err) => {
      console.error('Error uploading images:', err);
      throw new Error('Failed to upload images');
    });
  }

  // Check if we can move to the next step
  const canProceedToNextStep = computed(() => {
    if (step.value === 1) return detailsValid.value;
    if (step.value === 2) return imagesValid.value;
    if (step.value === 3) return contactValid.value;
    return true;
  });
</script>

<template>
  <v-stepper v-model="step" :items="['Wheel Details', 'Images', 'Contact Info', 'Review', 'Submitted']">
    <template v-slot:item.1>
      <v-skeleton-loader v-if="pageLoad" type="list-item-two-line"> </v-skeleton-loader>
      <div v-else-if="pageError" class="error-container pa-4">
        <v-alert type="error" title="Error Loading Wheel" :text="errorMessage || 'Unable to load wheel data'" />
        <v-btn color="primary" class="mt-4" @click="resetForm">Start Over</v-btn>
      </div>
      <v-card v-else-if="wheel || newWheel" :title="newWheel ? 'Submit New Wheel' : 'Suggest Updates'" flat>
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
                  :items="wheelSizes"
                  hint="Diameter in inches"
                  persistent-hint
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
                :rules="emailRules"
                required
                type="email"
                v-model="emailAddress"
                :counter="60"
                label="Your Email"
                hint="We'll never share your email with anyone else"
                persistent-hint
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
              <v-list-item title="Width" :subtitle="width !== '' ? width : 'N/A'">
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
            <v-icon hydrate-on-visible icon="fad fa-check-to-slot" size="x-large" color="success" class="mb-4"></v-icon>
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
            <v-btn
              color="primary"
              href="https://patreon.com/classicminidiy"
              class="mx-1 my-1"
              target="_blank"
              prepend-icon="fad fa-heart"
            >
              Support on Patreon
            </v-btn>
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
        <div>
          <v-btn v-if="step !== 5 && step !== 1" variant="outlined" @click="step--" prepend-icon="fad fa-arrow-left">
            Previous
          </v-btn>
          <v-btn v-if="step === 4" variant="outlined" class="ml-2" @click="resetForm"> Start Over </v-btn>
        </div>

        <div>
          <v-btn
            v-if="hasError"
            color="error"
            class="mr-2"
            @click="
              hasError = false;
              errorMessage = '';
            "
          >
            Clear Error
          </v-btn>
          <v-btn
            v-if="step === 1"
            color="primary"
            @click="step++"
            :disabled="!detailsValid"
            append-icon="fad fa-arrow-right"
          >
            Next
          </v-btn>
          <v-btn
            v-if="step === 2"
            color="primary"
            @click="step++"
            :disabled="!imagesValid"
            append-icon="fad fa-arrow-right"
          >
            Next
          </v-btn>
          <v-btn
            v-if="step === 3"
            color="primary"
            @click="step++"
            :disabled="!contactValid"
            append-icon="fad fa-arrow-right"
          >
            Review
          </v-btn>
          <v-btn
            v-if="step === 4"
            color="primary"
            :loading="loading"
            @click="sendNewInfo()"
            prepend-icon="fad fa-paper-plane"
          >
            Submit
          </v-btn>
        </div>
      </v-row>

      <!-- Error alert -->
      <v-alert
        v-if="hasError"
        type="error"
        class="mx-5 mb-3"
        closable
        @click:close="
          hasError = false;
          errorMessage = '';
        "
      >
        {{ errorMessage || 'An error occurred. Please try again.' }}
      </v-alert>

      <!-- Progress indicator -->
      <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-0"></v-progress-linear>
    </template>
  </v-stepper>
</template>

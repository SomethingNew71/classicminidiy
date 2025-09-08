<script lang="ts" setup>
  import type { Color, PrettyColor } from '../../../../data/models/colors';
  import { HERO_TYPES } from '../../../../data/models/generic';

  const { query } = useRoute();
  const { data: color, status } = await useFetch<PrettyColor | null>(`/api/colors/single`, {
    query: {
      id: query.color,
    },
    // Only fetch if we have a color ID
    server: !!query.color,
    default: () => null,
  });

  watch(color, (newColor: PrettyColor | null) => {
    if (newColor) {
      formData.code = newColor.pretty.Code || '';
      formData.ditzlerPpgCode = newColor.pretty['Ditzler PPG Code'] || '';
      formData.duluxCode = newColor.pretty['Dulux Code'] || '';
      formData.name = newColor.pretty.Name || '';
      formData.shortCode = newColor.pretty['Short Code'] || '';
      formData.years = newColor.pretty.Years || '';
      formData.imageSwatch = newColor.raw.imageSwatch || '';
    }
  });

  const issueCreated = ref(false);
  const apiError = ref(false);
  const suggestion = ref<{
    number: number;
    url: string;
  }>({
    number: 0,
    url: '',
  });

  const apiMessage = ref('');
  const processing = ref(false);

  const formData = reactive({
    code: color.value?.pretty.Code || '',
    ditzlerPpgCode: color.value?.pretty['Ditzler PPG Code'] || '',
    duluxCode: color.value?.pretty['Dulux Code'] || '',
    name: color.value?.pretty.Name || '',
    shortCode: color.value?.pretty['Short Code'] || '',
    years: color.value?.pretty.Years || '',
    imageSwatch: color.value?.raw.imageSwatch || '',
  });

  useHead({
    title: $t('title'),

    meta: [
      {
        name: 'description',
        content: $t('description'),
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/colors/contribute',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
  });

  interface GitHubIssueResponse {
    number: number;
    html_url: string;
  }

  interface SubmitPayload {
    color: Color;
    newDetails: {
      code: string;
      ditzlerPpgCode: string;
      duluxCode: string;
      name: string;
      shortCode: string;
      years: string;
      imageSwatch: string;
    };
  }

  async function submit() {
    if (!color.value) {
      apiError.value = true;
      apiMessage.value = $t('form.error.color_not_loaded');
      return;
    }

    processing.value = true;
    try {
      const payload: SubmitPayload = {
        color: color.value.raw,
        newDetails: {
          code: formData.code,
          ditzlerPpgCode: formData.ditzlerPpgCode,
          duluxCode: formData.duluxCode,
          name: formData.name,
          shortCode: formData.shortCode,
          years: formData.years,
          imageSwatch: formData.imageSwatch,
        },
      };

      const { data: response } = await useFetch<GitHubIssueResponse>('/api/colors/contribute', {
        method: 'POST',
        body: payload,
      });

      if (response.value) {
        issueCreated.value = true;
        apiError.value = false;
        suggestion.value = {
          number: response.value.number,
          url: response.value.html_url,
        };
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      issueCreated.value = false;
      apiError.value = true;
      apiMessage.value = $t('form.error.github_unavailable');
      console.error('Error submitting color contribution:', error);
    } finally {
      processing.value = false;
    }
  }
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />

  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <breadcrumb :page="$t('breadcrumb_title')" />
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">{{ $t('main_heading') }}</h1>
      <p class="mb-6 text-base">
        {{ $t('description_text') }}
      </p>
      <div class="divider"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Current Data Card -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <div class="card-title bg-gray-200 p-4">
              <i class="fas fa-list-timeline mr-2"></i>
              <h2 class="text-lg font-semibold">
                {{ $t('current_data.title') }}
              </h2>
            </div>

            <div v-if="status === 'pending'" class="flex justify-center p-8">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else-if="status === 'success' && color" class="p-4">
              <div class="flex justify-center mb-4">
                <picture v-if="color.pretty.hasSwatch" class="block w-full max-w-xs">
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.pretty.Code}.webp`"
                    type="image/webp"
                  />
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.pretty.Code}.jpg`"
                    type="image/jpg"
                  />
                  <img
                    loading="lazy"
                    alt="Color swatch"
                    :src="`https://classicminidiy.s3.amazonaws.com/colors/${color?.pretty?.Code}.jpg`"
                    class="w-full h-auto rounded-lg shadow"
                  />
                </picture>
                <div v-else class="flex items-center justify-center py-8">
                  <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-3xl text-primary mb-2"></i>
                    <p class="text-sm text-gray-600">
                      {{ $t('current_data.loading') }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div v-if="color?.pretty">
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.primary_color')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Primary Color'] }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{ $t('current_data.labels.code') }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Code }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.ditzler_ppg_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Ditzler PPG Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.dulux_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Dulux Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{ $t('current_data.labels.name') }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Name || $t('current_data.na') }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.short_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Short Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.years_used')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Years || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <!-- Success Message -->
            <div v-if="issueCreated" class="p-6 text-center">
              <div class="mb-4">
                <i class="fas fa-check-circle text-6xl text-success"></i>
              </div>
              <h1 class="text-2xl font-bold mb-2">
                {{ $t('form.success.title') }}
              </h1>
              <h2 class="text-xl mb-6">{{ $t('form.success.subtitle') }}</h2>
              <div class="space-y-4 text-left max-w-md mx-auto">
                <div class="bg-base-200 p-4 rounded-lg">
                  <p class="font-medium">{{ $t('form.success.suggestion_number') }}{{ suggestion.number }}</p>
                  <p class="text-sm text-gray-600">
                    {{ $t('form.success.track_text') }}
                    <a :href="suggestion.url" target="_blank" class="link link-primary">
                      {{ $t('form.success.view_github') }}
                    </a>
                  </p>
                </div>
                <button @click="issueCreated = false" class="btn btn-primary w-full">
                  {{ $t('form.success.make_another') }}
                </button>
              </div>
            </div>

            <!-- Form -->
            <div v-else>
              <div class="card-title bg-primary text-primary-content p-4">
                <i class="fas fa-sparkles mr-2"></i>
                <h2 class="text-lg font-semibold">{{ $t('form.title') }}</h2>
              </div>

              <div class="p-6">
                <!-- Error Alert -->
                <div v-if="apiError" class="alert alert-warning mb-6">
                  <i class="fas fa-exclamation-triangle mr-2"></i>
                  <div>
                    <h3 class="font-bold">{{ $t('form.error.title') }}</h3>
                    <div class="text-xs">
                      {{ apiMessage || $t('form.error.default_message') }}
                    </div>
                  </div>
                </div>

                <!-- Form Fields -->
                <form @submit.prevent="submit" class="space-y-4">
                  <div class="form-control">
                    <label class="label" for="colorName">
                      <span class="label-text">{{ $t('form.fields.color_name.label') }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="colorName"
                        type="text"
                        v-model="formData.name"
                        :placeholder="$t('form.fields.color_name.placeholder')"
                        class="input input-bordered w-full pl-10"
                        maxlength="30"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="primaryCode">
                        <span class="label-text">{{ $t('form.fields.primary_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="code"
                          v-model="formData.code"
                          type="text"
                          :placeholder="$t('form.fields.primary_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="shortCode">
                        <span class="label-text">{{ $t('form.fields.short_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="shortCode"
                          v-model="formData.shortCode"
                          type="text"
                          :placeholder="$t('form.fields.short_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="ditzlerPpgCode">
                        <span class="label-text">{{ $t('form.fields.ditzler_ppg_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="ditzlerPpgCode"
                          v-model="formData.ditzlerPpgCode"
                          type="text"
                          :placeholder="$t('form.fields.ditzler_ppg_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="duluxCode">
                        <span class="label-text">{{ $t('form.fields.dulux_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="duluxCode"
                          v-model="formData.duluxCode"
                          type="text"
                          :placeholder="$t('form.fields.dulux_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="years">
                      <span class="label-text">{{ $t('form.fields.years_used.label') }}</span>
                    </label>
                    <div class="relative">
                      <i
                        class="fas fa-calendar-days absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      ></i>
                      <input
                        id="years"
                        v-model="formData.years"
                        type="text"
                        :placeholder="$t('form.fields.years_used.placeholder')"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="imageSwatch">
                      <span class="label-text">{{ $t('form.fields.image_swatch.label') }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="imageSwatch"
                        v-model="formData.imageSwatch"
                        type="text"
                        :placeholder="$t('form.fields.image_swatch.placeholder')"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                    <label class="label">
                      <span class="label-text-alt">{{ $t('form.fields.image_swatch.help') }}</span>
                    </label>
                  </div>

                  <div class="pt-4">
                    <button type="submit" class="btn btn-primary w-full" :disabled="processing">
                      <span v-if="processing" class="loading loading-spinner"></span>
                      {{ processing ? $t('form.submit.submitting') : $t('form.submit.button') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .filler-image {
    img,
    source {
      max-width: 200px;
      max-height: 200px;
    }
  }

  .badge-soft {
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.7);
  }
</style>

<i18n lang="json">
{
  "en": {
    "title": "Classic Mini Archive - Contribute Color",
    "description": "Contribute a new color to the Classic Mini color archive",
    "hero_title": "Classic Mini Archives",
    "breadcrumb_title": "Contribute Color",
    "breadcrumb": {
      "home": "Home",
      "archive": "Archive",
      "colors": "Colors",
      "contribute": "Contribute"
    },
    "main_heading": "Contribute Color",
    "description_text": "Help us expand the Classic Mini color archive by contributing a new color. Please provide as much detail as possible to help other enthusiasts.",
    "form": {
      "color_name": "Color Name",
      "color_code": "Color Code",
      "year_range": "Year Range",
      "manufacturer": "Manufacturer",
      "hex_color": "Hex Color",
      "description": "Description",
      "source": "Source",
      "submit": "Submit Color",
      "cancel": "Cancel"
    },
    "validation": {
      "color_name_required": "Color name is required",
      "color_code_required": "Color code is required",
      "year_range_required": "Year range is required",
      "hex_color_required": "Hex color is required",
      "hex_color_invalid": "Please enter a valid hex color (e.g., #FF0000)"
    },
    "messages": {
      "success": "Color submitted successfully! Thank you for your contribution.",
      "error": "There was an error submitting your color. Please try again."
    },
    "seo": {
      "og_title": "Classic Mini Archive - Contribute Color",
      "og_description": "Contribute a new color to the Classic Mini color archive",
      "twitter_title": "Classic Mini Archive - Contribute Color",
      "twitter_description": "Contribute a new color to the Classic Mini color archive"
    }
  },
  "de": {
    "title": "Classic Mini Archiv - Farbe Beitragen",
    "description": "Tragen Sie eine neue Farbe zum Classic Mini Farbarchiv bei",
    "hero_title": "Classic Mini Archive",
    "breadcrumb_title": "Farbe Beitragen",
    "breadcrumb": {
      "home": "Startseite",
      "archive": "Archiv",
      "colors": "Farben",
      "contribute": "Beitragen"
    },
    "main_heading": "Farbe Beitragen",
    "description_text": "Helfen Sie uns, das Classic Mini Farbarchiv zu erweitern, indem Sie eine neue Farbe beitragen. Bitte geben Sie so viele Details wie möglich an, um anderen Enthusiasten zu helfen.",
    "form": {
      "color_name": "Farbname",
      "color_code": "Farbcode",
      "year_range": "Jahresbereich",
      "manufacturer": "Hersteller",
      "hex_color": "Hex-Farbe",
      "description": "Beschreibung",
      "source": "Quelle",
      "submit": "Farbe Einreichen",
      "cancel": "Abbrechen"
    },
    "validation": {
      "color_name_required": "Farbname ist erforderlich",
      "color_code_required": "Farbcode ist erforderlich",
      "year_range_required": "Jahresbereich ist erforderlich",
      "hex_color_required": "Hex-Farbe ist erforderlich",
      "hex_color_invalid": "Bitte geben Sie eine gültige Hex-Farbe ein (z.B. #FF0000)"
    },
    "messages": {
      "success": "Farbe erfolgreich eingereicht! Vielen Dank für Ihren Beitrag.",
      "error": "Es gab einen Fehler beim Einreichen Ihrer Farbe. Bitte versuchen Sie es erneut."
    },
    "seo": {
      "og_title": "Classic Mini Archiv - Farbe Beitragen",
      "og_description": "Tragen Sie eine neue Farbe zum Classic Mini Farbarchiv bei",
      "twitter_title": "Classic Mini Archiv - Farbe Beitragen",
      "twitter_description": "Tragen Sie eine neue Farbe zum Classic Mini Farbarchiv bei"
    }
  },
  "es": {
    "title": "Archivo Classic Mini - Contribuir Color",
    "description": "Contribuye con un nuevo color al archivo de colores Classic Mini",
    "hero_title": "Archivos Classic Mini",
    "breadcrumb_title": "Contribuir Color",
    "breadcrumb": {
      "home": "Inicio",
      "archive": "Archivo",
      "colors": "Colores",
      "contribute": "Contribuir"
    },
    "main_heading": "Contribuir Color",
    "description_text": "Ayúdanos a expandir el archivo de colores Classic Mini contribuyendo con un nuevo color. Por favor proporciona tantos detalles como sea posible para ayudar a otros entusiastas.",
    "form": {
      "color_name": "Nombre del Color",
      "color_code": "Código de Color",
      "year_range": "Rango de Años",
      "manufacturer": "Fabricante",
      "hex_color": "Color Hexadecimal",
      "description": "Descripción",
      "source": "Fuente",
      "submit": "Enviar Color",
      "cancel": "Cancelar"
    },
    "validation": {
      "color_name_required": "El nombre del color es requerido",
      "color_code_required": "El código de color es requerido",
      "year_range_required": "El rango de años es requerido",
      "hex_color_required": "El color hexadecimal es requerido",
      "hex_color_invalid": "Por favor ingresa un color hexadecimal válido (ej. #FF0000)"
    },
    "messages": {
      "success": "¡Color enviado exitosamente! Gracias por tu contribución.",
      "error": "Hubo un error al enviar tu color. Por favor intenta de nuevo."
    },
    "seo": {
      "og_title": "Archivo Classic Mini - Contribuir Color",
      "og_description": "Contribuye con un nuevo color al archivo de colores Classic Mini",
      "twitter_title": "Archivo Classic Mini - Contribuir Color",
      "twitter_description": "Contribuye con un nuevo color al archivo de colores Classic Mini"
    }
  },
  "fr": {
    "title": "Archives Classic Mini - Contribuer Couleur",
    "description": "Contribuez avec une nouvelle couleur aux archives de couleurs Classic Mini",
    "hero_title": "Archives Classic Mini",
    "breadcrumb_title": "Contribuer Couleur",
    "breadcrumb": {
      "home": "Accueil",
      "archive": "Archive",
      "colors": "Couleurs",
      "contribute": "Contribuer"
    },
    "main_heading": "Contribuer Couleur",
    "description_text": "Aidez-nous à élargir les archives de couleurs Classic Mini en contribuant une nouvelle couleur. Veuillez fournir autant de détails que possible pour aider d'autres passionnés.",
    "form": {
      "color_name": "Nom de la Couleur",
      "color_code": "Code Couleur",
      "year_range": "Plage d'Années",
      "manufacturer": "Fabricant",
      "hex_color": "Couleur Hexadécimale",
      "description": "Description",
      "source": "Source",
      "submit": "Soumettre la Couleur",
      "cancel": "Annuler"
    },
    "validation": {
      "color_name_required": "Le nom de la couleur est requis",
      "color_code_required": "Le code couleur est requis",
      "year_range_required": "La plage d'années est requise",
      "hex_color_required": "La couleur hexadécimale est requise",
      "hex_color_invalid": "Veuillez entrer une couleur hexadécimale valide (ex. #FF0000)"
    },
    "messages": {
      "success": "Couleur soumise avec succès ! Merci pour votre contribution.",
      "error": "Il y a eu une erreur lors de la soumission de votre couleur. Veuillez réessayer."
    },
    "seo": {
      "og_title": "Archives Classic Mini - Contribuer Couleur",
      "og_description": "Contribuez avec une nouvelle couleur aux archives de couleurs Classic Mini",
      "twitter_title": "Archives Classic Mini - Contribuer Couleur",
      "twitter_description": "Contribuez avec une nouvelle couleur aux archives de couleurs Classic Mini"
    }
  },
  "it": {
    "title": "Archivio Classic Mini - Contribuisci Colore",
    "description": "Contribuisci con un nuovo colore all'archivio colori Classic Mini",
    "hero_title": "Archivi Classic Mini",
    "breadcrumb_title": "Contribuisci Colore",
    "breadcrumb": {
      "home": "Home",
      "archive": "Archivio",
      "colors": "Colori",
      "contribute": "Contribuisci"
    },
    "main_heading": "Contribuisci Colore",
    "description_text": "Aiutaci ad espandere l'archivio colori Classic Mini contribuendo con un nuovo colore. Fornisci quanti più dettagli possibili per aiutare altri appassionati.",
    "form": {
      "color_name": "Nome Colore",
      "color_code": "Codice Colore",
      "year_range": "Intervallo Anni",
      "manufacturer": "Produttore",
      "hex_color": "Colore Esadecimale",
      "description": "Descrizione",
      "source": "Fonte",
      "submit": "Invia Colore",
      "cancel": "Annulla"
    },
    "validation": {
      "color_name_required": "Il nome del colore è richiesto",
      "color_code_required": "Il codice colore è richiesto",
      "year_range_required": "L'intervallo anni è richiesto",
      "hex_color_required": "Il colore esadecimale è richiesto",
      "hex_color_invalid": "Inserisci un colore esadecimale valido (es. #FF0000)"
    },
    "messages": {
      "success": "Colore inviato con successo! Grazie per il tuo contributo.",
      "error": "C'è stato un errore nell'invio del tuo colore. Riprova."
    },
    "seo": {
      "og_title": "Archivio Classic Mini - Contribuisci Colore",
      "og_description": "Contribuisci con un nuovo colore all'archivio colori Classic Mini",
      "twitter_title": "Archivio Classic Mini - Contribuisci Colore",
      "twitter_description": "Contribuisci con un nuovo colore all'archivio colori Classic Mini"
    }
  },
  "pt": {
    "title": "Arquivo Classic Mini - Contribuir Cor",
    "description": "Contribua com uma nova cor para o arquivo de cores Classic Mini",
    "hero_title": "Arquivos Classic Mini",
    "breadcrumb_title": "Contribuir Cor",
    "breadcrumb": {
      "home": "Início",
      "archive": "Arquivo",
      "colors": "Cores",
      "contribute": "Contribuir"
    },
    "main_heading": "Contribuir Cor",
    "description_text": "Ajude-nos a expandir o arquivo de cores Classic Mini contribuindo com uma nova cor. Forneça o máximo de detalhes possível para ajudar outros entusiastas.",
    "form": {
      "color_name": "Nome da Cor",
      "color_code": "Código da Cor",
      "year_range": "Faixa de Anos",
      "manufacturer": "Fabricante",
      "hex_color": "Cor Hexadecimal",
      "description": "Descrição",
      "source": "Fonte",
      "submit": "Enviar Cor",
      "cancel": "Cancelar"
    },
    "validation": {
      "color_name_required": "O nome da cor é obrigatório",
      "color_code_required": "O código da cor é obrigatório",
      "year_range_required": "A faixa de anos é obrigatória",
      "hex_color_required": "A cor hexadecimal é obrigatória",
      "hex_color_invalid": "Por favor insira uma cor hexadecimal válida (ex. #FF0000)"
    },
    "messages": {
      "success": "Cor enviada com sucesso! Obrigado pela sua contribuição.",
      "error": "Houve um erro ao enviar sua cor. Tente novamente."
    },
    "seo": {
      "og_title": "Arquivo Classic Mini - Contribuir Cor",
      "og_description": "Contribua com uma nova cor para o arquivo de cores Classic Mini",
      "twitter_title": "Arquivo Classic Mini - Contribuir Cor",
      "twitter_description": "Contribua com uma nova cor para o arquivo de cores Classic Mini"
    }
  },
  "nl": {
    "title": "Classic Mini Archief - Kleur Bijdragen",
    "description": "Draag een nieuwe kleur bij aan het Classic Mini kleurenarchief",
    "hero_title": "Classic Mini Archieven",
    "breadcrumb_title": "Kleur Bijdragen",
    "breadcrumb": {
      "home": "Home",
      "archive": "Archief",
      "colors": "Kleuren",
      "contribute": "Bijdragen"
    },
    "main_heading": "Kleur Bijdragen",
    "description_text": "Help ons het Classic Mini kleurenarchief uit te breiden door een nieuwe kleur bij te dragen. Verstrek zoveel mogelijk details om andere liefhebbers te helpen.",
    "form": {
      "color_name": "Kleurnaam",
      "color_code": "Kleurcode",
      "year_range": "Jaarbereik",
      "manufacturer": "Fabrikant",
      "hex_color": "Hex Kleur",
      "description": "Beschrijving",
      "source": "Bron",
      "submit": "Kleur Indienen",
      "cancel": "Annuleren"
    },
    "validation": {
      "color_name_required": "Kleurnaam is vereist",
      "color_code_required": "Kleurcode is vereist",
      "year_range_required": "Jaarbereik is vereist",
      "hex_color_required": "Hex kleur is vereist",
      "hex_color_invalid": "Voer een geldige hex kleur in (bijv. #FF0000)"
    },
    "messages": {
      "success": "Kleur succesvol ingediend! Bedankt voor je bijdrage.",
      "error": "Er was een fout bij het indienen van je kleur. Probeer het opnieuw."
    },
    "seo": {
      "og_title": "Classic Mini Archief - Kleur Bijdragen",
      "og_description": "Draag een nieuwe kleur bij aan het Classic Mini kleurenarchief",
      "twitter_title": "Classic Mini Archief - Kleur Bijdragen",
      "twitter_description": "Draag een nieuwe kleur bij aan het Classic Mini kleurenarchief"
    }
  },
  "sv": {
    "title": "Classic Mini Arkiv - Bidra Färg",
    "description": "Bidra med en ny färg till Classic Mini färgarkivet",
    "hero_title": "Classic Mini Arkiv",
    "breadcrumb_title": "Bidra Färg",
    "breadcrumb": {
      "home": "Hem",
      "archive": "Arkiv",
      "colors": "Färger",
      "contribute": "Bidra"
    },
    "main_heading": "Bidra Färg",
    "description_text": "Hjälp oss att utöka Classic Mini färgarkivet genom att bidra med en ny färg. Vänligen ge så mycket detaljer som möjligt för att hjälpa andra entusiaster.",
    "form": {
      "color_name": "Färgnamn",
      "color_code": "Färgkod",
      "year_range": "Årsintervall",
      "manufacturer": "Tillverkare",
      "hex_color": "Hex Färg",
      "description": "Beskrivning",
      "source": "Källa",
      "submit": "Skicka Färg",
      "cancel": "Avbryt"
    },
    "validation": {
      "color_name_required": "Färgnamn krävs",
      "color_code_required": "Färgkod krävs",
      "year_range_required": "Årsintervall krävs",
      "hex_color_required": "Hex färg krävs",
      "hex_color_invalid": "Vänligen ange en giltig hex färg (t.ex. #FF0000)"
    },
    "messages": {
      "success": "Färg skickad framgångsrikt! Tack för ditt bidrag.",
      "error": "Det uppstod ett fel när din färg skickades. Försök igen."
    },
    "seo": {
      "og_title": "Classic Mini Arkiv - Bidra Färg",
      "og_description": "Bidra med en ny färg till Classic Mini färgarkivet",
      "twitter_title": "Classic Mini Arkiv - Bidra Färg",
      "twitter_description": "Bidra med en ny färg till Classic Mini färgarkivet"
    }
  },
  "da": {
    "title": "Classic Mini Arkiv - Bidrag Farve",
    "description": "Bidrag med en ny farve til Classic Mini farvearkivet",
    "hero_title": "Classic Mini Arkiver",
    "breadcrumb_title": "Bidrag Farve",
    "breadcrumb": {
      "home": "Hjem",
      "archive": "Arkiv",
      "colors": "Farver",
      "contribute": "Bidrag"
    },
    "main_heading": "Bidrag Farve",
    "description_text": "Hjælp os med at udvide Classic Mini farvearkivet ved at bidrage med en ny farve. Venligst giv så mange detaljer som muligt for at hjælpe andre entusiaster.",
    "form": {
      "color_name": "Farvenavn",
      "color_code": "Farvekode",
      "year_range": "Årsinterval",
      "manufacturer": "Producent",
      "hex_color": "Hex Farve",
      "description": "Beskrivelse",
      "source": "Kilde",
      "submit": "Indsend Farve",
      "cancel": "Annuller"
    },
    "validation": {
      "color_name_required": "Farvenavn er påkrævet",
      "color_code_required": "Farvekode er påkrævet",
      "year_range_required": "Årsinterval er påkrævet",
      "hex_color_required": "Hex farve er påkrævet",
      "hex_color_invalid": "Venligst indtast en gyldig hex farve (f.eks. #FF0000)"
    },
    "messages": {
      "success": "Farve indsendt med succes! Tak for dit bidrag.",
      "error": "Der opstod en fejl ved indsendelse af din farve. Prøv igen."
    },
    "seo": {
      "og_title": "Classic Mini Arkiv - Bidrag Farve",
      "og_description": "Bidrag med en ny farve til Classic Mini farvearkivet",
      "twitter_title": "Classic Mini Arkiv - Bidrag Farve",
      "twitter_description": "Bidrag med en ny farve til Classic Mini farvearkivet"
    }
  },
  "no": {
    "title": "Classic Mini Arkiv - Bidra Farge",
    "description": "Bidra med en ny farge til Classic Mini fargearkivet",
    "hero_title": "Classic Mini Arkiver",
    "breadcrumb_title": "Bidra Farge",
    "breadcrumb": {
      "home": "Hjem",
      "archive": "Arkiv",
      "colors": "Farger",
      "contribute": "Bidra"
    },
    "main_heading": "Bidra Farge",
    "description_text": "Hjelp oss å utvide Classic Mini fargearkivet ved å bidra med en ny farge. Vennligst gi så mange detaljer som mulig for å hjelpe andre entusiaster.",
    "form": {
      "color_name": "Fargenavn",
      "color_code": "Fargekode",
      "year_range": "Årsperiode",
      "manufacturer": "Produsent",
      "hex_color": "Hex Farge",
      "description": "Beskrivelse",
      "source": "Kilde",
      "submit": "Send inn Farge",
      "cancel": "Avbryt"
    },
    "validation": {
      "color_name_required": "Fargenavn er påkrevd",
      "color_code_required": "Fargekode er påkrevd",
      "year_range_required": "Årsperiode er påkrevd",
      "hex_color_required": "Hex farge er påkrevd",
      "hex_color_invalid": "Vennligst skriv inn en gyldig hex farge (f.eks. #FF0000)"
    },
    "messages": {
      "success": "Farge sendt inn med suksess! Takk for ditt bidrag.",
      "error": "Det oppstod en feil ved innsending av fargen din. Prøv igjen."
    },
    "seo": {
      "og_title": "Classic Mini Arkiv - Bidra Farge",
      "og_description": "Bidra med en ny farge til Classic Mini fargearkivet",
      "twitter_title": "Classic Mini Arkiv - Bidra Farge",
      "twitter_description": "Bidra med en ny farge til Classic Mini fargearkivet"
    }
  }
}
</i18n>

<script lang="ts" setup>
  import type { Color, ColorQueueItem, ColorQueueSubmissionResponse } from '../../data/models/colors';

  const { t } = useI18n({
    useScope: 'local',
  });

  interface TouchedFields {
    submittedBy: boolean;
    submittedByEmail: boolean;
    name: boolean;
    [key: string]: boolean;
  }

  interface DuplicateCheckResponse {
    hasDuplicates: boolean;
    matches: Color[];
  }

  const touchedFields = ref<TouchedFields>({
    submittedBy: false,
    submittedByEmail: false,
    name: false,
  });

  const validationRules = () => ({
    required: (value: string) => !!value || t('validation.required'),
    email: (value: string) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || t('validation.invalid_email');
    },
  });

  const rules = ref(validationRules());

  const initialDetails: Partial<ColorQueueItem> = {
    name: '',
    code: '',
    shortCode: '',
    ditzlerPpgCode: '',
    duluxCode: '',
    years: '',
    primaryColor: '',
    submittedBy: '',
    submittedByEmail: '',
  };

  const details = ref({ ...initialDetails });
  const submissionSuccess = ref(false);
  const apiError = ref(false);
  const apiMessage = ref('');
  const submissionId = ref('');
  const processing = ref(false);

  // Duplicate detection state
  const duplicateMatches = ref<Color[]>([]);
  const showDuplicateWarning = ref(false);
  const checkingDuplicates = ref(false);
  const confirmedNoDuplicate = ref(false);

  function validateForm() {
    const requiredFields = [
      details.value.submittedBy,
      details.value.submittedByEmail && rules.value.email(details.value.submittedByEmail) === true,
      details.value.name,
    ];

    return requiredFields.every((field) => !!field);
  }

  // Check for duplicate colors
  async function checkForDuplicates(): Promise<boolean> {
    if (!details.value.name) return false;

    checkingDuplicates.value = true;
    try {
      const { data } = await useFetch<DuplicateCheckResponse>('/api/colors/queue/check-duplicate', {
        method: 'POST',
        body: {
          name: details.value.name,
          code: details.value.code,
        },
      });

      if (data.value?.hasDuplicates) {
        duplicateMatches.value = data.value.matches;
        showDuplicateWarning.value = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking duplicates:', error);
      return false;
    } finally {
      checkingDuplicates.value = false;
    }
  }

  async function submit() {
    // Mark all fields as touched when submitting
    Object.keys(touchedFields.value).forEach((key: string) => {
      touchedFields.value[key] = true;
    });

    if (!validateForm()) {
      return;
    }

    // Check for duplicates first (unless user has confirmed)
    if (!confirmedNoDuplicate.value) {
      const hasDuplicates = await checkForDuplicates();
      if (hasDuplicates) {
        return; // Show duplicate warning, don't submit yet
      }
    }

    processing.value = true;
    try {
      const colorDetails: Partial<ColorQueueItem> = {
        ...details.value,
        hasSwatch: false,
      };

      const { data } = await useFetch<ColorQueueSubmissionResponse>('/api/colors/queue/submit', {
        method: 'POST',
        body: { details: colorDetails },
      });

      if (data.value?.uuid) {
        submissionSuccess.value = true;
        submissionId.value = data.value.uuid;
        resetForm();
      }
    } catch (error) {
      submissionSuccess.value = false;
      apiError.value = true;
      console.error(error);
      apiMessage.value = t('error.api_unavailable');
    } finally {
      processing.value = false;
    }
  }

  function proceedWithSubmission() {
    confirmedNoDuplicate.value = true;
    showDuplicateWarning.value = false;
    submit();
  }

  function cancelDuplicateSubmission() {
    showDuplicateWarning.value = false;
    duplicateMatches.value = [];
  }

  function editExistingColor(colorId: string) {
    showDuplicateWarning.value = false;
    navigateTo(`/archive/colors/contribute?color=${colorId}`);
  }

  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timeout);
      // @ts-ignore
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedSubmit = debounce(submit, 300);

  function resetForm() {
    details.value = { ...initialDetails };
    confirmedNoDuplicate.value = false;
    duplicateMatches.value = [];
    // Reset touched state when form is reset
    Object.keys(touchedFields.value).forEach((key: string) => {
      touchedFields.value[key] = false;
    });
  }

  function submitAnotherColor() {
    submissionSuccess.value = false;
    apiError.value = false;
    submissionId.value = '';
  }
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ t('title') }}</h2>

      <!-- Success State -->
      <div v-if="!processing && submissionSuccess && !apiError">
        <div class="text-center py-5">
          <i class="text-4xl text-success fa-duotone fa-box-check fa-beat py-5"></i>
          <h1 class="text-2xl font-bold mb-1">{{ t('success.thank_you') }}</h1>
          <h2 class="text-lg mb-4">
            {{ t('success.submitted_message') }}
          </h2>
          <div class="bg-base-200 p-4 rounded-lg mb-5 max-w-md mx-auto">
            <p class="font-medium">{{ t('success.submission_id') }} {{ submissionId }}</p>
            <p class="text-sm text-gray-600">{{ t('success.pending_review') }}</p>
          </div>
          <button class="btn btn-primary" @click="submitAnotherColor()">
            <i class="fa-duotone fa-solid fa-plus-large mr-2"></i>
            {{ t('success.submit_another') }}
          </button>
        </div>
      </div>

      <!-- Duplicate Warning Modal -->
      <dialog :class="['modal', { 'modal-open': showDuplicateWarning }]">
        <div class="modal-box max-w-2xl">
          <h3 class="font-bold text-lg flex items-center gap-2">
            <i class="fas fa-exclamation-triangle text-warning"></i>
            {{ t('duplicate.title') }}
          </h3>
          <p class="py-4">{{ t('duplicate.message') }}</p>

          <div class="space-y-3 max-h-60 overflow-y-auto">
            <div
              v-for="match in duplicateMatches"
              :key="match.id"
              class="bg-base-200 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p class="font-medium">{{ match.name }}</p>
                <p class="text-sm text-gray-600">
                  {{ t('duplicate.code') }}: {{ match.code }}
                  <span v-if="match.shortCode"> | {{ t('duplicate.short_code') }}: {{ match.shortCode }}</span>
                </p>
              </div>
              <button class="btn btn-sm btn-info" @click="editExistingColor(match.id)">
                <i class="fas fa-edit mr-1"></i>
                {{ t('duplicate.edit_existing') }}
              </button>
            </div>
          </div>

          <div class="modal-action">
            <button class="btn" @click="cancelDuplicateSubmission">{{ t('duplicate.cancel') }}</button>
            <button class="btn btn-warning" @click="proceedWithSubmission">
              <i class="fas fa-plus mr-2"></i>
              {{ t('duplicate.submit_anyway') }}
            </button>
          </div>
        </div>
      </dialog>

      <!-- Form -->
      <div v-if="!submissionSuccess">
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <!-- Personal Info Section -->
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">{{ t('sections.personal_info') }}</h2>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.your_name') }} <span class="text-error">*</span></span>
                <span class="label-text-alt"><i class="fad fa-user"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.name')"
                v-model="details.submittedBy"
                class="input input-bordered w-full"
                :class="{ 'input-error': details.submittedBy === '' && touchedFields.submittedBy }"
                required
                @blur="touchedFields.submittedBy = true"
              />
              <label v-if="details.submittedBy === '' && touchedFields.submittedBy" class="label">
                <span class="label-text-alt text-error">{{ t('validation.required') }}</span>
              </label>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.your_email') }} <span class="text-error">*</span></span>
                <span class="label-text-alt"><i class="fad fa-at"></i></span>
              </label>
              <input
                type="email"
                :placeholder="t('placeholders.email')"
                v-model="details.submittedByEmail"
                class="input input-bordered w-full"
                :class="{
                  'input-error':
                    (details.submittedByEmail === '' || rules.email(details.submittedByEmail) !== true) &&
                    touchedFields.submittedByEmail,
                }"
                required
                @blur="touchedFields.submittedByEmail = true"
              />
              <label
                v-if="
                  (details.submittedByEmail === '' || rules.email(details.submittedByEmail) !== true) &&
                  touchedFields.submittedByEmail
                "
                class="label"
              >
                <span class="label-text-alt text-error">
                  {{ details.submittedByEmail === '' ? t('validation.required') : t('validation.invalid_email') }}
                </span>
              </label>
            </div>

            <!-- Color Details Section -->
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">{{ t('sections.color_details') }}</h2>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.color_name') }} <span class="text-error">*</span></span>
                <span class="label-text-alt"><i class="fad fa-palette"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.color_name')"
                v-model="details.name"
                class="input input-bordered w-full"
                :class="{ 'input-error': details.name === '' && touchedFields.name }"
                required
                @blur="touchedFields.name = true"
              />
              <label v-if="details.name === '' && touchedFields.name" class="label">
                <span class="label-text-alt text-error">{{ t('validation.required') }}</span>
              </label>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.bmc_code') }}</span>
                <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.bmc_code')"
                v-model="details.code"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.short_code') }}</span>
                <span class="label-text-alt"><i class="fad fa-tag"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.short_code')"
                v-model="details.shortCode"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.ditzler_ppg_code') }}</span>
                <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.ditzler_ppg_code')"
                v-model="details.ditzlerPpgCode"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.dulux_code') }}</span>
                <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.dulux_code')"
                v-model="details.duluxCode"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('form_labels.years_used') }}</span>
                <span class="label-text-alt"><i class="fad fa-calendar"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('placeholders.years_used')"
                v-model="details.years"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="mt-6">
            <div v-if="apiError" class="alert alert-error mb-4">
              <i class="fa-duotone fa-circle-exclamation"></i>
              <div>
                <h3 class="font-bold">{{ t('error.title') }}</h3>
                <div class="text-sm">
                  {{ apiMessage || t('error.message') }}
                </div>
              </div>
              <button class="btn btn-sm" @click="apiError = false">
                {{ t('error.dismiss') }}
              </button>
            </div>

            <button
              class="btn btn-primary btn-lg"
              :class="{ 'btn-disabled': !validateForm() }"
              :disabled="processing || checkingDuplicates"
              @click="debouncedSubmit()"
            >
              <i class="fad fa-paper-plane mr-2" v-if="!processing && !checkingDuplicates"></i>
              <span class="loading loading-spinner" v-if="processing || checkingDuplicates"></span>
              {{ checkingDuplicates ? t('checking_duplicates') : t('submit_button') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Submit a New Color",
    "success": {
      "thank_you": "Thank you!",
      "submitted_message": "Your color submission has been received. Please allow 1-2 days for review.",
      "submission_id": "Submission ID:",
      "pending_review": "Your submission is pending review by an administrator. Once approved, it will appear in the color database.",
      "submit_another": "Submit Another Color"
    },
    "validation": {
      "required": "This field is required",
      "invalid_email": "Invalid email address"
    },
    "sections": {
      "personal_info": "Your Information",
      "color_details": "Color Details"
    },
    "form_labels": {
      "your_name": "Your Name",
      "your_email": "Your Email",
      "color_name": "Color Name",
      "bmc_code": "BMC Code",
      "short_code": "Short Code",
      "ditzler_ppg_code": "Ditzler/PPG Code",
      "dulux_code": "Dulux Code",
      "years_used": "Years Used"
    },
    "placeholders": {
      "name": "e.g. John Smith",
      "email": "e.g. john{'@'}example.com",
      "color_name": "e.g. Clipper Blue",
      "bmc_code": "e.g. GR29",
      "short_code": "e.g. BLVC47",
      "ditzler_ppg_code": "e.g. 2706",
      "dulux_code": "e.g. 23-3632",
      "years_used": "e.g. 1959-1967"
    },
    "duplicate": {
      "title": "Possible Duplicate Found",
      "message": "We found one or more existing colors that may match your submission. Please review the matches below and either edit the existing color or confirm your submission is a new color.",
      "code": "Code",
      "short_code": "Short Code",
      "edit_existing": "Edit This",
      "cancel": "Cancel",
      "submit_anyway": "Submit as New Color"
    },
    "error": {
      "title": "Submission Error",
      "message": "There was a problem submitting your color. Please try again later.",
      "dismiss": "Dismiss",
      "api_unavailable": "API is currently unavailable. Please try again later."
    },
    "checking_duplicates": "Checking for duplicates...",
    "submit_button": "Submit Color"
  },
  "de": {
    "title": "Eine neue Farbe einreichen",
    "success": {
      "thank_you": "Vielen Dank!",
      "submitted_message": "Ihre Farbeinreichung wurde erhalten. Bitte rechnen Sie mit 1-2 Tagen für die Überprüfung.",
      "submission_id": "Einreichungs-ID:",
      "pending_review": "Ihre Einreichung wartet auf die Überprüfung durch einen Administrator. Nach der Genehmigung erscheint sie in der Farbdatenbank.",
      "submit_another": "Eine weitere Farbe einreichen"
    },
    "validation": {
      "required": "Dieses Feld ist erforderlich",
      "invalid_email": "Ungültige E-Mail-Adresse"
    },
    "sections": {
      "personal_info": "Ihre Informationen",
      "color_details": "Farbdetails"
    },
    "form_labels": {
      "your_name": "Ihr Name",
      "your_email": "Ihre E-Mail",
      "color_name": "Farbname",
      "bmc_code": "BMC-Code",
      "short_code": "Kurzcode",
      "ditzler_ppg_code": "Ditzler/PPG-Code",
      "dulux_code": "Dulux-Code",
      "years_used": "Verwendete Jahre"
    },
    "placeholders": {
      "name": "z.B. Max Mustermann",
      "email": "z.B. max{'@'}beispiel.de",
      "color_name": "z.B. Clipper Blau",
      "bmc_code": "z.B. GR29",
      "short_code": "z.B. BLVC47",
      "ditzler_ppg_code": "z.B. 2706",
      "dulux_code": "z.B. 23-3632",
      "years_used": "z.B. 1959-1967"
    },
    "duplicate": {
      "title": "Mögliches Duplikat gefunden",
      "message": "Wir haben eine oder mehrere vorhandene Farben gefunden, die Ihrer Einreichung entsprechen könnten. Überprüfen Sie bitte die Übereinstimmungen unten und bearbeiten Sie entweder die vorhandene Farbe oder bestätigen Sie, dass Ihre Einreichung eine neue Farbe ist.",
      "code": "Code",
      "short_code": "Kurzcode",
      "edit_existing": "Diese bearbeiten",
      "cancel": "Abbrechen",
      "submit_anyway": "Als neue Farbe einreichen"
    },
    "error": {
      "title": "Einreichungsfehler",
      "message": "Es gab ein Problem bei der Einreichung Ihrer Farbe. Bitte versuchen Sie es später erneut.",
      "dismiss": "Schließen",
      "api_unavailable": "API ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut."
    },
    "checking_duplicates": "Überprüfe auf Duplikate...",
    "submit_button": "Farbe einreichen"
  },
  "es": {
    "title": "Enviar un nuevo color",
    "success": {
      "thank_you": "¡Gracias!",
      "submitted_message": "Tu envío de color ha sido recibido. Por favor permite 1-2 días para la revisión.",
      "submission_id": "ID de envío:",
      "pending_review": "Tu envío está pendiente de revisión por un administrador. Una vez aprobado, aparecerá en la base de datos de colores.",
      "submit_another": "Enviar otro color"
    },
    "validation": {
      "required": "Este campo es obligatorio",
      "invalid_email": "Dirección de correo inválida"
    },
    "sections": {
      "personal_info": "Tu información",
      "color_details": "Detalles del color"
    },
    "form_labels": {
      "your_name": "Tu nombre",
      "your_email": "Tu correo",
      "color_name": "Nombre del color",
      "bmc_code": "Código BMC",
      "short_code": "Código corto",
      "ditzler_ppg_code": "Código Ditzler/PPG",
      "dulux_code": "Código Dulux",
      "years_used": "Años utilizados"
    },
    "placeholders": {
      "name": "ej. Juan Pérez",
      "email": "ej. juan{'@'}ejemplo.com",
      "color_name": "ej. Azul Clipper",
      "bmc_code": "ej. GR29",
      "short_code": "ej. BLVC47",
      "ditzler_ppg_code": "ej. 2706",
      "dulux_code": "ej. 23-3632",
      "years_used": "ej. 1959-1967"
    },
    "duplicate": {
      "title": "Posible duplicado encontrado",
      "message": "Encontramos uno o más colores existentes que pueden coincidir con tu envío. Por favor revisa las coincidencias a continuación y edita el color existente o confirma que tu envío es un nuevo color.",
      "code": "Código",
      "short_code": "Código corto",
      "edit_existing": "Editar este",
      "cancel": "Cancelar",
      "submit_anyway": "Enviar como nuevo color"
    },
    "error": {
      "title": "Error de envío",
      "message": "Hubo un problema al enviar tu color. Por favor intenta de nuevo más tarde.",
      "dismiss": "Descartar",
      "api_unavailable": "La API no está disponible actualmente. Por favor intenta de nuevo más tarde."
    },
    "checking_duplicates": "Verificando duplicados...",
    "submit_button": "Enviar color"
  },
  "fr": {
    "title": "Soumettre une nouvelle couleur",
    "success": {
      "thank_you": "Merci !",
      "submitted_message": "Votre soumission de couleur a été reçue. Veuillez prévoir 1-2 jours pour l'examen.",
      "submission_id": "ID de soumission :",
      "pending_review": "Votre soumission est en attente d'examen par un administrateur. Une fois approuvée, elle apparaîtra dans la base de données des couleurs.",
      "submit_another": "Soumettre une autre couleur"
    },
    "validation": {
      "required": "Ce champ est requis",
      "invalid_email": "Adresse e-mail invalide"
    },
    "sections": {
      "personal_info": "Vos informations",
      "color_details": "Détails de la couleur"
    },
    "form_labels": {
      "your_name": "Votre nom",
      "your_email": "Votre e-mail",
      "color_name": "Nom de la couleur",
      "bmc_code": "Code BMC",
      "short_code": "Code court",
      "ditzler_ppg_code": "Code Ditzler/PPG",
      "dulux_code": "Code Dulux",
      "years_used": "Années d'utilisation"
    },
    "placeholders": {
      "name": "ex. Jean Dupont",
      "email": "ex. jean{'@'}exemple.com",
      "color_name": "ex. Bleu Clipper",
      "bmc_code": "ex. GR29",
      "short_code": "ex. BLVC47",
      "ditzler_ppg_code": "ex. 2706",
      "dulux_code": "ex. 23-3632",
      "years_used": "ex. 1959-1967"
    },
    "duplicate": {
      "title": "Doublon possible trouvé",
      "message": "Nous avons trouvé une ou plusieurs couleurs existantes qui pourraient correspondre à votre soumission. Veuillez examiner les correspondances ci-dessous et soit modifier la couleur existante, soit confirmer que votre soumission est une nouvelle couleur.",
      "code": "Code",
      "short_code": "Code court",
      "edit_existing": "Modifier",
      "cancel": "Annuler",
      "submit_anyway": "Soumettre comme nouvelle couleur"
    },
    "error": {
      "title": "Erreur de soumission",
      "message": "Un problème est survenu lors de la soumission de votre couleur. Veuillez réessayer plus tard.",
      "dismiss": "Fermer",
      "api_unavailable": "L'API est actuellement indisponible. Veuillez réessayer plus tard."
    },
    "checking_duplicates": "Vérification des doublons...",
    "submit_button": "Soumettre la couleur"
  }
}
</i18n>

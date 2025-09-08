<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';
  import { RegistryItemStatus } from '../../../../data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: $t('table_headers.year'), key: 'year' },
    { title: $t('table_headers.model'), key: 'model' },
    { title: $t('table_headers.body_number'), key: 'bodyNum' },
    { title: $t('table_headers.submitted_by'), key: 'submittedBy' },
    { title: $t('table_headers.status'), key: 'status', width: '100px' },
  ];

  // Fetch pending registry items
  const { data: pendingItemsRaw, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  // Computed property to filter only pending items
  const pendingItems = computed(() => {
    if (!pendingItemsRaw.value) return [];
    return pendingItemsRaw.value.filter((item) => item.status === RegistryItemStatus.PENDING);
  });

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'classicminidiy.com/archive/registry/pending',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('breadcrumb_title')">
          <template #parent>
            <nuxt-link to="/archive/registry">{{ $t('breadcrumb_parent') }}</nuxt-link>
          </template>
        </breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">{{ $t('main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ pendingItems?.length || '0' }}</strong>
              {{ $t('subtitle') }}
            </h2>
            <p class="my-4">
              {{ $t('description_text') }}
            </p>
            <p class="my-4">
              {{ $t('contact_text') }}
              <a href="/contact" class="link link-primary">{{ $t('contact_link') }}</a
              >.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{{ $t('status_card.title') }}</h2>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-primary">
                    {{ $t('status_card.pending') }}
                  </div>
                  <span>{{ $t('status_card.pending_description') }}</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-success">
                    {{ $t('status_card.approved') }}
                  </div>
                  <span>{{ $t('status_card.approved_description') }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="badge badge-error">
                    {{ $t('status_card.rejected') }}
                  </div>
                  <span>{{ $t('status_card.rejected_description') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <RegistryTable
          :items="pendingItemsRaw || []"
          :loading="status === 'pending'"
          :tableHeaders="tableHeaders"
          :defaultPageSize="10"
        />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-15">
        <RegistrySubmission />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Pending Registry Submissions - Classic Mini DIY",
    "description": "Track the status of pending Classic Mini registry submissions",
    "hero_title": "Pending Registry Submissions",
    "breadcrumb_title": "Pending Submissions",
    "breadcrumb_parent": "Registry",
    "main_heading": "Pending Registry Submissions",
    "subtitle": "submissions pending review",
    "description_text": "Below you can see all pending registry submissions that are currently being reviewed. Submissions are typically processed within 7-14 days.",
    "contact_text": "If you have questions about your submission, please",
    "contact_link": "contact us",
    "table_headers": {
      "year": "Year",
      "model": "Model",
      "body_number": "Body Number",
      "submitted_by": "Submitted By",
      "status": "Status"
    },
    "status_card": {
      "title": "Submission Status Guide",
      "pending": "Pending",
      "pending_description": "Under review",
      "approved": "Approved",
      "approved_description": "Added to registry",
      "rejected": "Rejected",
      "rejected_description": "Needs correction"
    },
    "submit_divider": "Submit Your Mini",
    "seo": {
      "og_title": "Pending Registry Submissions - Classic Mini DIY",
      "og_description": "Track the status of pending Classic Mini registry submissions",
      "twitter_title": "Pending Registry Submissions - Classic Mini DIY",
      "twitter_description": "Track the status of pending Classic Mini registry submissions"
    }
  },
  "de": {
    "title": "Ausstehende Registry-Einreichungen - Classic Mini DIY",
    "description": "Verfolgen Sie den Status ausstehender Classic Mini Registry-Einreichungen",
    "hero_title": "Ausstehende Registry-Einreichungen",
    "breadcrumb_title": "Ausstehende Einreichungen",
    "breadcrumb_parent": "Registry",
    "main_heading": "Ausstehende Registry-Einreichungen",
    "subtitle": "Einreichungen warten auf Überprüfung",
    "description_text": "Unten können Sie alle ausstehenden Registry-Einreichungen sehen, die derzeit überprüft werden. Einreichungen werden normalerweise innerhalb von 7-14 Tagen bearbeitet.",
    "contact_text": "Wenn Sie Fragen zu Ihrer Einreichung haben, bitte",
    "contact_link": "kontaktieren Sie uns",
    "table_headers": {
      "year": "Jahr",
      "model": "Modell",
      "body_number": "Karosserienummer",
      "submitted_by": "Eingereicht von",
      "status": "Status"
    },
    "status_card": {
      "title": "Einreichungsstatus-Leitfaden",
      "pending": "Ausstehend",
      "pending_description": "Wird überprüft",
      "approved": "Genehmigt",
      "approved_description": "Zur Registry hinzugefügt",
      "rejected": "Abgelehnt",
      "rejected_description": "Benötigt Korrektur"
    },
    "submit_divider": "Ihren Mini einreichen",
    "seo": {
      "og_title": "Ausstehende Registry-Einreichungen - Classic Mini DIY",
      "og_description": "Verfolgen Sie den Status ausstehender Classic Mini Registry-Einreichungen",
      "twitter_title": "Ausstehende Registry-Einreichungen - Classic Mini DIY",
      "twitter_description": "Verfolgen Sie den Status ausstehender Classic Mini Registry-Einreichungen"
    }
  },
  "es": {
    "title": "Envíos de Registro Pendientes - Classic Mini DIY",
    "description": "Rastrea el estado de los envíos de registro de Classic Mini pendientes",
    "hero_title": "Envíos de Registro Pendientes",
    "breadcrumb_title": "Envíos Pendientes",
    "breadcrumb_parent": "Registro",
    "main_heading": "Envíos de Registro Pendientes",
    "subtitle": "envíos pendientes de revisión",
    "description_text": "A continuación puedes ver todos los envíos de registro pendientes que están siendo revisados actualmente. Los envíos se procesan típicamente dentro de 7-14 días.",
    "contact_text": "Si tienes preguntas sobre tu envío, por favor",
    "contact_link": "contáctanos",
    "table_headers": {
      "year": "Año",
      "model": "Modelo",
      "body_number": "Número de Carrocería",
      "submitted_by": "Enviado por",
      "status": "Estado"
    },
    "status_card": {
      "title": "Guía de Estado de Envío",
      "pending": "Pendiente",
      "pending_description": "Bajo revisión",
      "approved": "Aprobado",
      "approved_description": "Agregado al registro",
      "rejected": "Rechazado",
      "rejected_description": "Necesita corrección"
    },
    "submit_divider": "Envía tu Mini",
    "seo": {
      "og_title": "Envíos de Registro Pendientes - Classic Mini DIY",
      "og_description": "Rastrea el estado de los envíos de registro de Classic Mini pendientes",
      "twitter_title": "Envíos de Registro Pendientes - Classic Mini DIY",
      "twitter_description": "Rastrea el estado de los envíos de registro de Classic Mini pendientes"
    }
  },
  "fr": {
    "title": "Soumissions de Registre en Attente - Classic Mini DIY",
    "description": "Suivez le statut des soumissions de registre Classic Mini en attente",
    "hero_title": "Soumissions de Registre en Attente",
    "breadcrumb_title": "Soumissions en Attente",
    "breadcrumb_parent": "Registre",
    "main_heading": "Soumissions de Registre en Attente",
    "subtitle": "soumissions en attente de révision",
    "description_text": "Ci-dessous, vous pouvez voir toutes les soumissions de registre en attente qui sont actuellement en cours de révision. Les soumissions sont généralement traitées dans les 7-14 jours.",
    "contact_text": "Si vous avez des questions sur votre soumission, veuillez",
    "contact_link": "nous contacter",
    "table_headers": {
      "year": "Année",
      "model": "Modèle",
      "body_number": "Numéro de Carrosserie",
      "submitted_by": "Soumis par",
      "status": "Statut"
    },
    "status_card": {
      "title": "Guide du Statut de Soumission",
      "pending": "En Attente",
      "pending_description": "Sous révision",
      "approved": "Approuvé",
      "approved_description": "Ajouté au registre",
      "rejected": "Rejeté",
      "rejected_description": "Nécessite une correction"
    },
    "submit_divider": "Soumettez votre Mini",
    "seo": {
      "og_title": "Soumissions de Registre en Attente - Classic Mini DIY",
      "og_description": "Suivez le statut des soumissions de registre Classic Mini en attente",
      "twitter_title": "Soumissions de Registre en Attente - Classic Mini DIY",
      "twitter_description": "Suivez le statut des soumissions de registre Classic Mini en attente"
    }
  },
  "it": {
    "title": "Invii di Registro in Sospeso - Classic Mini DIY",
    "description": "Traccia lo stato degli invii di registro Classic Mini in sospeso",
    "hero_title": "Invii di Registro in Sospeso",
    "breadcrumb_title": "Invii in Sospeso",
    "breadcrumb_parent": "Registro",
    "main_heading": "Invii di Registro in Sospeso",
    "subtitle": "invii in attesa di revisione",
    "description_text": "Di seguito puoi vedere tutti gli invii di registro in sospeso che sono attualmente in fase di revisione. Gli invii vengono generalmente elaborati entro 7-14 giorni.",
    "contact_text": "Se hai domande sul tuo invio, per favore",
    "contact_link": "contattaci",
    "table_headers": {
      "year": "Anno",
      "model": "Modello",
      "body_number": "Numero Carrozzeria",
      "submitted_by": "Inviato da",
      "status": "Stato"
    },
    "status_card": {
      "title": "Guida allo Stato dell'Invio",
      "pending": "In Sospeso",
      "pending_description": "Sotto revisione",
      "approved": "Approvato",
      "approved_description": "Aggiunto al registro",
      "rejected": "Rifiutato",
      "rejected_description": "Necessita correzione"
    },
    "submit_divider": "Invia la tua Mini",
    "seo": {
      "og_title": "Invii di Registro in Sospeso - Classic Mini DIY",
      "og_description": "Traccia lo stato degli invii di registro Classic Mini in sospeso",
      "twitter_title": "Invii di Registro in Sospeso - Classic Mini DIY",
      "twitter_description": "Traccia lo stato degli invii di registro Classic Mini in sospeso"
    }
  },
  "pt": {
    "title": "Submissões de Registro Pendentes - Classic Mini DIY",
    "description": "Acompanhe o status das submissões de registro Classic Mini pendentes",
    "hero_title": "Submissões de Registro Pendentes",
    "breadcrumb_title": "Submissões Pendentes",
    "breadcrumb_parent": "Registro",
    "main_heading": "Submissões de Registro Pendentes",
    "subtitle": "submissões aguardando revisão",
    "description_text": "Abaixo você pode ver todas as submissões de registro pendentes que estão sendo revisadas atualmente. As submissões são normalmente processadas dentro de 7-14 dias.",
    "contact_text": "Se você tem perguntas sobre sua submissão, por favor",
    "contact_link": "entre em contato conosco",
    "table_headers": {
      "year": "Ano",
      "model": "Modelo",
      "body_number": "Número da Carroceria",
      "submitted_by": "Enviado por",
      "status": "Status"
    },
    "status_card": {
      "title": "Guia de Status de Submissão",
      "pending": "Pendente",
      "pending_description": "Sob revisão",
      "approved": "Aprovado",
      "approved_description": "Adicionado ao registro",
      "rejected": "Rejeitado",
      "rejected_description": "Precisa de correção"
    },
    "submit_divider": "Envie seu Mini",
    "seo": {
      "og_title": "Submissões de Registro Pendentes - Classic Mini DIY",
      "og_description": "Acompanhe o status das submissões de registro Classic Mini pendentes",
      "twitter_title": "Submissões de Registro Pendentes - Classic Mini DIY",
      "twitter_description": "Acompanhe o status das submissões de registro Classic Mini pendentes"
    }
  },
  "nl": {
    "title": "Wachtende Register Inzendingen - Classic Mini DIY",
    "description": "Volg de status van wachtende Classic Mini register inzendingen",
    "hero_title": "Wachtende Register Inzendingen",
    "breadcrumb_title": "Wachtende Inzendingen",
    "breadcrumb_parent": "Register",
    "main_heading": "Wachtende Register Inzendingen",
    "subtitle": "inzendingen wachten op beoordeling",
    "description_text": "Hieronder kun je alle wachtende register inzendingen zien die momenteel worden beoordeeld. Inzendingen worden meestal binnen 7-14 dagen verwerkt.",
    "contact_text": "Als je vragen hebt over je inzending, neem dan",
    "contact_link": "contact met ons op",
    "table_headers": {
      "year": "Jaar",
      "model": "Model",
      "body_number": "Carrosserienummer",
      "submitted_by": "Ingezonden door",
      "status": "Status"
    },
    "status_card": {
      "title": "Inzending Status Gids",
      "pending": "Wachtend",
      "pending_description": "Onder beoordeling",
      "approved": "Goedgekeurd",
      "approved_description": "Toegevoegd aan register",
      "rejected": "Afgewezen",
      "rejected_description": "Heeft correctie nodig"
    },
    "submit_divider": "Dien je Mini in",
    "seo": {
      "og_title": "Wachtende Register Inzendingen - Classic Mini DIY",
      "og_description": "Volg de status van wachtende Classic Mini register inzendingen",
      "twitter_title": "Wachtende Register Inzendingen - Classic Mini DIY",
      "twitter_description": "Volg de status van wachtende Classic Mini register inzendingen"
    }
  },
  "sv": {
    "title": "Väntande Registerinlämningar - Classic Mini DIY",
    "description": "Spåra statusen för väntande Classic Mini registerinlämningar",
    "hero_title": "Väntande Registerinlämningar",
    "breadcrumb_title": "Väntande Inlämningar",
    "breadcrumb_parent": "Register",
    "main_heading": "Väntande Registerinlämningar",
    "subtitle": "inlämningar väntar på granskning",
    "description_text": "Nedan kan du se alla väntande registerinlämningar som för närvarande granskas. Inlämningar behandlas vanligtvis inom 7-14 dagar.",
    "contact_text": "Om du har frågor om din inlämning, vänligen",
    "contact_link": "kontakta oss",
    "table_headers": {
      "year": "År",
      "model": "Modell",
      "body_number": "Karossnummer",
      "submitted_by": "Inlämnad av",
      "status": "Status"
    },
    "status_card": {
      "title": "Guide för Inlämningsstatus",
      "pending": "Väntande",
      "pending_description": "Under granskning",
      "approved": "Godkänd",
      "approved_description": "Tillagd i register",
      "rejected": "Avvisad",
      "rejected_description": "Behöver korrigering"
    },
    "submit_divider": "Skicka in din Mini",
    "seo": {
      "og_title": "Väntande Registerinlämningar - Classic Mini DIY",
      "og_description": "Spåra statusen för väntande Classic Mini registerinlämningar",
      "twitter_title": "Väntande Registerinlämningar - Classic Mini DIY",
      "twitter_description": "Spåra statusen för väntande Classic Mini registerinlämningar"
    }
  },
  "da": {
    "title": "Afventende Registerindleveringer - Classic Mini DIY",
    "description": "Spor status for afventende Classic Mini registerindleveringer",
    "hero_title": "Afventende Registerindleveringer",
    "breadcrumb_title": "Afventende Indleveringer",
    "breadcrumb_parent": "Register",
    "main_heading": "Afventende Registerindleveringer",
    "subtitle": "indleveringer afventer gennemgang",
    "description_text": "Nedenfor kan du se alle afventende registerindleveringer, der i øjeblikket bliver gennemgået. Indleveringer behandles typisk inden for 7-14 dage.",
    "contact_text": "Hvis du har spørgsmål om din indlevering, venligst",
    "contact_link": "kontakt os",
    "table_headers": {
      "year": "År",
      "model": "Model",
      "body_number": "Karrosserinummer",
      "submitted_by": "Indleveret af",
      "status": "Status"
    },
    "status_card": {
      "title": "Guide til Indleveringsstatus",
      "pending": "Afventende",
      "pending_description": "Under gennemgang",
      "approved": "Godkendt",
      "approved_description": "Tilføjet til register",
      "rejected": "Afvist",
      "rejected_description": "Kræver rettelse"
    },
    "submit_divider": "Indsend din Mini",
    "seo": {
      "og_title": "Afventende Registerindleveringer - Classic Mini DIY",
      "og_description": "Spor status for afventende Classic Mini registerindleveringer",
      "twitter_title": "Afventende Registerindleveringer - Classic Mini DIY",
      "twitter_description": "Spor status for afventende Classic Mini registerindleveringer"
    }
  },
  "no": {
    "title": "Ventende Registerinnleveringer - Classic Mini DIY",
    "description": "Spor statusen til ventende Classic Mini registerinnleveringer",
    "hero_title": "Ventende Registerinnleveringer",
    "breadcrumb_title": "Ventende Innleveringer",
    "breadcrumb_parent": "Register",
    "main_heading": "Ventende Registerinnleveringer",
    "subtitle": "innleveringer venter på gjennomgang",
    "description_text": "Nedenfor kan du se alle ventende registerinnleveringer som for øyeblikket blir gjennomgått. Innleveringer behandles vanligvis innen 7-14 dager.",
    "contact_text": "Hvis du har spørsmål om din innlevering, vennligst",
    "contact_link": "kontakt oss",
    "table_headers": {
      "year": "År",
      "model": "Modell",
      "body_number": "Karosserinummer",
      "submitted_by": "Innlevert av",
      "status": "Status"
    },
    "status_card": {
      "title": "Guide for Innleveringsstatus",
      "pending": "Ventende",
      "pending_description": "Under gjennomgang",
      "approved": "Godkjent",
      "approved_description": "Lagt til i register",
      "rejected": "Avvist",
      "rejected_description": "Trenger korrigering"
    },
    "submit_divider": "Send inn din Mini",
    "seo": {
      "og_title": "Ventende Registerinnleveringer - Classic Mini DIY",
      "og_description": "Spor statusen til ventende Classic Mini registerinnleveringer",
      "twitter_title": "Ventende Registerinnleveringer - Classic Mini DIY",
      "twitter_description": "Spor statusen til ventende Classic Mini registerinnleveringer"
    }
  }
}
</i18n>

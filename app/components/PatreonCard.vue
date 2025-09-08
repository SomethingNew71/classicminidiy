<script lang="ts" setup>
  import { TRACKING_EVENTS, trackStuff } from '../../data/models/helper-utils';
  
  const { t } = useI18n({
    useScope: 'local',
  });

  const { path } = useRoute();

  defineProps({
    size: {
      type: String,
      default: 'large',
      required: true,
    },
  });
</script>

<template>
  <div>
    <template v-if="size === 'large'">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3 avatar-container">
          <nuxt-img
            format="webp"
            loading="lazy"
            src="https://classicminidiy.s3.amazonaws.com/misc/avatar.png"
            :alt="t('image_alt')"
            class="w-full rounded-lg"
          />
        </div>
        <div class="col-span-9">
          <h3 class="fancy-font-book-oblique text-lg font-semibold">
            <i class="fad fa-hands-heart"></i> {{ t('title') }}
          </h3>
          <p class="text-lg py-5">
            {{ t('description') }}
          </p>
          <p class="pt-3">
            <strong>{{ t('membership_benefits') }}</strong>
          </p>
          <p class="mt-4">
            <a
              class="btn btn-primary gap-2"
              rel="noopener"
              href="https://patreon.com/classicminidiy"
              target="_blank"
              @click="trackStuff(TRACKING_EVENTS.PATREON, path)"
            >
              <i class="fab fa-patreon"></i>
              <span>{{ t('button_text') }}</span>
            </a>
          </p>
        </div>
      </div>
    </template>
    <template v-if="size === 'small'">
      <div class="grid grid-cols-1 gap-2">
        <div>
          <h3 class="fancy-font-book-oblique text-lg font-semibold pt-2">
            <i class="fad fa-hands-heart"></i> {{ t('title') }}
          </h3>
        </div>
        <div>
          <p class="text-sm">
            {{ t('description') }}
          </p>
          <p class="pt-3">
            <strong>{{ t('membership_benefits') }}</strong>
          </p>
          <a
            class="btn btn-primary btn-sm gap-2 mt-4"
            rel="noopener"
            href="https://patreon.com/classicminidiy"
            target="_blank"
            @click="trackStuff(TRACKING_EVENTS.PATREON, path)"
          >
            <i class="fab fa-patreon"></i>
            <span>{{ t('button_text') }}</span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
  .btn-primary {
    background-color: #f96854; /* Patreon color */
    border-color: #f96854;
    color: white;
  }

  .btn-primary:hover {
    background-color: #e55b4d;
    border-color: #e55b4d;
  }
</style>

<i18n lang="json">
{
  "en": {
    "title": "SUPPORT THE SITE",
    "description": "Classic Mini DIY is completely free resource supported by our viewers. If you are interested in helping to keep the channel alive, consider supporting on Patreon.",
    "membership_benefits": "Membership comes with tons of free perks and benefits!",
    "button_text": "Contribute Today",
    "image_alt": "Image of my car on jack stands"
  },
  "es": {
    "title": "APOYA EL SITIO",
    "description": "Classic Mini DIY es un recurso completamente gratuito apoyado por nuestros espectadores. Si est\u00e1s interesado en ayudar a mantener el canal vivo, considera apoyar en Patreon.",
    "membership_benefits": "\u00a1La membres\u00eda viene con toneladas de ventajas y beneficios gratuitos!",
    "button_text": "Contribuye Hoy",
    "image_alt": "Imagen de mi coche en soportes"
  },
  "fr": {
    "title": "SOUTENEZ LE SITE",
    "description": "Classic Mini DIY est une ressource compl\u00e8tement gratuite soutenue par nos spectateurs. Si vous \u00eates int\u00e9ress\u00e9 \u00e0 aider \u00e0 maintenir la cha\u00eene en vie, consid\u00e9rez soutenir sur Patreon.",
    "membership_benefits": "L'adh\u00e9sion vient avec des tonnes d'avantages et de b\u00e9n\u00e9fices gratuits!",
    "button_text": "Contribuez Aujourd'hui",
    "image_alt": "Image de ma voiture sur chandelles"
  },
  "de": {
    "title": "UNTERST\u00dcTZE DIE SEITE",
    "description": "Classic Mini DIY ist eine v\u00f6llig kostenlose Ressource, die von unseren Zuschauern unterst\u00fctzt wird. Wenn Sie daran interessiert sind, den Kanal am Leben zu erhalten, erw\u00e4gen Sie eine Unterst\u00fctzung auf Patreon.",
    "membership_benefits": "Die Mitgliedschaft bringt jede Menge kostenlose Verg\u00fcnstigungen und Vorteile mit sich!",
    "button_text": "Heute Beitragen",
    "image_alt": "Bild meines Autos auf Wagenhebern"
  },
  "it": {
    "title": "SUPPORTA IL SITO",
    "description": "Classic Mini DIY \u00e8 una risorsa completamente gratuita supportata dai nostri spettatori. Se sei interessato ad aiutare a mantenere vivo il canale, considera di supportare su Patreon.",
    "membership_benefits": "L'iscrizione viene con tonnellate di vantaggi e benefici gratuiti!",
    "button_text": "Contribuisci Oggi",
    "image_alt": "Immagine della mia auto sui cavalletti"
  },
  "ja": {
    "title": "\u30b5\u30a4\u30c8\u3092\u30b5\u30dd\u30fc\u30c8",
    "description": "Classic Mini DIY\u306f\u8996\u8074\u8005\u306e\u7686\u69d8\u306b\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u308b\u5b8c\u5168\u306b\u7121\u6599\u306e\u30ea\u30bd\u30fc\u30b9\u3067\u3059\u3002\u30c1\u30e3\u30f3\u30cd\u30eb\u3092\u7dad\u6301\u3059\u308b\u305f\u3081\u306e\u652f\u63f4\u306b\u8208\u5473\u304c\u3042\u308b\u5834\u5408\u306f\u3001Patreon\u3067\u306e\u30b5\u30dd\u30fc\u30c8\u3092\u3054\u691c\u8a0e\u304f\u3060\u3055\u3044\u3002",
    "membership_benefits": "\u30e1\u30f3\u30d0\u30fc\u30b7\u30c3\u30d7\u306b\u306f\u305f\u304f\u3055\u3093\u306e\u7121\u6599\u7279\u5178\u3068\u30e1\u30ea\u30c3\u30c8\u304c\u4ed8\u3044\u3066\u304d\u307e\u3059\uff01",
    "button_text": "\u4eca\u65e5\u8ca2\u732e\u3059\u308b",
    "image_alt": "\u30b8\u30e3\u30c3\u30ad\u30b9\u30bf\u30f3\u30c9\u306e\u4e0a\u306e\u79c1\u306e\u8eca\u306e\u753b\u50cf"
  },
  "ko": {
    "title": "\uc0ac\uc774\ud2b8 \uc9c0\uc6d0",
    "description": "Classic Mini DIY\ub294 \uc2dc\uccad\uc790\ub4e4\uc5d0 \uc758\ud574 \uc9c0\uc6d0\ub418\ub294 \uc644\uc804\ud788 \ubb34\ub8cc \ub9ac\uc18c\uc2a4\uc785\ub2c8\ub2e4. \ucc44\ub110\uc744 \uc0b4\uc544\uc788\uac8c \uc720\uc9c0\ud558\ub294 \ub370 \ub3c4\uc6c0\uc744 \uc8fc\uace0 \uc2f6\ub2e4\uba74 Patreon\uc5d0\uc11c \uc9c0\uc6d0\uc744 \uace0\ub824\ud574 \ubcf4\uc138\uc694.",
    "membership_benefits": "\uba64\ubc84\uc2ed\uc5d0\ub294 \uc218\ub9ce\uc740 \ubb34\ub8cc \ud61c\ud0dd\uacfc \uc774\uc810\uc774 \uc788\uc2b5\ub2c8\ub2e4!",
    "button_text": "\uc624\ub298 \uae30\uc5ec\ud558\uae30",
    "image_alt": "\uc7ad \uc2a4\ud0e0\ub4dc \uc704\uc758 \ub0b4 \ucc28 \uc774\ubbf8\uc9c0"
  },
  "pt": {
    "title": "APOIE O SITE",
    "description": "Classic Mini DIY \u00e9 um recurso completamente gratuito apoiado por nossos espectadores. Se voc\u00ea est\u00e1 interessado em ajudar a manter o canal vivo, considere apoiar no Patreon.",
    "membership_benefits": "A associa\u00e7\u00e3o vem com toneladas de vantagens e benef\u00edcios gratuitos!",
    "button_text": "Contribua Hoje",
    "image_alt": "Imagem do meu carro nos cavaletes"
  },
  "ru": {
    "title": "\u041f\u041e\u0414\u0414\u0415\u0420\u0416\u0418\u0422\u0415 \u0421\u0410\u0419\u0422",
    "description": "Classic Mini DIY - \u044d\u0442\u043e \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u0440\u0435\u0441\u0443\u0440\u0441, \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0439 \u043d\u0430\u0448\u0438\u043c\u0438 \u0437\u0440\u0438\u0442\u0435\u043b\u044f\u043c\u0438. \u0415\u0441\u043b\u0438 \u0432\u044b \u0437\u0430\u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043e\u0432\u0430\u043d\u044b \u0432 \u0442\u043e\u043c, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043c\u043e\u0447\u044c \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043a\u0430\u043d\u0430\u043b, \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 \u043d\u0430 Patreon.",
    "membership_benefits": "\u0427\u043b\u0435\u043d\u0441\u0442\u0432\u043e \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0441 \u043c\u043d\u043e\u0436\u0435\u0441\u0442\u0432\u043e\u043c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0445 \u043f\u0440\u0438\u0432\u0438\u043b\u0435\u0433\u0438\u0439 \u0438 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432!",
    "button_text": "\u041f\u043e\u0436\u0435\u0440\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0441\u0435\u0433\u043e\u0434\u043d\u044f",
    "image_alt": "\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043c\u043e\u0435\u0439 \u043c\u0430\u0448\u0438\u043d\u044b \u043d\u0430 \u0434\u043e\u043c\u043a\u0440\u0430\u0442\u0430\u0445"
  },
  "zh": {
    "title": "\u652f\u6301\u7f51\u7ad9",
    "description": "Classic Mini DIY\u662f\u4e00\u4e2a\u5b8c\u5168\u514d\u8d39\u7684\u8d44\u6e90\uff0c\u7531\u6211\u4eec\u7684\u89c2\u4f17\u652f\u6301\u3002\u5982\u679c\u60a8\u6709\u5174\u8da3\u5e2e\u52a9\u4fdd\u6301\u9891\u9053\u6d3b\u529b\uff0c\u8bf7\u8003\u8651\u5728Patreon\u4e0a\u652f\u6301\u3002",
    "membership_benefits": "\u4f1a\u5458\u8d44\u683c\u5e26\u6709\u5927\u91cf\u514d\u8d39\u7684\u597d\u5904\u548c\u76ca\u5904\uff01",
    "button_text": "\u4eca\u5929\u8d21\u732e",
    "image_alt": "\u6211\u7684\u8f66\u5728\u5343\u65a4\u9876\u4e0a\u7684\u56fe\u7247"
  }
}
</i18n>

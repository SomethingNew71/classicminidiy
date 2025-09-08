<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  // Track calculator loading state
  const isCalculatorLoaded = ref(false);

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
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogUrl: 'https://classicminidiy.com/technical/gearing',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :version="BREADCRUMB_VERSIONS.TECH" :page="$t('breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">{{ $t('main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink :to="'/archive/engines'" :title="$t('engine_sizes_card.link_title')" class="block">
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            class="w-full h-full object-contain"
                            :alt="$t('engine_sizes_card.alt_text')"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">
                        {{ $t('engine_sizes_card.heading') }}
                      </h2>
                      <p class="mt-1">{{ $t('engine_sizes_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <ClientOnly fallback-tag="div" :fallback="$t('ui.loading_fallback')">
          <div class="min-h-96 flex items-center justify-center" v-if="!isCalculatorLoaded">
            <div class="flex flex-col items-center space-y-4">
              <span class="loading loading-spinner loading-lg text-primary"></span>
              <p class="text-base-content/70">{{ $t('ui.loading_text') }}</p>
            </div>
          </div>
          <LazyCalculatorsGearbox @vue:mounted="isCalculatorLoaded = true" />
        </ClientOnly>
      </div>
      <div class="col-span-12 md:col-span-4 md:col-start-5">
        <div class="divider">{{ $t('ui.more_section') }}</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Tech - Gearing Calculator",
    "description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "hero_title": "Gearbox Calculator",
    "breadcrumb_title": "Gearbox Calculator",
    "og_title": "Tech - Gearing Calculator",
    "og_description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "twitter_title": "Tech - Gearing Calculator",
    "twitter_description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "main_heading": "Gearbox Calculator",
    "description_text": "When building or rebuilding a gearbox, updaing your gear ratios, or changing out your speedometer sometimes you need to update some things. Using the Classic Mini DIY Gear Calculator below, you can determine the correct gearing for your for your new engine build and find the right speedo gear to use as well.",
    "engine_sizes_card": {
      "link_title": "Link to Engine Sizes",
      "heading": "What are standard engine sizes?",
      "description": "Click here to learn about common engine sizes in the classic mini.",
      "alt_text": "Engine size table image preview"
    },
    "ui": {
      "loading_fallback": "Loading gearbox calculator...",
      "loading_text": "Loading gearbox calculator...",
      "more_section": "More"
    }
  },
  "es": {
    "title": "Técnico - Calculadora de Engranajes",
    "description": "¿Planificando tu próxima construcción de caja de cambios? Usa nuestra nueva calculadora de engranajes de caja de cambios para generar información para la renovación o actualización de la caja de cambios de tu Classic Mini.",
    "hero_title": "Calculadora de Caja de Cambios",
    "breadcrumb_title": "Calculadora de Caja de Cambios",
    "og_title": "Técnico - Calculadora de Engranajes",
    "og_description": "¿Planificando tu próxima construcción de caja de cambios? Usa nuestra nueva calculadora de engranajes de caja de cambios para generar información para la renovación o actualización de la caja de cambios de tu Classic Mini.",
    "twitter_title": "Técnico - Calculadora de Engranajes",
    "twitter_description": "¿Planificando tu próxima construcción de caja de cambios? Usa nuestra nueva calculadora de engranajes de caja de cambios para generar información para la renovación o actualización de la caja de cambios de tu Classic Mini.",
    "main_heading": "Calculadora de Caja de Cambios",
    "description_text": "Al construir o reconstruir una caja de cambios, actualizar tus relaciones de engranajes, o cambiar tu velocímetro, a veces necesitas actualizar algunas cosas. Usando la Calculadora de Engranajes Classic Mini DIY a continuación, puedes determinar el engranaje correcto para la construcción de tu nuevo motor y encontrar el engranaje de velocímetro correcto para usar también.",
    "engine_sizes_card": {
      "link_title": "Enlace a Tamaños de Motor",
      "heading": "¿Cuáles son los tamaños estándar de motor?",
      "description": "Haz clic aquí para aprender sobre los tamaños comunes de motor en el classic mini.",
      "alt_text": "Vista previa de imagen de tabla de tamaños de motor"
    },
    "ui": {
      "loading_fallback": "Cargando calculadora de caja de cambios...",
      "loading_text": "Cargando calculadora de caja de cambios...",
      "more_section": "Más"
    }
  },
  "fr": {
    "title": "Technique - Calculateur d'Engrenages",
    "description": "Vous planifiez votre prochaine construction de boîte de vitesses ? Utilisez notre tout nouveau calculateur d'engrenages de boîte de vitesses pour générer des informations pour la rénovation ou la mise à niveau de la boîte de vitesses de votre Classic Mini.",
    "hero_title": "Calculateur de Boîte de Vitesses",
    "breadcrumb_title": "Calculateur de Boîte de Vitesses",
    "og_title": "Technique - Calculateur d'Engrenages",
    "og_description": "Vous planifiez votre prochaine construction de boîte de vitesses ? Utilisez notre tout nouveau calculateur d'engrenages de boîte de vitesses pour générer des informations pour la rénovation ou la mise à niveau de la boîte de vitesses de votre Classic Mini.",
    "twitter_title": "Technique - Calculateur d'Engrenages",
    "twitter_description": "Vous planifiez votre prochaine construction de boîte de vitesses ? Utilisez notre tout nouveau calculateur d'engrenages de boîte de vitesses pour générer des informations pour la rénovation ou la mise à niveau de la boîte de vitesses de votre Classic Mini.",
    "main_heading": "Calculateur de Boîte de Vitesses",
    "description_text": "Lors de la construction ou de la reconstruction d'une boîte de vitesses, de la mise à jour de vos rapports de vitesse, ou du changement de votre compteur de vitesse, vous devez parfois mettre à jour certaines choses. En utilisant le Calculateur d'Engrenages Classic Mini DIY ci-dessous, vous pouvez déterminer l'engrenage correct pour la construction de votre nouveau moteur et trouver le bon engrenage de compteur à utiliser également.",
    "engine_sizes_card": {
      "link_title": "Lien vers les Tailles de Moteur",
      "heading": "Quelles sont les tailles de moteur standard ?",
      "description": "Cliquez ici pour en savoir plus sur les tailles de moteur communes dans la classic mini.",
      "alt_text": "Aperçu de l'image du tableau des tailles de moteur"
    },
    "ui": {
      "loading_fallback": "Chargement du calculateur de boîte de vitesses...",
      "loading_text": "Chargement du calculateur de boîte de vitesses...",
      "more_section": "Plus"
    }
  },
  "it": {
    "title": "Tecnico - Calcolatore Ingranaggi",
    "description": "Stai pianificando la tua prossima costruzione del cambio? Usa il nostro nuovissimo calcolatore di ingranaggi del cambio per generare informazioni per il rinnovamento o l'aggiornamento del cambio della tua Classic Mini.",
    "hero_title": "Calcolatore Cambio",
    "breadcrumb_title": "Calcolatore Cambio",
    "og_title": "Tecnico - Calcolatore Ingranaggi",
    "og_description": "Stai pianificando la tua prossima costruzione del cambio? Usa il nostro nuovissimo calcolatore di ingranaggi del cambio per generare informazioni per il rinnovamento o l'aggiornamento del cambio della tua Classic Mini.",
    "twitter_title": "Tecnico - Calcolatore Ingranaggi",
    "twitter_description": "Stai pianificando la tua prossima costruzione del cambio? Usa il nostro nuovissimo calcolatore di ingranaggi del cambio per generare informazioni per il rinnovamento o l'aggiornamento del cambio della tua Classic Mini.",
    "main_heading": "Calcolatore Cambio",
    "description_text": "Quando si costruisce o ricostruisce un cambio, si aggiornano i rapporti degli ingranaggi, o si cambia il tachimetro, a volte è necessario aggiornare alcune cose. Utilizzando il Calcolatore Ingranaggi Classic Mini DIY qui sotto, puoi determinare l'ingranaggio corretto per la costruzione del tuo nuovo motore e trovare l'ingranaggio del tachimetro giusto da usare anche.",
    "engine_sizes_card": {
      "link_title": "Link alle Dimensioni Motore",
      "heading": "Quali sono le dimensioni standard del motore?",
      "description": "Clicca qui per saperne di più sulle dimensioni comuni del motore nella classic mini.",
      "alt_text": "Anteprima immagine tabella dimensioni motore"
    },
    "ui": {
      "loading_fallback": "Caricamento calcolatore cambio...",
      "loading_text": "Caricamento calcolatore cambio...",
      "more_section": "Altro"
    }
  },
  "de": {
    "title": "Technik - Übersetzungsrechner",
    "description": "Planen Sie Ihren nächsten Getriebeaufbau? Verwenden Sie unseren brandneuen Getriebe-Übersetzungsrechner, um Informationen für die Renovierung oder das Upgrade des Getriebes Ihres Classic Mini zu generieren.",
    "hero_title": "Getriebe-Rechner",
    "breadcrumb_title": "Getriebe-Rechner",
    "og_title": "Technik - Übersetzungsrechner",
    "og_description": "Planen Sie Ihren nächsten Getriebeaufbau? Verwenden Sie unseren brandneuen Getriebe-Übersetzungsrechner, um Informationen für die Renovierung oder das Upgrade des Getriebes Ihres Classic Mini zu generieren.",
    "twitter_title": "Technik - Übersetzungsrechner",
    "twitter_description": "Planen Sie Ihren nächsten Getriebeaufbau? Verwenden Sie unseren brandneuen Getriebe-Übersetzungsrechner, um Informationen für die Renovierung oder das Upgrade des Getriebes Ihres Classic Mini zu generieren.",
    "main_heading": "Getriebe-Rechner",
    "description_text": "Beim Aufbau oder Wiederaufbau eines Getriebes, der Aktualisierung Ihrer Übersetzungsverhältnisse oder dem Wechsel Ihres Tachometers müssen Sie manchmal einige Dinge aktualisieren. Mit dem Classic Mini DIY Übersetzungsrechner unten können Sie die richtige Übersetzung für Ihren neuen Motoraufbau bestimmen und das richtige Tachometer-Zahnrad zum Verwenden finden.",
    "engine_sizes_card": {
      "link_title": "Link zu Motorgrößen",
      "heading": "Was sind die Standard-Motorgrößen?",
      "description": "Klicken Sie hier, um mehr über die gängigen Motorgrößen im Classic Mini zu erfahren.",
      "alt_text": "Vorschaubild der Motorgrößen-Tabelle"
    },
    "ui": {
      "loading_fallback": "Lade Getriebe-Rechner...",
      "loading_text": "Lade Getriebe-Rechner...",
      "more_section": "Mehr"
    }
  },
  "pt": {
    "title": "Técnico - Calculadora de Engrenagens",
    "description": "Planejando sua próxima construção de caixa de câmbio? Use nossa nova calculadora de engrenagens de caixa de câmbio para gerar informações para a renovação ou atualização da caixa de câmbio do seu Classic Mini.",
    "hero_title": "Calculadora de Caixa de Câmbio",
    "breadcrumb_title": "Calculadora de Caixa de Câmbio",
    "og_title": "Técnico - Calculadora de Engrenagens",
    "og_description": "Planejando sua próxima construção de caixa de câmbio? Use nossa nova calculadora de engrenagens de caixa de câmbio para gerar informações para a renovação ou atualização da caixa de câmbio do seu Classic Mini.",
    "twitter_title": "Técnico - Calculadora de Engrenagens",
    "twitter_description": "Planejando sua próxima construção de caixa de câmbio? Use nossa nova calculadora de engrenagens de caixa de câmbio para gerar informações para a renovação ou atualização da caixa de câmbio do seu Classic Mini.",
    "main_heading": "Calculadora de Caixa de Câmbio",
    "description_text": "Ao construir ou reconstruir uma caixa de câmbio, atualizar suas relações de engrenagem, ou trocar seu velocímetro, às vezes você precisa atualizar algumas coisas. Usando a Calculadora de Engrenagens Classic Mini DIY abaixo, você pode determinar a engrenagem correta para a construção do seu novo motor e encontrar a engrenagem de velocímetro certa para usar também.",
    "engine_sizes_card": {
      "link_title": "Link para Tamanhos de Motor",
      "heading": "Quais são os tamanhos padrão de motor?",
      "description": "Clique aqui para aprender sobre os tamanhos comuns de motor no classic mini.",
      "alt_text": "Visualização da imagem da tabela de tamanhos de motor"
    },
    "ui": {
      "loading_fallback": "Carregando calculadora de caixa de câmbio...",
      "loading_text": "Carregando calculadora de caixa de câmbio...",
      "more_section": "Mais"
    }
  },
  "ru": {
    "title": "Техника - Калькулятор Передач",
    "description": "Планируете следующую сборку коробки передач? Используйте наш новый калькулятор передач коробки передач для генерации информации для ремонта или модернизации коробки передач вашего Classic Mini.",
    "hero_title": "Калькулятор Коробки Передач",
    "breadcrumb_title": "Калькулятор Коробки Передач",
    "og_title": "Техника - Калькулятор Передач",
    "og_description": "Планируете следующую сборку коробки передач? Используйте наш новый калькулятор передач коробки передач для генерации информации для ремонта или модернизации коробки передач вашего Classic Mini.",
    "twitter_title": "Техника - Калькулятор Передач",
    "twitter_description": "Планируете следующую сборку коробки передач? Используйте наш новый калькулятор передач коробки передач для генерации информации для ремонта или модернизации коробки передач вашего Classic Mini.",
    "main_heading": "Калькулятор Коробки Передач",
    "description_text": "При сборке или пересборке коробки передач, обновлении передаточных чисел или замене спидометра иногда нужно обновить некоторые вещи. Используя Калькулятор Передач Classic Mini DIY ниже, вы можете определить правильную передачу для сборки вашего нового двигателя и найти правильную шестерню спидометра для использования также.",
    "engine_sizes_card": {
      "link_title": "Ссылка на Размеры Двигателей",
      "heading": "Каковы стандартные размеры двигателей?",
      "description": "Нажмите здесь, чтобы узнать о распространенных размерах двигателей в classic mini.",
      "alt_text": "Предварительный просмотр изображения таблицы размеров двигателей"
    },
    "ui": {
      "loading_fallback": "Загрузка калькулятора коробки передач...",
      "loading_text": "Загрузка калькулятора коробки передач...",
      "more_section": "Больше"
    }
  },
  "ja": {
    "title": "技術 - ギア計算機",
    "description": "次のギアボックス構築を計画していますか？クラシックミニのギアボックス改修またはアップグレードの情報を生成するために、私たちの新しいギアボックスギア計算機を使用してください。",
    "hero_title": "ギアボックス計算機",
    "breadcrumb_title": "ギアボックス計算機",
    "og_title": "技術 - ギア計算機",
    "og_description": "次のギアボックス構築を計画していますか？クラシックミニのギアボックス改修またはアップグレードの情報を生成するために、私たちの新しいギアボックスギア計算機を使用してください。",
    "twitter_title": "技術 - ギア計算機",
    "twitter_description": "次のギアボックス構築を計画していますか？クラシックミニのギアボックス改修またはアップグレードの情報を生成するために、私たちの新しいギアボックスギア計算機を使用してください。",
    "main_heading": "ギアボックス計算機",
    "description_text": "ギアボックスを構築または再構築する際、ギア比を更新する際、またはスピードメーターを交換する際、時々いくつかのことを更新する必要があります。下記のクラシックミニDIYギア計算機を使用して、新しいエンジン構築に適切なギアリングを決定し、使用する正しいスピードメーターギアも見つけることができます。",
    "engine_sizes_card": {
      "link_title": "エンジンサイズへのリンク",
      "heading": "標準的なエンジンサイズは何ですか？",
      "description": "クラシックミニの一般的なエンジンサイズについて学ぶにはここをクリック。",
      "alt_text": "エンジンサイズ表の画像プレビュー"
    },
    "ui": {
      "loading_fallback": "ギアボックス計算機を読み込み中...",
      "loading_text": "ギアボックス計算機を読み込み中...",
      "more_section": "その他"
    }
  },
  "zh": {
    "title": "技术 - 齿轮计算器",
    "description": "正在计划您的下一个变速箱构建？使用我们全新的变速箱齿轮计算器为您的经典迷你变速箱翻新或升级生成信息。",
    "hero_title": "变速箱计算器",
    "breadcrumb_title": "变速箱计算器",
    "og_title": "技术 - 齿轮计算器",
    "og_description": "正在计划您的下一个变速箱构建？使用我们全新的变速箱齿轮计算器为您的经典迷你变速箱翻新或升级生成信息。",
    "twitter_title": "技术 - 齿轮计算器",
    "twitter_description": "正在计划您的下一个变速箱构建？使用我们全新的变速箱齿轮计算器为您的经典迷你变速箱翻新或升级生成信息。",
    "main_heading": "变速箱计算器",
    "description_text": "在构建或重建变速箱、更新齿轮比或更换速度表时，有时您需要更新一些东西。使用下面的经典迷你DIY齿轮计算器，您可以确定新发动机构建的正确齿轮传动，并找到合适的速度表齿轮使用。",
    "engine_sizes_card": {
      "link_title": "发动机尺寸链接",
      "heading": "标准发动机尺寸是什么？",
      "description": "点击这里了解经典迷你中常见的发动机尺寸。",
      "alt_text": "发动机尺寸表图像预览"
    },
    "ui": {
      "loading_fallback": "正在加载变速箱计算器...",
      "loading_text": "正在加载变速箱计算器...",
      "more_section": "更多"
    }
  },
  "ko": {
    "title": "기술 - 기어 계산기",
    "description": "다음 기어박스 구축을 계획하고 계신가요? 클래식 미니 기어박스 개조 또는 업그레이드를 위한 정보를 생성하기 위해 우리의 새로운 기어박스 기어 계산기를 사용하세요.",
    "hero_title": "기어박스 계산기",
    "breadcrumb_title": "기어박스 계산기",
    "og_title": "기술 - 기어 계산기",
    "og_description": "다음 기어박스 구축을 계획하고 계신가요? 클래식 미니 기어박스 개조 또는 업그레이드를 위한 정보를 생성하기 위해 우리의 새로운 기어박스 기어 계산기를 사용하세요.",
    "twitter_title": "기술 - 기어 계산기",
    "twitter_description": "다음 기어박스 구축을 계획하고 계신가요? 클래식 미니 기어박스 개조 또는 업그레이드를 위한 정보를 생성하기 위해 우리의 새로운 기어박스 기어 계산기를 사용하세요.",
    "main_heading": "기어박스 계산기",
    "description_text": "기어박스를 구축하거나 재구축할 때, 기어비를 업데이트하거나 속도계를 교체할 때 때로는 몇 가지를 업데이트해야 합니다. 아래의 클래식 미니 DIY 기어 계산기를 사용하여 새로운 엔진 구축에 올바른 기어링을 결정하고 사용할 올바른 속도계 기어도 찾을 수 있습니다.",
    "engine_sizes_card": {
      "link_title": "엔진 크기 링크",
      "heading": "표준 엔진 크기는 무엇입니까?",
      "description": "클래식 미니의 일반적인 엔진 크기에 대해 알아보려면 여기를 클릭하세요.",
      "alt_text": "엔진 크기 표 이미지 미리보기"
    },
    "ui": {
      "loading_fallback": "기어박스 계산기 로딩 중...",
      "loading_text": "기어박스 계산기 로딩 중...",
      "more_section": "더보기"
    }
  }
}
</i18n>

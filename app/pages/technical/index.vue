<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('ogTitle'),
    ogDescription: $t('ogDescription'),
    ogUrl: 'https://classicminidiy.com/technical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitterTitle'),
    twitterDescription: $t('twitterDescription'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
  });

  // Add structured data for the technical toolbox collection
  const toolboxJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: $t('structured_data.name'),
    description: $t('structured_data.description'),
    url: 'https://classicminidiy.com/technical',
    itemListElement: ToolboxItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://classicminidiy.com${item.to}`,
      name: $t(item.titleKey),
    })),
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(toolboxJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :navigation="true"
    :titleKey="$t('hero_title')"
    textSize="text-3xl"
    :subtitleKey="$t('hero_subtitle')"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4 pb-15 pt-6">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">{{ $t('breadcrumb_subtitle') }}</h2>
        <h3 class="fancy-font-bold text-2xl">{{ $t('main_heading') }}</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          {{ $t('description_text') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="tool in ToolboxItems" class="col-span-1">
        <NuxtLink :to="tool.to" class="card bg-base-100 shadow-xl text-center p-5 h-full">
          <span class="text-4xl block" v-html="tool.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ $t(tool.titleKey) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('support_section') }}</div>
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
    "title": "Classic Mini Technical Toolbox | DIY Calculators & Specifications",
    "description": "Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.",
    "keywords": "Classic Mini technical tools, Mini Cooper specifications, SU needle chart, compression calculator, torque specs, DIY Mini maintenance, technical reference",
    "hero_title": "Classic Mini Technical Toolbox",
    "hero_subtitle": "Keeping Minis Driving",
    "ogTitle": "Classic Mini Technical Toolbox | DIY Calculators & Specifications",
    "ogDescription": "Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.",
    "twitterTitle": "Classic Mini Technical Toolbox",
    "twitterDescription": "DIY technical tools and specifications for Classic Mini maintenance and upgrades.",
    "structured_data": {
      "name": "Classic Mini Technical Toolbox",
      "description": "Collection of technical tools, calculators, and specifications for Classic Mini maintenance and upgrades."
    },
    "page_subtitle": "KEEPING MINIS DRIVING",
    "page_title": "The Technical Toolbox",
    "welcome_text": "One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com. These tools and calculators will help you maintain, upgrade, and troubleshoot your Classic Mini with confidence. From compression ratios to needle charts, everything you need is at your fingertips.",
    "support_section": "Support",
    "breadcrumb_subtitle": "KEEPING MINIS DRIVING",
    "main_heading": "The Technical Toolbox",
    "description_text": "One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com. These tools and calculators will help you maintain, upgrade, and troubleshoot your Classic Mini with confidence. From compression ratios to needle charts, everything you need is at your fingertips.",
    "toolbox": {
      "torque_specs": "Torque Specs",
      "chassis_decoder": "Chassis Number Decoder",
      "engine_decoder": "Engine Number Decoder",
      "needle_configurator": "Carb Needle Configurator",
      "gearbox_calculator": "Gearbox Calculator",
      "compression_calculator": "Compression Ratio Calculator",
      "parts_equivalency": "Parts Equivalency",
      "common_clearances": "Common Clearances"
    }
  },
  "es": {
    "title": "Caja de Herramientas Técnica Classic Mini DIY - Calculadoras y Herramientas",
    "description": "Herramientas técnicas esenciales para propietarios de Classic Mini. Calculadoras de compresión, caja de cambios, agujas de carburador y más para el mantenimiento y modificación.",
    "keywords": "Classic Mini, herramientas técnicas, calculadora compresión, calculadora caja cambios, agujas carburador, herramientas mantenimiento",
    "hero_title": "Caja de Herramientas Técnica",
    "hero_subtitle": "Herramientas esenciales para propietarios de Classic Mini",
    "breadcrumb_home": "Inicio",
    "breadcrumb_technical": "Técnico",
    "compression_calculator_title": "Calculadora de Compresión",
    "compression_calculator_description": "Calcula la relación de compresión para tu motor Classic Mini",
    "gearbox_calculator_title": "Calculadora de Caja de Cambios",
    "gearbox_calculator_description": "Analiza las relaciones de marchas y velocidades máximas",
    "needles_configurator_title": "Configurador de Agujas",
    "needles_configurator_description": "Encuentra las agujas de carburador perfectas para tu configuración",
    "chassis_decoder_title": "Decodificador de Chasis",
    "chassis_decoder_description": "Decodifica el número de chasis de tu Classic Mini",
    "engine_decoder_title": "Decodificador de Motor",
    "engine_decoder_description": "Identifica las especificaciones de tu motor por el código",
    "color_decoder_title": "Decodificador de Color",
    "color_decoder_description": "Encuentra el color original de tu Mini por el código",
    "support_title": "Apoya Nuestro Trabajo",
    "support_description": "Si estas herramientas te han sido útiles, considera apoyarnos en Patreon para ayudar a mantener y mejorar el sitio.",
    "support_button": "Apoyar en Patreon"
  },
  "fr": {
    "title": "Boîte à Outils Technique Classic Mini DIY - Calculatrices et Outils",
    "description": "Outils techniques essentiels pour les propriétaires de Classic Mini. Calculatrices de compression, boîte de vitesses, aiguilles de carburateur et plus pour l'entretien et la modification.",
    "keywords": "Classic Mini, outils techniques, calculatrice compression, calculatrice boîte vitesses, aiguilles carburateur, outils entretien",
    "hero_title": "Boîte à Outils Technique",
    "hero_subtitle": "Outils essentiels pour les propriétaires de Classic Mini",
    "breadcrumb_home": "Accueil",
    "breadcrumb_technical": "Technique",
    "compression_calculator_title": "Calculatrice de Compression",
    "compression_calculator_description": "Calculez le taux de compression pour votre moteur Classic Mini",
    "gearbox_calculator_title": "Calculatrice de Boîte de Vitesses",
    "gearbox_calculator_description": "Analysez les rapports de vitesse et les vitesses maximales",
    "needles_configurator_title": "Configurateur d'Aiguilles",
    "needles_configurator_description": "Trouvez les aiguilles de carburateur parfaites pour votre configuration",
    "chassis_decoder_title": "Décodeur de Châssis",
    "chassis_decoder_description": "Décodez le numéro de châssis de votre Classic Mini",
    "engine_decoder_title": "Décodeur de Moteur",
    "engine_decoder_description": "Identifiez les spécifications de votre moteur par le code",
    "color_decoder_title": "Décodeur de Couleur",
    "color_decoder_description": "Trouvez la couleur d'origine de votre Mini par le code",
    "support_title": "Soutenez Notre Travail",
    "support_description": "Si ces outils vous ont été utiles, envisagez de nous soutenir sur Patreon pour aider à maintenir et améliorer le site.",
    "support_button": "Soutenir sur Patreon"
  },
  "it": {
    "title": "Cassetta degli Attrezzi Tecnica Classic Mini DIY - Calcolatrici e Strumenti",
    "description": "Strumenti tecnici essenziali per proprietari di Classic Mini. Calcolatrici di compressione, cambio, aghi carburatore e altro per manutenzione e modifiche.",
    "keywords": "Classic Mini, strumenti tecnici, calcolatrice compressione, calcolatrice cambio, aghi carburatore, strumenti manutenzione",
    "hero_title": "Cassetta degli Attrezzi Tecnica",
    "hero_subtitle": "Strumenti essenziali per proprietari di Classic Mini",
    "breadcrumb_home": "Home",
    "breadcrumb_technical": "Tecnico",
    "compression_calculator_title": "Calcolatrice di Compressione",
    "compression_calculator_description": "Calcola il rapporto di compressione per il tuo motore Classic Mini",
    "gearbox_calculator_title": "Calcolatrice del Cambio",
    "gearbox_calculator_description": "Analizza i rapporti delle marce e le velocità massime",
    "needles_configurator_title": "Configuratore Aghi",
    "needles_configurator_description": "Trova gli aghi del carburatore perfetti per la tua configurazione",
    "chassis_decoder_title": "Decodificatore Telaio",
    "chassis_decoder_description": "Decodifica il numero di telaio della tua Classic Mini",
    "engine_decoder_title": "Decodificatore Motore",
    "engine_decoder_description": "Identifica le specifiche del tuo motore tramite il codice",
    "color_decoder_title": "Decodificatore Colore",
    "color_decoder_description": "Trova il colore originale della tua Mini tramite il codice",
    "support_title": "Supporta il Nostro Lavoro",
    "support_description": "Se questi strumenti ti sono stati utili, considera di supportarci su Patreon per aiutare a mantenere e migliorare il sito.",
    "support_button": "Supporta su Patreon"
  },
  "de": {
    "title": "Classic Mini DIY Technischer Werkzeugkasten - Rechner und Werkzeuge",
    "description": "Wesentliche technische Werkzeuge für Classic Mini Besitzer. Kompressions-, Getriebe-, Vergaserdüsen-Rechner und mehr für Wartung und Modifikation.",
    "keywords": "Classic Mini, technische Werkzeuge, Kompressionsrechner, Getrieberechner, Vergaserdüsen, Wartungswerkzeuge",
    "hero_title": "Technischer Werkzeugkasten",
    "hero_subtitle": "Wesentliche Werkzeuge für Classic Mini Besitzer",
    "breadcrumb_home": "Startseite",
    "breadcrumb_technical": "Technisch",
    "compression_calculator_title": "Kompressionsrechner",
    "compression_calculator_description": "Berechnen Sie das Kompressionsverhältnis für Ihren Classic Mini Motor",
    "gearbox_calculator_title": "Getrieberechner",
    "gearbox_calculator_description": "Analysieren Sie Getriebeübersetzungen und Höchstgeschwindigkeiten",
    "needles_configurator_title": "Düsen-Konfigurator",
    "needles_configurator_description": "Finden Sie die perfekten Vergaserdüsen für Ihre Konfiguration",
    "chassis_decoder_title": "Fahrgestell-Decoder",
    "chassis_decoder_description": "Entschlüsseln Sie die Fahrgestellnummer Ihres Classic Mini",
    "engine_decoder_title": "Motor-Decoder",
    "engine_decoder_description": "Identifizieren Sie die Spezifikationen Ihres Motors anhand des Codes",
    "color_decoder_title": "Farb-Decoder",
    "color_decoder_description": "Finden Sie die ursprüngliche Farbe Ihres Mini anhand des Codes",
    "support_title": "Unterstützen Sie Unsere Arbeit",
    "support_description": "Wenn diese Werkzeuge für Sie nützlich waren, erwägen Sie, uns auf Patreon zu unterstützen, um die Website zu erhalten und zu verbessern.",
    "support_button": "Auf Patreon Unterstützen"
  },
  "pt": {
    "title": "Caixa de Ferramentas Técnica Classic Mini DIY - Calculadoras e Ferramentas",
    "description": "Ferramentas técnicas essenciais para proprietários de Classic Mini. Calculadoras de compressão, câmbio, agulhas de carburador e mais para manutenção e modificação.",
    "keywords": "Classic Mini, ferramentas técnicas, calculadora compressão, calculadora câmbio, agulhas carburador, ferramentas manutenção",
    "hero_title": "Caixa de Ferramentas Técnica",
    "hero_subtitle": "Ferramentas essenciais para proprietários de Classic Mini",
    "breadcrumb_home": "Início",
    "breadcrumb_technical": "Técnico",
    "compression_calculator_title": "Calculadora de Compressão",
    "compression_calculator_description": "Calcule a taxa de compressão para seu motor Classic Mini",
    "gearbox_calculator_title": "Calculadora de Câmbio",
    "gearbox_calculator_description": "Analise as relações de marcha e velocidades máximas",
    "needles_configurator_title": "Configurador de Agulhas",
    "needles_configurator_description": "Encontre as agulhas de carburador perfeitas para sua configuração",
    "chassis_decoder_title": "Decodificador de Chassi",
    "chassis_decoder_description": "Decodifique o número do chassi do seu Classic Mini",
    "engine_decoder_title": "Decodificador de Motor",
    "engine_decoder_description": "Identifique as especificações do seu motor pelo código",
    "color_decoder_title": "Decodificador de Cor",
    "color_decoder_description": "Encontre a cor original do seu Mini pelo código",
    "support_title": "Apoie Nosso Trabalho",
    "support_description": "Se essas ferramentas foram úteis para você, considere nos apoiar no Patreon para ajudar a manter e melhorar o site.",
    "support_button": "Apoiar no Patreon"
  },
  "ru": {
    "title": "Технический Набор Инструментов Classic Mini DIY - Калькуляторы и Инструменты",
    "description": "Основные технические инструменты для владельцев Classic Mini. Калькуляторы сжатия, коробки передач, игл карбюратора и многое другое для обслуживания и модификации.",
    "keywords": "Classic Mini, технические инструменты, калькулятор сжатия, калькулятор коробки передач, иглы карбюратора, инструменты обслуживания",
    "hero_title": "Технический Набор Инструментов",
    "hero_subtitle": "Основные инструменты для владельцев Classic Mini",
    "breadcrumb_home": "Главная",
    "breadcrumb_technical": "Техническое",
    "compression_calculator_title": "Калькулятор Сжатия",
    "compression_calculator_description": "Рассчитайте степень сжатия для вашего двигателя Classic Mini",
    "gearbox_calculator_title": "Калькулятор Коробки Передач",
    "gearbox_calculator_description": "Анализируйте передаточные числа и максимальные скорости",
    "needles_configurator_title": "Конфигуратор Игл",
    "needles_configurator_description": "Найдите идеальные иглы карбюратора для вашей конфигурации",
    "chassis_decoder_title": "Декодер Шасси",
    "chassis_decoder_description": "Расшифруйте номер шасси вашего Classic Mini",
    "engine_decoder_title": "Декодер Двигателя",
    "engine_decoder_description": "Определите характеристики вашего двигателя по коду",
    "color_decoder_title": "Декодер Цвета",
    "color_decoder_description": "Найдите оригинальный цвет вашего Mini по коду",
    "support_title": "Поддержите Нашу Работу",
    "support_description": "Если эти инструменты были полезны для вас, рассмотрите возможность поддержки нас на Patreon, чтобы помочь поддерживать и улучшать сайт.",
    "support_button": "Поддержать на Patreon"
  },
  "ja": {
    "title": "Classic Mini DIY テクニカルツールボックス - 計算機とツール",
    "description": "Classic Miniオーナーのための必須技術ツール。圧縮、ギアボックス、キャブレターニードル計算機など、メンテナンスと改造のためのツール。",
    "keywords": "Classic Mini, 技術ツール, 圧縮計算機, ギアボックス計算機, キャブレターニードル, メンテナンスツール",
    "hero_title": "テクニカルツールボックス",
    "hero_subtitle": "Classic Miniオーナーのための必須ツール",
    "breadcrumb_home": "ホーム",
    "breadcrumb_technical": "テクニカル",
    "compression_calculator_title": "圧縮比計算機",
    "compression_calculator_description": "あなたのClassic Miniエンジンの圧縮比を計算",
    "gearbox_calculator_title": "ギアボックス計算機",
    "gearbox_calculator_description": "ギア比と最高速度を分析",
    "needles_configurator_title": "ニードル設定ツール",
    "needles_configurator_description": "あなたの設定に最適なキャブレターニードルを見つける",
    "chassis_decoder_title": "シャシーデコーダー",
    "chassis_decoder_description": "あなたのClassic Miniのシャシー番号をデコード",
    "engine_decoder_title": "エンジンデコーダー",
    "engine_decoder_description": "コードからあなたのエンジン仕様を特定",
    "color_decoder_title": "カラーデコーダー",
    "color_decoder_description": "コードからあなたのMiniの元の色を見つける",
    "support_title": "私たちの活動をサポート",
    "support_description": "これらのツールがお役に立った場合は、Patreonで私たちをサポートして、サイトの維持と改善にご協力ください。",
    "support_button": "Patreonでサポート"
  },
  "zh": {
    "title": "Classic Mini DIY 技术工具箱 - 计算器和工具",
    "description": "Classic Mini车主的必备技术工具。压缩、变速箱、化油器针计算器等，用于维护和改装。",
    "keywords": "Classic Mini, 技术工具, 压缩计算器, 变速箱计算器, 化油器针, 维护工具",
    "hero_title": "技术工具箱",
    "hero_subtitle": "Classic Mini车主的必备工具",
    "breadcrumb_home": "首页",
    "breadcrumb_technical": "技术",
    "compression_calculator_title": "压缩比计算器",
    "compression_calculator_description": "计算您的Classic Mini发动机的压缩比",
    "gearbox_calculator_title": "变速箱计算器",
    "gearbox_calculator_description": "分析齿轮比和最高速度",
    "needles_configurator_title": "针配置器",
    "needles_configurator_description": "为您的配置找到完美的化油器针",
    "chassis_decoder_title": "底盘解码器",
    "chassis_decoder_description": "解码您的Classic Mini底盘号码",
    "engine_decoder_title": "发动机解码器",
    "engine_decoder_description": "通过代码识别您的发动机规格",
    "color_decoder_title": "颜色解码器",
    "color_decoder_description": "通过代码找到您的Mini原始颜色",
    "support_title": "支持我们的工作",
    "support_description": "如果这些工具对您有用，请考虑在Patreon上支持我们，帮助维护和改进网站。",
    "support_button": "在Patreon支持"
  },
  "ko": {
    "title": "Classic Mini DIY 기술 도구상자 - 계산기와 도구",
    "description": "Classic Mini 소유자를 위한 필수 기술 도구. 압축, 기어박스, 카뷰레터 니들 계산기 등 유지보수와 개조를 위한 도구.",
    "keywords": "Classic Mini, 기술 도구, 압축 계산기, 기어박스 계산기, 카뷰레터 니들, 유지보수 도구",
    "hero_title": "기술 도구상자",
    "hero_subtitle": "Classic Mini 소유자를 위한 필수 도구",
    "breadcrumb_home": "홈",
    "breadcrumb_technical": "기술",
    "compression_calculator_title": "압축비 계산기",
    "compression_calculator_description": "당신의 Classic Mini 엔진의 압축비를 계산하세요",
    "gearbox_calculator_title": "기어박스 계산기",
    "gearbox_calculator_description": "기어비와 최고 속도를 분석하세요",
    "needles_configurator_title": "니들 구성기",
    "needles_configurator_description": "당신의 구성에 완벽한 카뷰레터 니들을 찾으세요",
    "chassis_decoder_title": "섀시 디코더",
    "chassis_decoder_description": "당신의 Classic Mini 섀시 번호를 디코드하세요",
    "engine_decoder_title": "엔진 디코더",
    "engine_decoder_description": "코드로 당신의 엔진 사양을 식별하세요",
    "color_decoder_title": "색상 디코더",
    "color_decoder_description": "코드로 당신의 Mini 원래 색상을 찾으세요",
    "support_title": "우리의 작업을 지원하세요",
    "support_description": "이 도구들이 유용했다면, Patreon에서 우리를 지원하여 사이트 유지와 개선에 도움을 주세요.",
    "support_button": "Patreon에서 지원"
  }
}
</i18n>

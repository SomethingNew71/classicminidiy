<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  interface PartItem {
    brand: string;
    part: string;
    info?: string;
    [key: string]: any; // For any additional properties
  }

  interface PartsTable {
    title: string;
    items: PartItem[];
  }

  const { data: tables } = await useFetch<Record<string, PartsTable>>('/api/parts');
  const searchValue = ref('');
  const activePanels = ref<Record<string, boolean>>({
    'Air Filters': true,
    'Oil Filters': true,
    Alternators: true,
  });

  const togglePanel = (panel: string) => {
    activePanels.value[panel] = !activePanels.value[panel];
  };

  const tableHeaders = [
    { title: $t('table_headers.brand'), key: 'brand' },
    { title: $t('table_headers.part_number'), key: 'part' },
    { title: $t('table_headers.usage_info'), key: 'info' },
  ];

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
    ogUrl: 'https://classicminidiy.com/technical/parts',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/parts.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/parts.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.TECH" />

  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" :page="$t('breadcrumb_title')" />
    </div>

    <div class="space-y-4">
      <div v-for="(table, name, index) in tables" :key="`${name}-${index}`" class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" :checked="activePanels[table.title]" @change="togglePanel(table.title)" />
        <div class="collapse-title text-xl font-medium flex items-center justify-between">
          {{ table.title }}
        </div>
        <div class="collapse-content">
          <div class="py-4">
            <div class="form-control w-full max-w-xs ml-auto mb-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('ui.search_placeholder')"
                  class="input input-bordered w-full pr-10"
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-search text-gray-400"></i>
                </span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.key">
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, itemIndex) in table.items.filter((i: PartItem) =>
                      Object.values(i).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
                    )"
                    :key="itemIndex"
                  >
                    <td>{{ item.brand }}</td>
                    <td>{{ item.part }}</td>
                    <td>{{ item.info }}</td>
                  </tr>
                  <tr v-if="!table.items.length">
                    <td :colspan="tableHeaders.length" class="text-center py-4">
                      {{ $t('ui.no_items_found') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider my-12">{{ $t('ui.support_section') }}</div>
    <div class="mb-8">
      <patreon-card size="large" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Tech - Parts Equivalency",
    "description": "A complete list of parts which can be found at local parts sellers",
    "hero_title": "Parts Equivalency",
    "breadcrumb_title": "Parts Equivalency",
    "og_title": "Tech - Parts Equivalency",
    "og_description": "A complete list of parts which can be found at local parts sellers",
    "twitter_title": "Tech - Parts Equivalency",
    "twitter_description": "A complete list of parts which can be found at local parts sellers",
    "table_headers": {
      "brand": "Brand",
      "part_number": "Part Number",
      "usage_info": "Usage Info"
    },
    "ui": {
      "search_placeholder": "Search...",
      "no_items_found": "No items found",
      "support_section": "Support"
    }
  },
  "es": {
    "title": "Tech - Equivalencia de Piezas",
    "description": "Una lista completa de piezas que se pueden encontrar en vendedores de piezas locales",
    "hero_title": "Equivalencia de Piezas",
    "breadcrumb_title": "Equivalencia de Piezas",
    "og_title": "Tech - Equivalencia de Piezas",
    "og_description": "Una lista completa de piezas que se pueden encontrar en vendedores de piezas locales",
    "twitter_title": "Tech - Equivalencia de Piezas",
    "twitter_description": "Una lista completa de piezas que se pueden encontrar en vendedores de piezas locales",
    "table_headers": {
      "brand": "Marca",
      "part_number": "Número de Pieza",
      "usage_info": "Información de Uso"
    },
    "ui": {
      "search_placeholder": "Buscar...",
      "no_items_found": "No se encontraron elementos",
      "support_section": "Soporte"
    }
  },
  "fr": {
    "title": "Tech - Équivalence des Pièces",
    "description": "Une liste complète des pièces qui peuvent être trouvées chez les vendeurs de pièces locaux",
    "hero_title": "Équivalence des Pièces",
    "breadcrumb_title": "Équivalence des Pièces",
    "og_title": "Tech - Équivalence des Pièces",
    "og_description": "Une liste complète des pièces qui peuvent être trouvées chez les vendeurs de pièces locaux",
    "twitter_title": "Tech - Équivalence des Pièces",
    "twitter_description": "Une liste complète des pièces qui peuvent être trouvées chez les vendeurs de pièces locaux",
    "table_headers": {
      "brand": "Marque",
      "part_number": "Numéro de Pièce",
      "usage_info": "Informations d'Utilisation"
    },
    "ui": {
      "search_placeholder": "Rechercher...",
      "no_items_found": "Aucun élément trouvé",
      "support_section": "Support"
    }
  },
  "it": {
    "title": "Tech - Equivalenza Parti",
    "description": "Un elenco completo di parti che possono essere trovate presso i venditori di parti locali",
    "hero_title": "Equivalenza Parti",
    "breadcrumb_title": "Equivalenza Parti",
    "og_title": "Tech - Equivalenza Parti",
    "og_description": "Un elenco completo di parti che possono essere trovate presso i venditori di parti locali",
    "twitter_title": "Tech - Equivalenza Parti",
    "twitter_description": "Un elenco completo di parti che possono essere trovate presso i venditori di parti locali",
    "table_headers": {
      "brand": "Marca",
      "part_number": "Numero Parte",
      "usage_info": "Informazioni Utilizzo"
    },
    "ui": {
      "search_placeholder": "Cerca...",
      "no_items_found": "Nessun elemento trovato",
      "support_section": "Supporto"
    }
  },
  "de": {
    "title": "Tech - Teileäquivalenz",
    "description": "Eine vollständige Liste von Teilen, die bei lokalen Teilehändlern gefunden werden können",
    "hero_title": "Teileäquivalenz",
    "breadcrumb_title": "Teileäquivalenz",
    "og_title": "Tech - Teileäquivalenz",
    "og_description": "Eine vollständige Liste von Teilen, die bei lokalen Teilehändlern gefunden werden können",
    "twitter_title": "Tech - Teileäquivalenz",
    "twitter_description": "Eine vollständige Liste von Teilen, die bei lokalen Teilehändlern gefunden werden können",
    "table_headers": {
      "brand": "Marke",
      "part_number": "Teilenummer",
      "usage_info": "Verwendungsinfo"
    },
    "ui": {
      "search_placeholder": "Suchen...",
      "no_items_found": "Keine Elemente gefunden",
      "support_section": "Support"
    }
  },
  "pt": {
    "title": "Tech - Equivalência de Peças",
    "description": "Uma lista completa de peças que podem ser encontradas em vendedores de peças locais",
    "hero_title": "Equivalência de Peças",
    "breadcrumb_title": "Equivalência de Peças",
    "og_title": "Tech - Equivalência de Peças",
    "og_description": "Uma lista completa de peças que podem ser encontradas em vendedores de peças locais",
    "twitter_title": "Tech - Equivalência de Peças",
    "twitter_description": "Uma lista completa de peças que podem ser encontradas em vendedores de peças locais",
    "table_headers": {
      "brand": "Marca",
      "part_number": "Número da Peça",
      "usage_info": "Informações de Uso"
    },
    "ui": {
      "search_placeholder": "Pesquisar...",
      "no_items_found": "Nenhum item encontrado",
      "support_section": "Suporte"
    }
  },
  "ru": {
    "title": "Tech - Эквивалентность деталей",
    "description": "Полный список деталей, которые можно найти у местных продавцов деталей",
    "hero_title": "Эквивалентность деталей",
    "breadcrumb_title": "Эквивалентность деталей",
    "og_title": "Tech - Эквивалентность деталей",
    "og_description": "Полный список деталей, которые можно найти у местных продавцов деталей",
    "twitter_title": "Tech - Эквивалентность деталей",
    "twitter_description": "Полный список деталей, которые можно найти у местных продавцов деталей",
    "table_headers": {
      "brand": "Бренд",
      "part_number": "Номер детали",
      "usage_info": "Информация об использовании"
    },
    "ui": {
      "search_placeholder": "Поиск...",
      "no_items_found": "Элементы не найдены",
      "support_section": "Поддержка"
    }
  },
  "ja": {
    "title": "Tech - パーツ互換性",
    "description": "地元のパーツ販売店で見つけることができるパーツの完全なリスト",
    "hero_title": "パーツ互換性",
    "breadcrumb_title": "パーツ互換性",
    "og_title": "Tech - パーツ互換性",
    "og_description": "地元のパーツ販売店で見つけることができるパーツの完全なリスト",
    "twitter_title": "Tech - パーツ互換性",
    "twitter_description": "地元のパーツ販売店で見つけることができるパーツの完全なリスト",
    "table_headers": {
      "brand": "ブランド",
      "part_number": "パーツ番号",
      "usage_info": "使用情報"
    },
    "ui": {
      "search_placeholder": "検索...",
      "no_items_found": "アイテムが見つかりません",
      "support_section": "サポート"
    }
  },
  "zh": {
    "title": "Tech - 零件等效性",
    "description": "可以在当地零件销售商处找到的零件完整列表",
    "hero_title": "零件等效性",
    "breadcrumb_title": "零件等效性",
    "og_title": "Tech - 零件等效性",
    "og_description": "可以在当地零件销售商处找到的零件完整列表",
    "twitter_title": "Tech - 零件等效性",
    "twitter_description": "可以在当地零件销售商处找到的零件完整列表",
    "table_headers": {
      "brand": "品牌",
      "part_number": "零件号",
      "usage_info": "使用信息"
    },
    "ui": {
      "search_placeholder": "搜索...",
      "no_items_found": "未找到项目",
      "support_section": "支持"
    }
  },
  "ko": {
    "title": "Tech - 부품 등가성",
    "description": "지역 부품 판매업체에서 찾을 수 있는 부품의 완전한 목록",
    "hero_title": "부품 등가성",
    "breadcrumb_title": "부품 등가성",
    "og_title": "Tech - 부품 등가성",
    "og_description": "지역 부품 판매업체에서 찾을 수 있는 부품의 완전한 목록",
    "twitter_title": "Tech - 부품 등가성",
    "twitter_description": "지역 부품 판매업체에서 찾을 수 있는 부품의 완전한 목록",
    "table_headers": {
      "brand": "브랜드",
      "part_number": "부품 번호",
      "usage_info": "사용 정보"
    },
    "ui": {
      "search_placeholder": "검색...",
      "no_items_found": "항목을 찾을 수 없음",
      "support_section": "지원"
    }
  }
}
</i18n>

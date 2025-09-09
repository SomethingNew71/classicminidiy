<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  interface ClearanceItem {
    name: string;
    thou: string;
    mm: string;
    notes?: string;
    [key: string]: any;
  }

  interface ClearanceTable {
    title: string;
    items: ClearanceItem[];
    search?: string;
  }

  const { data: tables } = await useFetch<Record<string, ClearanceTable>>('/api/clearance');
  const searchValue = ref('');
  const expandedRows = ref<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    expandedRows.value[id] = !expandedRows.value[id];
  };

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
    ogUrl: 'https://classicminidiy.com/technical/clearance',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
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
        <input type="checkbox" checked />
        <div class="collapse-title text-xl font-medium">
          {{ table.title }}
        </div>
        <div class="collapse-content">
          <div class="py-4">
            <div class="form-control w-full max-w-xs ml-auto mb-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('search.placeholder')"
                  class="input input-bordered w-full pr-10"
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-search text-gray-400"></i>
                </span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>{{ $t('table.headers.part') }}</th>
                    <th>{{ $t('table.headers.clearance_thou') }}</th>
                    <th>{{ $t('table.headers.clearance_mm') }}</th>
                    <th>{{ $t('table.headers.expand') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(item, itemIndex) in table.items.filter((i: ClearanceItem) =>
                      Object.values(i).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
                    )"
                    :key="itemIndex"
                  >
                    <tr class="hover cursor-pointer" @click="toggleRow(`${name}-${itemIndex}`)">
                      <td>{{ item.name }}</td>
                      <td>{{ item.thou || $t('table.no_value') }}</td>
                      <td>{{ item.mm || $t('table.no_value') }}</td>
                      <td class="text-right">
                        <i
                          class="fas transition-transform duration-200"
                          :class="expandedRows[`${name}-${itemIndex}`] ? 'fa-chevron-up' : 'fa-chevron-down'"
                        ></i>
                      </td>
                    </tr>
                    <tr v-if="expandedRows[`${name}-${itemIndex}`]" class="bg-base-200">
                      <td colspan="4" class="p-4">
                        <div class="font-semibold mb-2">
                          {{ $t('table.extra_notes_title') }}
                        </div>
                        <div class="whitespace-pre-line">
                          {{ item.notes || $t('table.no_notes_available') }}
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="!table.items.length">
                    <td colspan="4" class="text-center py-4">
                      {{ $t('table.no_items_found') }}
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
    "title": "Tech - Mini Clearances",
    "description": "Detailed clearance specifications can be found online right here at Classic Mini DIY.",
    "hero_title": "Common Clearances",
    "breadcrumb_title": "Common Clearances",
    "og_title": "Tech - Mini Clearances",
    "og_description": "Detailed clearance specifications for the Classic Mini can be found online right here at Classic Mini DIY.",
    "twitter_title": "Tech - Mini Clearances",
    "twitter_description": "Detailed clearance specifications for the Classic Mini can be found online right here at Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Part",
        "clearance_thou": "Clearance/Endfloat (thou)",
        "clearance_mm": "Clearance/Endfloat (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "No items found",
      "extra_notes_title": "Extra Notes:",
      "no_notes_available": "No additional notes available."
    },
    "search": {
      "placeholder": "Search..."
    },
    "ui": {
      "support_section": "Support"
    }
  },
  "es": {
    "title": "Tech - Holguras Mini",
    "description": "Las especificaciones detalladas de holguras se pueden encontrar en línea aquí mismo en Classic Mini DIY.",
    "hero_title": "Holguras Comunes",
    "breadcrumb_title": "Holguras Comunes",
    "og_title": "Tech - Holguras Mini",
    "og_description": "Las especificaciones detalladas de holguras para el Classic Mini se pueden encontrar en línea aquí mismo en Classic Mini DIY.",
    "twitter_title": "Tech - Holguras Mini",
    "twitter_description": "Las especificaciones detalladas de holguras para el Classic Mini se pueden encontrar en línea aquí mismo en Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Pieza",
        "clearance_thou": "Holgura/Juego Axial (thou)",
        "clearance_mm": "Holgura/Juego Axial (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "No se encontraron elementos",
      "extra_notes_title": "Notas Adicionales:",
      "no_notes_available": "No hay notas adicionales disponibles."
    },
    "search": {
      "placeholder": "Buscar..."
    },
    "ui": {
      "support_section": "Soporte"
    }
  },
  "fr": {
    "title": "Tech - Jeux Mini",
    "description": "Les spécifications détaillées des jeux peuvent être trouvées en ligne ici même sur Classic Mini DIY.",
    "hero_title": "Jeux Communs",
    "breadcrumb_title": "Jeux Communs",
    "og_title": "Tech - Jeux Mini",
    "og_description": "Les spécifications détaillées des jeux pour la Classic Mini peuvent être trouvées en ligne ici même sur Classic Mini DIY.",
    "twitter_title": "Tech - Jeux Mini",
    "twitter_description": "Les spécifications détaillées des jeux pour la Classic Mini peuvent être trouvées en ligne ici même sur Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Pièce",
        "clearance_thou": "Jeu/Jeu Axial (thou)",
        "clearance_mm": "Jeu/Jeu Axial (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "Aucun élément trouvé",
      "extra_notes_title": "Notes Supplémentaires :",
      "no_notes_available": "Aucune note supplémentaire disponible."
    },
    "search": {
      "placeholder": "Rechercher..."
    },
    "ui": {
      "support_section": "Support"
    }
  },
  "it": {
    "title": "Tech - Giochi Mini",
    "description": "Le specifiche dettagliate dei giochi possono essere trovate online proprio qui su Classic Mini DIY.",
    "hero_title": "Giochi Comuni",
    "breadcrumb_title": "Giochi Comuni",
    "og_title": "Tech - Giochi Mini",
    "og_description": "Le specifiche dettagliate dei giochi per la Classic Mini possono essere trovate online proprio qui su Classic Mini DIY.",
    "twitter_title": "Tech - Giochi Mini",
    "twitter_description": "Le specifiche dettagliate dei giochi per la Classic Mini possono essere trovate online proprio qui su Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Parte",
        "clearance_thou": "Gioco/Gioco Assiale (thou)",
        "clearance_mm": "Gioco/Gioco Assiale (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "Nessun elemento trovato",
      "extra_notes_title": "Note Aggiuntive:",
      "no_notes_available": "Nessuna nota aggiuntiva disponibile."
    },
    "search": {
      "placeholder": "Cerca..."
    },
    "ui": {
      "support_section": "Supporto"
    }
  },
  "de": {
    "title": "Tech - Mini Spiele",
    "description": "Detaillierte Spiel-Spezifikationen können online hier bei Classic Mini DIY gefunden werden.",
    "hero_title": "Häufige Spiele",
    "breadcrumb_title": "Häufige Spiele",
    "og_title": "Tech - Mini Spiele",
    "og_description": "Detaillierte Spiel-Spezifikationen für den Classic Mini können online hier bei Classic Mini DIY gefunden werden.",
    "twitter_title": "Tech - Mini Spiele",
    "twitter_description": "Detaillierte Spiel-Spezifikationen für den Classic Mini können online hier bei Classic Mini DIY gefunden werden.",
    "table": {
      "headers": {
        "part": "Teil",
        "clearance_thou": "Spiel/Axialspiel (thou)",
        "clearance_mm": "Spiel/Axialspiel (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "Keine Elemente gefunden",
      "extra_notes_title": "Zusätzliche Hinweise:",
      "no_notes_available": "Keine zusätzlichen Hinweise verfügbar."
    },
    "search": {
      "placeholder": "Suchen..."
    },
    "ui": {
      "support_section": "Support"
    }
  },
  "pt": {
    "title": "Tech - Folgas Mini",
    "description": "Especificações detalhadas de folgas podem ser encontradas online aqui mesmo no Classic Mini DIY.",
    "hero_title": "Folgas Comuns",
    "breadcrumb_title": "Folgas Comuns",
    "og_title": "Tech - Folgas Mini",
    "og_description": "Especificações detalhadas de folgas para o Classic Mini podem ser encontradas online aqui mesmo no Classic Mini DIY.",
    "twitter_title": "Tech - Folgas Mini",
    "twitter_description": "Especificações detalhadas de folgas para o Classic Mini podem ser encontradas online aqui mesmo no Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Peça",
        "clearance_thou": "Folga/Folga Axial (thou)",
        "clearance_mm": "Folga/Folga Axial (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "Nenhum item encontrado",
      "extra_notes_title": "Notas Adicionais:",
      "no_notes_available": "Nenhuma nota adicional disponível."
    },
    "search": {
      "placeholder": "Pesquisar..."
    },
    "ui": {
      "support_section": "Suporte"
    }
  },
  "ru": {
    "title": "Tech - Зазоры Mini",
    "description": "Подробные спецификации зазоров можно найти онлайн прямо здесь на Classic Mini DIY.",
    "hero_title": "Общие Зазоры",
    "breadcrumb_title": "Общие Зазоры",
    "og_title": "Tech - Зазоры Mini",
    "og_description": "Подробные спецификации зазоров для Classic Mini можно найти онлайн прямо здесь на Classic Mini DIY.",
    "twitter_title": "Tech - Зазоры Mini",
    "twitter_description": "Подробные спецификации зазоров для Classic Mini можно найти онлайн прямо здесь на Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Деталь",
        "clearance_thou": "Зазор/Осевой Зазор (thou)",
        "clearance_mm": "Зазор/Осевой Зазор (мм)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "Элементы не найдены",
      "extra_notes_title": "Дополнительные Примечания:",
      "no_notes_available": "Дополнительные примечания недоступны."
    },
    "search": {
      "placeholder": "Поиск..."
    },
    "ui": {
      "support_section": "Поддержка"
    }
  },
  "ja": {
    "title": "Tech - ミニクリアランス",
    "description": "詳細なクリアランス仕様は、Classic Mini DIYでオンラインで見つけることができます。",
    "hero_title": "一般的なクリアランス",
    "breadcrumb_title": "一般的なクリアランス",
    "og_title": "Tech - ミニクリアランス",
    "og_description": "クラシック・ミニの詳細なクリアランス仕様は、Classic Mini DIYでオンラインで見つけることができます。",
    "twitter_title": "Tech - ミニクリアランス",
    "twitter_description": "クラシック・ミニの詳細なクリアランス仕様は、Classic Mini DIYでオンラインで見つけることができます。",
    "table": {
      "headers": {
        "part": "部品",
        "clearance_thou": "クリアランス/エンドフロート (thou)",
        "clearance_mm": "クリアランス/エンドフロート (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "アイテムが見つかりません",
      "extra_notes_title": "追加注記:",
      "no_notes_available": "追加の注記はありません。"
    },
    "search": {
      "placeholder": "検索..."
    },
    "ui": {
      "support_section": "サポート"
    }
  },
  "zh": {
    "title": "Tech - 迷你间隙",
    "description": "详细的间隙规格可以在Classic Mini DIY在线找到。",
    "hero_title": "常见间隙",
    "breadcrumb_title": "常见间隙",
    "og_title": "Tech - 迷你间隙",
    "og_description": "经典迷你的详细间隙规格可以在Classic Mini DIY在线找到。",
    "twitter_title": "Tech - 迷你间隙",
    "twitter_description": "经典迷你的详细间隙规格可以在Classic Mini DIY在线找到。",
    "table": {
      "headers": {
        "part": "部件",
        "clearance_thou": "间隙/轴向间隙 (thou)",
        "clearance_mm": "间隙/轴向间隙 (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "未找到项目",
      "extra_notes_title": "附加说明:",
      "no_notes_available": "没有可用的附加说明。"
    },
    "search": {
      "placeholder": "搜索..."
    },
    "ui": {
      "support_section": "支持"
    }
  },
  "ko": {
    "title": "Tech - 미니 클리어런스",
    "description": "자세한 클리어런스 사양은 Classic Mini DIY에서 온라인으로 찾을 수 있습니다.",
    "hero_title": "일반적인 클리어런스",
    "breadcrumb_title": "일반적인 클리어런스",
    "og_title": "Tech - 미니 클리어런스",
    "og_description": "클래식 미니의 자세한 클리어런스 사양은 Classic Mini DIY에서 온라인으로 찾을 수 있습니다.",
    "twitter_title": "Tech - 미니 클리어런스",
    "twitter_description": "클래식 미니의 자세한 클리어런스 사양은 Classic Mini DIY에서 온라인으로 찾을 수 있습니다.",
    "table": {
      "headers": {
        "part": "부품",
        "clearance_thou": "클리어런스/엔드플로트 (thou)",
        "clearance_mm": "클리어런스/엔드플로트 (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "항목을 찾을 수 없습니다",
      "extra_notes_title": "추가 참고사항:",
      "no_notes_available": "추가 참고사항이 없습니다."
    },
    "search": {
      "placeholder": "검색..."
    },
    "ui": {
      "support_section": "지원"
    }
  }
}
</i18n>

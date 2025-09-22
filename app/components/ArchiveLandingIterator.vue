<script lang="ts" setup>
  import type { AdvertsCollectionItem, ContentCollectionItem, ManualsCollectionItem } from '@nuxt/content';
  import { shareArchiveItem, submitArchiveFile, type ARCHIVE_TYPES } from '../../data/models/helper-utils';

  const { t } = useI18n({ useScope: 'local' });
  const search = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 12;
  const viewMode = ref<'cards' | 'table'>('table');

  const props = defineProps({
    archiveType: {
      type: String as PropType<ARCHIVE_TYPES>,
      default: '',
    },
    content: {
      type: Array as PropType<AdvertsCollectionItem[] | ManualsCollectionItem[] | ContentCollectionItem[] | null>,
      default: () => [],
    },
    loading: {
      type: String as PropType<'idle' | 'pending' | 'success' | 'error'>,
      default: 'idle',
    },
  });

  const filteredItems = computed(() => {
    if (!props.content) return [];

    return props.content.filter((item) => {
      const searchLower = search.value.toLowerCase();
      if (!searchLower) return true;

      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.code?.toLowerCase().includes(searchLower)
      );
    });
  });

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.value.slice(startIndex, endIndex);
  });

  const pageCount = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
  });

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  function nextPage() {
    if (currentPage.value < pageCount.value) {
      currentPage.value++;
    }
  }
</script>

<template>
  <div class="w-full">
    <!-- Search Header and View Toggle -->
    <div class="mb-8 w-full">
      <div class="flex flex-col lg:flex-row gap-4 items-end">
        <div class="form-control flex-1">
          <div class="input-group w-full">
            <label class="input w-full">
              <span class="label"><i class="fad fa-search"></i></span>
              <input
                v-model="search"
                :placeholder="t('search_placeholder')"
                type="text"
                class="input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <!-- View Mode Toggle -->
        <div class="join">
          <button class="btn join-item" :class="{ 'btn-active': viewMode === 'cards' }" @click="viewMode = 'cards'">
            <i class="fad fa-grid-2 mr-2"></i>
            {{ t('view_modes.cards') }}
          </button>
          <button class="btn join-item" :class="{ 'btn-active': viewMode === 'table' }" @click="viewMode = 'table'">
            <i class="fad fa-table mr-2"></i>
            {{ t('view_modes.table') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading === 'pending'">
      <!-- Cards Loading Skeleton -->
      <div v-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="k in 12" :key="k" class="card card-bordered bg-base-100 shadow-sm animate-pulse">
          <div class="h-[150px] bg-base-200"></div>
          <div class="card-body">
            <div class="h-4 bg-base-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-base-200 rounded w-1/2 mb-4"></div>
            <div class="h-3 bg-base-200 rounded w-full"></div>
            <div class="card-actions justify-between mt-4">
              <div class="h-8 bg-base-200 rounded w-1/4"></div>
              <div class="h-8 bg-base-200 rounded w-1/4"></div>
              <div class="h-8 bg-base-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Loading Skeleton -->
      <div v-else class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="hidden md:table-cell">{{ t('table_headers.image') }}</th>
              <th class="hidden md:table-cell text-center">{{ t('table_headers.file_type') }}</th>
              <th>{{ t('table_headers.title') }}</th>
              <th class="text-right">{{ t('table_headers.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in 12" :key="k" class="animate-pulse">
              <td><div class="h-12 w-12 bg-base-200 rounded"></div></td>
              <td><div class="h-4 bg-base-200 rounded w-3/4"></div></td>
              <td><div class="h-4 bg-base-200 rounded w-full"></div></td>
              <td><div class="h-8 bg-base-200 rounded w-1/2"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Content Views -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-8">
        <div class="card card-bordered bg-base-100 shadow-sm">
          <div class="card-body">
            <p class="text-base-content">{{ t('empty_state') }}</p>
          </div>
        </div>
      </div>

      <!-- Cards View -->
      <div v-else-if="viewMode === 'cards'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in paginatedItems" :key="item.title" class="card card-bordered bg-base-100 shadow-sm">
          <!-- Image Section -->
          <figure v-if="item.image && item.image !== ''">
            <a v-if="item.download && item.download !== ''" :href="item.download" target="_blank">
              <img :src="item.image" alt="item.title" class="h-[150px] w-full object-cover" />
            </a>
            <img v-else :src="item.image" alt="item.title" class="h-[150px] w-full object-cover" />
          </figure>
          <div v-else class="flex justify-center items-center h-[150px] bg-base-200">
            <i class="fad fa-image-slash text-4xl text-base-content/50"></i>
          </div>

          <!-- File Type Icon -->
          <div class="absolute top-2 right-2">
            <i
              v-if="item.download"
              :class="[
                'fad',
                'fa-file-' + (item?.download?.split('.').pop()?.toLowerCase() || ''),
                'text-2xl',
                'text-secondary',
              ]"
            ></i>
          </div>

          <div class="card-body p-4">
            <!-- Title and Code -->
            <h2 class="card-title text-lg font-bold">{{ item.title }}</h2>
            <p class="text-sm text-base-content/70">{{ t('sort_key_label') }} {{ item.code }}</p>

            <!-- Description -->
            <p class="text-sm my-2">{{ item.description }}</p>

            <!-- Actions -->
            <div class="card-actions justify-between mt-4">
              <button class="btn btn-sm btn-outline" @click="shareArchiveItem(item.title, item.path)">
                <i class="fad fa-arrow-up-from-bracket mr-1"></i>
                {{ t('actions.share') }}
              </button>

              <a
                v-if="item.download && item.download !== ''"
                class="btn btn-sm btn-primary"
                :href="item.download"
                target="_blank"
              >
                <i class="fad fa-download mr-1"></i> {{ t('actions.download') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div v-else class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="hidden md:table-cell">{{ t('table_headers.image') }}</th>
              <th class="hidden md:table-cell text-center">{{ t('table_headers.file_type') }}</th>
              <th>{{ t('table_headers.title') }}</th>
              <th class="text-right">{{ t('table_headers.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedItems" :key="item.title">
              <!-- Image -->
              <td class="hidden md:table-cell">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <a v-if="item.download && item.download !== ''" :href="item.download" target="_blank">
                        <img
                          v-if="item.image && item.image !== ''"
                          :src="item.image"
                          :alt="item.title"
                          class="h-12 w-12 object-cover"
                        />
                        <div v-else class="flex justify-center items-center h-12 w-12 bg-base-200">
                          <i class="fad fa-image-slash text-lg text-base-content/50"></i>
                        </div>
                      </a>
                      <img
                        v-else-if="item.image && item.image !== ''"
                        :src="item.image"
                        :alt="item.title"
                        class="h-12 w-12 object-cover"
                      />
                      <div v-else class="flex justify-center items-center h-12 w-12 bg-base-200">
                        <i class="fad fa-image-slash text-lg text-base-content/50"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <!-- File Type -->
              <td class="hidden md:table-cell">
                <div class="flex justify-center">
                  <div
                    v-if="item.download && item.download !== ''"
                    class="tooltip"
                    :data-tip="item.download.split('.').pop()?.toUpperCase()"
                  >
                    <i
                      :class="[
                        'fad',
                        'fa-file-' + (item?.download?.split('.').pop()?.toLowerCase() || ''),
                        'text-2xl',
                        'text-secondary',
                      ]"
                    ></i>
                  </div>
                  <div v-else class="tooltip" :data-tip="t('labels.no_file')">
                    <i class="fad fa-question-circle text-2xl text-warning"></i>
                  </div>
                </div>
              </td>

              <!-- Title and Description -->
              <td>
                <div>
                  <div class="font-bold">{{ item.title }}</div>
                  <div class="text-sm opacity-50">{{ item.description }}</div>
                </div>
              </td>

              <!-- Actions -->
              <td class="text-right">
                <div class="flex gap-2 justify-end">
                  <button
                    class="btn btn-circle btn-ghost btn-secondary"
                    @click="shareArchiveItem(item.title, item.path)"
                    :title="t('actions.share')"
                  >
                    <i class="fad fa-arrow-up-from-bracket"></i>
                  </button>

                  <a
                    v-if="item.download && item.download !== ''"
                    class="btn btn-circle btn-ghost btn-primary"
                    :href="item.download"
                    target="_blank"
                    :title="t('actions.download')"
                  >
                    <i class="fad fa-download"></i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- foot -->
          <tfoot>
            <tr>
              <th class="hidden md:table-cell">{{ t('table_headers.image') }}</th>
              <th class="hidden md:table-cell text-center">{{ t('table_headers.file_type') }}</th>
              <th>{{ t('table_headers.title') }}</th>
              <th class="text-right">{{ t('table_headers.actions') }}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pageCount > 1" class="flex justify-center items-center mt-8 space-x-2">
        <button class="btn btn-circle btn-sm" :disabled="currentPage === 1" @click="prevPage">
          <i class="fad fa-arrow-left"></i>
        </button>

        <span class="text-sm">{{ t('pagination.page_text', { current: currentPage, total: pageCount }) }}</span>

        <button class="btn btn-circle btn-sm" :disabled="currentPage >= pageCount" @click="nextPage">
          <i class="fad fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "search_placeholder": "Search for anything (ex. MPI, Cooper S, Carburettor HIF44)",
    "empty_state": "No items meeting current filters exist",
    "sort_key_label": "Sort Key:",
    "view_modes": {
      "cards": "Cards",
      "table": "Table"
    },
    "table_headers": {
      "image": "Image",
      "file_type": "Type",
      "title": "Title",
      "description": "Description",
      "actions": "Actions"
    },
    "labels": {
      "no_file": "No File"
    },
    "actions": {
      "share": "Share",
      "contribute": "Contribute",
      "download": "Download"
    },
    "pagination": {
      "page_text": "Page {current} of {total}"
    }
  },
  "de": {
    "search_placeholder": "Suche nach allem (z.B. MPI, Cooper S, Vergaser HIF44)",
    "empty_state": "Es existieren keine Elemente, die den aktuellen Filtern entsprechen",
    "sort_key_label": "Sortierschlüssel:",
    "view_modes": {
      "cards": "Karten",
      "table": "Tabelle"
    },
    "table_headers": {
      "image": "Bild",
      "file_type": "Typ",
      "title": "Titel",
      "description": "Beschreibung",
      "actions": "Aktionen"
    },
    "labels": {
      "no_file": "Keine Datei"
    },
    "actions": {
      "share": "Teilen",
      "contribute": "Beitragen",
      "download": "Herunterladen"
    },
    "pagination": {
      "page_text": "Seite {current} von {total}"
    }
  },
  "es": {
    "search_placeholder": "Buscar cualquier cosa (ej. MPI, Cooper S, Carburador HIF44)",
    "empty_state": "No existen elementos que cumplan los filtros actuales",
    "sort_key_label": "Clave de Ordenamiento:",
    "view_modes": {
      "cards": "Tarjetas",
      "table": "Tabla"
    },
    "table_headers": {
      "image": "Imagen",
      "file_type": "Tipo",
      "title": "Título",
      "description": "Descripción",
      "actions": "Acciones"
    },
    "labels": {
      "no_file": "Sin Archivo"
    },
    "actions": {
      "share": "Compartir",
      "contribute": "Contribuir",
      "download": "Descargar"
    },
    "pagination": {
      "page_text": "Página {current} de {total}"
    }
  },
  "fr": {
    "search_placeholder": "Rechercher n'importe quoi (ex. MPI, Cooper S, Carburateur HIF44)",
    "empty_state": "Aucun élément répondant aux filtres actuels n'existe",
    "sort_key_label": "Clé de tri :",
    "view_modes": {
      "cards": "Cartes",
      "table": "Tableau"
    },
    "table_headers": {
      "image": "Image",
      "file_type": "Type",
      "title": "Titre",
      "description": "Description",
      "actions": "Actions"
    },
    "labels": {
      "no_file": "Aucun Fichier"
    },
    "actions": {
      "share": "Partager",
      "contribute": "Contribuer",
      "download": "Télécharger"
    },
    "pagination": {
      "page_text": "Page {current} sur {total}"
    }
  },
  "it": {
    "search_placeholder": "Cerca qualsiasi cosa (es. MPI, Cooper S, Carburatore HIF44)",
    "empty_state": "Non esistono elementi che soddisfano i filtri attuali",
    "sort_key_label": "Chiave di ordinamento:",
    "view_modes": {
      "cards": "Schede",
      "table": "Tabella"
    },
    "table_headers": {
      "image": "Immagine",
      "file_type": "Tipo",
      "title": "Titolo",
      "description": "Descrizione",
      "actions": "Azioni"
    },
    "labels": {
      "no_file": "Nessun File"
    },
    "actions": {
      "share": "Condividi",
      "contribute": "Contribuisci",
      "download": "Scarica"
    },
    "pagination": {
      "page_text": "Pagina {current} di {total}"
    }
  },
  "pt": {
    "search_placeholder": "Pesquisar por qualquer coisa (ex. MPI, Cooper S, Carburador HIF44)",
    "empty_state": "Não existem itens que atendam aos filtros atuais",
    "sort_key_label": "Chave de Ordenação:",
    "view_modes": {
      "cards": "Cartões",
      "table": "Tabela"
    },
    "table_headers": {
      "image": "Imagem",
      "file_type": "Tipo",
      "title": "Título",
      "description": "Descrição",
      "actions": "Ações"
    },
    "labels": {
      "no_file": "Sem Arquivo"
    },
    "actions": {
      "share": "Compartilhar",
      "contribute": "Contribuir",
      "download": "Baixar"
    },
    "pagination": {
      "page_text": "Página {current} de {total}"
    }
  },
  "ru": {
    "search_placeholder": "Поиск чего угодно (например, MPI, Cooper S, Carburettor HIF44)",
    "empty_state": "Не существует элементов, соответствующих текущим фильтрам",
    "sort_key_label": "Ключ сортировки:",
    "view_modes": {
      "cards": "Карточки",
      "table": "Таблица"
    },
    "table_headers": {
      "image": "Изображение",
      "file_type": "Тип",
      "title": "Название",
      "description": "Описание",
      "actions": "Действия"
    },
    "labels": {
      "no_file": "Нет Файла"
    },
    "actions": {
      "share": "Поделиться",
      "contribute": "Внести вклад",
      "download": "Скачать"
    },
    "pagination": {
      "page_text": "Страница {current} из {total}"
    }
  },
  "ja": {
    "search_placeholder": "何でも検索 (例: MPI、Cooper S、Carburettor HIF44)",
    "empty_state": "現在のフィルターに一致する項目がありません",
    "sort_key_label": "ソートキー:",
    "view_modes": {
      "cards": "カード",
      "table": "テーブル"
    },
    "table_headers": {
      "image": "画像",
      "file_type": "タイプ",
      "title": "タイトル",
      "description": "説明",
      "actions": "アクション"
    },
    "labels": {
      "no_file": "ファイルなし"
    },
    "actions": {
      "share": "共有",
      "contribute": "貢献",
      "download": "ダウンロード"
    },
    "pagination": {
      "page_text": "ページ{current}/{total}"
    }
  },
  "zh": {
    "search_placeholder": "搜索任何内容（例：MPI、Cooper S、化油器HIF44）",
    "empty_state": "没有符合当前筛选条件的项目",
    "sort_key_label": "排序关键字：",
    "view_modes": {
      "cards": "卡片",
      "table": "表格"
    },
    "table_headers": {
      "image": "图片",
      "file_type": "类型",
      "title": "标题",
      "description": "描述",
      "actions": "操作"
    },
    "labels": {
      "no_file": "无文件"
    },
    "actions": {
      "share": "分享",
      "contribute": "贡献",
      "download": "下载"
    },
    "pagination": {
      "page_text": "第{current}页，共{total}页"
    }
  },
  "ko": {
    "search_placeholder": "무엇이든 검색하세요 (예: MPI, Cooper S, Carburettor HIF44)",
    "empty_state": "현재 필터에 맞는 항목이 없습니다",
    "sort_key_label": "정렬 키:",
    "view_modes": {
      "cards": "카드",
      "table": "테이블"
    },
    "table_headers": {
      "image": "이미지",
      "file_type": "유형",
      "title": "제목",
      "description": "설명",
      "actions": "동작"
    },
    "labels": {
      "no_file": "파일 없음"
    },
    "actions": {
      "share": "공유",
      "contribute": "기여하기",
      "download": "다운로드"
    },
    "pagination": {
      "page_text": "{total} 페이지 중 {current} 페이지"
    }
  }
}
</i18n>

<style lang="scss">
  .card-title,
  .card-body p {
    -webkit-hyphens: unset;
    hyphens: unset;
    overflow-wrap: unset;
    overflow: unset;
    white-space: unset;
    text-overflow: unset;
    word-break: unset;
    word-wrap: unset;
  }
</style>

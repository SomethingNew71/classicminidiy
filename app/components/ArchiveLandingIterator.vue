<script lang="ts" setup>
  import type { AdvertsCollectionItem, ContentCollectionItem, ManualsCollectionItem } from '@nuxt/content';
  import { shareArchiveItem, submitArchiveFile, type ARCHIVE_TYPES } from '../../data/models/helper-utils';

  const { t } = useI18n({ useScope: 'local' });
  const search = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 12;

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
    <!-- Search Header -->
    <div class="mb-8 w-full">
      <div class="form-control w-full">
        <div class="input-group w-full">
          <span class="input-group-addon">
            <i class="fad fa-search"></i>
          </span>
          <input
            type="text"
            v-model="search"
            :placeholder="t('search_placeholder')"
            class="input input-bordered w-full"
          />
        </div>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading === 'pending'" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

    <!-- Content Grid -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-8">
        <div class="card card-bordered bg-base-100 shadow-sm">
          <div class="card-body">
            <p class="text-base-content">{{ t('empty_state') }}</p>
          </div>
        </div>
      </div>

      <!-- Items Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in paginatedItems" :key="item.title" class="card card-bordered bg-base-100 shadow-sm">
          <!-- Image Section -->
          <figure v-if="item.image && item.image !== ''">
            <a v-if="item.download && item.download !== ''" :href="item.download">
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

              <button
                class="btn btn-sm btn-outline btn-info"
                @click="submitArchiveFile(archiveType, item.title, item.path, item.code, item.description)"
              >
                <i class="fad fa-plus-large mr-1"></i> {{ t('actions.contribute') }}
              </button>

              <a v-if="item.download && item.download !== ''" class="btn btn-sm btn-primary" :href="item.download">
                <i class="fad fa-download mr-1"></i> {{ t('actions.download') }}
              </a>
            </div>
          </div>
        </div>
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

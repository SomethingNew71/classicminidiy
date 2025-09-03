<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  const expanded = ref<string[]>([]);
  const { data: tables, status } = await useFetch('/api/torque');
  const tableSearchQueries = ref<Record<string, string>>({});
  const { t } = useI18n();
  const tableHeaders = [
    { title: t('pages.technical.subPages.torque.table_headers.fastener'), key: 'name' },
    { title: t('pages.technical.subPages.torque.table_headers.torque_lbft'), key: 'lbft' },
    { title: t('pages.technical.subPages.torque.table_headers.torque_nm'), key: 'nm' },
    { title: t('pages.technical.subPages.torque.table_headers.notes'), key: 'notes' },
  ];
  const activePanel = ref('Engine');

  useHead({
    title: t('pages.technical.subPages.torque.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.technical.subPages.torque.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: t('pages.technical.subPages.torque.keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical/torque',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.technical.subPages.torque.og_title'),
    ogDescription: t('pages.technical.subPages.torque.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/torque',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/torque.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.technical.subPages.torque.twitter_title'),
    twitterDescription: t('pages.technical.subPages.torque.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/torque.png',
  });

  // Add structured data for the torque specifications reference
  const torqueSpecsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t('pages.technical.subPages.torque.structured_data.headline'),
    description: t('pages.technical.subPages.torque.structured_data.description'),
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    author: {
      '@type': 'Person',
      name: 'Classic Mini DIY',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Classic Mini DIY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/technical/torque',
    mainEntity: {
      '@type': 'Dataset',
      name: t('pages.technical.subPages.torque.structured_data.dataset_name'),
      description: t('pages.technical.subPages.torque.structured_data.dataset_description'),
      variableMeasured: t('pages.technical.subPages.torque.structured_data.variable_measured'),
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(torqueSpecsJsonLd),
      },
    ],
  });

  // Filter function for table items
  const filterItems = (items: any[], tableName: string) => {
    const query = tableSearchQueries.value[tableName];
    if (!query) return items;
    const queryLower = query.toLowerCase();
    return items.filter(
      (item: any) =>
        item.name.toLowerCase().includes(queryLower) || (item.notes && item.notes.toLowerCase().includes(queryLower))
    );
  };

  // Toggle expanded state for a row
  const toggleExpanded = (itemName: string) => {
    if (expanded.value.includes(itemName)) {
      expanded.value = expanded.value.filter((name) => name !== itemName);
    } else {
      expanded.value = [...expanded.value, itemName];
    }
  };
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('pages.technical.subPages.torque.hero_title')"
    :textSize="'text-3xl'"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4 pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <breadcrumb
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('pages.technical.subPages.torque.breadcrumb_title')"
        ></breadcrumb>
      </div>
      <div class="col-span-12">
        <!-- Loading state -->
        <div v-if="status === 'pending'" class="space-y-4">
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>

        <!-- Content when loaded -->
        <div v-if="tables && status !== 'pending'" class="space-y-6">
          <div
            v-for="(table, name, index) in tables"
            :key="`${name}-${index}`"
            class="collapse collapse-plus bg-base-200 border border-base-300 mb-2"
          >
            <!-- Accordion header -->
            <input
              type="radio"
              :name="'torque-accordion'"
              :checked="table.title === activePanel"
              @change="activePanel = table.title"
            />
            <div class="collapse-title font-semibold text-xl bg-primary text-primary-content">
              {{ table.title }}
            </div>

            <!-- Accordion content -->
            <div class="collapse-content">
              <!-- Search field -->
              <div class="flex justify-end mb-4 mt-4">
                <div class="form-control w-full max-w-xs">
                  <div class="input-group">
                    <input
                      type="text"
                      :placeholder="$t('pages.technical.subPages.torque.ui.search_placeholder')"
                      v-model="tableSearchQueries[name]"
                      class="input input-bordered w-full input-md"
                    />
                  </div>
                </div>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table table-zebra w-full table-md">
                  <!-- Table header -->
                  <thead>
                    <tr>
                      <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                      <th class="w-10"></th>
                      <!-- Extra column for expand button -->
                    </tr>
                  </thead>

                  <!-- Table body -->
                  <tbody>
                    <template v-for="(item, itemIndex) in filterItems(table.items, name)" :key="itemIndex">
                      <!-- Main row -->
                      <tr class="hover cursor-pointer" @click="toggleExpanded(item.name)">
                        <td>{{ item.name }}</td>
                        <td>{{ item.lbft }}</td>
                        <td>{{ item.nm }}</td>
                        <td>{{ item.notes ? item.notes : $t('pages.technical.subPages.torque.ui.no_notes') }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support section -->
      <div class="col-span-12 pb-15">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:before,
    &:after {
      flex-grow: 1;
      background-color: hsl(var(--b3));
      height: 1px;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      content: '';
    }
  }

  .skeleton {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background-color: hsl(var(--b3));
    border-radius: 0.25rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>

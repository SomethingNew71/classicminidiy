<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const expanded = ref<string[]>([]);
  const { data: tables, status } = await useFetch('/api/torque');
  const tableSearchQueries = ref<Record<string, string>>({});
  const tableHeaders = [
    { title: 'Fastener', key: 'name' },
    { title: 'Torque (lb/ft)', key: 'lbft' },
    { title: 'Torque (Nm)', key: 'nm' },
    { title: 'Notes', key: 'notes' },
  ];
  const activePanel = ref('Engine');

  useHead({
    title: 'Classic Mini Torque Specifications Chart | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini torque specs, Mini Cooper fasteners, torque specifications, engine torque values, suspension torque, Mini maintenance, classic car specifications',
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
    ogTitle: 'Classic Mini Torque Specifications Chart | Classic Mini DIY',
    ogDescription:
      'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
    ogUrl: 'https://classicminidiy.com/technical/torque',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini Torque Specifications Chart',
    twitterDescription: 'Complete torque specifications for Classic Mini fasteners with values in lb/ft and Nm.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
  });

  // Add structured data for the torque specifications reference
  const torqueSpecsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Classic Mini Torque Specifications Chart',
    description:
      'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
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
      name: 'Classic Mini Torque Specifications',
      description: 'Comprehensive dataset of torque specifications for Classic Mini fasteners',
      variableMeasured: ['Fastener Name', 'Torque in lb/ft', 'Torque in Nm', 'Additional Notes'],
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
  <hero :navigation="true" :title="'Torque Specs'" :textSize="'text-3xl'" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4 pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Torque Specs"></breadcrumb>
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
                      placeholder="Search this table"
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
                        <td>{{ item.notes ? item.notes : '---' }}</td>
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

<script lang="ts" setup>
  import { DateTime } from 'luxon';
  import { HERO_TYPES } from '../../data/models/generic';

  const { t } = useI18n();

  useHead({
    title: t('pages.maps.seo.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.maps.seo.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: t('pages.maps.seo.keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/maps',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.maps.seo.ogTitle'),
    ogDescription: t('pages.maps.seo.description'),
    ogUrl: 'https://classicminidiy.com/maps',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/maps.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.maps.seo.twitterTitle'),
    twitterDescription: t('pages.maps.seo.twitterDescription'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/maps.png',
  });

  // Add structured data for the ECU maps product
  const ecuMapsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Classic Mini ECU Maps Collection',
    description:
      'Professional ECU maps for Classic Mini engines. Compatible with multiple ECU brands including Haltech, Speeduino, MegaSquirt, Emerald, and more.',
    image: 'https://classicminidiy.s3.amazonaws.com/social-share/maps.png',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://classicminidiy.com/maps',
      seller: {
        '@type': 'Organization',
        name: 'Classic Mini DIY',
      },
    },
    brand: {
      '@type': 'Brand',
      name: 'Classic Mini DIY',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Classic Mini DIY Community',
      },
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(ecuMapsJsonLd),
      },
    ],
  });
  const { data: releases, status: releasesLoading, error: releaseError } = await useFetch('/api/github/releases');
  const { data: commits, status: commitsLoading, error: commitError } = await useFetch('/api/github/commits');

  // Merge releases and commits chronologically
  interface UpdateItem {
    type: 'commit' | 'release';
    date: string;
    displayDate: string;
    message: string;
    sha?: string;
    tagName?: string;
    url: string;
  }

  const mergedUpdates = computed(() => {
    const updates: UpdateItem[] = [];

    // Add commits with type identifier
    if (commits.value && Array.isArray(commits.value)) {
      commits.value.forEach((commit) => {
        updates.push({
          type: 'commit',
          date: commit.commit?.committer?.date || commit.date,
          displayDate: commit.date,
          message: commit.commit?.message || '',
          sha: commit.sha,
          url: `https://github.com/SomethingNew71/MiniECUMaps/commit/${commit.sha}`,
        });
      });
    }

    // Add releases with type identifier
    if (releases.value?.releases && Array.isArray(releases.value.releases)) {
      releases.value.releases.forEach((release) => {
        updates.push({
          type: 'release',
          date: release.published_at || release.created_at || '',
          displayDate: release.published_at ? DateTime.fromISO(release.published_at).toFormat('LLL dd') : 'Unknown',
          message: release.name || release.tag_name || 'New Release',
          tagName: release.tag_name || undefined,
          url: release.html_url || `https://github.com/SomethingNew71/MiniECUMaps/releases/tag/${release.tag_name}`,
        });
      });
    }

    // Sort by date (newest first)
    updates.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });

    // Limit to 15 most recent items
    return updates.slice(0, 15);
  });

  const legend = computed(() => [
    {
      name: t('pages.maps.legend.included.name'),
      id: 'yes',
      description: t('pages.maps.legend.included.description'),
    },
    {
      name: t('pages.maps.legend.notIncluded.name'),
      id: 'no',
      description: t('pages.maps.legend.notIncluded.description'),
    },
    {
      name: t('pages.maps.legend.notAvailable.name'),
      id: 'na',
      description: t('pages.maps.legend.notAvailable.description'),
    },
    {
      name: t('pages.maps.legend.workInProgress.name'),
      id: 'wip',
      description: t('pages.maps.legend.workInProgress.description'),
    },
  ]);
  const items = computed(() => [
    {
      features: t('pages.maps.table.ignitionMap'),
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'yes',
      megaJolt: 'yes',
    },
    {
      features: t('pages.maps.table.fuelMap'),
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.veTable'),
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.targetAfr'),
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'yes',
      megaJolt: 'yes',
    },
    {
      features: t('pages.maps.table.throttleEnrichment'),
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.driveByWire'),
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.boostControl'),
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.idleMap'),
      haltech: 'yes',
      speeduino: 'no',
      megasquirt: 'no',
      emerald: 'na',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'na',
      megaJolt: 'na',
    },
    {
      features: t('pages.maps.table.sixteenVEngine'),
      haltech: 'yes',
      speeduino: 'yes',
      megasquirt: 'yes',
      emerald: 'yes',
      ecuMaster: 'wip',
      maxxEcu: 'wip',
      dtaFast: 'wip',
      megaJolt: 'wip',
    },
  ]);
</script>

<template>
  <div>
    <hero
      :navigation="true"
      :title="t('pages.maps.hero.title')"
      :subtitle="t('pages.maps.hero.subtitle')"
      :heroType="HERO_TYPES.MAPS"
      :textSize="'3xl'"
    />
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6 md:col-start-4">
          <h1 class="fancy-font-bold text-2xl text-center pt-10 pb-5">{{ t('pages.maps.mainTitle') }}</h1>
          <h2 class="fancy-font-book-oblique text-center text-xl">
            {{ t('pages.maps.description') }}
          </h2>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2 py-10">
          <div class="flex flex-wrap justify-center gap-8">
            <div class="text-center">
              <i class="fad fa-flag-checkered text-3xl pb-3"></i>
              <h3 class="text-lg">{{ t('pages.maps.features.lifetimeUpdates') }}</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-microchip text-3xl pb-3"></i>
              <h3 class="text-lg">{{ t('pages.maps.features.multipleEcus') }}</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-arrows-rotate text-3xl pb-3"></i>
              <h3 class="text-lg">{{ t('pages.maps.features.constantlyUpdated') }}</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-money-bill fa-beat text-3xl pb-3"></i>
              <h3 class="text-lg">{{ t('pages.maps.features.payWhatYouWant') }}</h3>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6 text-center">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="text-center">
                <i class="fad fa-credit-card text-3xl pb-3"></i>
              </div>
              <h3 class="fancy-font-bold text-2xl">{{ t('pages.maps.options.purchase.title') }}</h3>
              <h4 class="fancy-font-bold text-xl">
                {{ t('pages.maps.options.latestRelease') }}: {{ releases?.latestRelease }}
              </h4>
              <p class="py-3">
                {{ t('pages.maps.options.purchase.description') }}
              </p>
              <div class="card-actions justify-center">
                <a href="https://store.classicminidiy.com/collections/efi-base-maps" class="btn btn-primary">
                  <i class="fad fa-credit-card mr-2"></i> {{ t('pages.maps.options.purchase.button') }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6 text-center">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="text-center">
                <i class="fad fa-download text-3xl pb-3"></i>
              </div>
              <h3 class="fancy-font-bold text-2xl">{{ t('pages.maps.options.download.title') }}</h3>
              <h4 class="fancy-font-bold text-xl">
                {{ t('pages.maps.options.latestRelease') }}: {{ releases?.latestRelease }}
              </h4>
              <p class="py-3">
                {{ t('pages.maps.options.download.description') }}
              </p>
              <div class="card-actions justify-center">
                <a
                  href="https://github.com/SomethingNew71/MiniECUMaps/archive/refs/heads/master.zip"
                  class="btn btn-primary"
                >
                  <i class="fad fa-download mr-2"></i> {{ t('pages.maps.options.download.button') }}
                </a>
                <a href="https://github.com/SomethingNew71/MiniECUMaps" class="btn btn-neutral">
                  <i class="fad fa-code-branch mr-2"></i> {{ t('pages.maps.options.download.viewSource') }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2">
          <div class="divider">{{ t('pages.maps.moreDetails') }}</div>
        </div>
        <div class="col-span-12">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>{{ t('pages.maps.table.features') }}</th>
                      <th class="text-center">Haltech</th>
                      <th class="text-center">Speeduino</th>
                      <th class="text-center">MegaSquirt</th>
                      <th class="text-center">Emerald</th>
                      <th class="text-center">ECUMaster</th>
                      <th class="text-center">MaxxECU</th>
                      <th class="text-center">DTAFast</th>
                      <th class="text-center">MegaJolt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in items">
                      <td class="text-center py-3" v-for="(ecu, index) in row" :key="ecu">
                        <p class="text-left" v-if="index === 'features'">
                          {{ ecu }}
                        </p>
                        <i v-if="ecu === 'yes'" class="text-lg fa-solid fa-check" style="color: #4a7023"></i>
                        <i v-if="ecu === 'no'" class="text-lg fa-solid fa-xmark" style="color: #b22222"></i>
                        <i
                          v-if="ecu === 'wip'"
                          class="text-h6 pr-3 fa-sharp-duotone fa-solid fa-road-barrier"
                          style="--fa-primary-color: #562b00; --fa-secondary-color: #f5c147; --fa-secondary-opacity: 1"
                        ></i>
                        <i v-if="ecu === 'na'" class="text-lg fa-solid fa-dash"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5">
                <div v-for="item in legend" class="flex items-center p-2">
                  <div class="mr-3">
                    <i v-if="item.id === 'yes'" class="text-lg fa-solid fa-check" style="color: #4a7023"></i>
                    <i v-if="item.id === 'no'" class="text-lg fa-solid fa-xmark" style="color: #b22222"></i>
                    <i
                      v-if="item.id === 'wip'"
                      class="text-h6 pr-3 fa-sharp-duotone fa-solid fa-road-barrier"
                      style="--fa-primary-color: #562b00; --fa-secondary-color: #f5c147; --fa-secondary-opacity: 1"
                    ></i>
                    <i v-if="item.id === 'na'" class="text-lg fa-solid fa-dash"></i>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.name }}</div>
                    <div class="text-sm opacity-70">{{ item.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-0">
              <div class="bg-primary text-white p-4 flex items-center">
                <i class="fad fa-code-branch mr-2"></i>
                <h5 class="font-bold text-lg">{{ t('pages.maps.updates.title') }}</h5>
              </div>
              <div class="p-2">
                <div
                  v-if="commitsLoading === 'pending' || releasesLoading === 'pending'"
                  class="flex justify-center p-4"
                >
                  <span class="loading loading-spinner loading-md"></span>
                </div>
                <div v-else-if="mergedUpdates && mergedUpdates.length > 0">
                  <a
                    v-for="(update, index) in mergedUpdates"
                    :key="`update-${index}`"
                    class="flex items-center p-3 hover:bg-base-200 border-b border-base-200"
                    :href="update.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="mr-2">
                      <i v-if="update.type === 'release'" class="fad fa-tag text-success" aria-hidden="true"></i>
                      <i v-else class="fad fa-code-commit" aria-hidden="true"></i>
                    </span>
                    <span class="date pr-2 font-bold min-w-[15%]">
                      {{ update.displayDate }}
                    </span>
                    <span class="flex-1">
                      <span v-if="update.type === 'release'" class="badge badge-primary badge-sm mr-2">Release</span>
                      <span
                        v-if="update.type === 'release' && update.tagName"
                        class="badge badge-secondary badge-sm mr-2"
                        >{{ update.tagName }}</span
                      >
                      {{ update.message }}
                    </span>
                  </a>
                </div>
                <div v-else-if="commitError || releaseError">
                  <div class="flex items-center p-3 border-b border-base-200">
                    <span class="mr-2">
                      <i class="fad fa-exclamation-triangle text-warning" aria-hidden="true"></i>
                    </span>
                    <span class="date pr-2 font-bold min-w-[15%]"> --- </span>
                    <span>{{ t('pages.maps.updates.error') }}</span>
                  </div>
                  <div v-for="i in 10" :key="`error-${i}`" class="flex items-center p-3 border-b border-base-200">
                    <span class="mr-2">
                      <i class="fad fa-code-commit" aria-hidden="true"></i>
                    </span>
                    <span class="date pr-2 font-bold min-w-[15%]"> --- </span>
                    <span>---</span>
                  </div>
                </div>
                <div v-else>
                  <div class="flex items-center p-3 border-b border-base-200">
                    <span class="mr-2">
                      <i class="fad fa-info-circle" aria-hidden="true"></i>
                    </span>
                    <span class="date pr-2 font-bold min-w-[15%]"> --- </span>
                    <span>{{ t('pages.maps.updates.noUpdates') }}</span>
                  </div>
                  <div v-for="i in 10" :key="`empty-${i}`" class="flex items-center p-3 border-b border-base-200">
                    <span class="mr-2">
                      <i class="fad fa-code-commit" aria-hidden="true"></i>
                    </span>
                    <span class="date pr-2 font-bold min-w-[15%]"> --- </span>
                    <span>---</span>
                  </div>
                </div>
                <div class="card-actions justify-center p-4">
                  <a href="https://github.com/SomethingNew71/MiniECUMaps" class="btn btn-neutral w-full">
                    <i class="fad fa-code-branch mr-2"></i> {{ t('pages.maps.updates.viewAllCommits') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <h3 class="fancy-font-bold text-3xl text-center pb-5">{{ t('pages.maps.supportedEcus.title') }}</h3>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="divider">{{ t('pages.maps.supportedEcus.subtitle') }}</div>
              <div class="grid grid-cols-1 gap-6">
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/haltech.jpg"
                    alt="Haltech ECU"
                  />
                </div>
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/speeduino.jpg"
                    alt="Speeduino ECU"
                  />
                </div>
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/megasquirt.png"
                    alt="MegaSquirt ECU"
                  />
                </div>
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/emerald.png"
                    alt="Emerald ECU"
                  />
                </div>
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/megajolt.png"
                    alt="MegaJolt ECU"
                  />
                </div>
                <div class="image">
                  <img
                    class="mx-auto w-1/2"
                    src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/ecus/dta.jpg"
                    alt="DTA Fast ECU"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2">
          <div class="divider">{{ t('pages.maps.otherSupport') }}</div>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2 pb-10">
          <patreon-card size="large" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .date {
    min-width: 15%;
    font-weight: bold;
  }

  .fa-code-commit {
    color: #ff9a00;
  }
  .fa-microchip {
    color: #277dc2;
  }
  .fa-arrows-rotate {
    color: #e55f33;
  }
  .fa-money-bill {
    color: #99a078;
  }

  .image img {
    // @media screen and (max-width: 768px) {
    margin: auto;
    width: 50%;
    // }
  }
</style>

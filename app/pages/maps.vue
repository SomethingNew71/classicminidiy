<script lang="ts" setup>
  import { DateTime } from 'luxon';
  import { HERO_TYPES } from '../../data/models/generic';
  useHead({
    title: 'Classic Mini ECU Maps | Tuning Files for Multiple ECUs | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Download professionally tuned ECU maps for Classic Mini engines. Compatible with Haltech, Speeduino, MegaSquirt, Emerald, and more. Pay what you want for lifetime updates.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini ECU maps, Mini Cooper tuning, Haltech maps, Speeduino maps, MegaSquirt maps, Emerald ECU, engine tuning, fuel maps, ignition maps',
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
    ogTitle: 'Classic Mini ECU Maps | Tuning Files for Multiple ECUs',
    ogDescription:
      'Download professionally tuned ECU maps for Classic Mini engines. Compatible with Haltech, Speeduino, MegaSquirt, Emerald, and more. Pay what you want for lifetime updates.',
    ogUrl: 'https://classicminidiy.com/maps',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/ecu-maps-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini ECU Maps | Multiple ECU Support',
    twitterDescription: 'Professional ECU maps for Classic Mini engines with lifetime updates.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/misc/ecu-maps-seo.jpg',
  });

  // Add structured data for the ECU maps product
  const ecuMapsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Classic Mini ECU Maps Collection',
    description:
      'Professional ECU maps for Classic Mini engines. Compatible with multiple ECU brands including Haltech, Speeduino, MegaSquirt, Emerald, and more.',
    image: 'https://classicminidiy.s3.amazonaws.com/misc/ecu-maps-seo.jpg',
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

  const legend = ref([
    {
      name: 'Included',
      id: 'yes',
      description: 'Included in Map',
    },
    {
      name: 'Not included',
      id: 'no',
      description: 'Supported but not included',
    },
    {
      name: 'Not Available',
      id: 'na',
      description: 'Feature not supported by ECU',
    },
    {
      name: 'Work in progress',
      id: 'wip',
      description: 'Currently still in progress being ported to this ECU',
    },
  ]);
  const items = ref([
    {
      features: 'Ignition Map',
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
      features: 'Fuel Map',
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
      features: 'VE Table',
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
      features: 'Target AFR',
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
      features: 'Throttle Enrichment',
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
      features: 'Drive by Wire Ready',
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
      features: 'Boost Control Map',
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
      features: 'Idle Map',
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
      features: '16V Engine Version',
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
      :title="'Classic Mini DIY ECU Maps'"
      :subtitle="'Pay what your want, always'"
      :heroType="HERO_TYPES.MAPS"
      :textSize="'3xl'"
    />
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6 md:col-start-4">
          <h1 class="fancy-font-bold text-2xl text-center pt-10 pb-5">The Classic Mini ECU Map</h1>
          <h2 class="fancy-font-book-oblique text-center text-xl">
            After years of tuning Classic Mini engines, building custom harnesses, and mapping multiple ECU's, I am
            proud to release my collection of ECU maps with two options for access. Offering support for many popular
            ECU's used on Classic Minis, with more added in the future.
          </h2>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2 py-10">
          <div class="flex flex-wrap justify-center gap-8">
            <div class="text-center">
              <i class="fad fa-flag-checkered text-3xl pb-3"></i>
              <h3 class="text-lg">Lifetime Updates</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-microchip text-3xl pb-3"></i>
              <h3 class="text-lg">Multiple ECU's</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-arrows-rotate text-3xl pb-3"></i>
              <h3 class="text-lg">Constantly Updated</h3>
            </div>
            <div class="text-center">
              <i class="fad fa-money-bill fa-beat text-3xl pb-3"></i>
              <h3 class="text-lg">Pay what you want</h3>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6 text-center">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="text-center">
                <i class="fad fa-credit-card text-3xl pb-3"></i>
              </div>
              <h3 class="fancy-font-bold text-2xl">Option 1 - Purchase</h3>
              <h4 class="fancy-font-bold text-xl">Latest Release: {{ releases?.latestRelease }}</h4>
              <p class="py-3">
                Purchase the ECU maps directly from the Classic Mini DIY store. This option is perfect for those who
                want to support the channel and get the maps without having to use Github. This option also comes with
                priority support via email.
              </p>
              <div class="card-actions justify-center">
                <a href="https://store.classicminidiy.com/collections/efi-base-maps" class="btn btn-primary">
                  <i class="fad fa-credit-card mr-2"></i> Download
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
              <h3 class="fancy-font-bold text-2xl">Option 2 - Download</h3>
              <h4 class="fancy-font-bold text-xl">Latest Release: {{ releases?.latestRelease }}</h4>
              <p class="py-3">
                Download the ECU maps directly from Github. This option is perfect for those who want to get the maps
                for free. This option also comes with the ability to contribute to the project by submitting pull
                requests.
              </p>
              <div class="card-actions justify-center">
                <a
                  href="https://github.com/SomethingNew71/MiniECUMaps/archive/refs/heads/master.zip"
                  class="btn btn-primary"
                >
                  <i class="fad fa-download mr-2"></i> Download
                </a>
                <a href="https://github.com/SomethingNew71/MiniECUMaps" class="btn btn-neutral">
                  <i class="fad fa-code-branch mr-2"></i> View Source
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-10 md:col-start-2">
          <div class="divider">More Details</div>
        </div>
        <div class="col-span-12">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="overflow-x-auto">
                <table class="table table-zebra">
                  <thead>
                    <tr>
                      <th>Features</th>
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
                <h5 class="font-bold text-lg">Latest Updates</h5>
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
                    <span>Error loading update history from Github</span>
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
                    <span>No updates available</span>
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
                    <i class="fad fa-code-branch mr-2"></i> View All Commits
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <h3 class="fancy-font-bold text-3xl text-center pb-5">Supported ECU's</h3>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="divider">Support for the ecu you need</div>
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
          <div class="divider">Other ways to support</div>
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

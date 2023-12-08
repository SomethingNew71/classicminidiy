<template>
  <div>
    <hero
      :navigation="true"
      :title="'Classic Mini DIY ECU Maps'"
      :subtitle="'Pay what your want, always'"
      :ecuMap="true"
      :size="'is-medium'"
    />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-6 is-offset-3">
          <h1 class="fancy-font-bold is-size-3 has-text-centered">The Classic Mini ECU Map</h1>
          <h2 class="fancy-font-book-oblique has-text-centered is-size-4">
            Hey folks! Cole here with Classic Mini DIY. After countless hours and time spent porting, converting, and
            mapping multiple ECU's, I am proud to release my collection of ECU maps with two options for access.
            Offering support for many popular ECU's used on Classic Minis, with more added in the future.
          </h2>
        </div>
        <div class="column is-10 is-offset-1 pt-10 pb-10">
          <nav class="level">
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-flag-checkered is-size-2 pb-3"></i>
                <h3 class="subtitle">A Safe Start</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-microchip is-size-2 pb-3"></i>
                <h3 class="subtitle">Support for Multiple ECUs</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fa-duotone fa-arrows-rotate fa-spin is-size-2 mb-3"></i>
                <h3 class="subtitle">Lifetime Updates</h3>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <i class="fad fa-money-bill fa-beat is-size-2 pb-3"></i>
                <h3 class="subtitle">Pay what you want</h3>
              </div>
            </div>
          </nav>
        </div>

        <div class="column is-6 has-text-centered">
          <div class="card">
            <div class="card-content">
              <i class="fad fa-credit-card is-size-2 pb-3"></i>
              <h3 class="fancy-font-bold is-size-3">Option 1 - Purchase</h3>
              <p class="is-size-5 pt-5 pb-8">
                Help support the time and energy that went into creating these by purchasing them directly on my my
                store. All maps are reaosnably priced at <strong>$25</strong> including all future updates.
              </p>
              <h4 v-if="releasesLoading" class="fancy-font-bold is-size-4 pb-4">Loading</h4>
              <h4 v-else-if="releases" class="fancy-font-bold is-size-4 pb-4">
                Latest Releases - {{ releases.latestRelease }}
              </h4>
              <o-button
                variant="primary"
                size="large"
                tag="a"
                href="https://store.classicminidiy.com/collections/efi-base-maps"
                target="_blank"
              >
                <span class="icon"> <i class="fad fa-download" /> </span><span>Download</span></o-button
              >
            </div>
          </div>
        </div>
        <div class="column is-6 has-text-centered">
          <div class="card pb-2">
            <div class="card-content">
              <i class="fad fa-download is-size-2 pb-3"></i>
              <h3 class="fancy-font-bold is-size-3">Option 2 - Download</h3>
              <p class="is-size-5 pt-5 pb-5">
                Are you a more of a DIYer? Or perhaps you have a tight budget you are working on? Well no problem
                because all my maps are availble free of charge directly on Github.
              </p>
              <h4 v-if="releasesLoading" class="fancy-font-bold is-size-4 pb-4">Loading</h4>
              <h4 v-else-if="releases" class="fancy-font-bold is-size-4 pb-5">
                Latest Release - {{ releases.latestRelease }}
              </h4>

              <o-button
                class="is-dark"
                size="large"
                tag="a"
                href="https://store.classicminidiy.com/collections/efi-base-maps"
                target="_blank"
              >
                <span class="icon">
                  <i class="fab fa-github" />
                </span>
                <span>View Source</span></o-button
              >
            </div>
          </div>
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider">More Details</div>
        </div>
        <div class="column is-4 is-offset-1">
          <client-only>
            <nav class="panel is-secondary">
              <h5 class="panel-heading"><i class="fad fa-code-branch" /> Latest Commits</h5>
              <template v-for="(commitItem, i) in commits">
                <a class="panel-block has-text-left" :href="commitItem.commit.url" target="_blank" v-if="i < 10">
                  <span class="panel-icon">
                    <i class="fad fa-code-commit" aria-hidden="true"></i>
                  </span>
                  <span class="date pr-2">
                    {{ commitItem.date }}
                  </span>

                  {{ commitItem.commit.message }}
                </a>
              </template>
              <div class="panel-block">
                <o-button
                  class="is-fullwidth is-dark"
                  tag="a"
                  href="https://github.com/SomethingNew71/MiniECUMaps/commits/main"
                  target="_blank"
                >
                  <span class="icon">
                    <i class="fad fa-code-branch" />
                  </span>
                  <span>View All Commits</span></o-button
                >
              </div>
            </nav>
          </client-only>
        </div>
        <div class="column is-6">
          <h3 class="fancy-font-bold is-size-2 has-text-centered pb-5">Supported ECU's</h3>
          <div class="columns is-multiline">
            <div class="column is-8 is-offset-2">
              <div class="divider">Support for the ecu you need</div>
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/haltech.jpg" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/speeduino.jpg" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/megasquirt.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/emerald.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/megajolt.png" alt="" />
            </div>
            <div class="column is-12 image">
              <img class="" src="/img/ecus/dta.jpg" alt="" />
            </div>
          </div>
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider">Other ways to support</div>
        </div>
        <div class="column is-12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import * as _ from 'lodash';
  import { DateTime } from 'luxon';
  useHead({
    title: 'Classic Mini ECU Maps',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'After countless hours and time spent porting, converting, and mapping multiple ECUs, I am proud to release my collection of ECU maps with two options for access. Offering support for many popular ECUs used on Classic Minis, with more added in the future. ',
      },
      {
        property: 'og:title',
        content: 'CMDIY - Classic Mini ECU Maps',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Classic Mini ECU Maps',
    ogDescription:
      'After countless hours and time spent porting, converting, and mapping multiple ECUs, I am proud to release my collection of ECU maps with two options for access. Offering support for many popular ECUs used on Classic Minis, with more added in the future. ',
    ogUrl: 'classicminidiy.com/technical',
    ogType: 'website',
  });
  let commits: any = [];
  const { data: releases, pending: releasesLoading, error: releasesError } = await useFetch('/api/github/releases');
  await useFetch('/api/github/commits')
    .then((response: any) => {
      _.forEach(response.data._rawValue, (item) => {
        commits.push({
          date: DateTime.fromISO(item.commit.committer.date).toFormat('LLL dd'),
          ...item,
        });
      });
    })
    .catch((error) => console.error(error));
</script>

<style lang="scss">
  .date {
    min-width: 15%;
    font-weight: bold;
  }

  .fa-code-commit {
    color: #ff9a00;
  }

  .fa-flag-checkered {
    // color: #fff;
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

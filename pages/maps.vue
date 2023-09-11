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
        <div class="column is-10 is-offset-1">
          <div class="divider">Learn More Below</div>
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
              <h4 class="fancy-font-bold is-size-4 pb-4">Latest Releases - {{ releases.latestRelease }}</h4>
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
            <div class="columns is-multiline pl-3 pr-3 pb-5">
              <div class="column is-10 is-offset-1">
                <div class="divider">Current Supported ECU's</div>
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/haltech.jpg" alt="" />
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/speeduino.jpg" alt="" />
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/megasquirt.png" alt="" />
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/emerald.png" alt="" />
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/megajolt.png" alt="" />
              </div>
              <div class="column is-4 image">
                <img class="" src="/img/ecus/dta.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6 has-text-centered">
          <div class="card">
            <div class="card-content">
              <i class="fad fa-download is-size-2 pb-3"></i>
              <h3 class="fancy-font-bold is-size-3">Option 2 - Download</h3>
              <p class="is-size-5 pt-5 pb-5">
                Are you a more of a DIYer? Or perhaps you have a tight budget you are working on? Well no problem
                because all my maps are availble free of charge directly on Github.
              </p>
              <h4 class="fancy-font-bold is-size-4 pb-5">Latest Release - {{ releases.latestRelease }}</h4>

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
              <client-only>
                <nav class="panel is-secondary mt-7">
                  <h5 class="panel-heading"><i class="fad fa-code-branch" /> Latest Commits</h5>
                  <template v-for="(commitItem, i) in commits">
                    <a class="panel-block has-text-left" :href="commitItem.commit.url" target="_blank" v-if="i < 3">
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
                      class="is-fullwidth"
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
          'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
      },
      {
        property: 'og:title',
        content: 'CMDIY - Classic Mini ECU Maps',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Classic Mini ECU Map',
    ogDescription:
      'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
    ogUrl: 'classicminidiy.com/technical',
    ogType: 'website',
  });
  // let repo: any;
  let commits: any = [];
  let releases: any;
  // await useFetch('/api/github/repo')
  //   .then((response: any) => {
  //     repo = { ...response.data._rawValue };
  //     console.log(repo);
  //   })
  //   .catch((error) => console.error(error));
  await useFetch('/api/github/releases')
    .then((response: any) => {
      releases = { ...response.data._rawValue };
    })
    .catch((error) => console.error(error));
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

  .image img {
    @media screen and (max-width: 768px) {
      margin: auto;
      width: 50%;
    }
  }
</style>

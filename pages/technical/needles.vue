<script lang="ts" setup>
  useHead({
    title: 'Tech - SU Needles Chart',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Finding the right needle for your Classic Mini Cooper can be tough. Use this online comparison chart to find the right profile for your engine build.',
      },
      {
        property: 'og:title',
        content: 'Tech - SU Needles Chart',
      },
      {
        property: 'og:image',
        content: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - SU Needles Chart',
    ogDescription:
      "Finding the right needle for your Classic Mini Cooper's carburettor can be tough. Use this online comparison chart to find the right profile for your engine build.",
    ogUrl: 'classicminidiy.com/technical/needles',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Needle Configurator'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-chart-bar" aria-hidden="true" />
                  </span>
                  <span>Needles</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <div class="columns">
            <div class="column is-8">
              <h4 class="fancy-font-bold is-size-3">SU Carburettor Needles</h4>
              <p class="is-size-5 pt-5">
                One of the most confusing things about working on your Classic Mini often is the carburettor needle used
                on your car. Below you will find a multi-needle comparison chart which will allow you to compare needle
                profiles of multiple SU needles at the same time. Choose the needles you would like to compare and click
                Compare which will redraw the chart with new profiles. A huge thank you to the mintylamb site for
                posting this information publically.
              </p>
            </div>
            <div class="column is-4">
              <h4 class="fancy-font-bold is-size-3">Find the Needles you need?</h4>
              <h5 class="fancy-font-book is-size-5 pb-5">Order them on Seven Mini Parts</h5>
              <div class="card">
                <div class="card-content">
                  <a href="https://cmdiy.co/CarbNeedles" target="_blank" alt="Link to Classic Mini Needles">
                    <nuxt-img
                      class="seven-logo"
                      format="webp"
                      src="https://classicminidiy.s3.amazonaws.com/misc/seven-logo-horiz.png"
                      alt="Seven Mini Parts Logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-12 hr mt-5"></div>
        <div class="column is-12">
          <NeedleConfigurator />
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider">Needle Charts</div>
        </div>
        <div class="column is-12 has-text-centered">
          <h4 class="fancy-font-book is-size-3">Find the needle for your carb</h4>
          <h5 class="fancy-font-book is-size-5">
            Information provided by
            <a href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html" target="_blank"
              >Seven Mini Parts</a
            >
          </h5>
        </div>
        <NeedleTable />
        <div class="column is-10 is-offset-1">
          <div class="divider">Support</div>
        </div>
        <div class="column is-12">
          <patreon-card size="large" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  .seven-logo {
    display: inline-block;
    margin: auto;
    width: 100%;
  }
  .b-tabs .tab-content {
    padding-left: 0px;
    padding-right: 0px;
  }
  .hr {
    border-top: 1px solid whitesmoke;
  }
</style>

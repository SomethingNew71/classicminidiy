<template>
  <div>
    <hero :navigation="true" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <nuxt-link to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </nuxt-link>
              </li>
              <li class="is-active">
                <nuxt-link to="">
                  <span class="icon is-small">
                    <i
                      class="fad fa-compress-arrows-alt"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span>Compression Ratio Calculator</span>
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <div class="columns">
            <div class="column is-8">
              <h1 class="title">Compression Ratio Calculator</h1>
              <p class="pb-4">
                When building a performance Classic Mini engine one of the most
                important figures to determine is the compression ratio. Using
                the Classic Mini DIY Compression Ratio Calculator below, you can
                determine the ideal compression for your new engine build.
              </p>
            </div>
            <div class="column is-4">
              <nuxt-link
                :to="'/technical/enginesize'"
                :title="'Link to Engine Sizes'"
              >
                <div class="card callout-card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <picture>
                            <source
                              srcset="
                                https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp
                              "
                              type="image/webp"
                            />
                            <source
                              srcset="
                                https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png
                              "
                              type="image/png"
                            />
                            <img
                              src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            />
                          </picture>
                        </figure>
                      </div>
                      <div class="media-content">
                        <h2 class="subtitle">
                          What are standard engine sizes?
                        </h2>
                        <p>
                          Click here to learn about common engine sizes in the
                          classic mini.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="column is-12">
          <CompressionCalculator />
        </div>
        <div class="column is-10 is-offset-1">
          <div class="divider">More</div>
        </div>
        <div class="column is-12">
          <patreon-card size="large" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    head: {
      title: 'Technical - Compression Ratio Calculator',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Planning your next engine build? Use our brand new compression ratio calculator to generate the new ratio for your Classic Mini's engine.",
        },
        {
          property: 'og:title',
          content: 'Technical - Compression Ratio Calculator',
        },
        {
          property: 'og:image',
          content:
            'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
        },
      ],
    },
  });
</script>
<style lang="scss"></style>

<template>
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
                  <i class="fad fa-books" aria-hidden="true"></i>
                </span>
                <span>Manuals</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>

        <h1 class="title">
          Essential Workshop Manuals
        </h1>
        <p>
          To help you work on your Classic Mini Cooper, I have taken the time to currate a list of all my favorite workshop manuals. You can use these to help find all the details you need to work on your Classic Mini at home.
        </p>
      </div>
      <div
        v-for="(manual, name) in books.workshop"
        :key="name"
        class="column is-3"
      >
        <div class="card">
          <div class="card-image">
            <b-image ratio="is-3by4" :src="manual.imgSourcewebp" :webp-fallback="manual.imgSource" :alt="`Image of the cover of the manual - ${manual.name}`" />
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4 truncate">
                  {{ manual.name }}
                </p>
                <p class="subtitle is-6">
                  by {{ manual.author }}
                </p>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a :href="manual.urlAmazon" class="card-footer-item is-amazon" target="_blank">
              <span class="icon">
                <i class="fab fa-amazon" />
              </span>
              <span>
                Amazon
              </span>
            </a>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
function getBooks () {
  return import('~/static/data/manuals.json').then(m => m.default || m);
}
export default {
  async asyncData ({ req }) {
    const books = await getBooks();
    return { books };
  },
  head () {
    return {
      title: 'Technical - Workshop Manuals',
      meta: [
        { hid: 'description', name: 'description', content: 'Looking for the best workshop manual to get the job done on your Classic Mini? Here you\'ll find the top picks from Classic Mini DIY' },
        {
          property: 'og:title',
          content: 'Technical - Workshop Manuals'
        },
        {
          property: 'og:image',
          content: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
  .is-amazon {
    color: white;
    font-size: 1rem;
    background-color: #FEBD69;
  }
</style>

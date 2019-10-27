<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fas fa-wrench" aria-hidden="true" />
                </span>
                <span>Manuals</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h1 class="title">
          Essential Workshop Manuals
        </h1>
      </div>
      <div
        v-for="(manual, name) in books.workshop"
        :key="name"
        class="column is-12"
      >
        <article class="media card">
          <figure class="media-left">
            <p class="image is-128x128">
              <img :src="manual.imgSource" alt="Placeholder image">
            </p>
          </figure>
          <div class="media-content pt-20 pr-20 pb-20">
            <div class="content">
              <p>
                <strong>{{ manual.name }}</strong> <small>by {{ manual.author }}</small>
                <br>
                {{ manual.desc }}
              </p>
            </div>
            <a class="mt-25 button is-medium is-amazon" :href="manual.urlAmazon" target="_blank">
              <span class="icon">
                <i class="fab fa-amazon" />
              </span>
              <span>Buy on Amazon</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
function getBooks () {
  return import(`~/static/data/manuals.json`).then(m => m.default || m);
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
        { hid: 'description', name: 'description', content: 'Looking for the best workshop manual to get the job done on your Classic Mini? Here you\'ll find the top picks from Classic Mini DIY' }
      ]
    };
  }
};
</script>

<template>
  <div class="columns is-multiline">
    <div v-for="(item, index) in amount" :key="index" class="column is-4">
      <article class="tile is-child card">
        <div class="card-image">
          <o-skeleton position="is-centered" height="200px"></o-skeleton>
        </div>
        <div class="card-content">
          <div class="media mb-1">
            <div class="media-content">
              <span class="icon is-small"><o-skeleton></o-skeleton></span>
              <span class="icon is-small"><o-skeleton></o-skeleton></span>
              <span class="icon is-small"><o-skeleton></o-skeleton></span>
              <o-skeleton></o-skeleton>
            </div>
          </div>
          <div class="content">
            <o-skeleton height="80px"></o-skeleton>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      amount: {
        type: Number,
        default: 3,
      },
    },
  };
</script>

<template>
  <div class="columns is-multiline">
    <div v-for="(item, index) in amount" :key="index" class="column is-4">
      <article class="tile is-child card">
        <div class="card-image">
          <b-skeleton position="is-centered" height="200px"></b-skeleton>
        </div>
        <div class="card-content">
          <div class="media mb-1">
            <div class="media-content">
              <span class="icon is-small"><b-skeleton></b-skeleton></span>
              <span class="icon is-small"><b-skeleton></b-skeleton></span>
              <span class="icon is-small"><b-skeleton></b-skeleton></span>
              <b-skeleton></b-skeleton>
            </div>
          </div>
          <div class="content">
            <b-skeleton height="80px"></b-skeleton>
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

<template>
  <main>
    <hero
      :size="'is-small'"
      :navigation="true"
      :blog="true"
      :show-image="false"
    />
    <div class="column is-12-mobile is-8 is-offset-2 content post">
      <div class="card article">
        <div class="card-content">
          <div class="content article-body">
            <ContentDoc />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
  main {
    background-color: #f1f1f1;
    .post {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        & > a {
          color: rgb(74, 74, 74);
          text-decoration: none;
        }
      }

      img {
        border-radius: 25px;
      }
      .card {
        border-radius: 25px;
      }
    }
  }
</style>

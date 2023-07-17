<template>
  <div>
    <hero
      :title="'The Archive'"
      :subtitle="'Written guides by Classic Mini DIY'"
      :size="'is-medium'"
      :navigation="true"
      :blog="true"
    />
    <section class="articles">
      <div
        v-for="post in blogPosts"
        class="column is-12-mobile is-8 is-offset-2"
      >
        <!-- START ARTICLE -->
        <div class="card article">
          <div class="card-content">
            <div class="media">
              <div class="media-content has-text-centered">
                <h2 class="title article-title">
                  <nuxt-link :to="post._path">
                    {{ post.title }}
                  </nuxt-link>
                </h2>
                <div class="tags has-addons level-item">
                  <span class="tag is-rounded is-info" v-if="post.author">
                    {{ post.author }}
                  </span>
                  <span class="tag is-rounded" v-if="post.date">
                    {{ post.date }}
                  </span>
                </div>
              </div>
            </div>
            <div class="content article-body pb-5 mb-5">
              <ContentRenderer :value="post" :excerpt="true" />
              <nuxt-link :to="post._path">Read More...</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 has-text-centered pt-5">
        <p>---- End of the line ----</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ParsedContent } from '@nuxt/content/dist/runtime/types';

  interface Post extends ParsedContent {
    image?: string;
    author?: string;
    date?: string;
  }
  let blogPosts: Post[] = [];
  await queryContent('/')
    .find()
    .then((res: Post[]) => (blogPosts = res));
</script>

<style lang="scss">
  .articles {
    margin: 5rem 0;
    @media screen and (min-width: 768px) {
      margin-top: -3.5rem;
    }
    .content p {
      line-height: 1.9;
      margin: 15px 0;
    }
  }
  .author-image {
    position: absolute;
    top: -30px;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    border: 3px solid #ccc;
    border-radius: 50%;
  }
  .media-center {
    display: block;
    margin-bottom: 1rem;
  }
  .media-content {
    margin-top: 3rem;
  }
  div.column.is-8:first-child {
    padding-top: 0;
    margin-top: 0;
  }
  .article-title {
    font-size: 2rem;
    font-weight: lighter;
    line-height: 2;
  }
  .article-subtitle {
    color: #909aa0;
    margin-bottom: 3rem;
  }
  .article-body {
    line-height: 1.4;
    margin: 0 6rem;
  }
  .promo-block .container {
    margin: 1rem 5rem;
  }
</style>

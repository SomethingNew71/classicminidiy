<template>
  <div>
    <hero
      :title="'The (C)archive'"
      :subtitle="'Written guides by Classic Mini DIY'"
      :size="'is-halfheight'"
      :navigation="true"
      :blog="true"
    />
    <section class="articles">
      <div
        v-for="post in blogPosts"
        class="column is-12-mobile is-10 is-offset-1 article-container"
      >
        <!-- START ARTICLE -->
        <div class="card article">
          <div class="card-content">
            <div class="media">
              <div v-if="post.image" class="media-center">
                <img :src="post.image" class="post-image" />
              </div>
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
              <nuxt-link :to="post._path" class="is-size-4"
                >Read More...</nuxt-link
              >
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
      margin-top: -2.5rem;
    }
    .content p {
      line-height: 1.9;
      margin: 15px 0;
    }
  }
  .post-image {
    position: absolute;
    top: -75px;
    left: 50%;
    width: 150px;
    height: 150px;
    margin-left: -70px;
    border: 3px solid #ccc;
    border-radius: 50%;
  }
  .media-center {
    display: block;
    margin-bottom: 1rem;
  }
  .media-content {
    margin-top: 3.5rem;
  }
  div.column.is-8:first-child {
    padding-top: 0;
    margin-top: 0;
  }
  .article-container {
    margin-bottom: 5rem;
    .article-title {
      font-size: 2rem;
      line-height: 2;
    }
    .article-subtitle {
      color: #909aa0;
      margin-bottom: 3rem;
    }
    .article-body {
      line-height: 1.4;
      margin: 0 6rem;
      img {
        width: 50%;
      }
    }
  }
  .container {
    margin: 1rem 5rem;
  }
</style>

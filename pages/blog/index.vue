<template>
  <div>
    <hero
      :title="'The (C)archive'"
      :subtitle="'Written guides by Classic Mini DIY'"
      :size="'is-halfheight'"
      :navigation="true"
      :blog="true"
    />
    <v-container fluid class="articles">
      <v-col v-for="(post, index) in blogPosts" cols="12" md="10" offset-md="1" class="article-container">
        <!-- START ARTICLE -->
        <div :key="index" class="card article">
          <div class="card-content">
            <div class="media">
              <div v-if="post.image" class="media-center">
                <img loading="lazy" :src="post.image" class="post-image" alt="preview image for post" />
              </div>
              <div class="media-content has-text-centered">
                <h2 class="title article-title">
                  <NuxtLink :to="post._path">
                    {{ post.title }}
                  </NuxtLink>
                </h2>
                <div class="tags has-addons level-item">
                  <span class="tag is-rounded is-info" v-if="post.author">
                    {{ post.author }}
                  </span>
                  <span class="tag is-rounded" v-if="post.date">
                    {{ post.date }}
                  </span>
                </div>
                <div></div>
              </div>
            </div>
            <div class="content article-body pb-5 mb-5">
              <ContentRenderer :value="post" :excerpt="true" />
              <NuxtLink :to="post._path" class="is-size-4">Read More...</NuxtLink>
              <!-- <br />
              <br />
              <DisqusCount :identifier="post._path" /> -->
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="has-text-centered pt-5">
        <p>---- End of the line ----</p>
      </v-col>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import type { Post } from '~/data/models/generic';
  let blogPosts: Post[] = [];
  await queryContent('/')
    .find()
    .then(async (res: Post[]) => (blogPosts = await res))
    .catch((error) => console.error('Error on root blog call', error));

  useHead({
    title: 'The (C)archive - CMDIY Blog',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The Classic Mini DIY Blog (C)archive is the best place to see updates about CMDIY, complex technical articles, and much more!',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'The (C)archive - CMDIY Blog',
    ogDescription:
      'The Classic Mini DIY Blog (C)archive is the best place to see updates about CMDIY, complex technical articles, and much more!',
    ogUrl: 'classicminidiy.com/blog',
    ogImage: 'https://classicminidiy.com/img/typewriter.jpg',
    ogType: 'website',
  });
</script>

<style lang="scss">
  .articles {
    background-color: #f1f1f1;
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

    .article {
      margin-top: -2.5rem;
    }
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

      @media screen and (max-width: 768px) {
        margin: 0 1rem;
      }
      img {
        width: 50%;
      }
    }
  }
  .container {
    margin: 1rem 5rem;
  }
</style>

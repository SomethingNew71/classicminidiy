<template>
  <main>
    <hero
      :size="'is-halfheight'"
      :navigation="true"
      :blog="true"
      :title="currentPostData.title"
      :subtitle="currentPostData.description"
      :show-image="true"
    />
    <div class="column is-12-mobile is-10 is-offset-1 content post">
      <div class="card article">
        <div class="media">
          <div v-if="currentPostData.image" class="media-center">
            <img
              :src="currentPostData.image"
              class="post-image"
              alt="preview image for post"
            />
          </div>
        </div>
        <div class="card-content">
          <div class="content article-body">
            <ContentDoc />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { Post } from '~/data/models';
  const route = useRoute();

  let currentPostData: Post;
  await queryContent(route.path)
    .find()
    .then((res: Post[]) => {
      currentPostData = res[0];
      console.log(currentPostData);
      useHead({
        title: `The (C)archive - ${currentPostData.title}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: currentPostData.description,
          },
        ],
      });
      useSeoMeta({
        ogTitle: `The (C)archive - ${currentPostData.title}`,
        ogDescription: currentPostData.description,
        ogUrl: route.fullPath,
        ogImage: `https://classicminidiy.com${currentPostData.image}`,
        ogType: 'article',
        author: currentPostData.author,
      });
    });
</script>

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

      @media screen and (min-width: 768px) {
        margin-top: -2.5rem;
      }
      .article-body {
        @media screen and (max-width: 768px) {
          margin: 0 1rem;
          img {
            max-width: 80%;
          }
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

      img[alt~='thumbnail'] {
        max-width: 100%;
      }

      img {
        max-width: 40%;
        border-radius: 25px;
      }
      .card {
        border-radius: 25px;
      }
    }
  }
</style>

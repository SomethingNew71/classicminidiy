<script setup lang="ts">
  import type { Post } from '~/data/models/generic';
  const { path, fullPath } = await useRoute();
  let initialData: any;
  let currentPostData: Post;
  let currentPostViews = ref();
  let isLoading = ref(true);

  if (!path.includes('/dev-sw.js') && !path.includes('/workbox-')) {
    await queryContent(path)
      .findOne()
      .then(async (res: Post) => {
        currentPostData = { ...(await res) };
        await useFetch('/api/blog/getCount', {
          params: { title: currentPostData.title || '' },
        }).then(async (response: any) => {
          console.log(response);

          initialData = response.data._rawValue;
          if (currentPostData.title) {
            if (initialData?.Item?.Count) {
              currentPostViews.value = await useFetch('/api/blog/updateCount', {
                method: 'POST',
                body: { title: currentPostData.title, count: initialData.Item.Count },
              }).then((res: any) => res.data._rawValue);
            } else if (!initialData.Item) {
              currentPostViews.value = await useFetch('/api/blog/updateCount', {
                method: 'POST',
                body: { title: currentPostData.title, count: 1 },
              }).then((res: any) => res.data._rawValue);
            }
          }
        });

        useHead({
          title: `The (C)archive - ${currentPostData.title || ''}`,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: currentPostData.description || '',
            },
          ],
        });
        useSeoMeta({
          ogTitle: `The (C)archive - ${currentPostData.title || ''}`,
          ogDescription: currentPostData.description || '',
          ogUrl: fullPath,
          ogImage: currentPostData.image ? `https://classicminidiy.com${currentPostData.image}` : '',
          ogType: 'article',
          author: currentPostData.author || '',
        });
      })
      .catch((e) => console.log('Query Content error: ', e))
      .finally(() => {
        isLoading.value = false;
      });
  }
</script>

<template>
  <main>
    <hero
      :size="'is-halfheight'"
      :navigation="true"
      :blog="true"
      :title="currentPostData?.title ? currentPostData?.title : 'The (C)archive'"
      :subtitle="currentPostData?.description"
      :show-image="true"
    />
    <div v-if="currentPostData" class="column is-12-mobile is-10 is-offset-1 content post">
      <div class="card article">
        <div class="media">
          <div v-if="currentPostData?.image" class="media-center">
            <img loading="lazy" :src="currentPostData?.image" class="post-image" alt="preview image for post" />
          </div>
        </div>
        <div class="card-content pt-8">
          <div class="content article-body">
            <nav class="level is-size-6 pt-5">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p>
                    <i class="fad fa-eye pr-1"></i>
                    <template v-if="isLoading">
                      <i class="fad fa-spinner-third fa-spin ml-2"></i>
                    </template>
                    <template v-else>
                      <strong class="pl-2">{{ currentPostViews }}</strong>
                    </template>
                  </p>
                </div>
                <div class="is-size-7 pr-3 has-text-primary is-hidden-mobile">
                  <i class="fa fa-circle"></i>
                </div>
                <div class="level-item">
                  <p>
                    <strong>Published:</strong>

                    <template v-if="isLoading">
                      <i class="fa-duotone fa-spinner-third fa-spin ml-2"></i>
                    </template>
                    <template v-else>
                      <strong class="pl-2">{{ currentPostData?.date }}</strong>
                    </template>
                  </p>
                </div>
                <div class="is-size-7 pr-3 has-text-primary is-hidden-mobile">
                  <i class="fa fa-circle"></i>
                </div>
                <div class="level-item">
                  <p>
                    <strong>Author:</strong>
                    <template v-if="isLoading">
                      <i class="fa-duotone fa-spinner-third fa-spin ml-2"></i>
                    </template>
                    <template v-else>
                      <strong class="pl-2">{{ currentPostData?.author }}</strong>
                    </template>
                  </p>
                </div>
              </div>
            </nav>
            <hr />
            <ContentDoc />
            <!-- <div class="column is-10 is-offset-1">
              <div class="divider">Comments</div>
            </div>
            <DisqusComments :identifier="currentPostData.slug" /> -->
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

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
            <img loading="lazy" :src="currentPostData.image" class="post-image" alt="preview image for post" />
          </div>
        </div>
        <div class="card-content">
          <div class="content article-body">
            <nav class="level is-size-6 pt-5">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p>
                    <i class="fad fa-eye pr-1"></i>
                    <strong class="pl-2">{{ currentPostViews }}</strong>
                  </p>
                </div>
                <div class="is-size-7 pr-3 has-text-primary is-hidden-mobile">
                  <i class="fa fa-circle"></i>
                </div>
                <div class="level-item">
                  <p><strong>Published:</strong> {{ currentPostData.date }}</p>
                </div>
                <div class="is-size-7 pr-3 has-text-primary is-hidden-mobile">
                  <i class="fa fa-circle"></i>
                </div>
                <div class="level-item">
                  <p><strong>Author:</strong> {{ currentPostData.author }}</p>
                </div>
              </div>
            </nav>
            <hr />
            <ContentDoc />
            <div class="column is-10 is-offset-1">
              <div class="divider">Comments</div>
            </div>
            <DisqusComments :identifier="currentPostData.slug" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
  import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
  import { Post } from '~/data/models';
  const route = useRoute();
  const runtimeConfig = useRuntimeConfig();
  let currentPostData: Post;
  let currentPostViews: number;

  await queryContent(route.path)
    .find()
    .then(async (res: Post[]) => {
      currentPostData = res[0];
      currentPostData = {
        ...currentPostData,
        slug: route.path,
      };
      const docClient = DynamoDBDocumentClient.from(
        new DynamoDBClient({
          region: 'us-east-1',
          credentials: {
            accessKeyId: runtimeConfig.app.aws_access_key_id,
            secretAccessKey: runtimeConfig.app.aws_secret_access_key,
          },
        })
      );

      const initalData = await docClient.send(
        new GetCommand({
          TableName: 'BlogViews',
          Key: { postID: currentPostData.title },
        })
      );
      currentPostViews = initalData?.Item?.Count + 1;
      if (!initalData.Item) {
        await docClient.send(
          new PutCommand({
            TableName: 'BlogViews',
            Item: {
              postID: currentPostData.title,
              Count: 1,
            },
          })
        );
        currentPostViews = 1;
      } else {
        await docClient.send(
          new PutCommand({
            TableName: 'BlogViews',
            Item: {
              postID: currentPostData.title,
              Count: currentPostViews,
            },
          })
        );
      }
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

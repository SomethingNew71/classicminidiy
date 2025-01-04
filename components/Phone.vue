<template>
  <div class="chasis">
    <div class="screen">
      <div class="header">
        <div class="brand">
          <nuxt-img loading="lazy" format="webp" src="https://classicminidiy.s3.amazonaws.com/misc/avatar.png" alt="" />
          <h3>Classic Mini Chat</h3>
        </div>
      </div>
      <div class="content">
        <div class="item first">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/fred.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">Fred <span>yesterday</span></div>
            <div class="line">How do I set the timing on my classic mini?</div>
          </div>
        </div>
        <div class="item">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/kellie.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">Kellie <span>yesterday</span></div>
            <div class="line">I like turtles...</div>
          </div>
        </div>
        <div class="item">
          <div class="column is-12">
            <div class="divider">recent</div>
          </div>
        </div>
        <div class="item">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/cole.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">Cole <span>Today</span></div>
            <div class="line">It's a simple thing.</div>
            <div class="line">Check out this guide I made on my channel.</div>
          </div>
        </div>
        <div class="item">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/jeff.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">Jeff <span>Today</span></div>
            <div class="line">Wow this is way simpler than I thought it was!</div>
            <div class="line">Thanks so much for the help!</div>
          </div>
        </div>
        <div class="item">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/nancy.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">Nancy <span>Today</span></div>
            <div class="line">Tuning my HIF44 carb has been a nightmare! Do you have any tips?</div>
            <div class="line">The car hasn't been running for a while.</div>
          </div>
        </div>
        <div class="item">
          <div class="sidebar">
            <nuxt-picture
              class="sidebar-avatar"
              format="webp,jpg"
              src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/avatars/william.jpg"
              alt="Image"
            />
          </div>
          <div class="text">
            <div class="heading">William <span>Tomorrow</span></div>
            <div class="line">
              Looks like Cole isn't online right not but this is actually something I have done before on my car.
            </div>
            <div class="line">The best way to get it working is to just make it work from the beginning.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $white: #eaeaea;
  .chasis {
    width: 264px;
    height: 533px;
    background: #2f2f2f;
    border-radius: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow:
      0 50px 100px -20px rgb(50 50 93 / 25%),
      0 30px 60px -30px rgb(0 0 0 / 30%),
      inset 0 -2px 6px 0 rgb(10 37 64 / 35%);

    .screen {
      width: 95%;
      height: 100%;
      margin-top: 5px;
      margin-bottom: 8px;
      border-radius: 30px;
      background: #37393e;
      overflow: hidden;
      flex-grow: 2;

      .content {
        z-index: 1;
        overflow: hidden;
      }
      flex-direction: column;
      .header {
        width: 100%;
        height: 50px;
        font-family: discord-bold, sans-serif;
        background: #202225;
        display: flex;
        color: $white;
        z-index: 5;
        align-items: center;
        padding-top: 5px;
        padding-left: 20px;
        padding-right: 10px;
        h3 {
          display: inline-block;
          vertical-align: top;
          padding-top: 4px;
          padding-left: 5px;
        }
        img {
          display: inline-block;
          max-width: 30px;
        }
      }
      .item.first {
        margin-top: 0px;
        animation-delay: 2s;
        animation: scroll 12s ease-in-out infinite alternate;
        //click 3s ease,
      }
      .item {
        background: #37393e;
        margin: 8px;
        margin-top: 0px;
        margin-bottom: 0px;
        display: flex;
        flex-direction: row;
        padding: 10px;

        .divider {
          margin: 0px;
        }

        .sidebar {
          width: 20%;
          .sidebar-avatar {
            img {
              border-radius: 50%;
            }
          }
          //margin: 5px;
        }
        .text {
          margin-left: 10px;
          width: 70%;
          .heading {
            color: #dcddde;
            font-family: whitney-semibold, sans-serif;
            margin-bottom: 7px;
            margin-left: 7px;
            span {
              padding-left: 5px;
              font-size: 9px;
              color: #72767d;
            }
          }
          .line {
            width: 90%;
            color: #dcddde;
            font-family: whitney-book, sans-serif;
            font-size: 14px;
            margin-left: 7px;
            margin-right: 2px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  @keyframes scroll {
    0% {
      margin-top: 0px;
    }
    20% {
      margin-top: 0px;
    }
    30% {
      margin-top: -100px;
    }
    40% {
      margin-top: -250px;
    }
    50% {
      margin-top: -300px;
    }
    60% {
      margin-top: -350px;
    }
    100% {
      margin-top: -350px;
    }
  }
</style>

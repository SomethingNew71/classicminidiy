<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { DateTime } from 'luxon';
  import { HERO_TYPES } from '../../data/models/generic';
  const birthday = DateTime.local(1989, 5, 11);
  const today = DateTime.now();
  const age = ref<string | undefined>(today.diff(birthday, 'years').toObject().years?.toFixed(0));
</script>

<template>
  <hero
    :title="'Classic Mini <br> DIY'"
    :subtitle="'YOUR FRIENDLY NEIGHBORHOOD'"
    :size="'is-medium'"
    :special="true"
    :heroType="HERO_TYPES.HOME"
    :background="'/backdrop2'"
    :navigation="true"
  />
  <div class="spacer layer"></div>
  <div class="container mx-auto px-4 pt-10">
    <div class="grid grid-cols-12 gap-4 pb-5">
      <div class="col-span-12"></div>
      <div class="col-span-12 md:col-span-8">
        <h2 class="fancy-font-book-oblique"><i class="fad fa-book"></i> THE MINI MISSION</h2>
        <h3 class="text-3xl font-bold pt-2 pb-3">Keeping the Classics on the Road</h3>
        <p class="text-lg pb-5">
          Classic Mini DIY started out of my small driveway workshop in 2015. I always focus on two things: keeping your
          Classic Mini on the road and making DIY car work accessible for all skill levels. I make DIY videos and
          tutorials showing exactly how to complete a wide range of jobs on your Classic Mini. I also partner with
          world-class manufacturers to deliver top-of-the-line products to personalize and ensure the performance of
          your Classic Mini.
        </p>
        <stats />
      </div>
      <div class="col-span-12 md:col-span-4">
        <h3 class="fancy-font-book-oblique"><i class="fad fa-gift"></i> SUPPORT THE MISSION</h3>
        <h4 class="text-3xl font-bold pt-2 pb-3">Support</h4>
        <p class="text-lg pt-2 pb-3">
          Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel alive,
          consider supporting on Patreon or if you have skills in JS and modern web technologies, please consider
          supporting the open source codebase on github.
        </p>
        <a class="mr-3 btn text-lg is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fab fa-patreon" />
          </span>
          <span>Donate</span>
        </a>
        <a class="btn text-lg" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fab fa-github" />
          </span>
          <span>Contribute</span>
        </a>
      </div>
      <div class="pt-20 pb-10 grid grid-cols-subgrid col-span-12 gap-4">
        <recent-videos></recent-videos>
      </div>
    </div>
  </div>
  <div class="spacer layer1"></div>
  <div class="bg-color-section">
    <div class="container mx-auto px-4 pt-10">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-5">
          <video autoplay loop muted playsinline>
            <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.webm" type="video/webm" />
            <source src="https://classicminidiy.s3.amazonaws.com/misc/grey-tool-animation.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="col-span-12 md:col-span-7">
          <h3 class="fancy-font-book-oblique"><i class="fad fa-handshake-alt"></i> THE COMPLETELY FREE</h3>
          <h3 class="text-3xl font-bold">Classic Mini Toolbox</h3>
          <h4 class="fancy-font-book-oblique pt-5 pb-5">THE TOOLKIT FOR THE DIY MECHANIC</h4>
          <p class="pb-5 text-lg">
            One of the largest reasons for starting this channel, was about making infromation related to working your
            Mini Cooper more accessible. In service to this goal I have created the Classic Mini Toolbox. Combining
            information from all over the web to bring you one location to find anything you need.
          </p>
          <nuxt-link class="btn btn-primary text-lg" to="/technical"> Open the toolbox </nuxt-link>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-8 lg:col-span-6">
          <h3 class="fancy-font-book-oblique pb-5"><i class="fad fa-hands-heart"></i> SUPPORT THE CHANNEL</h3>
          <h3 class="text-3xl font-bold pb-5">Become a Patreon</h3>
          <p class="text-lg">
            Classic Mini DIY is
            <strong>completely free resource</strong> supported by our viewers. If you are interested in helping to keep
            the channel alive, consider supporting on Patreon.
          </p>
          <a class="mt-5 mb-5 btn is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
            <span class="icon">
              <i class="fab fa-patreon" />
            </span>
            <span>Become a Member</span>
          </a>

          <div class="max-w-2xl mx-auto">
            <div class="p-4 mt-5 max-w-md bg-white rounded-lg shadow-md sm:p-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold leading-none">Membership Includes</h3>
              </div>
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 benefits-list">
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fab fa-discord pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">Access to Live DIY Chat</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-video pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">Early Access to videos</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-gift pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">Free gifts and merch</p>
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <i class="text-h4 fad fa-circle-info pt-2"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-lg font-medium">Insider information and much more...</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <browser class="browser is-hidden-touch" />
        </div>
      </div>
    </div>
  </div>
  <div class="spacer layer2"></div>
  <div class="mb-5">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-7 mb-5 pb-10">
          <h3 class="fancy-font-bold text-2xl"><i class="fad fa-address-card"></i> About Me</h3>
          <h4 class="fancy-font-book-oblique pt-5">MY NAME IS COLE</h4>
          <p>
            I am a {{ age }}-year-old Web Developer working in the financial industry. My experience in the automotive
            industry comes from 2 years of training on heavy diesel machinery and 8 years of Classic Mini ownership.
            With this experience, I do my best to provide the most comprehensive and technically correct information I
            can.
          </p>
          <h3 class="fancy-font-book-oblique pt-10">MY PROMISE</h3>
          <p>
            I will provide you with all the knowledge I can to the best of my ability. I will also accept feedback in
            the event that I get something incorrect. I am an enthusiast and not a complete expert so from time to time
            I will make mistakes.
          </p>
        </div>
        <div class="col-span-12 md:col-span-5 avatar-container">
          <nuxt-img
            src="https://classicminidiy.s3.amazonaws.com/misc/about-me.webp"
            alt="Image of my car on jack stands"
          />
        </div>
      </div>
    </div>
  </div>
  <SpeedInsights />
</template>

<style lang="scss">
  .animation-section,
  .avatar-container img {
    max-width: 90%;
    margin: auto;
    margin-top: 35px;
    display: block;
    border-radius: 50px;
  }
</style>

<style lang="scss" scoped>
  .benefits-list {
    .fa-discord {
      color: #7289da;
    }
    .fa-video {
      color: #ff5500;
    }
    .fa-gift {
      color: #45a65e;
    }
    .fa-circle-info {
      color: #ff9900;
    }
  }

  .bg-color-section {
    background-color: #f0f0f0;
  }

  .phone {
    z-index: 2;
    position: relative;
  }
  .panel-icon-home {
    max-width: 70px;
    margin: auto;
  }
  .panel-icon {
    height: 3em;
    width: 3em;
  }
  .grow {
    transition: all 0.2s ease-in-out;
  }
  .grow:hover {
    transform: scale(1.1);
  }
  .footer {
    a {
      font-weight: bold;
    }
  }
</style>

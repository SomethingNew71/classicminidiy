<template>
  <section class="getting-started text-xs-center pb-4" id="get-started">
    <v-layout row class="pt-4">
      <v-flex xs12 class="mission-header text-xs-center">
        <h2 class="display-1 white--text darken-3">Get Started</h2>
        <p class="subheading accent--text lighten-2 ma-0">Finding the right information for your car</p>
      </v-flex>
    </v-layout>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm4 md3 :key="index" v-for="(item, index) in items">
          <nuxt-link v-if="!item.disabled && !item.external" :to='item.to'>
            <v-card hover class="pt-3">
              <v-card-media :src="item.icon" height="130px"></v-card-media>
              <v-card-title primary-title class="pt-0">
                <div class="text-container">
                  <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </nuxt-link>
          <a v-if="item.external" :href="item.to" target="_blank">
            <v-card hover class="pt-3">
              <v-card-media :src="item.icon" height="130px"></v-card-media>
              <v-card-title primary-title class="pt-0">
                <div class="text-container">
                  <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </a>
          <v-card v-if="item.disabled" hover class="pt-3">
            <div class="disabled"></div>
            <v-card-media :src="item.icon" height="130px"></v-card-media>
            <v-card-title primary-title class="pt-0">
              <div class="text-container">
                <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      items: [
        {
          title: 'Manuals',
          icon: '"icons/Multicolor/SVG/Round Icons/Checklist.svg"',
          to: 'toolset/manuals',
          disabled: false
        },
        {
          title: 'Torque Specs',
          icon: '"icons/Multicolor/SVG/Round Icons/Settings-5.svg"',
          to: 'toolset/torque',
          disabled: false
        },
        {
          title: 'Electrical Diagrams',
          icon: '"icons/Yellow/SVG/Round Icons/Battery-Charging.svg"',
          to: 'toolset/electrical',
          disabled: false
        },
        {
          title: 'Color Codes',
          icon: '"icons/Multicolor/SVG/Round Icons/Pantone.svg"',
          to: 'toolset/colors',
          disabled: false
        },
        {
          title: 'DIY Videos',
          icon: '"icons/Multicolor/SVG/Round Icons/Video-Camera-2.svg"',
          external: true,
          to: 'https://www.youtube.com/c/classicminidiy',
          disabled: false
        },
        {
          title: 'Live Chat',
          external: true,
          icon: '"img/discord-icon.png"',
          to: 'https://discord.gg/TNNH7ZD',
          disabled: false
        },
        {
          title: 'Merch',
          external: true,
          icon: '"icons/Multicolor/SVG/Round Icons/Shop.svg"',
          to: 'https://merch.classicminidiy.com/',
          disabled: false
        },
        // {
        //   title: 'Tech Specs',
        //   icon: '"icons/Multicolor/SVG/Round Icons/Analytics.svg"',
        //   to: 'toolset/specs',
        //   disabled: true
        // },
        {
          title: 'History',
          icon: '"icons/Multicolor/SVG/Round Icons/Phone-Booth.svg"',
          to: 'toolset/historical',
          disabled: true
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.getting-started {
  a {
    color: transparent;
  }
  .icon {
    margin: auto;
  }
  .card {
    background-color: rgba(61, 60, 60,.8);
  }
  .card__media__background {
    background-size: auto !important;
  }
  .text-container {
    margin: auto;
  }
  .disabled {
    position: absolute;
    left:0;
    top:0;
    background: rgba(48, 48, 48, .8);
    width:100%;
    height:100%;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      border-style: solid;
      border-width: 2.7em;
      border-color: transparent;
      border-right-color: #659CC8;
      border-top-color: #659CC8;
      z-index: 1
    }

    &::before {
      content: "Coming \A Soon!";
      color: white;
      font-size: 12px;
      text-align: center;
      white-space: pre;
      position: absolute;
      top: 1%;
      right: 1%;
      z-index: 2;
    }
  }
}
</style>

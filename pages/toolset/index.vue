<template>
  <section class="getting-started text-xs-center pb-4" id="get-started">
    <v-layout row>
      <v-flex xs12 offset-sm1 sm10 offset-md2 md8 class="mission-header text-xs-center">
        <div class="icon green--text display-3"><i class="fas fa-wrench"></i></div>
        <br>
        <br>
        <h2 class="display-1">Discover the Information You Need</h2>
        <p class="subheading ma-0">Using Classic Mini DIY's custom toolset you should be able to find all the information you might need to get your mini back on the road.</p>
      </v-flex>
    </v-layout>
    <v-container grid-list-xl>
      <v-layout row wrap class="hidden-sm-and-down">
        <v-flex xs12 sm4 md3 :key="index" v-for="(item, index) in items">
          <nuxt-link v-if="!item.disabled && !item.external" :to='item.to'>
            <v-card hover class="pt-3">
              <v-img :src="item.icon" aspect-ratio="2" contain></v-img>
              <v-card-title primary-title class="pt-0">
                <div class="text-container">
                  <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </nuxt-link>
          <a v-if="item.external" :href="item.to" target="_blank">
            <v-card hover class="pt-3">
              <v-img :src="item.icon" aspect-ratio="2" contain></v-img>
              <v-card-title primary-title class="pt-0">
                <div class="text-container">
                  <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
                </div>
              </v-card-title>
            </v-card>
          </a>
          <v-card v-if="item.disabled" hover class="pt-3">
            <div class="disabled"></div>
            <v-img :src="item.icon" aspect-ratio="2" contain></v-img>
            <v-card-title primary-title class="pt-0">
              <div class="text-container">
                <h3 class="subheading text-xs-center mb-0">{{item.title}}</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout class="hidden-md-and-up">
        <v-flex xs12>
          <v-card>
            <v-toolbar color="primary" dark dense>
              <v-toolbar-title>A Toolbox to Learn</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list>
              <template v-for="(item, index) in items" v-if="!item.disabled">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile avatar v-else-if="item.external" :key="item.title" :href="item.to" >
                  <v-list-tile-avatar>
                    <img :src="item.icon">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="black--text" v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar v-else :key="item.title" nuxt :to="item.to" >
                  <v-list-tile-avatar>
                    <img :src="item.icon">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="black--text" v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
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
          icon: '/icons/Multicolor/SVG/Round Icons/Checklist.svg',
          to: '/toolset/manuals',
          disabled: false
        },
        {
          title: 'Torque Specs',
          icon: '/icons/Multicolor/SVG/Round Icons/Settings-5.svg',
          to: '/toolset/torque',
          disabled: false
        },
        {
          title: 'Electrical Diagrams',
          icon: '/icons/Multicolor/SVG/Round Icons/Battery-Charging.svg',
          to: '/toolset/electrical',
          disabled: false
        },
        {
          title: 'DIY Videos',
          icon: '/icons/Multicolor/SVG/Round Icons/Video-Camera-2.svg',
          external: true,
          to: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1',
          disabled: false
        },
        {
          title: 'Live Chat',
          external: true,
          icon: '/img/discord-icon.png',
          to: 'https://discord.gg/TNNH7ZD',
          disabled: false
        },
        {
          title: 'Color Codes',
          icon: '/icons/Multicolor/SVG/Round Icons/Pantone.svg',
          to: '/toolset/colors',
          disabled: true
        },
        {
          title: 'Model Lookup',
          icon: '/icons/Multicolor/SVG/Round Icons/Analytics.svg',
          to: '/toolset/specs',
          disabled: true
        },
        {
          title: 'History',
          icon: '/icons/Multicolor/SVG/Round Icons/Phone-Booth.svg',
          to: '/toolset/historical',
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
    background: rgba(48, 48, 48, .3);
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

<template>
  <section class="getting-started text-xs-center pb-4" id="get-started">
    <v-card>
      <v-toolbar color="primary" dark dense>
        <v-toolbar-title>A Toolbox to Learn</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <template v-for="(item, index) in items">
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
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      items: [
        {
          title: 'DIY Videos',
          subtitle: '',
          icon: 'icons/Multicolor/SVG/Round Icons/Video-Camera-2.svg',
          external: true,
          to: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1',
          disabled: false
        },
        {
          title: 'Manuals',
          subtitle: '',
          icon: 'icons/Multicolor/SVG/Round Icons/Checklist.svg',
          to: 'toolset/manuals',
          disabled: false
        },
        {
          title: 'Electrical Diagrams',
          subtitle: '',
          icon: 'icons/Multicolor/SVG/Round Icons/Battery-Charging.svg',
          to: 'toolset/electrical',
          disabled: false
        },
        {
          title: 'Torque Specs',
          subtitle: '',
          icon: 'icons/Multicolor/SVG/Round Icons/Settings-5.svg',
          to: 'toolset/torque',
          disabled: false
        },
        {
          title: 'Color Codes',
          subtitle: '',
          icon: 'icons/Multicolor/SVG/Round Icons/Pantone.svg',
          to: 'toolset/colors',
          disabled: false
        },
        {
          title: 'Live Chat',
          subtitle: '',
          external: true,
          icon: 'img/discord-icon.png',
          to: 'https://discord.gg/TNNH7ZD',
          disabled: false
        }
        // {
        //   title: 'Merch',
        //   subtitle: '',
        //   external: true,
        //   icon: 'icons/Multicolor/SVG/Round Icons/Shop.svg',
        //   to: 'https://merch.classicminidiy.com/',
        //   disabled: false
        // }
        // {
        //   title: 'Tech Specs',
        //   subtitle: '',
        //   icon: 'icons/Multicolor/SVG/Round Icons/Analytics.svg',
        //   to: 'toolset/specs',
        //   disabled: true
        // },
        // {
        //   title: 'History',
        //   subtitle: '',
        //   icon: 'icons/Multicolor/SVG/Round Icons/Phone-Booth.svg',
        //   to: 'toolset/historical',
        //   disabled: true
        // }
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

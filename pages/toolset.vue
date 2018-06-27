<template>
  <section>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      dark
    >
      <v-list dense dark>
        <v-list-tile :key="index" v-for="(item, index) in navItems" :nuxt="!item.external" :to="item.to" :href="item.href">
          <v-list-tile-action>
            <v-icon size="24px" :class="item.color"> {{item.icon}} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark>
      <v-btn icon nuxt to="/" ><v-icon>home</v-icon></v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Classic Mini Toolset</v-toolbar-title>
    </v-toolbar>
    <v-container class="child-container">
      <nuxt-child/>
    </v-container>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        navItems: [
          {
            title: 'Workshop Manuals',
            icon: 'fas fa-book pl-1',
            color: 'deep-orange--text',
            external: false,
            to: '/toolset/manuals'
          },
          {
            title: 'Torque Specs',
            icon: 'fas fa-wrench pl-1',
            color: 'green--text',
            external: false,
            to: '/toolset/torque'
          },
          {
            title: 'Electrical Diagrams',
            icon: 'fas fa-lightbulb pl-1',
            color: 'primary--text',
            external: false,
            to: '/toolset/electrical'
          },
          {
            title: 'DIY Videos',
            icon: 'fab fa-youtube',
            color: 'red--text',
            external: true,
            href: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1'
          },
          {
            title: 'Live Chat',
            icon: 'fab fa-discord pl-1',
            color: '',
            external: true,
            href: 'https://discord.gg/TNNH7ZD'
          }
        ]
      };
    },
    props: {
      source: String
    }
  };
</script>

<style lang="scss">
  .child-container {
    margin-top: 100px;
  }

  .toolbar {
    .btn--active .btn__content:before, .btn:focus .btn__content:before, .btn:hover .btn__content:before {
      background-color: inherit;
    }
  }
</style>

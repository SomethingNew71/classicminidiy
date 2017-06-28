<template>
  <v-app id="example-8" dark>
    <v-navigation-drawer temporary v-model="drawer" :mini-variant="mini" dark>
      <v-list class="pa-0">
        <v-list-item v-if="mini">
          <v-list-tile @click.native.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon light>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="components/navigation/mini.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Menu</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon light @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <!-- <nuxt-link > -->
          <v-list-item v-for="item in items" :key="item">
            <v-list-tile :to='item.to'>
              <v-list-tile-action>
                <v-icon light>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        <!-- </nuxt-link> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed light>
      <v-toolbar-side-icon class="hidden-md-and-up" light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Classic Mini DIY</v-toolbar-title>
      <v-toolbar-items class="hidden-md-and-down">
        <v-toolbar-item v-for="item in items" :key="item" :to='item.to' :target='item.target' ripple>
          {{ item.title }}
        </v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
  </v-app>
</template>

<style lang="scss" src="./navigation.scss"></style>

<script>
export default {
  data: function () {
    return {
      drawer: null,
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: '/'
        },
        {
          title: 'Get Started',
          icon: 'build',
          to: '/getting-started'
        },
        {
          title: 'Manuals',
          icon: 'settings',
          to: '/manuals'
        },
        {
          title: 'Specs',
          icon: 'settings',
          to: '/specs'
        },
        {
          title: 'History',
          icon: 'account_balance',
          to: '/historical'
        },
        {
          title: 'Youtube',
          icon: 'videocam',
          target: '_blank',
          to: 'https://www.youtube.com/c/classicminidiy'
        }
      ],
      mini: false,
      right: null
    };
  }
};
</script>

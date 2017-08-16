<template>
  <div>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      overflow
      absolute
      dense
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon light>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="/components/navigation/mini.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Classic Mini DIY</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon class="white--text">chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
          <v-list-item v-for="item in items" :key="item" v-if='!item.disabled'>
            <v-list-tile nuxt :to='item.to'>
              <v-list-tile-action>
                <v-icon dark>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark dense>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Classic Mini DIY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat small ripple nuxt v-for="item in items" :key="item" :to='item.to' :target='item.target' v-if='!item.disabled'>
          {{ item.title }}
        </v-btn>
        <v-btn flat small ripple :href='youtube.to' tag='a' :target='youtube.target'>
          {{ youtube.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
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
          to: '/',
          disabled: false
        },
        {
          title: 'Get Started',
          icon: 'build',
          to: '/getting-started',
          disabled: true
        },
        {
          title: 'Manuals',
          icon: 'collections_bookmark',
          to: '/manuals',
          disabled: false
        },
        {
          title: 'Specs',
          icon: 'settings',
          to: '/specs',
          disabled: true
        },
        {
          title: 'Tech Reference',
          icon: 'perm_data_setting',
          to: '/technical/torque',
          disabled: false
        },
        {
          title: 'History',
          icon: 'account_balance',
          to: '/historical',
          disabled: true
        }
      ],
      youtube: {
        title: 'Youtube',
        icon: 'videocam',
        target: '_blank',
        to: 'https://www.youtube.com/c/classicminidiy',
        disabled: false
      },
      mini: false,
      right: null
    };
  }
};
</script>

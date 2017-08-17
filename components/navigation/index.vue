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
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="/components/navigation/mini.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Classic Mini DIY</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-item v-for="(item, index) in items" :key="index" v-if='!item.disabled'>
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
      <v-btn icon class="hidden-md-and-up white--text" @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-btn>
      <v-toolbar-title>Classic Mini DIY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat small ripple nuxt v-for="(item, index) in items" :key="index" :to='item.to' :target='item.target' v-if='!item.disabled'>
          {{ item.title }}
        </v-btn>
        <v-btn flat small ripple :href='youtube.to' tag='a' :target='youtube.target'>
          {{ youtube.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style lang="scss">
.avatar img, .avatar .icon {
  height: auto;
  border-radius: 0;
}

.toolbar {
  .btn__content {
    a {
      text-decoration: none;
      z-index: 2;
    }
  }
}

.navigation-drawer--temporary, .navigation-drawer--is-mobile:not(.navigation-drawer--permanent) {
  z-index: 5 !important;
}

.btn--active .btn__content:before {
  background-color: transparent;
}

</style>

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

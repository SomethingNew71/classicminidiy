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
        <v-list-tile nuxt to="/toolset/torque">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Torque Specs</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile nuxt to="/toolset/electrical">
          <v-list-tile-action>
            <v-icon>battery_charging_full</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Electrical Diagrams</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile nuxt to="/toolset/colors">
          <v-list-tile-action>
            <v-icon>color_lens</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Color Picker</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile nuxt to="/toolset/specs">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Specifications</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile nuxt to="/toolset/manuals">
          <v-list-tile-action>
            <v-icon>collections_bookmark</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Manuals</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile nuxt to="/toolset/historical">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>History</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
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
        drawer: false
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

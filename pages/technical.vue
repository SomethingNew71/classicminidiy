<template>
  <section class="techincal">
    <v-layout class="hero" row>
      <v-flex xs12 md6>
        <h1 class="display-1 mt-5 py-5 pl-3">Technical References</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-bottom-nav
            value="true"
            absolute
          >
            <v-btn flat dark nuxt to="/technical/torque">
              <span>Torque Settings</span>
              <v-icon>build</v-icon>
            </v-btn>
            <!-- <v-btn flat dark nuxt to="/technical/tech">
              <span>Technical Documents</span>
              <v-icon>library_books</v-icon>
            </v-btn> -->
            <v-btn flat dark nuxt to="/technical/electrical">
              <span>Wiring Diagrams</span>
              <v-icon>battery_charging_full</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-card>
      </v-flex>
    </v-layout>
    <nuxt-child/>
    <div class="pa-4"></div>
  </section>
</template>

<style lang="scss" src="./technical/technical.scss"></style>
<script>
export default {};
</script>

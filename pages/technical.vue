<template>
  <section class="techincal">
    <v-layout class="hero" row>
      <v-flex offset-xs1 xs10 md6>
        <h1 class="display-1 mt-5 py-5">Technical References</h1>
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
            <v-btn flat dark nuxt to="/technical/colors">
              <span>Color Codes</span>
              <v-icon>color_lens</v-icon>
            </v-btn>
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

<style lang="scss">
.techincal {
  .hero {
    background-image: url('/pages/technical/hero.jpg') !important;
    background-size: cover;
    min-height: 19rem;

    h1 {
      color: #fff;
    }
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .bottom-nav.bottom-nav--absolute.bottom-nav--active {
    z-index: 1 !important;
    position: relative;
  }
  .torques {
    background-color: #F1F5F7;
  }
  .bottom-nav .btn--active .btn__content {
    font-size: 12px;
  }
}

</style>

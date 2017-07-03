<template>
  <section class="techincal">
    <v-layout class="hero" row>
      <v-flex xs12 md6>
        <h1 class="display-1 py-2 pl-3">Technical References</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-bottom-nav
            value="true"
            absolute
            :class="{
              'blue-grey': e2 === 1,
              'teal': e2 === 2,
              'primary': e2 === 3
            }"
          >
            <v-btn flat light @click.native="e2 = 1" :value="e2 === 1">
              <span>Torque Settings</span>
              <v-icon>build</v-icon>
            </v-btn>
            <v-btn flat light @click.native="e2 = 2" :value="e2 === 2">
              <span>Technical Documents</span>
              <v-icon>library_books</v-icon>
            </v-btn>
            <v-btn flat light @click.native="e2 = 3" :value="e2 === 3">
              <span>Wiring Diagrams</span>
              <v-icon>battery_charging_full</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-card>
      </v-flex>
    </v-layout>
    <div wrap v-if="e2 === 1" class="torques">
      <torquedocs/>
    </div>
    <div wrap v-if="e2 === 2" class="techincals">
      <!-- <torquedocs/> -->
    </div>
    <div wrap v-if="e2 === 3" class="electricals">
      <!-- <torquedocs/> -->
    </div>
  </section>
</template>

<style lang="scss" src="./technical.scss"></style>
<script>
import torquedocs from '~components/torquedocs';

export default {
  components: {
    torquedocs
  },
  data: function () {
    return {
      e2: 1
    };
  }
};
</script>

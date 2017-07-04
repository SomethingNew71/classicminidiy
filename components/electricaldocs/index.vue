<template>
  <v-layout wrap class="electrical">
    <v-flex xs12>
      <h2 class="headline pl-4 pt-4">Wiring Diagrams</h2>
    </v-flex>
    <!-- POSITIVE GROUND SECTION -->
    <v-flex xs12>
      <h3 class="title pl-5 pt-4">Positive Ground</h3>
    </v-flex>
    <v-flex xs12>
      <v-list class="pl-4">
        <template v-for="diagram in diagrams.positiveGround">
          <v-list-item v-bind:key="diagram.name">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} - {{diagram.to}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </template>
      </v-list>
    </v-flex>
    <!-- NEGATIVE GROUND SECTION -->
    <v-flex xs12>
      <h3 class="title pl-5 pt-4">Negative Ground</h3>
    </v-flex>
    <v-flex xs12>
      <v-list class="pl-4">
        <template v-for="diagram in diagrams.negativeGround">
          <v-list-item v-bind:key="diagram.name">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} - {{diagram.to}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </template>
      </v-list>
    </v-flex>
    <!-- NEGATIVE GROUND SECTION -->
    <v-flex xs12>
      <h3 class="title pl-5 pt-4">Negative Ground</h3>
    </v-flex>
    <v-flex xs12>
      <v-list class="pl-4">
        <template v-for="diagram in diagrams.negativeGround">
          <v-list-item v-bind:key="diagram.name">
            <v-list-tile avatar :href="diagram.link" target="_blank">
              <v-list-tile-avatar>
                <v-icon>picture_as_pdf</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{diagram.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="diagram.from || diagram.to">{{diagram.from}} - {{diagram.to}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<style lang="scss" src="./electricaldocs.scss"></style>

<script>
export default {
  data: function () {
    return {
      diagrams: {
        positiveGround: [
          {
            name: 'Mini Super/Super Deluxe/Countryman/Traveller/Cooper',
            from: 1959,
            to: 1964,
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Standard and Deluxe',
            from: 1959,
            to: 1964,
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Saloon/Van/Pickup',
            from: 1964,
            to: 1967,
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Cooper/Cooper S/Countryman/Traveller/Super Deluxe',
            from: 1964,
            to: 1967,
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Super Deluxe/Countryman/Traveller/Cooper/Cooper S Mk2',
            from: '',
            to: '',
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Standard Saloon/Van/Pickup Mk2',
            from: '',
            to: '',
            negative: 'yes',
            link: ''
          },
          {
            name: 'Mini Moke',
            from: '1959',
            to: '1967',
            negative: 'no',
            link: ''
          },
          {
            name: 'Mini Moke Mk2',
            from: '',
            to: '',
            negative: 'no',
            link: ''
          }
        ],
        negativeGround: [
          {
            name: 'Mini 850 Deluxe Saloon/Van/Pickup',
            from: '',
            to: '',
            negative: 'no',
            link: 'https://coolstuff.com'
          },
          {
            name: 'Mini 1000 Special Deluxe Saloon/Cooper S Mk3',
            from: '',
            to: '',
            negative: 'no',
            link: ''
          },
          {
            name: 'Mini 1275 GT',
            from: '',
            to: '',
            negative: 'no',
            link: ''
          },
          {
            name: 'Mini Clubman Saloon/Estate',
            from: '',
            to: '',
            negative: 'no',
            link: ''
          }
        ]
      }
    };
  }
};
</script>

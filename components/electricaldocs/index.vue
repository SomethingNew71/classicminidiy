<template>
  <v-layout wrap>
    <v-flex xs12 offset-sm1 sm10 class="mt-4">
      <v-card>
        <v-card-title class="pl-4 pt-4">
          <h3 class="title">
            Wiring Diagrams
            <br>
            <span class="body-1">Multiple Years</span>
          </h3>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            class="pr-4"
          ></v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="diagrams"
            v-bind:search="search"
          >
          <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.years.from }}</td>
            <td class="text-xs-right">{{ props.item.years.to }}</td>
            <td class="text-xs-right">
              <a :href="props.item.link">
                <v-btn primary small light>
                  Download(pdf)
                </v-btn>
              </a>
            </td>
          </template>
          <template slot="pageText" scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style lang="scss" src="./electricaldocs.scss"></style>

<script>
export default {
  data: function () {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          left: true,
          sortable: true,
          value: 'name'
        },
        { text: 'From(year)', value: 'from' },
        { text: 'To(year)', value: 'to' },
        {
          text: 'Download Link',
          sortable: false,
          value: 'link'
        }
      ],
      diagrams: [
        {
          name: 'Mini Super/Super Deluxe/Countryman/Traveller/Cooper',
          years: {
            from: 1959,
            to: 1964
          },
          link: ''
        },
        {
          name: 'Mini Standard and Deluxe',
          years: {
            from: 1959,
            to: 1964
          },
          link: ''
        },
        {
          name: 'Mini Saloon/Van/Pickup',
          years: {
            from: 1964,
            to: 1967
          },
          link: ''
        },
        {
          name: 'Mini Cooper/Cooper S/Countryman/Traveller/Super Deluxe',
          years: {
            from: 1964,
            to: 1967
          },
          link: ''
        },
        {
          name: '',
          years: {
            from: 1959,
            to: 1964
          },
          link: ''
        }
      ]
    };
  }
};
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-3">
      <nav class="panel">
        <p class="panel-heading">
          Choose your Needles
        </p>
        <a v-for="(value, name) in selectValues" :key="name" class="panel-block is-fullwidth">
          <b-button
            class="remove-button"
            :aria-label="'Click here to remove the ' + selectValues[name] + ' needle'"
            type="is-light"
            icon-pack="fas"
            icon-right="minus"
            :disabled="selectValues.length === 1"
            @click="removeArrayItem(selectValues[name])"
          />
          <b-field class="is-fullwidth" expanded>
            <b-select
              v-model="selectValues[name]"
              expanded
              placeholder="Select a Needle"
              @input="updateArrayItem(value, selectValues[name])"
            >
              {{ selectValues[name] }}
              <option
                v-for="needle in allNeedles"
                :key="needle.name"
                :value="needle"
              >
                {{ needle.name }}
              </option>
            </b-select>
          </b-field>
        </a>
        <div class="panel-block">
          <b-button
            type="is-primary"
            icon-pack="fas"
            icon-left="plus"
            expanded
            aria-label="Click here to add another needle with a generic value"
            :disabled="selectValues.length === 10"
            @click="addArrayItem()"
          >
            Add Needle
          </b-button>
        </div>
      </nav>
    </div>
    <div class="column is-9">
      <div class="card">
        <highcharts ref="needlesChart" :options="mapOptions"></highcharts>
      </div>
    </div>
  </div>
</template>
<script>
import Needles from '~/static/data/needles.json';
import StarterNeedles from '~/static/data/default-needles.json';

export default {
  data () {
    return {
      allNeedles: Needles,
      selectValues: [...StarterNeedles],
      mapOptions: {
        chart: { zoomType: 'x' },
        title: { text: 'Needle Comparison Chart' },
        subtitle: {
          text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>'
        },
        // This is the data decleration
        series: StarterNeedles,
        yAxis: {
          title: { text: 'Richness' },
          labels: {
            enabled: false
          },
          reversed: true
        },
        xAxis: {
          title: { text: 'RPMs' },
          labels: {
            enabled: false
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        tooltip: { headerFormat: 'Richness:<br>', shared: true },
        responsive: {
          rules: [{
            condition: { maxWidth: 500 },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      }
    };
  },
  methods: {
    updateArrayItem () {
      // When someone changes a needle value, update the chart
      this.mapOptions.series = this.selectValues;
    },
    addArrayItem () {
      // Pick out a random needle from all the needles
      const rand = this.allNeedles[Math.floor(Math.random() * this.allNeedles.length)];
      // Update the needle values which automatically triggers a redraw
      StarterNeedles.push(rand);
      this.selectValues.push(rand);
    },
    removeArrayItem (currentItem) {
      // Find the index of the item you wanna remove
      const itemIndex = this.selectValues.indexOf(currentItem);
      // Remove the specific needle value which automatically triggers a redraw
      StarterNeedles.splice(itemIndex, 1);
      this.selectValues.splice(itemIndex, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100%;
}
.remove-button {
  margin-right: 5px;
}
</style>

<style lang="scss">
.highcharts-credits {
  display: none !important;
}
</style>

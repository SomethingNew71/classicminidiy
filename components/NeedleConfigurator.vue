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
            <b-select v-model="selectValues[name]" expanded placeholder="Select a name">
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
          <button
            class="button is-primary is-fullwidth"
            aria-label="Click here to Compare your selected Needles"
            @click="redraw()"
          >
            Compare
          </button>
          <b-button
            type="is-light"
            icon-pack="fas"
            icon-right="plus"
            aria-label="Click here to add another needle with a generic value"
            :disabled="selectValues.length === 10"
            @click="addArrayItem()"
          />
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
import Highcharts from 'highcharts/highcharts';
import { Chart } from 'highcharts-vue';
import Needles from '~/static/data/needles.json';
import StarterNeedles from '~/static/data/default-needles.json';

export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      allNeedles: Needles,
      selectValues: [
        ...StarterNeedles
      ],
      highcharts: Highcharts,
      mapOptions: {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Needle Comparison Chart'
        },
        subtitle: {
          text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>'
        },
        // This is the data decleration
        series: StarterNeedles,
        yAxis: {
          title: {
            text: 'Richness'
          },
          labels: false,
          reversed: true
        },
        xAxis: {
          title: {
            text: 'RPMs'
          },
          labels: false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        tooltip: {
          headerFormat: 'Richness:<br>',
          shared: true
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
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
    addArrayItem () {
      const rand = this.allNeedles[Math.floor(Math.random() * this.allNeedles.length)];
      StarterNeedles.push(rand);
      this.selectValues.push(rand);
    },
    removeArrayItem (currentItem) {
      const itemIndex = StarterNeedles.indexOf(currentItem);
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

<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fas fa-book" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="">
                <span class="icon is-small">
                  <i class="fas fa-wrench" aria-hidden="true" />
                </span>
                <span>Needles</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h4 class="fancy-font-bold is-size-3">
          SU Carburettor Needles
        </h4>
        <p class="is-size-5  pt-20">
          One of the most confusing things about working on your Classic Mini often is the carburettor needle used on your car. Below you will find a multi-needle comparison chart which will allow you to compare needle profiles of multiple SU needles at the same time. Choose the needles you would like to compare and click Compare which will redraw the chart with new profiles. A huge thank you to the mintylamb site for posting this information publically.
        </p>
      </div>
      <div class="column is-3">
        <nav class="panel">
          <p class="panel-heading">
            Choose your Needles
          </p>
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[0]" expanded placeholder="Select a name">
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
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[1]" expanded placeholder="Select a name">
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
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[2]" expanded placeholder="Select a name">
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
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[3]" expanded placeholder="Select a name">
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
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[4]" expanded placeholder="Select a name">
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
          <a class="panel-block is-fullwidth">
            <b-field class="is-fullwidth" expanded>
              <b-select v-model="selectValues[5]" expanded placeholder="Select a name">
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
            <button class="button is-primary is-fullwidth" @click="redraw()">
              Compare these Needles
            </button>
          </div>
        </nav>
      </div>
      <div class="column is-9">
        <no-ssr>
          <vue-highcharts ref="needlesChart" :options="mapOptions" :highcharts="highcharts" />
        </no-ssr>
      </div>
    </div>
  </section>
</template>
<script>
import Highcharts from 'highcharts/highcharts'
import Needles from '~/static/data/needles.json'
import StarterNeedles from '~/static/data/default-needles.json'

export default {
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
    }
  },
  methods: {
    redraw () {
      // Get the local chart instance
      const currentChart = this.$refs.needlesChart
      currentChart.delegateMethod('showLoading', 'Loading...')
      // Remove all the needles currently in the list
      this.mapOptions.series.forEach((item) => { currentChart.removeSeries(item) })
      // Add all the new ones
      this.selectValues.forEach((needle) => { currentChart.addSeries(needle) })
      currentChart.hideLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100%;
}
.highcharts-credits {
  display: none !important;
}
</style>

import Vue from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue, { Chart } from 'highcharts-vue';

Vue.use(HighchartsVue, { highcharts: Highcharts });
Vue.component(Chart);

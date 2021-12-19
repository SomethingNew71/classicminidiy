import Vue from 'vue';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import HighchartsVue, { Chart } from 'highcharts-vue';

exportingInit(Highcharts);

// Create the download button for highcharts
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => [
  // Arrow stem
  'M',
  x + w * 0.5,
  y,
  'L',
  x + w * 0.5,
  y + h * 0.7,
  // Arrow head
  'M',
  x + w * 0.3,
  y + h * 0.5,
  'L',
  x + w * 0.5,
  y + h * 0.7,
  'L',
  x + w * 0.7,
  y + h * 0.5,
  // Box
  'M',
  x,
  y + h * 0.9,
  'L',
  x,
  y + h,
  'L',
  x + w,
  y + h,
  'L',
  x + w,
  y + h * 0.9,
];

Vue.use(HighchartsVue, { highcharts: Highcharts });
Vue.component(Chart);

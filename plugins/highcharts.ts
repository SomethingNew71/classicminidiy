import Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import 'highcharts/modules/offline-exporting';
import 'highcharts/modules/accessibility';
import HighchartsVue, { Chart } from 'highcharts-vue';

// Create the download button for highcharts
Highcharts.SVGRenderer.prototype.symbols.download = (x: number, y: number, w: number, h: number) => [
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

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HighchartsVue, { highcharts: Highcharts });
  nuxtApp.vueApp.component('highcharts', Chart);
});

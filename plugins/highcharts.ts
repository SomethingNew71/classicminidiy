import Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import 'highcharts/modules/offline-exporting';
import 'highcharts/modules/accessibility';
import HighchartsVue, { Chart } from 'highcharts-vue';

// Set global Highcharts options for better rendering
Highcharts.setOptions({
  credits: {
    enabled: false,
  },
  chart: {
    animation: false, // Disable animations for better initial rendering
    reflow: true,
    events: {
      load() {
        // Force redraw after chart is loaded
        setTimeout(() => {
          if (this.reflow) {
            this.reflow();
          }
        }, 100);
      },
    },
  },
  plotOptions: {
    series: {
      animation: false, // Disable series animation for better initial rendering
      states: {
        inactive: {
          opacity: 0.6,
        },
      },
    },
  },
});

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
  // Register Highcharts with Vue
  nuxtApp.vueApp.use(HighchartsVue, { highcharts: Highcharts });

  // Register the Chart component globally
  nuxtApp.vueApp.component('highcharts', Chart);

  // Add a hook to ensure charts are properly rendered after route changes
  nuxtApp.hook('page:finish', () => {
    // Allow time for the DOM to update
    setTimeout(() => {
      // Find all chart instances and reflow them
      const charts = Highcharts.charts.filter(Boolean);
      charts.forEach((chart) => {
        if (chart && chart.reflow) {
          chart.reflow();
        }
      });
    }, 200);
  });

  // Return Highcharts for use in components if needed
  return {
    provide: {
      highcharts: Highcharts,
    },
  };
});

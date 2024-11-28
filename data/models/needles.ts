import StarterNeedles from '~/data/default-needles.json';
export const chartOptions = {
  chart: { zoomType: 'x' },
  title: { text: 'Needle Comparison Chart' },
  exporting: {
    buttons: {
      contextButton: {
        menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF'],
        symbol: 'download',
      },
    },
  },
  subtitle: {
    text: 'Source: <a target="_blank" href="http://www.mintylamb.co.uk/suneedle/">http://www.mintylamb.co.uk/suneedle/</a>',
  },
  // This is the data decleration
  series: StarterNeedles,
  yAxis: {
    title: { text: 'Needle Diameter (mm)' },
    labels: {
      enabled: true,
    },
    reversed: true,
  },
  xAxis: {
    title: { text: 'Needle Station' },
    labels: {
      enabled: true,
    },
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  tooltip: { headerFormat: 'Richness:<br>', shared: true },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
};

export interface NeedleResponse {
  initial: Needle[];
  all: Needle[];
}

export interface Needle {
  name: string;
  size: number;
  data: number[];
}

export interface SuggestedNeedles {
  title: string;
  items: Item[];
}

export interface Item {
  engineSize: string;
  needleStd: string;
  needleRich: string;
  needleLean: string;
  springType: SpringType;
}

export enum SpringType {
  Blue = 'Blue',
  Empty = '-',
  Red = 'Red',
  Yellow = 'Yellow',
}

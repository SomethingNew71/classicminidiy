import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

export interface Post extends ParsedContent {
  image?: string;
  author?: string;
  date?: string;
  description?: string;
  slug?: string;
}

export interface ToolboxItem {
  title: string;
  path: string;
  iconHtml: string;
  to: string;
}

export const ToolboxItems: ToolboxItem[] = [
  {
    title: 'Torque Specs',
    path: '/technical/torque',
    iconHtml:
      '<i class="fa-duotone fa-screwdriver-wrench" style="--fa-primary-color: #417bbe; --fa-secondary-color: #5f6166;"></i>',
    to: '/technical/torque',
  },
  {
    title: 'Common Clearances',
    path: '/technical/clearance',
    iconHtml:
      '<i class="fa-duotone fa-ruler-triangle" style="--fa-primary-color: #433016; --fa-secondary-color: #ddbd8d; --fa-secondary-opacity: 1;"></i>',
    to: '/technical/clearance',
  },
  {
    title: 'Electrical Diagrams',
    path: '/technical/electrical',
    iconHtml:
      '<i class="fa-duotone fa-car-battery" style="--fa-secondary-color: #ff424d; --fa-secondary-opacity: 0.9;"></i>',
    to: '/technical/electrical',
  },
  {
    title: 'Engine Sizes',
    path: '/technical/enginesize',
    iconHtml:
      '<i class="fa-duotone fa-engine" style="--fa-primary-color: #59602e; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.6;"></i>',
    to: '/technical/enginesize',
  },
  {
    title: 'Carb Needle Configurator',
    path: '/technical/needles',
    iconHtml:
      '<i class="fa-duotone fa-chart-line" style="--fa-primary-color: #b74d36; --fa-secondary-color: #417bbd; --fa-secondary-opacity: 0.8;"></i>',
    to: '/technical/needles',
  },
  {
    title: 'Gearbox Calculator',
    path: '/technical/gearing',
    iconHtml: '<i class="fa-duotone fa-gears" style="--fa-primary-color: #343a40; --fa-secondary-color: #878d95;"></i>',
    to: '/technical/gearing',
  },
  {
    title: 'Wheel Library',
    path: '/technical/wheels',
    iconHtml:
      '<i class="fa-duotone fa-tire fa-spin" style="--fa-primary-color: #242424; --fa-secondary-color: #242424;"></i>',
    to: '/technical/wheels',
  },
  {
    title: 'Compression Ratio Calculator',
    path: '/technical/compression',
    iconHtml:
      '<i class="fa-duotone fa-calculator" style="--fa-primary-color: #343434; --fa-secondary-color: #992e1a; --fa-secondary-opacity: .8;"></i>',
    to: '/technical/compression',
  },
  {
    title: 'Parts Equivalency',
    path: '/technical/parts',
    iconHtml:
      '<i class="fa-duotone fa-magnifying-glass" style="--fa-primary-color: #080808; --fa-secondary-color: #f3b140; --fa-secondary-opacity: .9;"></i>',
    to: '/technical/parts',
  },
  {
    title: 'Color Picker',
    path: '/technical/colors',
    iconHtml:
      '<i class="fa-duotone fa-brush" style="--fa-primary-color: #431f23; --fa-secondary-color: #c3a166; --fa-secondary-opacity: 0.8;"></i>',
    to: '/technical/colors',
  },
];

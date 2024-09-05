// @ts-ignore
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
export interface ArchiveItem {
  title: string;
  path: string;
  iconHtml: string;
  to: string;
}
export interface SocialItem {
  title: string;
  href: string;
  icon: string;
}

export const SocialShareData = {
  preUrl: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fclassicminidiy.com%2Ftechnical%2Fcolors%2F',
  postUrl: '%2F',
};

export const SocialItems: SocialItem[] = [
  { title: 'Youtube', href: 'https://youtube.com/c/classicminidiy', icon: 'fab fa-youtube' },
  { title: 'Patreon', href: 'https://patreon.com/classicminidiy', icon: 'fab fa-patreon' },
  { title: 'Instagram', href: 'https://instagram.com/classicminidiy59', icon: 'fab fa-instagram' },
  { title: 'Facebook', href: 'https://facebook.com/classicminidiy', icon: 'fab fa-facebook' },
];

export const ToolboxItems: ToolboxItem[] = [
  {
    title: 'Torque Specs',
    path: '/technical/torque',
    iconHtml:
      '<i class="fa-duotone fa-screwdriver-wrench" style="--fa-primary-color: #417bbe; --fa-secondary-color: #5f6166;"></i>',
    to: '/technical/torque',
  },
  {
    title: 'Engine Sizes',
    path: '/technical/engines',
    iconHtml:
      '<i class="fa-duotone fa-engine" style="--fa-primary-color: #59602e; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.6;"></i>',
    to: '/technical/engines',
  },
  {
    title: 'Chassis Number Decoder',
    path: '/technical/chassisDecoder',
    iconHtml: '<i class="fa-duotone fa-hashtag" ></i>',
    to: '/technical/chassisDecoder',
  },
  // {
  //   title: 'Engine Number Decoder',
  //   path: '/technical/engineDecoder',
  //   iconHtml:
  //     '<i class="fa-duotone fa-engine" style="--fa-primary-color: #59602e; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.6;"></i>',
  //   to: '/technical/engineDecoder',
  // },
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
    title: 'Common Clearances',
    path: '/technical/clearance',
    iconHtml:
      '<i class="fa-duotone fa-ruler-triangle" style="--fa-primary-color: #433016; --fa-secondary-color: #ddbd8d; --fa-secondary-opacity: 1;"></i>',
    to: '/technical/clearance',
  },
];
export const ArchiveItems: ArchiveItem[] = [
  {
    title: 'Mini Registry',
    path: '/archive/registry',
    iconHtml:
      '<i class="fa-duotone fa-book-circle-arrow-up" style="--fa-secondary-color: #ED7135; --fa-secondary-opacity: 0.9;"></i>',
    to: '/archive/registry',
  },
  {
    title: 'Electrical Diagrams',
    path: '/archive/electrical',
    iconHtml:
      '<i class="fa-duotone fa-car-battery" style="--fa-secondary-color: #ff424d; --fa-secondary-opacity: 0.9;"></i>',
    to: '/archive/electrical',
  },
  {
    title: 'Wheel Library',
    path: '/archive/wheels',
    iconHtml:
      '<i class="fa-duotone fa-tire fa-spin" style="--fa-primary-color: #242424; --fa-secondary-color: #242424;"></i>',
    to: '/archive/wheels',
  },
  {
    title: 'Color Picker',
    path: '/archive/colors',
    iconHtml:
      '<i class="fa-duotone fa-brush" style="--fa-primary-color: #431f23; --fa-secondary-color: #c3a166; --fa-secondary-opacity: 0.8;"></i>',
    to: '/archive/colors',
  },
];

export const LandingPageToolboxItems = [
  {
    title: 'Torque Specs',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp',
    to: '/technical/torque',
  },
  {
    title: 'Common Clearances',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp',
    to: '/technical/clearance',
  },
  {
    title: 'Electrical Diagrams',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp',
    to: '/technical/electrical',
  },
  {
    title: 'Engine Sizes',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp',
    to: '/technical/engines',
  },
  {
    title: 'SU Needle Comparison',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp',
    to: '/technical/needles',
  },
  {
    title: 'Gearbox Calculator',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.webp',
    to: '/technical/gearing',
  },
  {
    title: 'Wheel Library',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp',
    to: '/archive/wheels',
  },
  {
    title: 'Compression Ratio Calculator',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
    to: '/technical/compression',
  },
  {
    title: 'Color Picker',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp',
    to: '/archive/colors',
  },
  {
    title: 'Parts Equivalency',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.webp',
    to: '/technical/parts',
  },
  {
    title: 'Compression Ratio Calculator',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
    webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
    to: '/technical/compression',
  },
];

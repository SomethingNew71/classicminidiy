// @ts-ignore
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

export enum BREADCRUMB_VERSIONS {
  TECH = 'technical',
  ARCHIVE = 'archive',
}
export enum HERO_TYPES {
  HOME = 'home',
  TECH = 'tech',
  ARCHIVE = 'archive',
  BLOG = 'blog',
  MAPS = 'maps',
}
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
  description: string;
  image: string;
  disabled?: boolean;
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
  { title: 'Classic Mini DIY on Youtube', href: 'https://youtube.com/c/classicminidiy', icon: 'fab fa-youtube' },
  { title: 'Classic Mini DIY on Patreon', href: 'https://patreon.com/classicminidiy', icon: 'fab fa-patreon' },
  { title: 'Classic Mini DIY on Instagram', href: 'https://instagram.com/classicminidiy59', icon: 'fab fa-instagram' },
  { title: 'Classic Mini DIY on Facebook', href: 'https://facebook.com/classicminidiy', icon: 'fab fa-facebook' },
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
    title: 'Chassis Number Decoder',
    path: '/technical/chassis-decoder',
    iconHtml: '<i class="fa-duotone fa-hashtag" ></i>',
    to: '/technical/chassis-decoder',
  },
  {
    title: 'Engine Number Decoder',
    path: '/technical/engine-decoder',
    iconHtml:
      '<i class="fa-duotone fa-engine" style="--fa-primary-color: #A49966; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.6;"></i>',
    to: '/technical/engine-decoder',
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
    description: '',
    image: 'https://cmdiy-archive.s3.us-east-1.amazonaws.com/manuals/images/registry.jpg',
    path: '/archive/registry',
    iconHtml:
      '<i class="fa-duotone fa-book-circle-arrow-up" style="--fa-secondary-color: #ED7135; --fa-secondary-opacity: 0.9;"></i>',
    to: '/archive/registry',
  },
  {
    title: 'Engine Sizes',
    description: '',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
    path: '/archive/engines',
    iconHtml:
      '<i class="fa-duotone fa-engine" style="--fa-primary-color: #59602e; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.6;"></i>',
    to: '/archive/engines',
  },
  {
    title: 'Mini Weights',
    description: '',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
    path: '/archive/weights',
    iconHtml:
      '<i class="fa-duotone fa-solid fa-weight-hanging" style="--fa-primary-color: #7dc978; --fa-secondary-color: #1f291f; --fa-secondary-opacity: 0.6;"></i>',
    to: '/archive/weights',
  },
  {
    title: 'Workshop Manuals',
    description: '',
    image: 'https://cmdiy-archive.s3.us-east-1.amazonaws.com/manuals/images/manuals.jpg',
    path: '/archive/manuals',
    iconHtml: '<i class="fa-duotone fa-book-sparkles"></i>',
    to: '/archive/manuals',
  },
  {
    title: 'Electrical Diagrams',
    description: '',
    image: 'https://cmdiy-archive.s3.us-east-1.amazonaws.com/manuals/images/wiringDiagrams+copy.jpg',
    path: '/archive/electrical',
    iconHtml:
      '<i class="fa-duotone fa-car-battery" style="--fa-secondary-color: #ff424d; --fa-secondary-opacity: 0.9;"></i>',
    to: '/archive/electrical',
  },
  {
    title: 'Wheel Library',
    description: '',
    image:
      'https://classicminidiy.s3.us-east-1.amazonaws.com/wheels/uploads/1fbb6499-c021-5c93-8030-76aeb04b5400/IMG_4568.jpeg',
    path: '/archive/wheels',
    iconHtml:
      '<i class="fa-duotone fa-tire fa-spin" style="--fa-primary-color: #242424; --fa-secondary-color: #242424;"></i>',
    to: '/archive/wheels',
  },
  {
    title: 'Color Picker',
    description: '',
    image: '',
    path: '/archive/colors',
    iconHtml:
      '<i class="fa-duotone fa-brush" style="--fa-primary-color: #431f23; --fa-secondary-color: #c3a166; --fa-secondary-opacity: 0.8;"></i>',
    to: '/archive/colors',
  },
  {
    title: 'Adverts',
    description: '',
    image: '',
    path: '/archive/adverts',
    iconHtml:
      '<i class="fa-duotone fa-solid fa-tv-retro" style="--fa-primary-color: #2f2f2f; --fa-secondary-color: #554416; --fa-secondary-opacity: 0.8;"></i>',
    to: '/archive/adverts',
  },
  {
    title: 'Carburetor Specs',
    description: '',
    image: '',
    path: '/archive/carbs',
    iconHtml:
      '<i class="fa-duotone fa-regular fa-bread-loaf" style="--fa-primary-color: #ba5c12; --fa-secondary-color: #ba5c12;"></i>',
    to: '/archive/carbs',
  },
  {
    title: 'Cylinder Head Specs',
    description: '',
    image: '',
    path: '/archive/heads',
    iconHtml:
      '<i class="fa-duotone fa-solid fa-head-side-gear" style="--fa-primary-color: #9b8816; --fa-secondary-color: #9b8816;"></i>',
    to: '/archive/heads',
    disabled: true,
  },
  {
    title: 'Catalogues',
    description: '',
    image: '',
    path: '/archive/catalogues',
    iconHtml: '<i class="fa-duotone fa-solid fa-book-open-cover"></i>',
    to: '/archive/catalogues',
    disabled: true,
  },
  {
    title: 'Distributors',
    description: '',
    image: '',
    path: '/archive/distros',
    iconHtml:
      '<i class="fa-duotone fa-solid fa-chart-network" style="--fa-primary-color: #004f2d; --fa-secondary-color: #004f2d;"></i>',
    to: '/archive/distros',
    disabled: true,
  },
  {
    title: 'Dimensions',
    description: '',
    image: '',
    path: '/archive/dimensions',
    iconHtml:
      '<i class="fa-duotone fa-solid fa-ruler-combined" style="--fa-primary-color: #74C0FC; --fa-secondary-color: #74C0FC;"></i>',
    to: '/archive/dimensions',
    disabled: true,
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

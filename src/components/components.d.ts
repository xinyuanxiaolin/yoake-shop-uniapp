// components.d.ts
import CxSwiper from './CxSwiper.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CxSwiper: typeof CxSwiper;
  }
}
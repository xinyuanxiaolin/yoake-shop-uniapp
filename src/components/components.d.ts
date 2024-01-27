// components.d.ts
import CxSwiper from './CxSwiper.vue';
import CxGuess from './CxGuess.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CxSwiper: typeof CxSwiper,
    CxGuess: typeof CxGuess,
  }
}

//组件实例类型
export type CxGuessInstance = InstanceType<typeof CxGuess>
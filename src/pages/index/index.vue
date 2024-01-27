<script setup lang="ts">

import { getHomeBannerApi } from '@/services/home'
import CustNavBar from './components/CustNavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue';
import type { BannerItem } from '@/types/home'; 
/* data */
//轮播图数据
const bannerList = ref<BannerItem[]>([])


/* method */
//获取首页轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

/* uniapp生命周期钩子 */
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustNavBar />
  <CxSwiper :list ="bannerList" />
  <view class="index"> index </view>
</template>

<style lang="scss">
//
</style>

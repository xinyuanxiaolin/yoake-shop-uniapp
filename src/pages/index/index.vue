<script setup lang="ts">
import { getHomeBannerApi, getHomeCategoryApi } from '@/services/home'
import type { BannerItem, CategoryItem } from '@/types/home'
import CustNavBar from './components/CustNavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CategoryPenel from './components/CategoryPanel.vue'
/* data */
//轮播图数据
const bannerList = ref<BannerItem[]>([])
//前台分类数据
const homeCategoryList = ref<CategoryItem[]>([])

/* method */
//获取首页轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}
//获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryApi()
  // console.log(res);
  homeCategoryList.value = res.result
  
}

/* uniapp生命周期钩子 */
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustNavBar />
  <!-- 自定义轮播图 -->
  <CxSwiper :list="bannerList" />
  <!-- 分类面板 -->
  <CategoryPenel :list = "homeCategoryList" />

  <view class="index"> index </view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>

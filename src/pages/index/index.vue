<script setup lang="ts">
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustNavBar from './components/CustNavBar.vue'
import CategoryPenel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { CxGuessInstance } from '@/components/components'
/* data */
//轮播图数据
const bannerList = ref<BannerItem[]>([])
//前台分类数据
const homeCategoryList = ref<CategoryItem[]>([])
//热门推荐数据
const hotList = ref<HotItem[]>([])
//获取猜你喜欢组件实例
const guessRef = ref<CxGuessInstance>()
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
//获取热门推荐数据
const getHomeHotData = async () => {
  const res = await getHomeHotApi()
  // console.log(res);
  hotList.value = res.result
}
//滚动触底时触发
const onScrolltolower = () =>{
  guessRef.value?.getMore()
}

/* uniapp生命周期钩子 */
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustNavBar />
  <!-- 这里导入uniapp的滚动容器组件保证滚动范围 -->
  <scroll-view scroll-y class="scroll_view" @scrolltolower="onScrolltolower">
    <!-- 自定义轮播图 -->
    <CxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPenel :list="homeCategoryList" />
    <!-- 热门推荐 -->
    <HotPanel :list="hotList" />
    <!-- 猜你喜欢 -->
    <CxGuess ref="guessRef" />

  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll_view{
  flex:1;
}
</style>

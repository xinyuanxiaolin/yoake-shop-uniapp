<script setup lang="ts">
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustNavBar from './components/CustNavBar.vue'
import CategoryPenel from './components/CategoryPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
// import HotPanel from './components/HotPanel.vue'
import { useGuessList } from '@/composables'
/* data */
//轮播图数据
const bannerList = ref<BannerItem[]>([])
//前台分类数据
const homeCategoryList = ref<CategoryItem[]>([])
//热门推荐数据
const hotList = ref<HotItem[]>([])
//下拉刷新动画是否开启 true开启,false关闭
const isTriggered = ref(false)
//主页面加载中
const isLoading = ref(false)
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

//猜你喜欢组合式函数调用(位于composables文件夹中)
const { guessRef, onScrolltolower } = useGuessList()

//自定义下拉刷新页面
const onRefresherrefresh = async () => {
  //开始动画
  isTriggered.value = true
  //重置猜你喜欢数据
  guessRef.value?.resetData()
  //加载数据  异步处理,优化时间等待,等all全部处理完结束动画
  await Promise.all([getHomeBannerData(), getHomeCategoryData()])
  //调用获取猜你喜欢数据
  guessRef.value?.getMore()
  //结束动画
  isTriggered.value = false
}

/* uniapp生命周期钩子 */
//页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustNavBar />
  <!-- 数据未加载完时,加载的骨架屏 -->
  <PageSkeleton v-if="isLoading" />
  <template v-else>
    <!-- 这里导入uniapp的滚动容器组件保证滚动范围 -->
    <scroll-view
      scroll-y
      class="scroll_view"
      @scrolltolower="onScrolltolower"
      :refresher-triggered="isTriggered"
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
    >
      <!-- 自定义轮播图 -->
      <CxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPenel :list="homeCategoryList" />
      <!-- 热门推荐 -->
      <!-- <HotPanel :list="hotList" /> -->
      <!-- 猜你喜欢 -->
      <CxGuess ref="guessRef" />
    </scroll-view>
  </template>
</template>

<style lang="scss">
//app端问题,app默认与class为app的元素为根元素,所以这里需要做适配
/* #ifdef APP-PLUS */
app,
/* #endif */
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll_view {
  flex: 1;
}
</style>

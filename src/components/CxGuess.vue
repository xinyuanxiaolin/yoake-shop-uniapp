<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'

import { ref } from 'vue'
import { onMounted } from 'vue'
/* data */
//猜你喜欢列表
const guessList = ref<GuessItem[]>([])
//分页参数            //ts的Required强转必须后让pageParams的实例必须有值,这样就解决page++是当page为undefined的问题
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
//已滚动到底的结束提示
const finish = ref(false)

/* methods */
//获取猜你喜欢数据,现在这个组件会被多个地方调用,所以数据写在这调用则可以直接显示数据
const getHomeGoodsGuessLikeData = async () => {
  if (finish.value === true) {
    return uni.showToast({
      title: '已经到底了~',
      icon: 'none',
      mask: true,
    })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  //数组追加,实现分页加载
  guessList.value.push(...res.result.items)
  //每次加完后页码累加,读取到下一页的数据插入
  //判断页码是否小于总页码
  if (pageParams.page < res.result.pages) {
    pageParams.page++
  } else {
    finish.value = true
  }
}
//重置数据
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}

//渲染完后挂载
onMounted(() => {
  getHomeGoodsGuessLikeData()
})
//暴露方法供父组件用
defineExpose({
  getMore: getHomeGoodsGuessLikeData,
  resetData
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text" v-show="!finish"> 正在加载... </view>
</template>

<style lang="scss">
@import '@/components/styles/CxGuess.scss';
</style>

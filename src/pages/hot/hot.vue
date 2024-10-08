<script setup lang="ts">
import { getHotRecommendApi } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
/* data */
//uniapp获取页面参数的vue3写法
const query = defineProps<{
  type: string
}>()
// console.log(query);
const currUrlMap = hotMap.find((v) => v.type === query.type)
//推荐封面图
const bannerPicture = ref('')
//推荐选项
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
//下标索引
const activeIndex = ref(0)

/* method */
//动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })
//获取首次热门推荐数据
const getHotRecommendData = async () => {
  const res = await getHotRecommendApi(currUrlMap!.url, { page: 1, pageSize: 10 })
  // console.log(res)
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}
//分页刷新
const onScrolltolower = async () => {
  //当前选项卡
  const currSubTypes = subTypes.value[activeIndex.value]
  // console.log(currSubTypes)
  if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
    //触底时,当前选项卡对应的页码++
    currSubTypes.goodsItems.page++
  } else {
    //自己给添加的对每一个标签的finish可以用做每一个选项卡的判断,不会导致公用一个finish导致值问题,
    currSubTypes.finish = true
    //退出并轻提示
    return uni.showToast({
      title: '已经到底了~',
      icon: 'none',
      mask: true,
    })
  }

  //调用接口传参,此时getHotRecommendApi给定剩下的2个参数,后端返回对应选项卡的内容
  const res = await getHotRecommendApi(currUrlMap!.url, {
    subType: currSubTypes.id,
    page: currSubTypes.goodsItems.page,
    pageSize: currSubTypes.goodsItems.pageSize,
  })
  //拼接新的列表
  const newsubTypes = res.result.subTypes[activeIndex.value]
  currSubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}

//页面加载
onLoad(() => {
  getHotRecommendData()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="activeIndex === index"
      scroll-y
      class="scroll-view"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text" v-show="!item.finish">正在加载...</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>

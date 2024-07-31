<template>
  <view class="product-list" v-if="searchResults?.total !== 0">
    <view v-for="item in searchResults?.list" :key="item.id" @tap="goToProductDetail(item)">
      <image class="product-image" :src="item.picture" mode="aspectFill" />
      <view class="product-info">
        <text class="product-title">{{ item.name }}</text>
        <text class="product-price">{{ item.nowPrice }}</text>
      </view>
    </view>
  </view>
  <view class="no-data" v-else>
    <text>没有查到相关商品</text>
  </view>
</template>

<script setup lang="ts">
import { getSearchListApi } from '@/services/search'
import type { SearchListResult, SearchParams } from '@/types/search'
import { ref, watch } from 'vue'
/** 获取父组件传来的搜索框内的值*/
const props = defineProps(['keyword'])
//初始化需要上传搜索框的数据
const data = ref<SearchParams>({
  pageNum: 1,
  pageSize: 10,
  searchText: '',
})

//商品列表相关数据
const searchResults = ref<SearchListResult>()
//搜索
const searchSumbit = async () => {
  const res = await getSearchListApi(data.value)
  searchResults.value = res.result
}

const goToProductDetail = (product: { id: number }) => {
  uni.navigateTo({
    url: `/pages/goods/goods?id=${product.id}`,
  })
}
//当元素触底时触发
const onScrolltolower = () => {
  console.log('出低了')
}

//监听搜索框内值的变化
watch(
  () => props.keyword,
  (newVal, oldVal) => {
    data.value.searchText = newVal
    //保存搜索历史记录
    const history = ref<string[]>(JSON.parse(uni.getStorageSync('searchHistory') || '[]'))
    console.log('props的值', newVal)
    if (!history.value.includes(newVal)) {
      history.value.unshift(newVal)
      uni.setStorageSync('searchHistory', JSON.stringify(history.value))
    }
    //搜索列表
    searchSumbit()
  },
  { immediate: true },
)
</script>
<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.product-list > view {
  width: calc(50% - 8px);
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease; // 添加过渡效果
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 添加轻微的阴影效果

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); // 悬停时增加阴影效果
  }
}

.product-image {
  width: 100%;
  height: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #e44d26;
  margin-top: auto; // 使价格位于卡片底部
}
.no-data {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
</style>

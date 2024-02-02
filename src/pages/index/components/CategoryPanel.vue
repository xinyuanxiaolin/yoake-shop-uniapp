<script setup lang="ts">
import type { CategoryItem } from '@/types/home';

//

//props值获取
defineProps<{
    list:CategoryItem[]
}>()
</script>

<template>
    <!-- 前台分类组件 -->
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in list"
      :key="item.id"
    >
      <image
        class="icon"
        :src="item.icon"
      ></image>
      <text class="text">{{item.name}}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
@import './styles//CategoryPanel.scss';
</style>
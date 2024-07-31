<template>
  <!-- 搜索栏组件 -->
  <search-bar ref="searchRef" @search="onSearch" />

  <!-- 根据状态显示搜索历史记录或搜索列表 -->
  <view v-if="showHistory">
    <search-history @select="onHistorySelect" />
  </view>
  <view v-else>
    <search-list :keyword="searchKeyword" />
  </view>
</template>

<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchList from './components/SearchList.vue'
import { ref } from 'vue'

const showHistory = ref(true)
const searchKeyword = ref('')
const searchRef = ref()
// 当搜索栏触发搜索事件时的处理
const onSearch = (keyword: string) => {
  if (keyword != undefined && keyword != null && keyword != '') {
    searchKeyword.value = keyword
    showHistory.value = false
  } else {
    uni.showToast({
      title: '搜索值不能为空',
      icon: 'error',
    })
  }
}

// 当从搜索历史中选择某一项时的处理
const onHistorySelect = (keyword: string) => {
  searchKeyword.value = keyword
  showHistory.value = false
  searchRef.value.setSearchValue(keyword)
}
</script>

<style scoped>
.scroll_view {
  flex: 1;
}
</style>

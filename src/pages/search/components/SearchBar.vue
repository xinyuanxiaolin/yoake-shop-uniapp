<template>
  <view class="search">
    <!-- 搜索框 -->
    <uni-easyinput
      suffixIcon="search"
      v-model="data"
      placeholder="请输入商品名"
      @confirm="onConfirm"
    >
    </uni-easyinput>
  </view>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose } from 'vue'

const data = ref<string>()
// 定义可以 emit 的事件列表
const emit = defineEmits(['search'])

// 当搜索框确认事件触发时的处理
const onConfirm = () => {
  const keyword = data.value?.trim()
  emit('search', keyword)
}

// 提供设置搜索值的方法
const setSearchValue = (value: string) => {
  data.value = value
}

// 暴露 setSearchValue 方法给父组件使用
defineExpose({
  setSearchValue,
})
</script>

<style lang="scss" scoped>
.search {
  margin: 20px 10px;
}
</style>

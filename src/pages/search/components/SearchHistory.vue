<template>
  <view>
    <view class="history-box" v-if="history.length > 0">
      <view class="history-top">
        <text class="history-title">搜索历史：</text>
        <uni-icons type="trash" size="20" @tap="clear"></uni-icons>
      </view>
      <view
        v-for="(item, index) in history"
        :key="index"
        class="history-item"
        @click="onHistoryClick(item)"
      >
        {{ item }}
      </view>
    </view>
    <view class="no-history" v-else>
      <text>暂无搜索历史</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const history = ref<string[]>(JSON.parse(uni.getStorageSync('searchHistory') || '[]'))
// 定义可以 emit 的事件列表
const emit = defineEmits(['select'])

// 当选择某一项历史记录时的处理
const onHistoryClick = (keyword: string) => {
  emit('select', keyword)
}

// 清空历史记录
const clear = () => {
  uni.showModal({
    content: '是否清空历史记录',
    success: async (res) => {
      if (res.confirm) {
        uni.removeStorageSync('searchHistory')
        history.value = []
      }
    },
  })
}
</script>

<style lang="scss" scoped>
.history-box {
  background-color: #fff;
  margin: 20px;
  flex-direction: column;

  .history-top {
    display: flex;
    justify-content: space-between;
    .history-title {
      font-size: 16px;
      font-weight: bold;
      display: block;
    }
  }

  .history-item {
    display: inline-block;
    margin: 10px 20px;
    padding: 5px 10px;
    font-size: 14px;
    color: #8d8b8b;
    border: 1px #8d8b8b solid;
    border-radius: 10px;
  }
}

.no-history {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
</style>

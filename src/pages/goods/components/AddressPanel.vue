<script setup lang="ts">
import { useAddressStore } from '@/stores/modules/address';
import type { AddressItem } from '@/types/address';
import { computed, ref } from 'vue';

//子组件调用父组件身上属性的方法
const emit =defineEmits<{
  (event: 'close'): void
}>()
//父传子
const data =defineProps<{
  list:AddressItem[]
}>()
//获取收货地址store
const addressStore = useAddressStore()
//获取下默认地址
const defaultData =computed(()=>{
  return addressStore.selectedAddress || data.list.find(v=>v.isDefault===1)
}) 
//判断选择了哪一个的id
const isSelectedId = ref(defaultData.value?.id)
//保存需要存入store库中的值
const addressDataTemp = ref<AddressItem>(defaultData.value ||{} as AddressItem)
//当改变地址时
const onChangeAddress = (item:AddressItem)=>{
  //改变对应id的select
  isSelectedId.value = item.id
  addressDataTemp.value = item!
}
//确认修改地址
const onConfirm = ()=>{
  //保存值到store中
  console.log("保存到store库的数据:"+addressDataTemp.value!);
  
  addressStore.changeSelectedAddress(addressDataTemp.value!)
  //关闭窗口
  emit('close')
}
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content" v-if="list.length">
      <view class="item" v-for="item in list" :key="item.id" @tap="onChangeAddress(item)">
        <view class="user">{{item.receiver+" "+item.contact}}</view>
        <view class="address">{{item.fullLocation+item.address}}</view>
        <text class="icon" :key="isSelectedId" :class="{'icon-checked':item.id===isSelectedId}"></text>
      </view>
    </view>
    <view class="content" v-if="!list.length">
      <view class="loading-text"> 暂无收货地址 </view>
    </view>
    <view class="footer">
      <view class="button primary">
        <navigator hover-class="none" url="/pagesMember/address-form/address-form">
        新建地址
      </navigator>
      </view>
      <view v-if="list.length" class="button primary" @tap="onConfirm()">确定</view>
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
  
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
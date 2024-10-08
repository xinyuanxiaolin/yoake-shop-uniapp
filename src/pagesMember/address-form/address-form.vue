<script setup lang="ts">
import { addAddressApi, addressListDetailApi, putAddressByIdApi } from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})
//定义校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: { rules: [{ required: true, errorMessage: '请输入收货人姓名' }] },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  countyCode: {
    rules: [{ required: true, errorMessage: '请选择所在区域' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}
//表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()

const query = defineProps<{
  id?: string
}>()
//动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })
//所在地区修改
// #ifdef MP-WEIXIN
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  // console.log(ev.detail);
  //前端展示省市区的文字
  form.value.fullLocation = ev.detail.value.join(' ')
  //传给后端省市区编号
  const [provinceCode, cityCode, countyCode] = ev.detail.code!
  //Object.assign() 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// #endif
// #ifdef H5 || APP-PLUS
const onCityChange: UniHelper.UniDataPickerOnChange = (ev) => {
  //省市区
  const [provinceCode, cityCode, countyCode] = ev.detail.value.map((v) => v.value)
  //合并数据
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// #endif

//是否为默认地址修改
const onSwitchChange: UniHelper.SwitchOnChange = (ev) => {
  // console.log(ev.detail.value)
  if (ev.detail.value) {
    form.value.isDefault = 1
  } else {
    form.value.isDefault = 0
  }
}
//提交表单
const onSubmit = async () => {
  try {
    await formRef.value?.validate?.()
    if (query.id) {
      //修改更新收货地址
      await putAddressByIdApi(query.id, form.value)
    } else {
      //新建地址请求
      await addAddressApi(form.value)
    }
    //成功提示
    uni.showToast({ icon: 'none', title: query.id ? '修改成功' : '添加成功' })
    //返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } catch (error) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'error',
    })
  }
}
//修改时,获取收货地址详情数据
const getAdressByIdData = async () => {
  if (query.id) {
    const res = await addressListDetailApi(query.id)
    // console.log(res)
    Object.assign(form.value, res.result)
  }
}
//页面加载
onLoad(() => {
  getAdressByIdData()
})
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item name="fullLocation" class="form-item">
        <text class="label">所在地区</text>
        <!-- #ifdef MP-WEIXIN -->
        <picker
          class="picker"
          mode="region"
          :value="form.fullLocation.split(' ')"
          @change="onRegionChange"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
        <!-- #endif -->
        <!-- #ifdef  APP-PLUS -->
        <uni-data-picker
          placeholder="请选择地址"
          popup-title="请选择城市"
          collection="opendb-city-china"
          field="code as value, name as text"
          orderby="value asc"
          :step-searh="true"
          self-field="code"
          parent-field="parent_code"
          :clear-icon="false"
          @change="onCityChange"
          v-model="form.countyCode"
        />
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <input class="input" placeholder="请填写省/市/区(县)" v-model="form.fullLocation" />
        <!-- #endif -->
      </uni-forms-item>
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          :checked="form.isDefault === 1 ? true : false"
          @change="onSwitchChange"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="onSubmit">保存并使用</button>
</template>

<style lang="scss">
/* #ifdef H5 || APP-PLUS */
:deep(.selected-area) {
  height: auto;
  flex: 0 1 auto;
}
/* #endif */
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
@/services/address

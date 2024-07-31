<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="password" class="form-item">
        <text class="label">原密码</text>
        <uni-easyinput
          type="password"
          v-model="form.password"
          placeholder="请输入旧密码"
        ></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item class="form-item" name="newPassword">
        <text class="label">新密码</text>
        <uni-easyinput
          type="password"
          v-model="form.newPassword"
          placeholder="请输入新密码"
        ></uni-easyinput>
      </uni-forms-item>
    </uni-forms>
    <button class="button" @tap="onSumbitPassword">确认修改</button>
  </view>
</template>

<script lang="ts" setup>
import { postPasswordApi } from '@/services/profile'
import { useMemberStore } from '@/stores'
import { ref } from 'vue'

const memberStore = useMemberStore()

// 表单数据
const form = ref({
  password: '',
  newPassword: '',
})
//定义校验规则
const rules: UniHelper.UniFormsRules = {
  password: { rules: [{ required: true, errorMessage: '请输入原密码' }] },

  newPassword: {
    rules: [{ required: true, errorMessage: '请输入新密码' }],
  },
}

//提交表单修改密码
const onSumbitPassword = async () => {
  const res = await postPasswordApi({
    password: form.value.password,
    newPassword: form.value.newPassword,
  })
  if (res.code == '0') {
    uni.showToast({
      title: `${res.msg}`,
      icon: 'error',
      mask: true,
    })
    return
  } else {
    uni.showToast({
      title: `修改成功`,
      icon: 'error',
      mask: true,
    })
    setTimeout(() => {
      //清理用户信息
      memberStore.clearProfile()
      // 返回上一页
      uni.navigateBack()
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
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

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }
  }
  .button {
    color: white;
    background-color: #00cca8;
  }
}
</style>

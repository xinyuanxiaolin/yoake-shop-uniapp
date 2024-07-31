<script setup lang="ts">
import { postLoginByAccountApi, postLoginWxMinApi, postLoginWxMinSimpleApi } from '@/services/login'
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let code = ''
// #ifdef MP-WEIXIN
//获取code登录凭证
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})
//获取用户手机号码
const onGetPhoneNumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const encryptedData = ev.detail!.encryptedData!
  const iv = ev.detail!.iv!
  const res = await postLoginWxMinApi({
    code,
    encryptedData,
    iv,
  })
  console.log(res)
}
// #endif

//模拟登录
const onGetPhoneNumberSimple = async () => {
  const res = await postLoginWxMinSimpleApi('18039030078')
  //保存登录会员信息
  const memberStore = useMemberStore()
  memberStore.setProfile(res.result)
  //成功了的提示
  uni.showToast({
    icon: 'none',
    title: '登录成功',
  })
  setTimeout(() => {
    //页面跳转,位于tab页时跳转用switchTab
    // uni.switchTab({ url: '/pages/my/my' })
    //优化用户体验
    uni.navigateBack()
  }, 500)
}

//H5端账号密码登录
const form = ref({
  account: '',
  password: '',
})
const onGetAccount = async () => {
  const res = await postLoginByAccountApi({
    account: form.value.account,
    password: form.value.password,
  })
  if (res.code != '0') {
    const memberStore = useMemberStore()
    memberStore.setProfile(res.result)
    uni.showToast({
      icon: 'none',
      title: '登录成功',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } else {
    uni.showToast({
      icon: 'error',
      title: '账号或者密码错误',
    })
  }
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="@/static/images/logo_icon.png"></image>
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <!-- #ifdef H5 -->
      <input class="input" type="text" placeholder="请输入用户名/手机号码" v-model="form.account" />
      <input class="input" type="text" password placeholder="请输入密码" v-model="form.password" />
      <button class="button phone" @tap="onGetAccount">登录</button>
      <!-- #endif -->
      <!-- 小程序端授权登录 -->
      <!-- #ifdef MP-WEIXIN -->
      <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" class="button phone">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 通用模拟登录 -->
          <button @tap="onGetPhoneNumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>

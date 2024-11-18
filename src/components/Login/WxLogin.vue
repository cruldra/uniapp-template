<template>
  <view class="login-page">
    <!-- Logo区域 -->
    <view class="logo-area">
      <image src="/static/logo.png" mode="aspectFit" class="logo" />
      <text class="app-name">起点读书</text>
    </view>

    <view class="login-area">
      <button
          class="wechat-login-btn"
          @click="handleWechatLogin"
      >
        微信一键登录
      </button>

      <text class="account-login" @click="handleAccountLogin">
        起点账号登录
      </text>
    </view>


    <!-- 协议区域 -->
    <view class="agreement-area">
      <nut-checkbox v-model="isAgree">
        我已阅读并接受
        <text class="link" @click="showAgreement">《用户服务协议》</text>、
        <text class="link" @click="showPrivacy">《隐私政策》</text>，
        未注册的手机号将自动注册。
      </nut-checkbox>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isAgree = ref(false)

const handleWechatLogin = () => {
  if (!isAgree.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none'
    })
    return
  }
  // 实现微信登录逻辑
}

const handleAccountLogin = () => {
  uni.navigateTo({
    url: '/pages/login/account'
  })
}

const showAgreement = () => {
  uni.navigateTo({
    url: '/pages/agreement/service'
  })
}

const showPrivacy = () => {
  uni.navigateTo({
    url: '/pages/agreement/privacy'
  })
}

const switchTab = (tab: string) => {
  // 实现标签页切换
}
</script>
<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background: #fff;

  .logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 120rpx;
      height: 120rpx;
    }

    .app-name {
      margin-top: 20rpx;
      font-size: 36rpx;
      color: #333;
    }
  }

  .login-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .wechat-login-btn {
      width: 100%;
      height: 88rpx;
      font-size: 32rpx;
      color: #fff;
      border-radius: 44rpx;
      background: #ee4044;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .account-login {
      margin-top: 30rpx;
      font-size: 28rpx;
      color: #666;
    }
  }

  .agreement-area {
    margin-top: 40rpx;
    font-size: 24rpx;
    color: #999;

    .link {
      color: #ee4044;
    }
  }

  .tab-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    display: flex;
    background: #fff;
    border-top: 1rpx solid #eee;

    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #666;

      :deep(.nut-icon) {
        font-size: 44rpx;
        margin-bottom: 6rpx;
      }
    }
  }
}
</style>

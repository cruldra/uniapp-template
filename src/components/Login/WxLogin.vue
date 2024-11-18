<template>
  <view class="login-page">
    <!-- Logo区域 -->
    <view class="logo-area">
      <image src="/static/logo.png" mode="aspectFit" class="logo"/>
      <text class="app-name">起点读书</text>
    </view>

    <view class="login-area">
      <!-- 根据是否同意协议显示不同按钮 -->
      <button
          v-if="isAgree"
          class="wechat-login-btn"
          open-type="getPhoneNumber"
          :loading="loading"
          @getphonenumber="getPhoneNumber"
      >
        微信一键登录
      </button>
      <button
          v-else
          class="wechat-login-btn"
          @click="handleDisabledClick"
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
        <text class="link" @click="showAgreement">《用户服务协议》</text>
        、
        <text class="link" @click="showPrivacy">《隐私政策》</text>
        ，
        未注册的手机号将自动注册。
      </nut-checkbox>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {authService} from "@/services/auth.ts";
// 控制按钮加载状态
const loading = ref(false)
const isAgree = ref(false)
// 获取手机号
const getPhoneNumber = async (e: any) => {
  // 用户拒绝授权
  if (e.detail.errMsg !== 'getPhoneNumber:ok') {
    await uni.showToast({
      title: '登录失败',
      icon: 'none'
    })
    return
  }

  loading.value = true
  try {
    // 1. 获取登录code
    const loginRes = await uni.login({
      provider: 'weixin'
    })
    // 2. 调用后端接口，传入code和加密数据
    const res = (await authService.wxLogin({
      code: loginRes.code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }))


    // 3. 保存登录态
    const {token, userInfo} = res.data!!
    uni.setStorageSync('token', token)
    uni.setStorageSync('userInfo', userInfo)

    // 4. 登录成功跳转
    /*await uni.switchTab({
      url: '/pages/index/index'
    })*/

  } catch (error) {
    await uni.showToast({
      title: '登录失败，请重试',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}
const handleDisabledClick = () => {
  uni.showToast({
    title: '请先同意用户协议和隐私政策',
    icon: 'none'
  })
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

      &.disabled {
        background: #cccccc;
        cursor: not-allowed;
      }
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

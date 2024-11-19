<template>
  <view class="login-page">
    <!-- 顶部区域 -->
    <view class="header">
      <text class="title">起点读书账号登录</text>
    </view>

    <!-- 登录表单区域 -->
    <view class="form-area">
      <!-- 账号输入框 -->
      <view class="input-item">
        <image class="icon" src="/static/icons/user.png" mode="aspectFit"></image>
        <input
            type="text"
            placeholder="请输入手机号/邮箱/个性账号"
            placeholder-class="placeholder"
            v-model="username"
        />
      </view>

      <!-- 密码输入框 -->
      <view class="input-item">
        <image class="icon" src="/static/icons/password.png" mode="aspectFit"></image>
        <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            placeholder-class="placeholder"
            v-model="password"
        />
        <image
            class="eye-icon"
            :src="showPassword ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'"
            mode="aspectFit"
            @click="togglePassword"
        ></image>
      </view>

      <!-- 协议选择 -->
      <view class="agreement">
        <nut-checkbox v-model="isAgree">
          同意
          <text class="link" @click="showAgreement">《用户服务协议》</text>
          和
          <text class="link" @click="showPrivacy">《隐私政策》</text>
        </nut-checkbox>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">
        登录
      </button>
    </view>

    <!-- 其他登录方式 -->
    <view class="other-login">
      <view class="title">其他登录方式</view>
      <view class="methods">
        <view class="method-item" @click="handleSmsLogin">
          <image src="/static/icons/sms.png" mode="aspectFit"></image>
          <text>短信登录</text>
        </view>
        <view class="method-item" @click="handleWechatLogin">
          <image src="/static/icons/wechat.png" mode="aspectFit"></image>
          <text>微信登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";
import {authService} from "@/services/auth.ts";

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isAgree = ref(false)

// 切换密码显示/隐藏
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 处理登录
const handleLogin = async () => {
  if (!isAgree.value) {
    await uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none'
    })
    return
  }
  // 登录逻辑
  const res = await authService.login({
    username: username.value,
    password: password.value
  })
  authStore.setToken(res.data!!.token)
  authStore.setUserInfo(res.data!!.userInfo)
}

// 跳转服务协议
const showAgreement = () => {
  uni.navigateTo({
    url: '/pages/agreement/service'
  })
}

// 跳转隐私政策
const showPrivacy = () => {
  uni.navigateTo({
    url: '/pages/agreement/privacy'
  })
}

// 短信登录
const handleSmsLogin = () => {
  authStore.setLoginType('sms')
  // console.log(1111)
}

// 微信登录
const handleWechatLogin = () => {
  authStore.setLoginType('wechat')
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: #fff;
  padding: 30rpx;

  .header {
    padding: 60rpx 0;
    text-align: center;

    .title {
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
    }
  }

  .form-area {
    padding: 0 30rpx;

    .input-item {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid #eee;

      .icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }

      input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
      }

      .eye-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .agreement {
      display: flex;
      align-items: center;
      margin: 30rpx 0;

      .agreement-text {
        font-size: 24rpx;
        color: #999;
        margin-left: 10rpx;
      }

      .link {
        color: #ee4044;
      }
    }

    .login-btn {
      width: 100%;
      height: 88rpx;
      background: #ee4044;
      color: #fff;
      font-size: 32rpx;
      border-radius: 44rpx;
      margin-top: 60rpx;

      &[disabled] {
        background: #ccc;
      }
    }
  }

  .other-login {
    margin-top: 100rpx;

    .title {
      text-align: center;
      font-size: 24rpx;
      color: #999;
      margin-bottom: 40rpx;
    }

    .methods {
      display: flex;
      justify-content: center;

      .method-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 40rpx;

        image {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 20rpx;
        }

        text {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
}
</style>

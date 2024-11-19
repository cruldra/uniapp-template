<template>
  <view class="login-page">
    <!-- 顶部区域 -->
    <view class="header">
      <text class="title">短信验证码登录</text>
    </view>

    <!-- 登录表单区域 -->
    <view class="form-area">
      <!-- 手机号输入框 -->
      <view class="input-item">
        <image class="icon" src="/static/icons/phone.png" mode="aspectFit"></image>
        <text class="country-code">+86</text>
        <input
            type="number"
            placeholder="请输入手机号"
            placeholder-class="placeholder"
            maxlength="11"
            v-model="phone"
        />
      </view>

      <!-- 验证码输入框 -->
      <view class="input-item">
        <image class="icon" src="/static/icons/verify.png" mode="aspectFit"></image>
        <input
            type="number"
            placeholder="请输入短信验证码"
            placeholder-class="placeholder"
            maxlength="6"
            v-model="code"
        />
        <button
            class="verify-btn"
            :disabled="!isPhoneValid || counting"
            @click="handleSendCode"
        >
          {{ counting ? `${counter}s后重试` : '获取验证码' }}
        </button>
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
      <button class="login-btn" :disabled="!canLogin" @click="handleLogin">
        登录
      </button>
    </view>

    <!-- 其他登录方式 -->
    <view class="other-login">
      <view class="title">其他登录方式</view>
      <view class="methods">
        <view class="method-item" @click="handleAccountLogin">
          <image src="/static/icons/user.png" mode="aspectFit"></image>
          <text>账号登录</text>
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
import { ref, computed } from 'vue'
import { useAuthStore } from "@/stores/auth.ts"

const authStore = useAuthStore()
const phone = ref('')
const code = ref('')
const isAgree = ref(false)
const counting = ref(false)
const counter = ref(60)

// 验证手机号格式
const isPhoneValid = computed(() => {
  return /^1[3-9]\d{9}$/.test(phone.value)
})

// 是否可以登录
const canLogin = computed(() => {
  return isPhoneValid.value && code.value.length === 6 && isAgree.value
})

// 发送验证码
const handleSendCode = () => {
  if (!isPhoneValid.value || counting.value) return

  counting.value = true
  counter.value = 60

  // 倒计时
  const timer = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
    } else {
      counting.value = false
      clearInterval(timer)
    }
  }, 1000)

  // TODO: 调用发送验证码接口
  uni.showToast({
    title: '验证码已发送',
    icon: 'none'
  })
}

// 处理登录
const handleLogin = () => {
  if (!isAgree.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none'
    })
    return
  }

  // TODO: 调用登录接口
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

// 账号登录
const handleAccountLogin = () => {
  authStore.setLoginType('account')
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

      .country-code {
        font-size: 28rpx;
        color: #333;
        margin-right: 20rpx;
      }

      input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
      }

      .verify-btn {
        padding: 0 20rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        color: #ee4044;
        background: none;
        border: 1rpx solid #ee4044;
        border-radius: 30rpx;

        &[disabled] {
          color: #999;
          border-color: #999;
        }
      }
    }

    .agreement {
      display: flex;
      align-items: center;
      margin: 30rpx 0;

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

<!-- pages/user/index.vue -->
<template>
  <view class="user-center">
    <!-- 头部 -->
    <view class="header">
      <view class="user-info">
        <nut-avatar size="large">
          <image :src="authStore.userInfo?.avatar"/>
        </nut-avatar>
        <view class="user-detail">
          <text class="username">VIP会员{{ authStore.userInfo?.id }}</text>
          <view class="points">
            积分:
          </view>
        </view>
      </view>
      <nut-icon name="setting" color="#fff" size="20"></nut-icon>
    </view>

    <!-- 订单状态卡片 -->
    <view class="order-card">
      <view class="order-status">
        <view
            class="status-item"
            @tap="navigate('distribution')"
        >
          <view class="icon-wrapper">
            <!--            <text class="badge"  >{{ item.count }}</text>-->
            <nut-icon name="/static/icons/share.png" size="24"></nut-icon>
          </view>
          <text class="text">分享</text>
        </view>

        <view
            class="status-item"
        >
          <view class="icon-wrapper">
            <!--            <text class="badge"  >{{ item.count }}</text>-->
            <nut-icon name="clock" size="24"></nut-icon>
          </view>
          <text class="text">分享1</text>
        </view>

        <view
            class="status-item"
        >
          <view class="icon-wrapper">
            <!--            <text class="badge"  >{{ item.count }}</text>-->
            <nut-icon name="clock" size="24"></nut-icon>
          </view>
          <text class="text">分享</text>
        </view>

        <view
            class="status-item"
        >
          <view class="icon-wrapper">
            <!--            <text class="badge"  >{{ item.count }}</text>-->
            <nut-icon name="clock" size="24"></nut-icon>
          </view>
          <text class="text">分享</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <nut-cell-group custom-class="m-10px">
      <nut-cell
          v-for="(item, index) in features"
          :key="index"
          :title="item.text"
          is-link
          @click="handleFeatureClick(item.type)"
      >
        <template #icon>
          <view class="feature-icon">
            <nut-icon :name="item.icon" size="20"></nut-icon>
          </view>
        </template>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore()


const features = ref([
  {type: 'user/profile', text: '个人资料', icon: '/static/icons/user.png'},
  {type: 'coupon', text: '优惠券', icon: 'coupon'},
  {type: 'redpacket', text: '红包', icon: 'red-packet'},
  {type: 'task', text: '任务', icon: 'checklist'},
  {type: 'points', text: '积分明细', icon: 'points'},
  {type: 'lottery', text: '抽奖', icon: 'gift'},
  {type: 'address', text: '收货地址', icon: 'location'}
])

const navigate = (type: string) => {
  uni.navigateTo({
    url: `/pages/${type}/index`
  })
}

const handleFeatureClick = (type: string) => {
  uni.navigateTo({
    url: `/pages/${type}/index`
  })
}
</script>

<style lang="scss" scoped>
.user-center {
  min-height: 100vh;
  background-color: #f5f5f5;

  .header {
    position: relative;
    padding: 40rpx 30rpx;
    background: linear-gradient(180deg, #ff6b6b, #ff8e8e);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .user-info {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .user-detail {
        color: #fff;

        .username {
          font-size: 36rpx;
          font-weight: bold;
        }

        .points {
          font-size: 24rpx;
          margin-top: 10rpx;
          padding: 4rpx 16rpx;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 20rpx;
        }
      }
    }
  }

  .order-card {
    margin: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .order-status {
      display: flex;
      justify-content: space-around;
      padding: 30rpx 0;

      .status-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-wrapper {
          position: relative;
          margin-bottom: 10rpx;

          .badge {
            position: absolute;
            top: -16rpx;
            right: -16rpx;
            background-color: #ff6b6b;
            color: #fff;
            font-size: 20rpx;
            padding: 0 8rpx;
            border-radius: 20rpx;
            min-width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            z-index: 1;
          }
        }

        .text {
          font-size: 24rpx;
          color: #333;
        }
      }
    }
  }

  .feature-list {
    margin: 20rpx;
    border-radius: 12rpx;
    overflow: hidden;

    .feature-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
}

// 自定义NutUI样式
:deep(.nut-cell) {
  padding: 16px;
}

:deep(.nut-badge) {
  --nut-badge-background-color: #ff6b6b;
}

:deep(.nut-avatar) {
  --nut-avatar-large-width: 120rpx;
  --nut-avatar-large-height: 120rpx;
}
</style>

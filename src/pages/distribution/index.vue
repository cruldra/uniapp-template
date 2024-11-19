<!-- pages/distribution/index.vue -->
<template>
  <view class="distribution-page">
    <!-- 顶部用户信息 -->
    <view class="header">
      <view class="user-info">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="info-content">
          <view class="user-name">
            微信用户
            <view class="level-tag">
              <nut-icon name="diamond" size="12" color="#fff"></nut-icon>
              分销等级3
            </view>
          </view>
          <view class="user-code">
            推荐码 {{ userInfo.code }}
            <nut-icon name="copy" size="14" color="#fff" @click="copyCode"></nut-icon>
          </view>
        </view>
      </view>
      <view class="pickup-btn" @click="navigateToPickup">
        申请取货点 >
      </view>
    </view>

    <view class="content">
      <!-- 上级用户 -->
      <view class="section superior">
        <view class="section-header">
          <text>上级用户</text>
          <view class="edit-btn">修改</view>
        </view>
      </view>

      <!-- 基础统计 -->
      <view class="section stats">
        <view class="section-header">
          <view class="title">
            <view class="line"></view>
            基础统计
          </view>
          <view class="time-select">
            当月
            <nut-icon name="down-arrow" size="12"></nut-icon>
          </view>
        </view>

        <!-- 客户统计 -->
        <view class="customer-stats">
          <view class="stat-item" v-for="(item, index) in customerStats" :key="index">
            <text class="number">{{ item.value }}人</text>
            <text class="label">{{ item.label }}</text>
          </view>
        </view>

        <!-- 详细数据 -->
        <view class="detail-stats">
          <view class="stat-card" v-for="(item, index) in detailStats" :key="index">
            <view class="icon-box" :class="item.iconClass">
              <nut-icon :name="item.icon" size="20" color="#fff"></nut-icon>
            </view>
            <view class="stat-info">
              <text class="label">{{ item.label }}</text>
              <view class="value-box">
                <text class="number">{{ item.value }}</text>
                <text class="unit">{{ item.unit }}</text>
              </view>
              <text class="sub-text" v-if="item.subText">{{ item.subText }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 返佣统计 -->
      <view class="section commission">
        <view class="section-header">
          <view class="title">
            <view class="line"></view>
            返佣统计
          </view>
        </view>
        <view class="commission-grid">
          <view class="grid-item" v-for="(item, index) in commissionStats" :key="index">
            <text class="label">{{ item.label }}</text>
            <text class="value">¥{{ item.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  avatar: '/static/avatar.png',
  code: 'D4451543D4A695D3'
})

const customerStats = ref([
  { label: '已推广客户', value: 0 },
  { label: '已消费客户', value: 0 },
  { label: '未消费客户', value: 0 }
])

const detailStats = ref([
  {
    label: '新增客户',
    value: '0',
    unit: '人',
    icon: 'people',
    iconClass: 'purple',
    subText: '有效（0） 需复购（0）'
  },
  {
    label: '新增客户总GMV',
    value: '0.00',
    unit: '¥',
    icon: 'chart-line',
    iconClass: 'green'
  },
  {
    label: '订单总数',
    value: '0',
    unit: '条',
    icon: 'order',
    iconClass: 'purple'
  },
  {
    label: '订单总GMV',
    value: '0.00',
    unit: '¥',
    icon: 'money',
    iconClass: 'green'
  }
])

const commissionStats = ref([
  { label: '返佣总额', value: '0.00' },
  { label: '待生效', value: '0.00' },
  { label: '待结算', value: '0.00' },
  { label: '已结算', value: '0.00' }
])

const copyCode = () => {
  uni.setClipboardData({
    data: userInfo.value.code,
    success: () => {
      uni.showToast({
        title: '推荐码已复制',
        icon: 'none'
      })
    }
  })
}

const navigateToPickup = () => {
  uni.navigateTo({
    url: '/pages/pickup/apply'
  })
}
</script>

<style lang="scss" scoped>
.distribution-page {
  min-height: 100vh;
  background-color: #f5f5f5;

  .header {
    background: linear-gradient(180deg, #ff4e6a, #ff758c);
    padding: 40rpx 30rpx;
    color: #fff;

    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;

      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      .info-content {
        flex: 1;

        .user-name {
          display: flex;
          align-items: center;
          font-size: 32rpx;
          margin-bottom: 10rpx;

          .level-tag {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 30rpx;
            padding: 4rpx 16rpx;
            font-size: 24rpx;
            margin-left: 20rpx;
          }
        }

        .user-code {
          font-size: 24rpx;
          opacity: 0.8;
        }
      }
    }

    .pickup-btn {
      align-self: flex-end;
      background: rgba(255, 255, 255, 0.2);
      padding: 10rpx 20rpx;
      border-radius: 30rpx;
      font-size: 24rpx;
    }
  }

  .content {
    padding: 20rpx;

    .section {
      background: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      padding: 30rpx;

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;

        .title {
          display: flex;
          align-items: center;
          font-size: 30rpx;
          font-weight: bold;

          .line {
            width: 6rpx;
            height: 30rpx;
            background: #ff4e6a;
            margin-right: 16rpx;
            border-radius: 3rpx;
          }
        }

        .edit-btn {
          color: #666;
          font-size: 26rpx;
          padding: 6rpx 20rpx;
          border: 1px solid #ddd;
          border-radius: 30rpx;
        }

        .time-select {
          color: #666;
          font-size: 26rpx;
        }
      }
    }

    .customer-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30rpx;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        text-align: center;

        .number {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }

        .label {
          font-size: 24rpx;
          color: #666;
        }
      }
    }

    .detail-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;

      .stat-card {
        display: flex;
        background: #f8f8f8;
        padding: 20rpx;
        border-radius: 12rpx;

        .icon-box {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;

          &.purple {
            background: #8a7fff;
          }

          &.green {
            background: #42d7b6;
          }
        }

        .stat-info {
          flex: 1;

          .label {
            font-size: 24rpx;
            color: #666;
            margin-bottom: 10rpx;
          }

          .value-box {
            margin-bottom: 6rpx;

            .number {
              font-size: 32rpx;
              font-weight: bold;
              margin-right: 6rpx;
            }

            .unit {
              font-size: 24rpx;
              color: #666;
            }
          }

          .sub-text {
            font-size: 22rpx;
            color: #999;
          }
        }
      }
    }

    .commission-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;

      .grid-item {
        background: #f8f8f8;
        padding: 30rpx;
        border-radius: 12rpx;
        text-align: center;

        .label {
          font-size: 26rpx;
          color: #666;
          margin-bottom: 10rpx;
          display: block;
        }

        .value {
          font-size: 32rpx;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

<template>
  <view class="profile-page">
    <view class="form-list">
      <!-- 头像 -->
      <view class="form-item" @tap="chooseAvatar">
        <text class="label">头像</text>
        <view class="value-box">
          <image class="avatar" :src="formData.avatarUrl" mode="aspectFill"></image>
          <text class="arrow"></text>
        </view>
      </view>

      <!-- 昵称 -->
      <view class="form-item">
        <text class="label">昵称
          <text class="required">*</text>
        </text>
        <view class="value-box">
          <input
              type="text"
              v-model="formData.nickname"
              placeholder-class="placeholder"
              maxlength="30"
          />
        </view>
      </view>

      <!-- 生日 -->
      <view class="form-item" @tap="openDatePicker">
        <text class="label">生日</text>
        <view class="value-box">
          <text class="value placeholder" v-if="!formData.birthday">请选择生日</text>
          <text class="value" v-else>{{ formData.birthday }}</text>
          <text class="arrow"></text>
        </view>
      </view>

      <!-- 详细地址 -->
      <view class="form-item">
        <text class="label">详细地址</text>
        <view class="value-box">
          <input
              type="text"
              v-model="formData.address"
              placeholder="详细地址最多30个字符"
              placeholder-class="placeholder"
              maxlength="30"
          />
        </view>
      </view>

      <!-- 性别 -->
      <view class="form-item" @tap="openGenderPicker">
        <text class="label">性别</text>
        <view class="value-box">
          <text class="value">{{ getGenderLabel }}</text>
          <text class="arrow"></text>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-btn" @tap="saveProfile">
      保存
    </view>

    <!-- 日期选择器 -->
    <nut-popup position="bottom" v-model:visible="showCalendar">
      <nut-date-picker
          v-model="currentDate"
          :min-date="startDate"
          :max-date="endDate"
          is-show-chinese
          title="选择生日"
          @confirm="onDateConfirm"
          @cancel="closeDatePicker"
      />
    </nut-popup>
    <!-- 性别选择器 -->
    <nut-popup position="bottom" v-model:visible="showGenderPicker">
      <view class="gender-picker">
        <view class="picker-header">
          <text>选择性别</text>
          <text class="close" @tap="closeGenderPicker">×</text>
        </view>
        <view class="picker-content">
          <view
              class="gender-item"
              v-for="item in genderOptions"
              :key="item.value"
              @tap="selectGender(item)"
          >
            {{ item.label }}
          </view>
        </view>
      </view>
    </nut-popup>
  </view>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";
import {fileService} from "@/services/file.ts";
import {userService} from "@/services/user.ts";
import type {UpdateProfileRequest} from "@/types/auth.ts";

const authStore = useAuthStore()
const formData = ref<UpdateProfileRequest>({
  avatarUrl: authStore.userInfo?.avatar,
  nickname: authStore.userInfo?.nickname,
  birthday: authStore.userInfo?.birthday,
  address: authStore.userInfo?.address,
  gender: authStore.userInfo?.gender,
})

const genderOptions = [
  {label: '保密', value: 'UNKNOWN'},
  {label: '男', value: 'MALE'},
  {label: '女', value: 'FEMALE'}
]

const getGenderLabel = computed(() => {
  const gender = genderOptions.find(item => item.value === formData.value.gender)
  return gender ? gender.label : '保密'
})

// 选择头像
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1, // 只选择一张图片
    sizeType: ['compressed'], // 压缩图片
    sourceType: ['album', 'camera'], // 允许从相册选择和拍照
    success: async (res) => {
      //const a = res.tempFiles[0]
      // uploadAvatar(res.tempFilePaths[0])
      // 读取文件为base64
      const filePath = res.tempFilePaths[0]
      const fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
      const base64 = await new Promise((resolve, reject) => {
        uni.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'base64',
          success: (res) => resolve(res.data),
          fail: (err) => reject(err)
        })
      })
      const uploadRes = await fileService.upload({
        file: base64 as string,
        name: fileName,
        use: 'avatars' // 声明文件的用途是一个用户头像
      })
      if (uploadRes.data?.url) {
        await uni.showToast({
          title: '上传成功',
          icon: 'success'
        })
        formData.value.avatarUrl = uploadRes.data?.url
      }
    },
    fail: () => {
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}
// 日期选择
const showCalendar = ref(false)
const currentDate = ref(new Date())
const startDate = new Date('1900-01-01')
const endDate = new Date()

const openDatePicker = () => {
  // 如果已有选择的日期，将其设置为当前值
  if (formData.value.birthday) {
    currentDate.value = new Date(formData.value.birthday)
  }
  showCalendar.value = true
}

const closeDatePicker = () => {
  showCalendar.value = false
}

const onDateConfirm = (date: { selectedValue: string[] }) => {
  const [year, month, day] = date.selectedValue
  formData.value.birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  showCalendar.value = false
}
// 性别选择
const showGenderPicker = ref(false)
const openGenderPicker = () => {
  showGenderPicker.value = true
}

const closeGenderPicker = () => {
  showGenderPicker.value = false
}

const selectGender = (item: any) => {
  formData.value.gender = item.value
  closeGenderPicker()
}

// 保存资料
const saveProfile = async () => {
  if (!formData.value.nickname) {
    await uni.showToast({
      title: '请输入昵称',
      icon: 'none'
    })
    return
  }

  // 调用保存接口
  const res = await userService.updateProfile(formData.value)
  console.log('保存结果：', res)
  if (res.data)
    authStore.setUserInfo(res.data)
  console.log('保存的数据：', formData.value)
  await uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
}
</script>
<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 20rpx;

  .form-list {
    background-color: #fff;

    .form-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;

      .label {
        width: 160rpx;
        font-size: 28rpx;
        color: #333;

        .required {
          color: #ff4d4f;
          margin-left: 4rpx;
        }
      }

      .value-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .value {
          font-size: 28rpx;
          color: #333;
        }

        .placeholder {
          color: #999;
        }

        input {
          flex: 1;
          text-align: right;
          font-size: 28rpx;
        }

        .arrow {
          width: 16rpx;
          height: 16rpx;
          border-top: 4rpx solid #999;
          border-right: 4rpx solid #999;
          transform: rotate(45deg);
          margin-left: 20rpx;
        }
      }
    }
  }

  .save-btn {
    position: fixed;
    left: 30rpx;
    right: 30rpx;
    bottom: 50rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background: #ff4d4f;
    color: #fff;
    font-size: 32rpx;
    border-radius: 45rpx;
  }
}

.gender-picker {
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;

  .picker-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    position: relative;
    font-size: 32rpx;

    .close {
      position: absolute;
      right: 30rpx;
      font-size: 40rpx;
      color: #999;
    }
  }

  .picker-content {
    .gender-item {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      border-top: 1rpx solid #f5f5f5;

      &:active {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>

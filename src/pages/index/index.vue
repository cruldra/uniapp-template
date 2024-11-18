<template>
  <view>
    <text class="title font-900 color-red">{{ title }}</text>
    <text class="color-blue">{{ store.count }}</text>
    <button @click="store.increment">+</button>
    <button @click="a">环境变量测试</button>
    <button @click="b">http测试</button>
    <nut-button type="primary">主要按钮1</nut-button>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const title = ref('Hello')
import {useCounterStore} from '@/stores/example'
import {exampleService} from "@/services/example.ts";

const store = useCounterStore()
const a = () => {
  // console.log(process.env.VITE_APP_TITLE)
  console.log(import.meta.env.VITE_APP_TITLE)
  console.log(import.meta.env.MODE)
}
const b = () => {
  console.log("b")
  exampleService.getCars()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

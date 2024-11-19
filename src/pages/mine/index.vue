<template>
  <wx-login v-if="authStore.loginType === 'wechat'"/>
  <account-login v-else-if="authStore.loginType =='account'"/>
  <sms-login v-else-if="authStore.loginType =='sms'"/>
</template>

<script setup lang="ts">

import WxLogin from "@/components/Login/WxLogin.vue";
import {useAuthStore} from "@/stores/auth.ts";
import AccountLogin from "@/components/Login/AccountLogin.vue";
import SmsLogin from "@/components/Login/SmsLogin.vue";

const authStore = useAuthStore()
</script>

<style>
</style>

<template>
  <template v-if="authStore.userInfo">
    <personal/>
  </template>
  <template v-else>
    <wx-login v-if="authStore.loginType === 'wechat'"/>
    <account-login v-else-if="authStore.loginType =='account'"/>
    <sms-login v-else-if="authStore.loginType =='sms'"/>
  </template>
</template>

<script setup lang="ts">

import WxLogin from "@/components/Login/WxLogin.vue";
import {useAuthStore} from "@/stores/auth.ts";
import AccountLogin from "@/components/Login/AccountLogin.vue";
import SmsLogin from "@/components/Login/SmsLogin.vue";
import Personal from "@/components/Personal.vue";

const authStore = useAuthStore()
</script>

<style>
</style>

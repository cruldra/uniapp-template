<template>
  <wx-login v-if="authStore.loginType === 'wechat'"/>
  <account-login v-else-if="authStore.loginType =='account'"/>
</template>

<script setup lang="ts">

import WxLogin from "@/components/Login/WxLogin.vue";
import {useAuthStore} from "@/stores/auth.ts";
import AccountLogin from "@/components/Login/AccountLogin.vue";

const authStore = useAuthStore()
</script>

<style>
</style>

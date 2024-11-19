import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {LoginType, UserInfo} from "@/types/auth.ts";

export const useAuthStore = defineStore('auth', () => {
    const loginType = ref<LoginType>('wechat')
    const userInfo = ref<UserInfo>()

    const isLoggedIn = computed(() => !!userInfo.value?.id)

    function setLoginType(type: LoginType) {
        loginType.value = type
    }

    function setUserInfo(info: any) {
        userInfo.value = info
    }


    return {
        loginType,
        userInfo,
        isLoggedIn,
        setLoginType,
        setUserInfo
    }
})

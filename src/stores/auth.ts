import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {LoginType, UserInfo} from "@/types/auth.ts";

export const useAuthStore = defineStore('auth', () => {
    const loginType = ref<LoginType>('wechat')
    const userInfo = ref<UserInfo>()
    const token = ref<string>()
    const isLoggedIn = computed(() => !!userInfo.value?.id)

    const setLoginType = (type: LoginType) => {
        loginType.value = type
    }

    const setUserInfo = (info: any) => {
        userInfo.value = info
    }
    const setToken = (tokenStr: string) => {
        token.value = tokenStr
    }


    return {
        loginType,
        userInfo,
        isLoggedIn,
        token,
        setLoginType,
        setUserInfo,
        setToken
    }
}, {
    persist: true,
},)

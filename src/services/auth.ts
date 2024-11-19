import {createApi, DefaultApiImpl, Post, RequestBody} from "@dongjak-extensions/http-client";
import type {ResponsePayloads} from "@/types/common.ts";
import {request} from "@/utils/http.ts";
import type {AccountLoginData, LoginResult, WechatLoginData} from "@/types/auth.ts";

class AuthService extends DefaultApiImpl {

    /**
     * 微信登录
     * @param form  登录表单
     */
    @Post('/auth/wxLogin')
    wxLogin(@RequestBody() form: WechatLoginData): Promise<ResponsePayloads<LoginResult>> {
        return Promise.resolve() as any
    }

    /**
     * 账号登录
     * @param form
     */
    @Post('/auth/login')
    login(@RequestBody() form: AccountLoginData): Promise<ResponsePayloads<LoginResult>> {
        return Promise.resolve() as any
    }

}

export const authService = createApi(AuthService, request)

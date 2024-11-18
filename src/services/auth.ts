import {createApi, DefaultApiImpl, Post, RequestBody} from "@dongjak-extensions/http-client";
import type {HttpResponse} from "luch-request";
import type {ResponsePayloads} from "@/types/common.ts";
import {request} from "@/utils/http.ts";
import type {WechatLoginData, WechatLoginResult} from "@/types/auth.ts";

class AuthService extends DefaultApiImpl {

    /**
     * 微信登录
     * @param form  登录表单
     */
    @Post('/auth/wxLogin')
    wxLogin(@RequestBody() form: WechatLoginData): Promise<ResponsePayloads<WechatLoginResult>> {
        return Promise.resolve() as any
    }


}

export const authService = createApi(AuthService, request)

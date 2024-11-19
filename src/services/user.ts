import {Body, createApi, DefaultApiImpl, Post} from "@dongjak-extensions/http-client";
import type {AccountLoginData, LoginResult, UpdateProfileRequest, UserInfo, WechatLoginData} from "@/types/auth.ts";
import type {ResponsePayloads} from "@/types/common.ts";
import {request} from "@/utils/http.ts";

class UserService extends DefaultApiImpl {
    @Post('/user/profile')
    updateProfile(@Body() data: UpdateProfileRequest): Promise<ResponsePayloads<UserInfo>> {
        return Promise.resolve() as any
    }

}

export const userService = createApi(UserService, request)

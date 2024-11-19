import {createApi, DefaultApiImpl, FormData, Post} from "@dongjak-extensions/http-client";
import type {FileUploadResult} from "@/types/auth.ts";
import type {ResponsePayloads} from "@/types/common.ts";
import {request} from "@/utils/http.ts";

class FileService extends DefaultApiImpl {

    /**
     * 文件上传
     * @param form  登录表单
     */
    @Post('/file/upload')
    upload(@FormData() form: FormData): Promise<ResponsePayloads<FileUploadResult>> {
        return Promise.resolve() as any
    }


}

export const fileService = createApi(FileService, request)

import {Body, createApi, DefaultApiImpl, Post} from "@dongjak-extensions/http-client";
import type {FileUploadData, FileUploadResult, ResponsePayloads} from "@/types/common.ts";
import {request} from "@/utils/http.ts";

class FileService extends DefaultApiImpl {

    /**
     * 文件上传
     * @param data
     */
    @Post('/file/upload')
    upload(@Body() data: FileUploadData): Promise<ResponsePayloads<FileUploadResult>> {
        return Promise.resolve() as any
    }


}

export const fileService = createApi(FileService, request)

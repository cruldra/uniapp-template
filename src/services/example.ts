import {createApi, DefaultApiImpl, Post} from "@dongjak-extensions/http-client";
import {request} from "@/utils/http.ts";
import type {HttpResponse} from "luch-request";
import type {ResponsePayloads} from "@/types/common.ts";

class ExampleService extends DefaultApiImpl {


    /**
     * 车辆筛选
     * @param form
     * @param occasion
     */
    @Post('/car/getCars')
    getCars(): Promise<HttpResponse<ResponsePayloads<any>>> {
        return Promise.resolve() as any
    }

}

export const exampleService = createApi(ExampleService, request)

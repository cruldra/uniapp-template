import Request from 'luch-request';
import type {ResponsePayloads} from "@/types/common.ts";


function createRequest() {
    return new Request({
        baseURL: import.meta.env.VITE_BASE_URL
    });
}

const request = createRequest();
/**
 * 请求拦截器
 */
request.interceptors.request.use(
    options => {
        return options;
    },
    options => Promise.reject(options),
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
    async response => {
        return response;
    },
    response => {
        console.log(response.statusCode )
        if (response.statusCode === 500) {
            const data = response.data as ResponsePayloads<any>;
            uni.showModal({
                title: data.error?.type || '错误',
                content: data.error?.message || '服务器错误',
                showCancel: false
            });
        }

        return response;
    },
);

export {request};

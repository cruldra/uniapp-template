import Request from 'luch-request';


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
        return response;
    },
);

export {request};

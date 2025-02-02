/**
 * 用于在`http`服务中统一响应格式
 * @template T 数据类型
 * @property data 数据
 * @property error 错误
 * @author dongjak
 * @created 2024/11/08
 * @version 1.0
 * @since 1.0
 */
export interface ResponsePayloads<T> {
    data?: T | null;
    error?: Error | null;
}

/**
 * 表示一个错误
 * @property type 错误类型
 * @property message 错误信息
 * @property code 错误码
 * @author dongjak
 * @created 2024/11/08
 * @version 1.0
 * @since 1.0
 */
interface Error {
    type?: string | null;
    message?: string | null;
    code?: number | null;
}

/**
 * 文件上传数据
 * @property file 文件的base64编码
 * @property name 文件名
 * @property use 文件用途
 * @author dongjak
 * @created 2024/11/20
 * @version 1.0
 * @since 1.0
 */
export interface FileUploadData {
    file: string;
    name: string;
    use: string;
}
export interface FileUploadResult {
    url: string;
}

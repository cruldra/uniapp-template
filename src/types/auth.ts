export interface WechatLoginData {
    code: string;
    encryptedData: string;
    iv: string;
}
export interface AccountLoginData {
    username: string;
    password: string;
}

export interface  LoginResult {
    token: string;
    userInfo: UserInfo;
}

export interface UserInfo {
    id: number;
    avatar: string;
    nickname: string;
}

export type LoginType = 'wechat' | 'account' | 'sms';

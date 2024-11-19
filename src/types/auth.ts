export interface WechatLoginData {
    code: string;
    encryptedData: string;
    iv: string;
}

export interface WechatLoginResult {
    token: string;
    userInfo: UserInfo;
}

export interface UserInfo {
    id: number;
    avatar: string;
    nickname: string;
}

export type LoginType = 'wechat' | 'account' | 'sms';

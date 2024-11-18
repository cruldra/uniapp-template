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
    avatar: string;
    nickname: string;
}

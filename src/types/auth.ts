export interface WechatLoginData {
    code: string;
    encryptedData: string;
    iv: string;
}

export interface AccountLoginData {
    username: string;
    password: string;
}

export interface LoginResult {
    token: string;
    userInfo: UserInfo;
}

export interface UpdateProfileRequest {
    nickname?: string;
    birthday?: string;
    avatarUrl?: string;
    address?: string;
    gender?: string;
}


export interface UserInfo {
    id: number;
    avatar: string;
    nickname: string;
    birthday: string;
    gender: string;
    address: string;
}

export type LoginType = 'wechat' | 'account' | 'sms';

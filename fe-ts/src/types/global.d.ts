export { };

declare global {
    interface BEResponse<T> {
        statusCode: number,
        message: string,
        data?: T,
        error?: string | string[]
    }
    interface UserInfo {
        email: string,
        phone: string,
        fullName: string,
        role: string,
        avatar: string,
        id: string
    }
    interface LoginResponse {
        access_token: string,
        user: UserInfo
    }
}

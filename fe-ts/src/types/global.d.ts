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
    interface RegisterResponse {
        _id: string,
        email: string,
        fullName: string
    }
    interface RegisterData {
        email: string,
        phone: string,
        fullName: string,
        password: string
    }
}

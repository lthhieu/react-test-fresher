export { };

declare global {
    interface BEResponse<T> {
        statusCode: number,
        message: string | string[],
        data?: T,
        error?: string
    }
    interface Paginate<T> {
        meta: {
            current: string,
            pageSize: string,
            pages: number,
            total: number
        },
        result: T[]
    }
    interface UserWithPaginate {
        _id: string,
        fullName: string,
        email: string,
        phone: string,
        role: 'ADMIN' | 'USER',
        avatar: string,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
    }
    interface UserInfo {
        email: string,
        phone: string,
        fullName: string,
        role: 'ADMIN' | 'USER',
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
    interface LoginData {
        username: string,
        password: string
    }
}

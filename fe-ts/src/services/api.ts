import axios from "@/services/axios.customize"

//auth module
export const APILogin = (username: string, password: string) => {
    return axios.post<BEResponse<LoginResponse>>("/api/v1/auth/login", { username, password })
}
export const APIRegister = (data: RegisterData) => {
    return axios.post<BEResponse<RegisterResponse>>("/api/v1/user/register", data)
}
export const APIFetchAccount = () => {
    return axios.get<BEResponse<{ user: UserInfo }>>("/api/v1/auth/account")
}
export const APILogout = () => {
    return axios.post<BEResponse<any>>("/api/v1/auth/logout")
}

//user module
export const APIFetchUsersWithPaginate = () => {
    return axios.get<BEResponse<Paginate<UserWithPaginate>>>("/api/v1/user?current=1&pageSize=10")
}

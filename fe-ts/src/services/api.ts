import axios from "@/services/axios.customize"

//auth module
export const APILogin = (username: string, password: string) => {
    return axios.post<BEResponse<LoginResponse>>("/api/v1/auth/login", { username, password })
}
export const APIRegister = (data: RegisterData) => {
    return axios.post<BEResponse<RegisterResponse>>("/api/v1/user/register", data)
}
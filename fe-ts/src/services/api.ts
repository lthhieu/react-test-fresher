import axios from "@/services/axios.customize"

export const APILogin = (username: string, password: string) => {
    return axios.post<BEResponse<LoginResponse>>("/api/v1/auth/login", { username, password })
}
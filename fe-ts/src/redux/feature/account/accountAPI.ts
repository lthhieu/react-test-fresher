import { APIFetchAccount, APILogout } from "@/services/api"

export const fetchAccount = async () => {
    const res = await APIFetchAccount()
    if (res.data) {
        return res.data
    }
    throw new Error(res.error)
}

export const logout = async () => {
    const res = await APILogout()
    if (res.data) {
        return res.data
    }
    throw new Error(res.error)
}

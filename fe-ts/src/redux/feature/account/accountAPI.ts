import { APIFetchAccount } from "@/services/api"

export const fetchAccount = async () => {
    const res = await APIFetchAccount()
    if (res.data) {
        return res.data
    }
    throw new Error(res.error)
}

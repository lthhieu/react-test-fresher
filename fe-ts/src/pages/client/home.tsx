import { selectUser } from "@/redux/feature/account/accountSlice"
import { useAppSelector } from "@/redux/hooks"

const HomePage = () => {
    const user = useAppSelector(selectUser)
    return (
        <div>HomePage {user?.email}</div>
    )
}
export default HomePage
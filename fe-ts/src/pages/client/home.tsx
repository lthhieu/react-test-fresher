import { useAppSelector } from "@/redux/hooks"

const HomePage = () => {
    const email = useAppSelector((state) => state.account.user?.email)
    return (
        <div>HomePage {email}</div>
    )
}
export default HomePage
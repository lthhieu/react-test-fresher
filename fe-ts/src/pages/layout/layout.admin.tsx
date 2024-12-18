import { selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice"
import { useAppSelector } from "@/redux/hooks"
import { Outlet } from "react-router"

const LayoutAdmin = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    return (
        <>
            {!isAuthenticated || user?.role === 'USER' ? <></> : <div>layout admin</div>}
            <Outlet />
        </>
    )
}
export default LayoutAdmin
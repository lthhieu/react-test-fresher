import { selectIsAuthenticated, selectUser } from "@/redux/feature/account/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { Outlet } from "react-router";

const AdminWrapper = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    if (!isAuthenticated)
        return <p>login di ban oi</p>
    if (user?.role === "USER")
        return <p>không có quyền</p>
    return <Outlet />

};
export default AdminWrapper
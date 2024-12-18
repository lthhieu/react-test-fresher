import { selectIsAuthenticated } from "@/redux/feature/account/accountSlice";
import { useAppSelector } from "@/redux/hooks";

import { Outlet } from "react-router";

const PrivateWrapper = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    return isAuthenticated ? <Outlet /> : <p>login đi bạn ơi</p>;
};
export default PrivateWrapper
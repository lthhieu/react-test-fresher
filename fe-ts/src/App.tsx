import { RouterProvider } from "react-router"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { handleFetchAccountAsync, selectLoading } from "@/redux/feature/account/accountSlice"
import { router } from "@/routers"
import { Spin } from "antd"
const centerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-50px',
  marginLeft: '-50px'
};

function App() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      return;
    }
    dispatch(handleFetchAccountAsync())
  }, [])

  return (
    <>
      {loading === "loading" ? <Spin size="large" style={centerStyle} /> : <RouterProvider router={router} />}
    </>
  )
}

export default App

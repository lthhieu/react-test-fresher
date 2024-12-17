import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { handleFetchAccountAsync, selectLoading } from "@/redux/feature/account/accountSlice"
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
    dispatch(handleFetchAccountAsync())
  }, [])

  return (
    <>
      {loading === 'loading' ? <Spin style={centerStyle} size="large" /> : <>
        <AppHeader />
        <Outlet />
      </>}
    </>
  )
}

export default App

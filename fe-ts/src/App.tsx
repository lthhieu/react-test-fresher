import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { handleFetchAccountAsync } from "@/redux/feature/account/accountSlice"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(handleFetchAccountAsync())
  }, [])

  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default App

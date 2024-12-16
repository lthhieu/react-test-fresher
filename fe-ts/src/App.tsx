import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { APIFetchAccount } from "@/services/api"
import { useAppDispatch } from "@/redux/hooks"
import { handleLogin } from "@/redux/feature/account/accountSlice"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await APIFetchAccount()
      if (res.data) {
        dispatch(handleLogin({
          isAuthenticated: true,
          user: res.data.user
        }))
      }
    }
    fetchAccount()
  }, [])

  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default App

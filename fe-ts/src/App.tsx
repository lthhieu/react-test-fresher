import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"

function App() {

  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default App
import Footer from "@/shared/components/Footer"
import Navbar from "@/shared/components/Navbar"
import { Outlet } from "react-router-dom"

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default ProtectedLayout
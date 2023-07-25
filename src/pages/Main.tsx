import Navbar from "../components/Main/NavBar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"

export default function Main() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

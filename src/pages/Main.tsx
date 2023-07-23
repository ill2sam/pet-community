import Navbar from "../components/Main/NavBar"
import { Outlet } from "react-router-dom"
export default function Main() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

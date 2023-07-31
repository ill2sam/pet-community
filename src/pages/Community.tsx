import CommunityHeader from "../components/Community/CommunityHeader"
import { Outlet } from "react-router-dom"

export default function Community() {
  return (
    <>
      <CommunityHeader />
      <Outlet/>
    </>
  )
}

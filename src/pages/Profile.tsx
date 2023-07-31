import { Outlet } from "react-router-dom"
import ProfileHeader from "../components/Profile/ProfileHeader"



function Profile() {
  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  )
}

export default Profile
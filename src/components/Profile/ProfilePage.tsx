import {  useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import {  reset } from "../../redux/loginSlice"
import { auth } from "../../firebaseConfig"
import {  signOut} from "firebase/auth"
import StoreData from "../../redux/StoreData"

export default function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = StoreData().name
  const email = StoreData().email
  const isLogin = StoreData().isLogin
  const user = auth.currentUser

  console.log(user)
  // const [modifyName, setModifyName] = useState(name)

  // const handleChangeName = () => {
  //   if(user) {
  //     updateProfile(user, {
  //       displayName: modifyName,
  //     }).then((res) => {
  //       const updatedUser = {name: modifyName}
  //       dispatch(login(updatedUser))
  //       alert("이름변경 완료")
  //     }).catch((err) => {
  //       if(err.code === "auth/user-token-expired") {
  //         alert("로그인 후 다시 시도해주세요.")
  //         dispatch(reset());
  //         navigate("/login")
  //         console.log(err.code)
  //       }
  //     })
  //   }
  // }


  const handleLogout = () => {
    dispatch(reset())
    signOut(auth)
    navigate("/")
  }

  useEffect(() => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.")
      navigate("/login")
    }
    // isLogin ? {} : alert("로그인 후 이용해주세요."), navigate("/");
  })

  return (
    <div className="mypage-content flex items-center flex-col max-w-5xl mx-auto mt-10 min-h-[calc(100vh-150px)]">
      <div className="card w-full max-w-sm shadow-md">
        <div className="card-body">
          {/* <h2>{name}님의 프로필</h2> */}
          <div className="profile-info text-left">
            <div className="h-10 flex items-center border-b border-amber-200">
              <span className="font-bold mr-2">닉네임: </span>
              <span className="text-sm">{name}</span>
            </div>
            <div className="h-10 flex items-center border-b my-6 border-amber-200">
              <span className="font-bold mr-2">이메일: </span>
              <span className="text-sm">{email}</span>
            </div>
          </div>
          <div className="button-container mb-10 flex justify-between">
            {/* <Link
              to="/profile/usermodify"
              className="btn bg-amber-100 hover:bg-amber-200 text-xs mr-2"
            >
              회원정보 수정
            </Link> */}
            <Link
              to="/profile/modify"
              className="btn bg-amber-100 hover:bg-amber-200 text-xs"
            >
              회원정보 수정
            </Link>
            <Link
              to="/profile/password"
              className="btn bg-amber-100 hover:bg-amber-200 text-xs"
            >
              비밀번호 변경
            </Link>
          </div>
          <div className="logout-container text-right">
            <button
              className="btn p-3 rounded-xl bg-amber-100 hover:bg-amber-300 text-xs"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

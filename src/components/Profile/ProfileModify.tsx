import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from "../../firebaseConfig"
import { updateProfile} from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import StoreData from "../../redux/StoreData"
import { login } from "../../redux/loginSlice"
import InfoCheckHooks from "../Account/InfoCheckHooks"


export default function ProfileModify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = StoreData().name
  const email = StoreData().email
  const isLogin = StoreData().isLogin
  const user = auth.currentUser
  
  const {
    nickname,
    nicknameMatch,
    isNicknameAvailable,
    nicknameCheckButton,
    handleNicknameChange,
    handleNicknameCheck,
  } = InfoCheckHooks({
    initialNickname: name,
    initialNicknameAvailable: null,
  })
  
  // const updateUserName = () => {
  //   updateProfile(user, {
  //     displayName:
  //   })
  // }
  console.log(isNicknameAvailable)
  const updateNickname = async (e: React.FormEvent) => {
    e.preventDefault()
    const userDoc = doc(db, "Users", email)

    if(user !== null) {
      await updateProfile(user, {
        displayName: nickname,
      }).catch((err) => console.log(err))
      // 파이어스토어에 저장
      await updateDoc(userDoc, {
        nickname: nickname,
      })
      const updateName = {
        name: nickname
      }

      dispatch(login(updateName))
      alert("수정완료")
      navigate("/profile")
    }
  }


  useEffect(() => {
    if (!isLogin) {
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="mypage-content flex items-center flex-col max-w-5xl mx-auto mt-10 min-h-[calc(100vh-200px)]">
      <div className="card w-full max-w-sm shadow-md">
        <div className="card-body p-2">
          <h1 className="text-xl font-bold mb-8">회원정보 수정</h1>
          <form onSubmit={updateNickname}>
            <div className="profile-info text-left my-4">
              <div className="h-10 flex items-center justify-between">
                <div className="flex flex-row items-center border-b border-gray-200">
                  <span className="font-bold mr-2 text-xs">닉네임: </span>
                  <input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                </div>
                <button
                  className="bg-amber-100 border-2 border-amber-500 rounded-2xl text-xs p-2 disabled:bg-gray-100 disabled:border-gray-200"
                  type="button"
                  onClick={handleNicknameCheck}
                  disabled={nicknameCheckButton}
                >
                  중복체크
                </button>
              </div>
              {isNicknameAvailable === true && (
                <div className="nickname-message text-left text-xs mt-1 text-green-500">
                  사용 가능한 닉네임입니다.
                </div>
              )}
              {isNicknameAvailable === false &&
                nickname !== "" &&
                nicknameMatch !== null && (
                  <div className="nickname-message text-left text-xs mt-1 text-red-500">
                    중복된 닉네임입니다.
                  </div>
                )}
              {isNicknameAvailable === false &&
                (nicknameMatch === null || nickname === "") && (
                  <div className="nickname-message text-left text-xs mt-1 text-red-500">
                    유효하지 않은 닉네임입니다.
                  </div>
                )}
            </div>
            <div className="profile-info text-left mb-16">
              <div className="h-10 flex items-center border-b border-gray-200">
                <span className="font-bold mr-2 text-xs">이메일: </span>
                <span className="text-sm">{email}</span>
              </div>
            </div>
            <div className="button-container mb-4 flex justify-around">
              <button
                className="btn bg-amber-100 hover:bg-amber-200 text-xs w-20 disabled:bg-gray-100 disabled:border-gray-200"
                disabled={isNicknameAvailable === null || isNicknameAvailable ===false}
              >
                수정
              </button>
              <Link
                to="/profile"
                className="btn bg-amber-100 hover:bg-amber-200 text-xs w-20"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

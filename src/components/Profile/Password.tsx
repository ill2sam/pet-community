import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConfig"
import { updatePassword } from "firebase/auth"
import PasswordCheck from "../Account/PasswordCheck"

export default function Password () {
  const {
    password,
    passwordRules,
    confirmPassword,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = PasswordCheck()

  const navigate = useNavigate()
  const user = auth.currentUser
  console.log(user)
  const newPw = passwordMatch ? password : null

  const pwUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (user !== null && newPw !== null) {
      updatePassword(user, newPw)
        .then(() => {
          console.log("비밀번호 변경 완료")
          alert("비밀번호 변경 완료")
          navigate("/profile")
        })
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
    }
  } 

  return (
    <div className="mypage-content flex items-center flex-col max-w-5xl mx-auto mt-10 min-h-[calc(100vh-200px)]">
      <div className="card w-full max-w-sm shadow-md">
        <div className="card-body p-2">
          <h1 className="text-xl font-bold mb-8">비밀번호 수정</h1>
          <form onSubmit={pwUpdate}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signupPassword">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPassword"
                placeholder="비밀번호(영어대소문자, 숫자를 포함해 6~20자)"
                className="border-gray-400 border-b placeholder:text-[11px]"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordRules === true && (
                <div className="password-message text-left text-xs mt-1 text-green-500">
                  안전한 비밀번호입니다.
                </div>
              )}
              {passwordRules === false && password !== "" && (
                <div className="password-message text-left text-xs mt-1 text-red-500">
                  비밀번호는 영어대문자, 소문자, 숫자를 <br />
                  하나이상 사용해 6-20자로 입력해주세요.
                </div>
              )}
            </div>
            <div className="form-control mb-10">
              <label className="label" htmlFor="signupPasswordCheck">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPasswordCheck"
                placeholder="비밀번호 확인"
                className="border-gray-400 border-b placeholder:text-[11px]"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordMatch === true && (
                <div className="password-message text-left text-xs mt-1 text-green-500">
                  비밀번호가 일치합니다.
                </div>
              )}
              {passwordMatch === false && confirmPassword !== "" && (
                <div className="password-message text-left text-xs mt-1 text-red-500">
                  비밀번호가 일치하지 않습니다
                </div>
              )}
            </div>
            <div className="form-control mb-4 flex justify-around">
              <button
                className="btn flex-1  bg-amber-100 hover:bg-amber-200 text-xs disabled:bg-gray-100 disabled:border-gray-200"
                disabled={passwordMatch === false}
              >
                비밀번호 변경
              </button>
            </div>
            <div className="form-control mb-4 flex justify-around">
              <Link
                to="/profile"
                className="btn bg-amber-100 hover:bg-amber-200 text-xs"
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
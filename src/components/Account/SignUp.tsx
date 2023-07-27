import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebaseConfig"
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth"
import { reset } from "../../redux/loginSlice"
import { useDispatch } from "react-redux"
import { signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import InfoCheckHooks from "./InfoCheckHooks"
import PasswordCheck from "./PasswordCheck"

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, SetEmail] = useState<string>("")
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null)

  const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g
  const emailMatch = email.match(emailRegExp)
  const [emailCheckAvailable, setEmailCheckAvailable] = useState<boolean>(true)

  // const [password, setPassword] = useState("")
  // const [passwordRules, setPasswordRules] = useState(false)
  // const [confirmPassword, setConfirmPassword] = useState("")
  // const [passwordMatch, setPasswordMatch] = useState(false)
  const {
    password,
    passwordRules,
    confirmPassword,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = PasswordCheck()

  const {
    nickname,
    nicknameMatch,
    isNicknameAvailable,
    nicknameCheckButton,
    handleNicknameChange,
    handleNicknameCheck,
  } = InfoCheckHooks({
    initialNickname: "",
    initialNicknameAvailable: null,
  })

  const [submitAvailable, setSubmitAvailable] = useState<boolean>(true)

  const emailAvailableCheck = useCallback(() => {
    if (emailMatch !== null && isEmailAvailable !== false) {
      setEmailCheckAvailable(false)
    } else {
      setEmailCheckAvailable(true)
    }
  }, [emailMatch, isEmailAvailable])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value)
    setIsEmailAvailable(null)

    emailAvailableCheck()
  }

  const handleEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const providers = await fetchSignInMethodsForEmail(auth, email)
      console.log(providers)
      if (providers.length === 0 && emailMatch !== null && email !== "") {
        setIsEmailAvailable(true)
      } else {
        setIsEmailAvailable(false)
        setEmailCheckAvailable(true)
      }
    } catch (error: any) {
      setIsEmailAvailable(false)
      console.log(error.code)
      console.log(error.message)
      console.error("이메일 중복 체크 에러: ", error)
    }
  }

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}$/g
  //   setPassword(e.target.value)

  //   if (e.target.value.match(passwordRegExp) === null) {
  //     setPasswordRules(false)
  //   } else {
  //     setPasswordRules(true)
  //   }
  // }

  // const handleConfirmPasswordChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setConfirmPassword(e.target.value)

  //   if (password && e.target.value && e.target.value === password) {
  //     setPasswordMatch(true)
  //   } else {
  //     setPasswordMatch(false)
  //   }

  //   if (
  //     isEmailAvailable &&
  //     isNicknameAvailable &&
  //     passwordRules &&
  //     e.target.value === password
  //   ) {
  //     setSubmitAvailable(false)
  //   } else {
  //     setSubmitAvailable(true)
  //   }
  // }

  useEffect(() => {
    if (
      isEmailAvailable &&
      isNicknameAvailable &&
      passwordRules &&
      confirmPassword === password
    ) {
      setSubmitAvailable(false)
    } else {
      setSubmitAvailable(true)
    }
  }, [
    isEmailAvailable,
    isNicknameAvailable,
    passwordRules,
    password,
    confirmPassword,
  ])
  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log("회원가입 성공", user)

        // 닉네임
        await updateProfile(user, {
          displayName: nickname,
        }).catch((err) => console.log(err))
        // 파이어스토어에 저장
        await setDoc(doc(db, "Users", email), {
          email: email,
          nickname: nickname,
        })

        dispatch(reset())
        signOut(auth)
        alert("가입완료, 로그인해주세요.")
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  return (
    <div className="flex justify-center max-w-7xl mx-auto mt-20 min-h-[calc(100vh-150px)]">
      <div className="card flex-shrink-0 h-max w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body p-2">
          <h2 className="font-bold mb-4">이메일로 회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signup-id"></label>
              <div className="flex justify-between">
                <input
                  type="email"
                  id="signup-id"
                  placeholder="이메일"
                  className="border-gray-400 border-b placeholder:text-xs min-w-[70%]"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="bg-amber-100 border-2 border-amber-500 rounded-2xl text-xs p-2 disabled:bg-gray-100 disabled:border-gray-200"
                  type="button"
                  onClick={handleEmailCheck}
                  disabled={emailCheckAvailable}
                >
                  중복체크
                </button>
              </div>
              {isEmailAvailable === true && (
                <div className="email-message text-left text-xs mt-1 text-green-500">
                  사용 가능한 이메일입니다.
                </div>
              )}
              {isEmailAvailable === false &&
                email !== "" &&
                emailMatch !== null && (
                  <div className="email-message text-left text-xs mt-1 text-red-500">
                    중복된 이메일입니다.
                  </div>
                )}
              {isEmailAvailable === false &&
                (emailMatch === null || email === "") && (
                  <div className="email-message text-left text-xs mt-1 text-red-500">
                    유효하지 않은 이메일 주소입니다.
                  </div>
                )}
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signup-nickname">
                {/* <span className="label-text">이메일</span> */}
              </label>
              <div className="flex justify-between">
                <input
                  type="text"
                  id="signup-nickname"
                  placeholder="닉네임"
                  className="border-gray-400 border-b placeholder:text-xs min-w-[70%]"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
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
            <div className="form-control mb-4">
              <label className="label" htmlFor="signupPassword">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPassword"
                placeholder="비밀번호(영어대소문자, 숫자를 이용해 6자 이상)"
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
            <div className="form-control mb-4">
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
            <div className="form-control mt-6 ">
              <button
                className="btn rounded-3xl bg-amber-500/80 hover:bg-amber-400 disabled:bg-gray-200"
                disabled={submitAvailable}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

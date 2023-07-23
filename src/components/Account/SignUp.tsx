import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { app, db } from "../../firebaseConfig"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore"

export default function SignUp() {
  const auth = getAuth(app)
  const dbQuery = query(collection(db, "Users"))

  const navigate = useNavigate();

  const [email, SetEmail] = useState<string>("")
  const [nickname, setNickname] = useState<string>("")
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null)
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null)
  const [password, setPassword] = useState("")
  const [passwordRules, setPasswordRules] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(false)

  const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g
  const emailMatch = email.match(emailRegExp)
  const nicknameRegExp = /^([a-zA-Z가-힣0-9]){2,12}$/g
  const nicknameMatch = nickname.match(nicknameRegExp)

  const [submitAvailable, setSubmitAvailable] = useState<boolean>(true)



  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value)
    setIsEmailAvailable(null)
  }

  const handleEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const emailSnap = await getDocs(dbQuery)
    const emailArr = emailSnap.docs.map((doc) => doc.id)
    try {
      const emailFilter = emailArr.filter((doc) => doc === email)
      if (emailFilter.length === 0 && emailMatch !== null && email !== "") {
        setIsEmailAvailable(true)
      } else {
        setIsEmailAvailable(false)
      }
    } catch (error) {
      // if (error.code === "auth/invalid-email") {
      //   console.log(isEmailAvailable)
      // }
      console.error("이메일 중복 체크 에러: ", error)
    }
  }

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setIsNicknameAvailable(null)
  }

  const handleNicknameCheck = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const nicknameSnap = await getDocs(dbQuery)
    const nicknameArr = nicknameSnap.docs.map((doc) => doc.data().nickname)

    try {
      const nicknameFilter = nicknameArr.filter((doc) => doc === nickname)

      if (
        nicknameFilter.length === 0 &&
        nickname !== "" &&
        nicknameMatch !== null
      ) {
        setIsNicknameAvailable(true)
      } else {
        setIsNicknameAvailable(false)
      }
    } catch (error) {
      console.error("닉네임 중복 체크 에러: ", error)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}$/g
    setPassword(e.target.value)

    if (e.target.value.match(passwordRegExp) === null) {
      setPasswordRules(false)
    } else {
      setPasswordRules(true)
    }
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value)
    
    if (password && e.target.value && e.target.value === password) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
    
    if (
      isEmailAvailable &&
      isNicknameAvailable &&
      passwordRules &&
      e.target.value === password
    ) {
      setSubmitAvailable(false)
    } else {
      setSubmitAvailable(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

        await setDoc(doc(db, "Users", email), {
          email: email,
          nickname : nickname,
        })

        alert("가입완료, 로그인해주세요.")
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code
        // const errorMessage = error.message
        console.log(errorCode)
      })
  }

  return (
    <div className="flex justify-center max-w-7xl mx-auto mt-20">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="font-bold mb-4">이메일로 회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signup-id"></label>
              <div className="flex justify-between">
                <input
                  type="email"
                  id="signup-id"
                  placeholder="이메일"
                  className="border-gray-400 border-b placeholder:text-xs"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="bg-gray-100 rounded-2xl text-xs p-2"
                  type="button"
                  onClick={handleEmailCheck}
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
                  className="border-gray-400 border-b placeholder:text-xs"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <button
                  className="bg-gray-100 rounded-2xl text-xs p-2"
                  onClick={handleNicknameCheck}
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
                className="btn rounded-3xl bg-amber-500/80 hover:bg-amber-400 disabled:bg-gray-300"
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

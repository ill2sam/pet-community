import { useState, useRef } from "react"
import app from "../../firebase-config"
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth"

export default function SignUp() {
    const [email, SetEmail] = useState("")
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null)
    const [passwordMatch, setPassWordMatch] = useState(true)
    const signupBtn = useRef(false);
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      SetEmail(e.target.value);
      setIsEmailAvailable(null);
    }
    
    const handleEmailCheck = async () => {
      const auth = getAuth(app)
      const methods = await fetchSignInMethodsForEmail(auth, email)

      try {
        console.log(methods)
        setIsEmailAvailable(methods.length === 0)
        console.log(isEmailAvailable)
      } catch (error) {
        console.log(isEmailAvailable)
        // console.error('이메일 중복 체크 에러: ', error)
      }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('회원가입 성공', user)
          // 닉네임
          updateProfile(auth.currentUser, {
            displayName: nickname
          }).catch((err) => console.log(err));
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // ..
        })

      // try {
      //   const response = await axios.post()
      // }
    }

  // console.log(app)

  return (
    <div className="flex justify-center max-w-7xl mx-auto mt-20">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="font-bold mb-4">이메일로 회원가입</h2>
          <form action="">
            <div className="form-control">
              <label className="label" htmlFor="signup-id">
                {/* <span className="label-text">이메일</span> */}
              </label>
              <div className="email flex justify-between">
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
              {isEmailAvailable === false && email !== "" && (
                <div className="email-message text-left text-xs mt-1 text-red-500">
                  중복된 이메일입니다.
                </div>
              )}
              {isEmailAvailable === false &&
                (!"^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$".match(email)) && (
                  <div className="email-message text-left text-xs mt-1 text-red-500">
                    유효하지 않은 이메일 주소입니다.
                  </div>
                )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="signup-nickname">
                {/* <span className="label-text">이메일</span> */}
              </label>
              <div className="email flex justify-between">
                <input
                  type="email"
                  id="signup-nickname"
                  placeholder="닉네임"
                  className="border-gray-400 border-b placeholder:text-xs"
                  value=""
                  onChange={(e) => SetEmail(e.target.value)}
                />
                <button className="bg-gray-100 rounded-2xl text-xs p-2">
                  중복체크
                </button>
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="signupPassword">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPassword"
                placeholder="비밀번호 (영어문자, 숫자를 이용해 6자 이상)"
                className="border-gray-400 border-b placeholder:text-xs"
                value={password}
                pattern="[a-zA-Z0-9]{6,20}"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="signupPasswordCheck">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPasswordCheck"
                placeholder="비밀번호 확인"
                className="border-gray-400 border-b placeholder:text-xs"
                value={confirmPassword}
                pattern="[a-zA-Z0-9]{6,20}"
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="form-control mt-6 ">
              <button
                className="btn rounded-3xl bg-amber-500/80 hover:bg-amber-400 disabled:bg-gray-300"
                onClick={handleSubmit}
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
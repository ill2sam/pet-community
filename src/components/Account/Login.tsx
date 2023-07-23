import { useState, useReducer } from "react"
import { Link ,useNavigate } from "react-router-dom"
import { app } from "../../firebaseConfig"
import { getAuth, GoogleAuthProvider, signInWithPopup ,signInWithEmailAndPassword } from "firebase/auth"



export default function Login () {
  const auth = getAuth(app)
  const navigate = useNavigate();

  const [email, SetEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState("")
  const [checkLoginForm, setCheckLoginForm] =useState<boolean | null>(null)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user.uid)
        console.log(userCredential.operationType)
        console.log(user, "로그인 성공")
        SetEmail("")
        setPassword("")
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/invalid-email"
        ) {
          setCheckLoginForm(false)
        }
      })
  }

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user
      console.log(result.operationType)

    }).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;

      const credentialError = GoogleAuthProvider.credentialFromError(error)
      console.log(credentialError)
    })
    
  }

  return (
    <div className="flex justify-center max-w-7xl mx-auto mt-20">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="font-bold mb-4">이메일로 로그인</h2>
          <form onSubmit={submitLogin}>
            <div className="form-control">
              <label className="label" htmlFor="loginId">
                {/* <span className="label-text">이메일</span> */}
              </label>
              <input
                type="email"
                id="loginId"
                placeholder="이메일"
                className="input input-bordered"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="loginPassword">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="loginPassword"
                placeholder="비밀번호"
                className="input input-bordered"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="form-control mt-6 after:content-[''] after:border-b-2 after:mt-6 after:mb-10 after:border-gray-600">
              <button
                className="btn bg-amber-500/80 hover:bg-amber-400"
                onClick={submitLogin}
              >
                로그인
              </button>
              {checkLoginForm === false && (
                <div className="text-center text-xs mt-2 text-red-500">
                  아이디나 비밀번호가 올바르지 않습니다. <br />
                  다시 확인해주세요
                </div>
              )}
            </div>
            <div className="form-control">
              <h2 className="font-bold mb-4">간편하게 SNS 로그인</h2>
              <button
                className="btn bg-transparent border-gray-300 justify-center relative"
                onClick={handleGoogleLogin}
              >
                <img
                  src="./././public/Google_Logo.svg"
                  alt="구글로 로그인"
                  className="w-5 absolute left-8"
                />
                <div className="">구글로 로그인</div>
              </button>
            </div>
          </form>
          <div className="text-xs text-gray-500 mt-4">
            <Link to="/signup">이메일로 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

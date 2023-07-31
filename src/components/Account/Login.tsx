import { useState, useEffect} from "react"
import { Link ,useNavigate } from "react-router-dom"
import { auth, db } from "../../firebaseConfig"
import { GoogleAuthProvider, signInWithPopup ,signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth"
import { doc,  setDoc } from "firebase/firestore"
import { useDispatch} from "react-redux"
import { login } from "../../redux/loginSlice"
import StoreData from "../../redux/StoreData"

export default function Login () {
  // const auth = getAuth(app)
  const isLogin = StoreData().isLogin
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isLogin ? navigate("/") : {};
  })

  const [email, SetEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [userData, setUserData] = useState("")
  const [checkLoginForm, setCheckLoginForm] =useState<boolean | null>(null)

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          if (userCredential.operationType === "signIn") {
            const user = userCredential.user
            const userInfo = {
              userId: user.uid,
              name: user.displayName,
              email: user.email,
              isLogin: true,
            }
            dispatch(login(userInfo))
            SetEmail("")
            setPassword("")
            navigate(-1)
          } 
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          if (
            errorCode === "auth/user-not-found" ||
            errorCode === "auth/wrong-password" ||
            errorCode === "auth/invalid-email"
          ) {
            console.log(errorMessage)
            setCheckLoginForm(false)
          }
        })
    })
  }

  const handleGoogleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then( async (result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      if (result.operationType === "signIn") {
        const user = result.user
        const userInfo = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          isLogin: true,
        }
        if(user.email !== null) {
          await setDoc(doc(db, "Users", user.email), {
            email: userInfo.email,
            nickname: user.displayName,
          })
        }
        dispatch(login(userInfo))
        SetEmail("")
        setPassword("")
        navigate(-1)
      } 
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // const credentialError = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode)
      console.log(errorMessage)
    })
    
  }

  return (
    <div className="flex justify-center max-w-5xl mx-auto mt-24 md:mt-20 min-h-[calc(100vh-150px)]">
      <div className="card flex-shrink-0 h-max w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="font-bold mb-4">이메일로 로그인</h2>
          <form onSubmit={submitLogin}>
            <div className="form-control">
              <label className="label" htmlFor="loginId"></label>
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
              <label className="label" htmlFor="loginPassword"></label>
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
                  src="../public/Google_Logo.svg"
                  alt="구글로 로그인"
                  className="w-5 absolute left-8"
                />
                <div className="">구글로 로그인</div>
              </button>
            </div>
          </form>
          <div className="text-xs text-gray-500 mt-4">
            <Link to="/signup" className="hover:underline">이메일로 회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

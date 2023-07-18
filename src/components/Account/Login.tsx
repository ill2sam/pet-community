import {useState, useReducer} from "react"
import { Link } from "react-router-dom"

export default function Account() {
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(email)
  console.log(password)
  // function inputReducer (state : string, action:string) {

  // }


  return (
    <div className="flex justify-center max-w-7xl mx-auto mt-20">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="font-bold mb-4">이메일로 로그인</h2>
          <form action="">
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
                onChange={(e) => SetEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6 after:content-[''] after:border-b-2 after:mt-10 after:mb-10 after:border-gray-600">
              <button className="btn bg-amber-500/80 hover:bg-amber-400">
                로그인
              </button>
            </div>
            <div className="form-control">
              <h2 className="font-bold mb-4">간편하게 SNS 로그인</h2>
              <button className="btn bg-transparent border-gray-300 justify-center relative">
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

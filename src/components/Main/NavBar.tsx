// import { useEffect } from "react";
import { Link } from "react-router-dom"
import  StoreData  from "../../redux/StoreData"

export default function Navbar() {
  // redux store 로그인시 userId 저장 후 그 값을 로드
  // const userId = useSelector((store: RootState) => store.loginState.userId)
  // const email = useSelector((store: RootState) => store.loginState.email)
  const name = StoreData().name
  const isLogin = StoreData().isLogin


  return (
    <nav className="navbar bg-base-100 max-w-5xl mx-auto">
      {/* <summary className="m-1 btn btn-ghost md:hidden xl:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </summary> */}
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost md:hidden xl:mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="my-1">
            <Link to="/info">정보공유</Link>
          </li>
          <li className="my-1">
            <Link to="/qna">질문답변</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Link
          className="btn btn-ghost normal-case text-xl px-0 hover:bg-transparent"
          to="/"
        >
          PetComm
        </Link>
        <ul className="menu menu-horizontal px-1 hidden md:inline-flex">
          <li>
            <Link to="/info">정보공유</Link>
          </li>
          <li>
            <Link to="/qna">질문답변</Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isLogin === false && (
            <li className="mr-2">
              <Link to="/login">로그인</Link>
            </li>
          )}
          {isLogin === true && (
            <>
              <div className="sm:text-xs sm:hidden md:flex justify-center items-center mr-2">
                <span>안녕하세요 {name}님</span>
              </div>
              <li className=" mr-2">
                <Link to="/profile">마이페이지</Link>
              </li>
            </>
          )}
          <li>
            <details>
              <summary className="bg-amber-400/80 hover:bg-amber-200 active:bg-transparent">
                글쓰기
              </summary>
              <ul className="p-2 bg-base-100 z-[5] ">
                <li>
                  {isLogin === false && <Link to="/login">정보공유</Link>}
                  {isLogin === true && <Link to="">정보공유</Link>}
                </li>
                <li>
                  {isLogin === false && <Link to="/login">질문답변</Link>}
                  {isLogin === true && <Link to="">질문답변</Link>}
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  )
}

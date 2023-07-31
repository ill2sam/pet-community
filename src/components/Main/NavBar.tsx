// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import  StoreData  from "../../redux/StoreData"

export default function Navbar() {
  // redux store 로그인시 userId 저장 후 그 값을 로드
  // const userId = useSelector((store: RootState) => store.loginState.userId)
  // const email = useSelector((store: RootState) => store.loginState.email)
  const name = StoreData().name
  const navigate = useNavigate();
  const isLogin = StoreData().isLogin

  const handleWrite = () => {
    if(isLogin) {
      navigate("/community/write")
    } else {
      alert("로그인 해주세요.")
      navigate("/login")
    }
  }


  return (
    <nav className="navbar bg-base-100 max-w-5xl mx-auto">
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
            <Link to="/community">정보공유</Link>
          </li>
          {/* <li className="my-1">
            <Link to="/qna">질문답변</Link>
          </li> */}
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
            <Link to="/community">정보공유</Link>
          </li>
          {/* <li>
            <Link to="/qna">질문답변</Link>
          </li> */}
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 justify-center">
          {isLogin === false && (
            <button className=" btn mr-4 justify-center">
              <Link to="/login">로그인</Link>
            </button>
          )}
          {isLogin === true && (
            <>
              <div className="sm:text-xs hidden md:flex  justify-center items-center mr-2">
                <span>안녕하세요 {name}님</span>
              </div>
              <div className="flex text-xs mr-2 md:text-sm items-center">
                <Link to="/profile" className="mx-1 hover:underline">
                  마이페이지
                </Link>
              </div>
            </>
          )}
          <button
            className="btn h-4 bg-amber-400/80 hover:bg-amber-200"
            onClick={handleWrite}
          >
            글쓰기
          </button>
        </ul>
      </div>
    </nav>
  )
}

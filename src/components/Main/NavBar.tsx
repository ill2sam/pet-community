import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 max-w-7xl mx-auto">
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
          <li>
            <a>정보공유</a>
          </li>
          <li>
            <a>질문답변</a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">Logo</Link>
        <ul className="menu menu-horizontal px-1 hidden md:inline-flex">
          <li>
            <a>정보공유</a>
          </li>
          <li>
            <a>질문답변</a>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className=" mr-4">
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <details>
              <summary className="bg-amber-500/80 hover:bg-amber-400">글쓰기</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>정보공유</a>
                </li>
                <li>
                  <a>질문답변</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

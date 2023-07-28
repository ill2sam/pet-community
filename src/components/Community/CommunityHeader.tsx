import { Link } from "react-router-dom"

export default function CommunityHeader() {
  const currentPath = window.location.pathname

  return (
    <div className="navbar bg-base-100 w-100 mx-auto border-y border-gray-300 p-0">
      <ul className="flex mx-auto text-md">
        <li className="mr-4">
          <Link
            className={
              currentPath === "/info"
                ? "font-bold py-1 border-b-2 border-amber-300"
                : ""
            }
            to="/info"
          >
            정보공유
          </Link>
        </li>
        <li>
          <Link
            className={
              currentPath === "/qna"
                ? "font-bold py-1 border-b-2 border-amber-300"
                : ""
            }
            to="/qna"
          >
            QnA
          </Link>
        </li>
      </ul>
    </div>
  )
}

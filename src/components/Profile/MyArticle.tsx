import { Link } from "react-router-dom"

export default function MyArticle() {
  return (
    <div className="navbar bg-base-100 w-100 mx-auto border-y border-gray-300 p-0">
      <ul className="flex mx-auto text-md">
        <li className="mr-4">
          <Link to="/profile"
          >
            프로필
          </Link>
        </li>
        <li>
          <Link
            className="font-bold py-1 border-b-2 border-amber-300"
            to="/profile/myarticles"
          >
            내가 작성한 글
          </Link>
        </li>
      </ul>
    </div>
  )
}

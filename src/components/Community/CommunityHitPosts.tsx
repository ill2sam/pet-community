import { Link } from "react-router-dom"

export default function CommunityHitPosts() {
  return (
    <div className="mypage-content flex flex-col max-w-5xl mx-auto mt-10 px-3">
      <h2 className="text-left text-2xl mb-7">인기글</h2>
      <div className="hit-articles flex overflow-x-auto pb-6 justify-between">
        <Link
          to="/"
          className="card w-60 bg-amber-400/10 shadow-lg px-5 py-3 mr-5 lg:mr-0"
        >
          <div className="p-0 flex flex-col">
            <span className="border rounded-full w-fit px-3 py-1 text-xs bg-amber-300 mb-4">강아지</span>
            <h2 className="hit-acticle-title text-sm font-bold text-left mb-3 truncate">
              강아지 피부에 좋은 사료 추천!
            </h2>
            <p className="text-xs text-gray-400 truncate mb-4">
              강아지 피부에 좋은 사료 추천 베스트 5....
            </p>
            <div className="text-left">
              <span className="text-xs text-gray-400 mr-5">댓글 4</span>
              <span className="text-xs text-gray-400">2023. 07. 21</span>
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className="card w-60 bg-amber-400/10 shadow-lg px-5 py-3 mr-5 lg:mr-0"
        >
          <div className="p-0 flex flex-col">
            <span className="badge text-xs bg-amber-300 mb-4">강아지</span>
            <h2 className="hit-acticle-title text-sm font-bold text-left mb-3 truncate">
              강아지 피부에 좋은 사료 추천!
            </h2>
            <p className="text-xs text-gray-400 truncate mb-4">
              강아지 피부에 좋은 사료 추천 베스트 5....
            </p>
            <div className="text-left">
              <span className="text-xs text-gray-400 mr-5">댓글 4</span>
              <span className="text-xs text-gray-400">2023. 07. 21</span>
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className="card w-60 bg-amber-400/10 shadow-lg px-5 py-3 mr-5 lg:mr-0"
        >
          <div className="p-0 flex flex-col">
            <span className="badge text-xs bg-amber-300 mb-4">강아지</span>
            <h2 className="hit-acticle-title text-sm font-bold text-left mb-3 truncate">
              강아지 피부에 좋은 사료 추천!
            </h2>
            <p className="text-xs text-gray-400 truncate mb-4">
              강아지 피부에 좋은 사료 추천 베스트 5....
            </p>
            <div className="text-left">
              <span className="text-xs text-gray-400 mr-5">댓글 4</span>
              <span className="text-xs text-gray-400">2023. 07. 21</span>
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className="card w-60 bg-amber-400/10 shadow-lg px-5 py-3 mr-5 lg:mr-0"
        >
          <div className="p-0 flex flex-col">
            <span className="badge text-xs bg-amber-300 mb-4">강아지</span>
            <h2 className="hit-acticle-title text-sm font-bold text-left mb-3 truncate">
              강아지 피부에 좋은 사료 추천!
            </h2>
            <p className="text-xs text-gray-400 truncate mb-4">
              강아지 피부에 좋은 사료 추천 베스트 5....
            </p>
            <div className="text-left">
              <span className="text-xs text-gray-400 mr-5">댓글 4</span>
              <span className="text-xs text-gray-400">2023. 07. 21</span>
            </div>
          </div>
        </Link>

        {/* <div className="card w-60 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
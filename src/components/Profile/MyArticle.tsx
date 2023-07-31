import { useNavigate } from "react-router-dom"
import StoreData from "../../redux/StoreData" 
import { useEffect } from "react"
import { db } from "../../firebaseConfig"
import { doc, updateDoc, increment } from "firebase/firestore"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
}

interface PostProps {
  id: string
  bid: number
}

export default function MyArticle({ posts, setPosts}: CommunityProps ) {
  console.log(posts)
  const navigate = useNavigate();
  const loginId = StoreData().userId
  const isLogin = StoreData().isLogin
  const myArticle = posts.filter((post) => post.userId === loginId)

  const increaseViewCount = async (post: PostProps) => {
    try {
      console.log(post.id)
      const postRef = doc(db, "Posts", post.id)
      await updateDoc(postRef, { view: increment(1) })
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? { ...p, view: p.view + 1 } : p
      )
      console.log(updatedPosts)
      setPosts(updatedPosts)
      console.log("뷰 카운트 증가 완료")
    } catch (error) {
      console.error("뷰 카운트 증가 실패:", error)
    }
  }
  const handlePostClick = (post: PostProps) => {
    increaseViewCount(post)
    navigate(`/community/${post.bid}`)
  }

  useEffect(() => {
    if(!isLogin) {
      alert("로그인 해주세요.")
      navigate('/login')
    }
  })

  return (
    <div className="max-w-5xl mx-auto py-6 px-10 mt-5">
      <h1 className="text-left text-2xl font-medium mb-4">
        닉네임님의 최근 작성글{" "}
      </h1>
      {myArticle.length !== 0 &&
        myArticle.map((post) => (
          <div className="recent-articles border-b-2 border-x-0 py-4 flex justify-between items-center">
            <div className="category-title">
              <span className="categoty  border rounded-full w-fit px-3 py-1 mr-4 text-xs bg-amber-300">
                {post.petCategory}
              </span>
              <button onClick={() => handlePostClick(post)}>
                <span className="hover:underline">{post.title}</span>
              </button>
            </div>
            <div className="article-date text-sm">{post.date}</div>
          </div>
        ))}
      {myArticle.length === 0 && (
        <div className="recent-articles bg-orange-200 border-b-2 rounded-lg py-4 flex justify-center min-h-[300px] items-center">
          <div className="category-title text-center text-white text-2xl">
            작성글이 아직 없습니다.
          </div>
        </div>
      )}
    </div>
  )
}

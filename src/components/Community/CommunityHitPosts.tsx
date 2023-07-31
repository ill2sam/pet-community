import { useNavigate } from "react-router-dom"
import { doc, updateDoc, increment } from "firebase/firestore"
import { db } from "../../firebaseConfig"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
  comments: any[]
}

interface PostProps {
  id: string
  bid: number
}

export default function CommunityHitPosts({ posts, comments, setPosts }: CommunityProps) {
  const navigate = useNavigate()
  const sortedPost = posts.sort((a, b) => b.view - a.view)
  const topCommentPosts = sortedPost.slice(0, 4)
  console.log(topCommentPosts)
  console.log(comments)

  const increaseViewCount = async (post: PostProps) => {
    try {
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

  const countCommentsForPost = (postBid: number) => {
    return comments.filter((comment) => comment.bid === postBid).length
  }

  const parseTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, "text/html")
    const textNodes = doc.querySelectorAll("p")
    let text = ""

    textNodes.forEach((node) => {
      text += node.textContent
    })

    return text
  }

  return (
    <div className="hits-content flex flex-col max-w-5xl mx-auto mt-10 px-3">
      <h2 className="text-left text-2xl mb-7">인기글</h2>
      <div className="hit-articles flex overflow-x-auto pb-6 justify-between">
        {topCommentPosts.map((post) => (
          <div
            onClick={() => handlePostClick(post)}
            className="card w-60 bg-amber-400/10 shadow-lg px-5 py-3 mr-5 lg:mr-0 flex-shrink-0 cursor-pointer"
            key={post.id}
          >
            <div className="p-0 flex flex-col">
              <span className="border rounded-full w-fit px-3 py-1 text-xs bg-amber-300 mb-4">
                {post.petCategory}
              </span>
              <h2 className="hit-acticle-title text-sm font-bold text-left mb-3 truncate">
                {post.title}
              </h2>
              <p className="text-left text-xs text-gray-400 truncate mb-4">
                {parseTextFromHTML(post.text)}
              </p>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 mr-5">
                  댓글 {countCommentsForPost(post.bid)}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
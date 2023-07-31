import { useState } from "react"
import { updateDoc, doc,  } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { increment } from "firebase/firestore"
import { useNavigate,  } from "react-router-dom"
import DOMPurity from "isomorphic-dompurify"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
  comments: any[]
}

interface PostProps {
  id: string
  bid: number
}

export default function CommunityContent({ posts, comments, setPosts }: CommunityProps) {
  console.log(posts)
  const navigate = useNavigate()
  const [seachQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${seachQuery}`)
    }
  }

  const postsPerPage = 5
  const sortedPosts = posts.sort((a, b) => b.bid - a.bid)
  const currentPosts = sortedPosts.slice(0, postsPerPage)
  console.log(sortedPosts.map((post) => post.bid))
  const increaseViewCount = async (post: PostProps) => {
    try {
      const postRef = doc(db, "Posts", post.id)
      await updateDoc(postRef, { view: increment(1) })
      const updatedPosts = posts.map((p) =>
      p.id === post.id ? {...p, view: p.view + 1} : p);
      console.log(updatedPosts)

      console.log("뷰 카운트 증가 완료")
    } catch (error) {
      console.error("뷰 카운트 증가 실패:", error)
    }
  }

  const countCommentsForPost = (postBid: number) => {
    return comments.filter((comment) => comment.bid === postBid).length
  }

  const handlePostClick = (post: PostProps) => {
    increaseViewCount(post)
    navigate(`/community/${post.bid}`)
  }

  console.log(currentPosts.map((post) => post.text))

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

  const handleToCommunity = () => {
    navigate("/community")
    window.scrollTo(0,0)
  }

  return (
    <>
      <input
        type="text"
        className="max-w-[340px] md:max-w-[480px] w-full border-2 border-amber-200 rounded-full px-10 h-12 my-6"
        placeholder="검색어를 입력해주세요"
        value={seachQuery}
        onChange={handleSearchChange}
        onKeyDown={handleEnterKey}
      />
      <div className="main-content max-w-5xl mx-auto py-7 px-10 mb-20">
        <div className="border-2 rounded-lg  community-content mx-auto py-6 px-10 mt-10">
          {currentPosts.map((post) => (
            <div className="article pb-6 border-b mb-5" key={post.id}>
              <div className="article text-left flex justify-between items-center">
                <div className="article-content flex-row">
                  <div className="categoty border rounded-full w-fit px-3 py-1 text-xs bg-amber-300">
                    {post.petCategory}
                  </div>
                  <div className="title mt-4">
                    <h2
                      className="cursor-pointer hover:text-orange-400"
                      onClick={() => handlePostClick(post)}
                    >
                      {post.title}
                    </h2>
                  </div>
                  <p
                    className="paragraph text-left text-xs line-clamp-2 my-4 cursor-pointer view ql-editor"
                    onClick={() => handlePostClick(post)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurity.sanitize(parseTextFromHTML(post.text)),
                    }}
                  ></p>
                </div>
                {post.imgURL !== "" && (
                  <div className="article-img w-[120px] h-[120px] rounded-lg flex justify-center overflow-hidden">
                    {post.imgURL !== "" && (
                      <img src={post.imgURL} alt="게시글 이미지" />
                    )}
                  </div>
                )}
              </div>
              <div className="article-info flex text-xs gap-10">
                <div>댓글 : {countCommentsForPost(post.bid)}</div>
                <div>{post.name}</div>
                <div>{post.date}</div>
              </div>
            </div>
          ))}
          <div className="text-right text-sm">
            <button className="hover:underline" onClick={handleToCommunity}>
              더보기 &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../../firebaseConfig"
import { doc, increment, updateDoc } from "firebase/firestore"
import DOMPurity from "isomorphic-dompurify"
import "react-quill/dist/quill.core.css"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
  comments: any[]
}

interface PostProps {
  id: string
  bid: number
}

export default function SearchResult({
  posts,
  comments,
  setPosts,
}: CommunityProps) {
  const navigate = useNavigate()
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q") || ""

  const isSearchMatch = (postTitle: string, query:string) => {
    const normalizedPostTitle = postTitle.toLowerCase().normalize("NFC")
    const normalizedQuery = query.toLowerCase().normalize("NFC")

    return normalizedPostTitle.includes(normalizedQuery)
  }
  
  const filteredPosts = posts.filter((post) => isSearchMatch(post.title, searchQuery))

  console.log(filteredPosts)

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const sortedPosts = filteredPosts.sort((a, b) => b.bid - a.bid)
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost)

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

  const countCommentsForPost = (postBid: number) => {
    return comments.filter((comment) => comment.bid === postBid).length
  }

  const handlePostClick = (post: PostProps) => {
    increaseViewCount(post)
    navigate(`/community/${post.bid}`)
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
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

  return (
    <div className="main-content max-w-5xl mx-auto py-7 px-10 mb-20">
      <div className="text-left">
        <h1 className="text-2xl font-bold mb-2">검색결과</h1>
        <p>검색어: {searchQuery}</p>
      </div>
      <div className="border-2 rounded-lg  community-content mx-auto py-6 px-10 mt-10 mb-6">
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
      </div>
      {totalPages > 1 && (
        <div className="join mb-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              className="join-item btn-sm  hover:bg-amber-200 transition-colors disabled:hover:bg-white  disabled:border-amber-400 disabled:border disabled:rounded-full"
              key={index}
              onClick={() => handlePageClick(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button className="join-item btn-sm">&gt;</button>
        </div>
      )}
    </div>
  )
}

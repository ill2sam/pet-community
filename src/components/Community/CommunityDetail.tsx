import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import DOMPurity from "isomorphic-dompurify"
import "react-quill/dist/quill.core.css"
import StoreData from "../../redux/StoreData"


interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
  comments: any[]
  setComments: React.Dispatch<React.SetStateAction<any[]>>
}

interface DetailType {
  category: string
  imgURL: string
  name: string
  petCategory: string
  text: string
  userId: string
  bid: number
  title: string
  view: number
  date: string
  id: string
}

interface CommentsType {
  bid: number, 
  date: string,
  name: string,
  text: string,
  userId: string
  id: string
}

export default function CommunityDetail({
  posts,
  setPosts,
  comments,
  setComments,
}: CommunityProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isLogin = StoreData().isLogin
  const userId = StoreData().userId
  const name = StoreData().name

  console.log(useParams())

  const [detail, setDetail] = useState<DetailType>({
    category: "",
    imgURL: "",
    name: "",
    petCategory: "",
    text: "",
    userId: "",
    bid: 0,
    title: "",
    view: 0,
    date: "",
    id: "",
  })

  const [commentsDetail, setCommentsDetail] = useState<CommentsType[]>([])

  const [commentText, setCommentText] = useState("")
  const [commentAvailable, setCommentAvailable] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const today = new Date()
  const year = today.getFullYear().toString().padStart(4, "0")
  const month = (today.getMonth() + 1).toString().padStart(2, "0") // 월은 0부터 시작하므로 +1을 해줍니다.
  const date = today.getDate().toString().padStart(2, "0")
  const hours = today.getHours().toString().padStart(2, "0")
  const minutes = today.getMinutes().toString().padStart(2, "0")

  console.log(date,hours,minutes)
  const thisComments = comments.filter((comment) => comment.bid === detail.bid)
  console.log(thisComments)
  const commentsPerPage = 10
  const totalPages = Math.ceil(thisComments.length / commentsPerPage)
  const indexOfLastComment = currentPage * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = thisComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  )

  const authPostComment = currentComments.map((comm) => comm.userId).filter((comm) => comm.id === userId)

  console.log(authPostComment)
  console.log(totalPages)
  console.log(comments)
  console.log(currentComments)
  console.log(currentComments.map((comm) => comm.userId))
  console.log( detail.id)

  const commentData = {
    userId: userId,
    name: name,
    bid: detail.bid,
    date:
      year +
      "." +
      month +
      "." +
      date +
      " " +
      hours +
      ":" +
      minutes,
    text: commentText,
  }

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const usersCollectionRef = collection(db, "Comments")
  const createComment = async () => {
    console.log(commentData)
    await addDoc(usersCollectionRef, commentData)
  }

  const handleCommentSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    const shouldComment = window.confirm("정말로 이 댓글을 등록하시겠습니까?")
    if (shouldComment) {
      setComments([commentData, ...comments])
      createComment()
      setCommentText("")
    }
  }

  useEffect(() => {
    const currentPost = posts.find((num) => num.bid === Number(id))
    const currentComments = comments.filter((num) => num.bid === Number(id))

    if (currentPost) {
      setDetail(currentPost)
    }
    if(currentComments) {
      setCommentsDetail(currentComments)
    }

    if (isLogin) {
      setCommentAvailable(false)
    }
  }, [id, posts, comments, isLogin])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`

      const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value)
      }

      const handleInput = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
      }
      handleCommentText
      textarea.addEventListener("input", handleInput)

      return () => {
        textarea.removeEventListener("input", handleInput)
      }
    }
  }, [])

  const modifyPost = () => {
    navigate(`/community/${detail.bid}/modify`)
  }

  const handleDelete = () => {
    const newData = posts.filter((post) => post.bid !== detail.bid)
    setPosts(newData)
    navigate("/community")
  }

  // const deletePost = async () => {
  //   console.log(detail.userId)
  //   const shouldDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?")
  //   if (shouldDelete) {
  //     const postsDoc = doc(db, "Posts", String(detail.userId))
  //     await deleteDoc(postsDoc)
  //     handleDelete()
  //   }
  // }

  const handleDeletePost = async (postId:string) => {
    console.log(postId)
    
    const shouldDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?")
    if (shouldDelete) {
      try{
        const postDoc = doc(db, "Posts", postId)
        await deleteDoc(postDoc)
        handleDelete()
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error)
      }
      
    }
  }


  console.log(commentsDetail)

  const handleDeleteComment = () => {
    const newComments = comments.filter(
      (comment) => comment.bid !== detail.bid
    )
    console.log(newComments)
    setComments(newComments)
  }

  const deleteComment = (commentId: string) => {
    console.log(commentId)
    const shouldDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?")
    if(shouldDelete) {
      const commentsDoc = doc(db, "Comments", commentId)
      console.log(commentsDoc)
      deleteDoc(commentsDoc)
  
      handleDeleteComment()
    }
  }

  return (
    <div className="post-detail max-w-5xl mx-auto py-7 px-10 mt-10 text-start">
      <h2 className="text-2xl mb-5">정보공유</h2>
      <div className="post-detail-header pb-5 border-b">
        <div className="post-info">
          <div className="category flex mb-4">
            <span className="rounded-full w-fit px-4 py-2 text-xs bg-amber-300">
              {detail?.petCategory}
            </span>
          </div>
          <div className="title mb-6 text-lg flex items-center justify-between">
            <h3 className="mb-2">{detail?.title}</h3>
            <span className="text-xs text-gray-500">조회수: {detail.view}</span>
          </div>
        </div>
        <div className="post-info-sub flex justify-between items-center ">
          <div className="name-date flex text-xs text-gray-600">
            <div className="author-name mr-5">{detail?.name}</div>
            <div className="author-date">{detail?.date}</div>
          </div>
          <div className="modify-buttons text-xs text-gray-600">
            {userId === detail?.userId && (
              <>
                <button
                  className="rounded-3xl border bg-white hover:bg-gray-300/80 py-1 px-2 mr-2 transition-colors"
                  onClick={modifyPost}
                >
                  수정
                </button>
                <button
                  className="rounded-3xl border bg-white hover:bg-red-400/80 py-1 px-2 transition-colors"
                  onClick={() =>handleDeletePost(detail.id)}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="post-detail-content mt-4 mb-8 min-h-[calc(100vh-700px)] shadow-lg p-5"
        dangerouslySetInnerHTML={{
          __html: DOMPurity.sanitize(detail?.text),
        }}
      ></div>
      <div className="comment-container pt-6 border-t">
        <h2 className="text-lg mb-4">댓글</h2>
        <div className="comment-write textarea textarea-bordered min-h-[80px]">
          {isLogin !== true && (
            <textarea
              ref={textareaRef}
              className="w-full resize-none"
              placeholder="댓글을 입력하려면 로그인 해주세요."
              value={commentText}
              onChange={handleCommentText}
              disabled={!isLogin}
            ></textarea>
          )}
          {isLogin !== false && (
            <textarea
              ref={textareaRef}
              className="w-full resize-none"
              placeholder="댓글을 입력해주세요"
              value={commentText}
              onChange={handleCommentText}
            ></textarea>
          )}

          <div className="flex justify-end">
            <button
              className="rounded-3xl text-right text-xs border bg-white hover:bg-amber-400/80 py-1 px-2 mr-2 transition-colors disabled:text-gray-500 disabled:bg-gray-300"
              disabled={commentAvailable}
              onClick={handleCommentSubmit}
            >
              등록
            </button>
          </div>
        </div>
        <div className="comment flex flex-col py-6 border-b">
          {commentsDetail.map((comment) => (
            <div className="comment-container mb-4 border-b" key={comment.id}>
              <div className="comment-name-date flex text-xs justify-between mb-4">
                <div className="comment-name">{comment.name}</div>
                <div className="comment-date-modify">
                  {comment.userId === userId && (
                    <span className="mr-3">
                      <button
                        className="rounded-3xl text-right text-xs border bg-gray-200 hover:bg-amber-200/80 py-[2px] px-2 transition-colors"
                        onClick={() => deleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </span>
                  )}
                  <span>{comment.date}</span>
                </div>
              </div>
              <div className="comment-content mb-4 text-[14px]">
                {comment.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

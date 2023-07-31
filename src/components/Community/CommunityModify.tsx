import { useState, useEffect, useRef, useMemo } from "react"
import StoreData from "../../redux/StoreData"
import { useNavigate, useParams } from "react-router-dom"
import "../../index.css"

import { setDoc,  doc } from "firebase/firestore"
import { db, storage } from "../../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import ReactQuill from "react-quill"
// import ImageResize from "quill-image-resize-module-react"
import "react-quill/dist/quill.snow.css"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
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

export default function CommunityModify({ posts, setPosts }: CommunityProps) {
  const { id } = useParams()
  const isLogin = StoreData().isLogin
  const navigate = useNavigate()
  const [petCategory, setPetCategory] = useState<string>("강아지")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState<string>("")
  // const fileInput = useRef(null);
  const handleImageUrl = (url: string) => {
    setImageUrl(url)
  }

  const [modify, setModify] = useState<DetailType>({
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

  const [submitButton, setSubmitButton] = useState(true)

  const today = new Date()
  const year = today.getFullYear().toString().padStart(4, "0")
  const month = (today.getMonth() + 1).toString().padStart(2, "0") // 월은 0부터 시작하므로 +1을 해줍니다.
  const date = today.getDate().toString().padStart(2, "0")
  const hours = today.getHours().toString().padStart(2, "0")
  const minutes = today.getMinutes().toString().padStart(2, "0")

  const userId = StoreData().userId
  const name = StoreData().name

  const data = {
    userId: userId,
    bid: modify.bid,
    category: "community",
    petCategory: petCategory,
    title: title,
    name: name,
    text: content,
    date: year + "." + month + "." + date + " " + hours + ":" + minutes,
    view: modify.view,
    imgURL: imageUrl,
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  // console.log(...modify)

  const modifyPost = async () => {
    console.log(modify.id)
    await setDoc(doc(db, "Posts", modify.id), {
      ...data
    })
    
  }


  console.log(data)
  console.log(posts.filter((post) => post.bid === 25))
  console.log(modify)

  const handleSumbitData = (e: React.FormEvent) => {
    e.preventDefault()

    const index = posts.findIndex((post) => post.id === modify.id)

    if (index !== -1) {
      const updatedPosts = [
        ...posts.slice(0, index),
        data,
        ...posts.slice(index + 1),
      ]
      setPosts(updatedPosts)
    }

    alert("작성완료")
    modifyPost()
    navigate(-1)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  // Quill.ref
  const quillRef = useRef<ReactQuill | null>(null)

  const imageHandler = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.addEventListener("change", async () => {
      const editor = quillRef.current?.getEditor()
      const file = input.files?.[0]

      if (editor && file) {
        const range = editor.getSelection(true)

        console.log(AbstractRange)

        try {
          const storageRef = ref(storage, `image/${Date.now()}`)

          await uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              // 이미지 URL 에디터에 삽입
              // data에 imgUrl 삽입
              handleImageUrl(url)

              editor.insertEmbed(range.index, "image", url)
              // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
              editor.setSelection(range)
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  // quillModule
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])
  console.log(modify)

  useEffect(() => {
    const currentPost = posts.find((num) => num.bid === Number(id))

    if (currentPost) {
      setModify(currentPost)
    }

    setPetCategory(modify.petCategory)
    setTitle(modify.title)
    setContent(modify.text)
  }, [modify])

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus()
    }
    const observer = new MutationObserver(() => {
      null
    })
    const editor = document.querySelector(".ql-editor")

    if (editor) {
      observer.observe(editor, { childList: true })
    }

    return () => {
      observer.disconnect() // 컴포넌트가 unmount될 때 observer를 해제
    }
  }, [])

  useEffect(() => {
    if (title !== "" && content !== "" && content !== "<p><br></p>") {
      setSubmitButton(false)
    } else {
      setSubmitButton(true)
    }

    if (!isLogin) {
      alert("로그인 후 이용해주세요.")
      navigate("/login")
    }
  }, [isLogin, title, content])

  return (
    <div className="write-content max-w-5xl mx-auto py-7 px-10 mt-10 text-start">
      <button onClick={() => console.log(content)}>value</button>
        <h2 className="text-2xl mb-7">정보공유</h2>
        <h3 className="category-title mb-4">카테고리</h3>
        <div className="category flex mb-10">
          <div className="group mr-3">
            <input
              type="radio"
              name="category"
              id="강아지"
              className="hidden"
              checked={petCategory === "강아지"}
              onChange={() => setPetCategory("강아지")}
            />
            <label
              htmlFor="강아지"
              className="rounded-full w-fit px-4 py-2 text-xs bg-gray-200  cursor-pointer transition-color"
            >
              강아지
            </label>
          </div>
          <div className="group mr-3">
            <input
              type="radio"
              name="category"
              id="고양이"
              className="hidden"
              checked={petCategory === "고양이"}
              onChange={() => setPetCategory("고양이")}
            />
            <label
              htmlFor="고양이"
              className="rounded-full w-fit px-4 py-2 text-xs bg-gray-200  cursor-pointer transition-color"
            >
              고양이
            </label>
          </div>
          <div className="group">
            <input
              type="radio"
              name="category"
              id="기타"
              className="hidden"
              checked={petCategory === "기타"}
              onChange={() => setPetCategory("기타")}
            />
            <label
              htmlFor="기타"
              className="rounded-full w-fit px-4 py-2 text-xs bg-gray-200  cursor-pointer transition-color"
            >
              기타
            </label>
          </div>
        </div>
        <div className="title mb-6">
          <h3 className="mb-2">제목</h3>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="input input-bordered w-full"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="text-editor min-h-[calc(100vh-400px)] sm:min-h-[calc(100vh-550px)]">
          <ReactQuill
            style={{ height: "300px", minHeight: "300px", maxHeight: "500px" }}
            placeholder="내용을 입력해주세요."
            theme="snow"
            ref={(ref) => {
              if (ref) {
                quillRef.current = ref
              }
            }}
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="btn rounded-3xl bg-amber-300/80 hover:bg-amber-400 disabled:bg-gray-200 w-40 mr-4"
            disabled={submitButton}
            onClick={handleSumbitData}
          >
            수정
          </button>
          <button
            className="btn rounded-3xl bg-amber-200/80 hover:bg-amber-300 disabled:bg-gray-200 w-40"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
    </div>
  )
}

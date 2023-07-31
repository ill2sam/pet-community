import "./App.css"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./components/Account/Login"
import SignUp from "./components/Account/SignUp"
import Profile from "./pages/Profile"
import MainContent from "./components/Main/MainContent"
import Community from "./pages/Community"
import { Provider } from "react-redux/es/exports"
import store, { persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import MyArticle from "./components/Profile/MyArticle"
import ProfilePage from "./components/Profile/ProfilePage"
import ProfileModify from "./components/Profile/ProfileModify"
import CommunityWrite from "./components/Community/CommunityWrite"
import Password from "./components/Profile/Password"
import CommunityMain from "./components/Community/CommunityMain"
import CommunityDetail from "./components/Community/CommunityDetail"
import CommunityModify from "./components/Community/CommunityModify"
import SearchResult from "./components/Search/SearchResult"
import { collection, getDocs} from "firebase/firestore"
import { db } from "./firebaseConfig"

interface PostInfo {
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

interface CommentInfo {
  bid: number
  date: string
  name: string
  text: string
  userId: string
  id: string
}

interface CommunityProps {
  posts: PostInfo[];
  comments: CommentInfo[];
}

function App() {
  const [posts, setPosts] = useState<any[]>([])
  const [comments, setComments] = useState<any>([])
  const [seachQuery, setSearchQuery] = useState<string>("")
  const postsCollectionRef = collection (db, "Posts");
  const commentsCollectionRef = collection (db, "Comments");

  useEffect(() => {
    const getUsers = async() => {
      const data = await getDocs(postsCollectionRef)
      const sortedData = data.docs.map((doc) => ({...doc.data(), id: doc.id} as PostInfo)).sort((a, b) => b.bid - a.bid)

      setPosts(sortedData);
    }

    const getComments = async() => {
      const data = await getDocs(commentsCollectionRef)
      const sortedData = data.docs.map((doc) => ({...doc.data(), id: doc.id} as CommentInfo )).sort((a,b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date)

        return dateB.getTime() - dateA.getTime()
      })
      console.log(sortedData)

      setComments(sortedData)
    }


    getUsers()
    getComments()
  },[posts.length, comments.length])

  console.log(posts)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Main}>
              <Route
                path="/"
                element={
                  <MainContent
                    posts={posts}
                    comments={comments}
                    setPosts={setPosts}
                  />
                }
              />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/community" element={<Community />}>
                <Route
                  path="/community"
                  element={
                    <CommunityMain
                      posts={posts}
                      comments={comments}
                      setPosts={setPosts}
                    />
                  }
                />
              </Route>
              <Route
                path="/community/:id"
                element={
                  <CommunityDetail
                    posts={posts}
                    setPosts={setPosts}
                    comments={comments}
                    setComments={setComments}
                  />
                }
              />
              <Route
                path="/community/:id/modify"
                element={<CommunityModify posts={posts} setPosts={setPosts} />}
              />
              <Route
                path="/community/write"
                element={<CommunityWrite posts={posts} setPosts={setPosts} />}
              />
              {/* <Route path="/qna" Component={Community} /> */}
              <Route />
              <Route path="/profile" Component={Profile}>
                <Route path="/profile" Component={ProfilePage} />
                <Route
                  path="/profile/myarticles"
                  element={<MyArticle posts={posts} setPosts={setPosts} />}
                />
              </Route>
              <Route path="/profile/modify" Component={ProfileModify} />
              <Route path="/profile/password" Component={Password} />
              <Route
                path="/search"
                element={
                  <SearchResult
                    posts={posts}
                    comments={comments}
                    setPosts={setPosts}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

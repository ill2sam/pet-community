import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./components/Account/Login"
import SignUp from "./components/Account/SignUp"
import Profile from "./pages/Profile"
import { Provider } from "react-redux/es/exports"
import store, { persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import MyArticle from "./components/Profile/MyArticle"
import ProfilePage from "./components/Profile/ProfilePage"
import ProfileModify from "./components/Profile/ProfileModify"
import Password from "./components/Profile/Password"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Main}>
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/profile" Component={Profile}>
                <Route path="/profile" Component={ProfilePage} />
                <Route path="/profile/myarticles" Component={MyArticle} />
              </Route>
              <Route path="/profile/modify" Component={ProfileModify} />
              <Route path="/profile/password" Component={Password} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App

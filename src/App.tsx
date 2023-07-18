import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Mainpage from "./components/Main/Main"
import Login from "./components/Account/Login"
import SignUp from "./components/Account/SignUp"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Mainpage}>
            <Route path="/login" Component={Login}/>
            <Route path="/signup" Component={SignUp}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

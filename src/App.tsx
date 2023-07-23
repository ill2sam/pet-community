import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./components/Account/Login"
import SignUp from "./components/Account/SignUp"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main}>
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={SignUp} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

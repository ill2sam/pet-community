import { useSelector } from "react-redux"
import { RootState } from "./store"

function StoreData () {
  const userId = useSelector((store: RootState) => store.loginState.userId)
  const name = useSelector((store: RootState) => store.loginState.name)
  const email = useSelector((store: RootState) => store.loginState.email)
  const isLogin = useSelector((store: RootState) => store.loginState.isLogin)

  const loginStateData = {
    userId,
    name,
    email,
    isLogin
  }

  return loginStateData
}

export default StoreData
import { useState, useEffect } from "react"
import { db } from "../../firebaseConfig"
import { getDocs, query, collection } from "firebase/firestore"

interface NicknameInputProps {
  initialNickname: string
  initialNicknameAvailable: boolean | null
}

export default function InfoCheckHooks({
  initialNickname,
  initialNicknameAvailable,
}: NicknameInputProps) {
  const dbQuery = query(collection(db, "Users"))
  const [nickname, setNickname] = useState<string>(initialNickname)
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(initialNicknameAvailable)
  const [nicknameCheckButton, setNicknameCheckButton] = useState(true)

  const nicknameRegExp = /^[a-zA-Z가-힣0-9]{2,12}$/g
  const nicknameMatch = nickname.match(nicknameRegExp)

  

  // const NicknameAvailableCheck = useCallback(() => {
  //   console.log(nicknameMatch)
  //   if ( nicknameMatch !== null && isNicknameAvailable !== true ) {
  //     setNicknameCheckButton(false)
  //   } else {
  //     setNicknameCheckButton(true)
  //   }
  // }, [nicknameMatch, isNicknameAvailable])


  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setIsNicknameAvailable(null)
  }


  useEffect(() => {
    if (nicknameMatch !== null && isNicknameAvailable !== false) {
      setNicknameCheckButton(false)
    } else {
      setNicknameCheckButton(true)
    }
    return
  }, [nickname, nicknameMatch, isNicknameAvailable])

  
  const handleNicknameCheck = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const nicknameSnap = await getDocs(dbQuery)
    const nicknameArr = nicknameSnap.docs.map((doc) => doc.data().nickname)
    console.log(nicknameArr)

    try {
      const nicknameFilter = nicknameArr.filter((doc) => doc === nickname)
      console.log(nicknameArr)
      if (
        nicknameFilter.length === 0 &&
        nickname !== "" &&
        nicknameMatch !== null
      ) {
        setIsNicknameAvailable(true)
      } else {
        console.log("a")
        setIsNicknameAvailable(false)
        setNicknameCheckButton(true)
        console.log(nicknameCheckButton)
      }
    } catch (error) {
      console.error("닉네임 중복 체크 에러: ", error)
    }
  }

  return {
    nickname,
    nicknameMatch,
    isNicknameAvailable,
    nicknameCheckButton,
    handleNicknameChange,
    handleNicknameCheck,
  }
}

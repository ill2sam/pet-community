import { useState } from "react"

export default function PasswordCheck() {
  const [password, setPassword] = useState("")
  const [passwordRules, setPasswordRules] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,20}$/g
    setPassword(e.target.value)

    if (e.target.value.match(passwordRegExp) === null) {
      setPasswordRules(false)
    } else {
      setPasswordRules(true)
    }
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value)

    if (password && e.target.value && e.target.value === password) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
  }

  return {
    password,
    passwordRules,
    confirmPassword,
    passwordMatch,
    handlePasswordChange,
    handleConfirmPasswordChange
  }
}


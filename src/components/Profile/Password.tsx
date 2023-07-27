export default function Password () {
  return (
    <div className="mypage-content flex items-center flex-col max-w-5xl mx-auto mt-10 min-h-[calc(100vh-200px)]">
      <div className="card w-full max-w-sm shadow-md">
        <div className="card-body p-2">
          <h1 className="text-xl font-bold mb-8">회원정보 수정</h1>
          <form>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signupPassword">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPassword"
                placeholder="비밀번호(영어대소문자, 숫자를 이용해 6자 이상)"
                className="border-gray-400 border-b placeholder:text-[11px]"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordRules === true && (
                <div className="password-message text-left text-xs mt-1 text-green-500">
                  안전한 비밀번호입니다.
                </div>
              )}
              {passwordRules === false && password !== "" && (
                <div className="password-message text-left text-xs mt-1 text-red-500">
                  비밀번호는 영어대문자, 소문자, 숫자를 <br />
                  하나이상 사용해 6-20자로 입력해주세요.
                </div>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="signupPasswordCheck">
                {/* <span className="label-text">비밀번호</span> */}
              </label>
              <input
                type="password"
                id="signupPasswordCheck"
                placeholder="비밀번호 확인"
                className="border-gray-400 border-b placeholder:text-[11px]"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordMatch === true && (
                <div className="password-message text-left text-xs mt-1 text-green-500">
                  비밀번호가 일치합니다.
                </div>
              )}
              {passwordMatch === false && confirmPassword !== "" && (
                <div className="password-message text-left text-xs mt-1 text-red-500">
                  비밀번호가 일치하지 않습니다
                </div>
              )}
            </div>
            <div className="button-container mb-4 flex justify-around">
              <button
                className="btn bg-amber-100 hover:bg-amber-200 text-xs w-20 disabled:bg-gray-100 disabled:border-gray-200"
                disabled={
                  isNicknameAvailable === null || isNicknameAvailable === false
                }
              >
                수정
              </button>
              <Link
                to="/profile"
                className="btn bg-amber-100 hover:bg-amber-200 text-xs w-20"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
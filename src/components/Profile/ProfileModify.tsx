export default function ProfileModify() {
  return (
    <div className="mypage-content flex items-center flex-col max-w-5xl mx-auto mt-10 min-h-[calc(100vh-150px)]">
      <div className="card w-full max-w-sm shadow-md">
        <div className="card-body p-2">
          <h1 className="text-xl font-bold mb-8">회원정보 수정</h1>
          <div className="profile-info text-left">
            <div className="h-10 flex items-center justify-between">
              <div className="flex flex-row items-center border-b border-gray-200">
                <span className="font-bold mr-2 text-xs">닉네임: </span>
                <input type="text" />
              </div>
              <button className="bg-gray-100 rounded-2xl text-xs p-2">
                중복체크
              </button>
            </div>
            <div className="h-10 flex items-center border-b my-6 border-gray-200">
              <span className="font-bold mr-2 text-xs">이메일: </span>
              <span className="text-sm"></span>
            </div>
          </div>
          <div className="button-container mb-10 flex justify-between">
            <button className="btn bg-amber-100 hover:bg-amber-200 text-xs">
              비밀번호 변경
            </button>
            <button className="btn bg-amber-100 hover:bg-amber-200 text-xs">
              비밀번호 변경
            </button>
          </div>
          <div className="logout-container text-right">
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-amber-300 text-xs">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

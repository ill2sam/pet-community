export default function CommunityContent() {
  return (
    <>
      <div className="community-content max-w-5xl mx-auto py-7 px-10 mt-10">
        <div className="article pb-6 border-b mb-5">
          <div className="article text-left">
            <div className="article-content flex-row">
              <div className="categoty border rounded-full w-fit px-3 py-1 text-xs bg-amber-300">
                강아지
              </div>
              <div className="title mt-4">
                <h2 className="cursor-pointer hover:text-orange-400">제목</h2>
              </div>
              <p className="paragraph text-left text-xs line-clamp-2 my-4 cursor-pointer">
                Lorem ipsum dolor sit amet consectetur. Ultrices tortor platea
                sit molestie interdum pharetra nibh. Velit ultrices nec quis
                quis viverra eget egestas ornare. Mauris convallis a ultricies
                elit urna risus. Sem ultrices euismod ullamcorperSem ultrices
                euismod Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Repellendus ipsam quam nisi ipsum? Quos blanditiis nemo
                eos. Dolorem, totam corporis.
              </p>
            </div>
            <div className="article-img"></div>
          </div>
          <div className="article-info flex text-xs gap-10">
            <div>댓글 : 1</div>
            <div>작성자</div>
            <div>3시간 전</div>
          </div>
        </div>
        <div className="article pb-6 border-b">
          <div className="article text-left">
            <div className="article-content flex-row">
              <div className="categoty border rounded-full w-fit px-3 py-1 text-xs bg-amber-300">
                강아지
              </div>
              <div className="title mt-4">
                <h2 className="cursor-pointer hover:text-orange-400">제목</h2>
              </div>
              <p className="paragraph text-left text-xs line-clamp-2 my-4">
                Lorem ipsum dolor sit amet consectetur. Ultrices tortor platea
                sit molestie interdum pharetra nibh. Velit ultrices nec quis
                quis viverra eget egestas ornare. Mauris convallis a ultricies
                elit urna risus. Sem ultrices euismod ullamcorperSem ultrices
                euismod Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Repellendus ipsam quam nisi ipsum? Quos blanditiis nemo
                eos. Dolorem, totam corporis.
              </p>
            </div>
            <div className="article-img"></div>
          </div>
          <div className="article-info flex text-xs gap-10">
            <div>댓글 : 1</div>
            <div>작성자</div>
            <div>3시간 전</div>
          </div>
        </div>
      </div>
      <div className="join">
        <button className="join-item btn-xs">1</button>
        <button className="join-item btn-xs active:border rounded-xl">2</button>
        <button className="join-item btn-xs">3</button>
        <button className="join-item btn-xs">4</button>
        <button className="join-item btn-xs">5</button>
        <button className="join-item btn-xs">&gt;</button>
      </div>
    </>
  )
}

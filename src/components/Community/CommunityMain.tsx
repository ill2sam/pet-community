import CommunityHitPosts from "./CommunityHitPosts"
import CommunityContent from "./CommunityContent"

interface CommunityProps {
  posts: any[]
  setPosts: React.Dispatch<React.SetStateAction<any[]>>
  comments: any[]
}

export default function CommunityMain({ posts, comments, setPosts }: CommunityProps) {
  console.log(posts)

  return (
    <>
      <CommunityHitPosts posts={posts} comments={comments} setPosts={setPosts}/>
      <CommunityContent posts={posts} comments={comments} setPosts={setPosts} />
    </>
  )
}

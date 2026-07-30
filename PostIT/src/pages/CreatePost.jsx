import { useNavigate } from 'react-router-dom'
import { PostForm } from '../components/PostForm'
import { createPost } from '../lib/storage'

export function CreatePost() {
  const navigate = useNavigate()

  function handleSubmit(fields) {
    const post = createPost(fields)
    navigate(`/post/${post.id}`)
  }

  return (
    <div className="page-narrow">
      <h1 className="page-title">New Post</h1>
      <PostForm
        submitLabel="Create Post"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}

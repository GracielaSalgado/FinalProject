import { Link, useNavigate, useParams } from 'react-router-dom'
import { PostForm } from '../components/PostForm'
import { usePost } from '../hooks/usePost'

export function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loaded, edit } = usePost(id)

  if (loaded && !post) {
    return (
      <div className="page-narrow">
        <p className="empty-state">This post doesn&apos;t exist anymore.</p>
        <Link to="/" className="btn">
          Back to feed
        </Link>
      </div>
    )
  }

  if (!post) return null

  function handleSubmit(fields) {
    edit(fields)
    navigate(`/post/${id}`)
  }

  return (
    <div className="page-narrow">
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        initialValues={post}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/post/${id}`)}
      />
    </div>
  )
}

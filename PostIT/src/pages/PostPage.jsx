import { Link, useNavigate, useParams } from 'react-router-dom'
import { CommentSection } from '../components/CommentSection'
import { formatRelativeTime } from '../lib/formatTime'
import { usePost } from '../hooks/usePost'

export function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { post, loaded, upvote, comment, remove } = usePost(id)

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

  function handleDelete() {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    remove()
    navigate('/')
  }

  return (
    <div className="page-narrow post-page">
      <Link to="/" className="back-link">
        ← Back to feed
      </Link>

      <div className="post-detail">
        <span className="post-card-time">{formatRelativeTime(post.createdAt)}</span>
        <h1 className="page-title">{post.title}</h1>

        {post.content && <p className="post-content">{post.content}</p>}

        {post.imageUrl && (
          <img src={post.imageUrl} alt="" className="post-image" />
        )}

        <div className="post-actions">
          <button type="button" className="btn upvote-btn" onClick={upvote}>
            ▲ Upvote ({post.upvotes})
          </button>
          <Link to={`/post/${post.id}/edit`} className="btn">
            Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <CommentSection comments={post.comments} onAddComment={comment} />
    </div>
  )
}

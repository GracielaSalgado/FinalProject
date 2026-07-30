import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../lib/formatTime'

export function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <span className="post-card-time">{formatRelativeTime(post.createdAt)}</span>
      <h2 className="post-card-title">{post.title}</h2>
      <span className="post-card-upvotes">▲ {post.upvotes}</span>
    </Link>
  )
}

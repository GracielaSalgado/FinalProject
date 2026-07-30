import { useState } from 'react'
import { formatRelativeTime } from '../lib/formatTime'

export function CommentSection({ comments, onAddComment }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    onAddComment(text)
    setText('')
  }

  return (
    <section className="comments">
      <h2>Comments ({comments.length})</h2>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Leave a comment..."
          rows={3}
        />
        <button type="submit" className="btn btn-primary">
          Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="empty-state">No comments yet.</p>
      ) : (
        <ul className="comment-list">
          {[...comments]
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((comment) => (
              <li key={comment.id} className="comment">
                <p className="comment-text">{comment.text}</p>
                <span className="comment-time">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}

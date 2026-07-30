import { useState } from 'react'

export function PostForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [content, setContent] = useState(initialValues?.content ?? '')
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    onSubmit({ title, content, imageUrl })
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Title *</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Give your post a title"
          required
        />
      </label>

      <label className="form-field">
        <span>Content (optional)</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Add some details..."
          rows={6}
        />
      </label>

      <label className="form-field">
        <span>Image URL (optional)</span>
        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

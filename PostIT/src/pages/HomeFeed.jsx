import { useEffect, useMemo, useState } from 'react'
import { PostCard } from '../components/PostCard'
import { getPosts } from '../lib/storage'

export function HomeFeed() {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState('time')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  const visiblePosts = useMemo(() => {
    const filtered = query.trim()
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : posts

    const sorted = [...filtered].sort((a, b) =>
      sortBy === 'upvotes' ? b.upvotes - a.upvotes : b.createdAt - a.createdAt,
    )

    return sorted
  }, [posts, sortBy, query])

  return (
    <div className="feed-page">
      <div className="feed-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search posts by title..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search posts by title"
        />
        <div className="sort-controls" role="group" aria-label="Sort posts">
          <button
            type="button"
            className={`sort-btn ${sortBy === 'time' ? 'active' : ''}`}
            onClick={() => setSortBy('time')}
          >
            Newest
          </button>
          <button
            type="button"
            className={`sort-btn ${sortBy === 'upvotes' ? 'active' : ''}`}
            onClick={() => setSortBy('upvotes')}
          >
            Top
          </button>
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <p className="empty-state">
          {posts.length === 0
            ? 'No posts yet. Be the first to create one!'
            : 'No posts match your search.'}
        </p>
      ) : (
        <div className="post-list">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

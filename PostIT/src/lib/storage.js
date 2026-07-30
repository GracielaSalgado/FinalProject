const STORAGE_KEY = 'postit.posts'

const SEED_POSTS = [
  {
    id: 'seed-1',
    title: 'Welcome to PostIT!',
    content:
      'This is a demo post to get you started. Create your own post from the "New Post" button above, then come back and explore sorting, searching, upvoting, and commenting.',
    imageUrl: '',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    upvotes: 3,
    comments: [
      {
        id: 'seed-1-comment-1',
        text: 'Excited to try this out!',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
      },
    ],
  },
  {
    id: 'seed-2',
    title: 'What are you working on this week?',
    content: 'Share what you\'re building, learning, or debugging. No topic too small.',
    imageUrl: '',
    createdAt: Date.now() - 1000 * 60 * 30,
    upvotes: 1,
    comments: [],
  },
]

function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS))
    return SEED_POSTS
  }
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getPosts() {
  return readAll()
}

export function getPost(id) {
  return readAll().find((post) => post.id === id) ?? null
}

export function createPost({ title, content, imageUrl }) {
  const posts = readAll()
  const post = {
    id: makeId(),
    title: title.trim(),
    content: content?.trim() ?? '',
    imageUrl: imageUrl?.trim() ?? '',
    createdAt: Date.now(),
    upvotes: 0,
    comments: [],
  }
  writeAll([post, ...posts])
  return post
}

export function updatePost(id, { title, content, imageUrl }) {
  const posts = readAll()
  const next = posts.map((post) =>
    post.id === id
      ? {
          ...post,
          title: title.trim(),
          content: content?.trim() ?? '',
          imageUrl: imageUrl?.trim() ?? '',
        }
      : post,
  )
  writeAll(next)
  return next.find((post) => post.id === id) ?? null
}

export function deletePost(id) {
  writeAll(readAll().filter((post) => post.id !== id))
}

export function upvotePost(id) {
  const posts = readAll()
  const next = posts.map((post) =>
    post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post,
  )
  writeAll(next)
  return next.find((post) => post.id === id) ?? null
}

export function addComment(postId, text) {
  const posts = readAll()
  const comment = {
    id: makeId(),
    text: text.trim(),
    createdAt: Date.now(),
  }
  const next = posts.map((post) =>
    post.id === postId
      ? { ...post, comments: [...post.comments, comment] }
      : post,
  )
  writeAll(next)
  return next.find((post) => post.id === postId) ?? null
}

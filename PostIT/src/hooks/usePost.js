import { useCallback, useEffect, useState } from 'react'
import { addComment, deletePost, getPost, updatePost, upvotePost } from '../lib/storage'

export function usePost(id) {
  const [post, setPost] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setPost(getPost(id))
    setLoaded(true)
  }, [id])

  const upvote = useCallback(() => {
    setPost(upvotePost(id))
  }, [id])

  const comment = useCallback(
    (text) => {
      setPost(addComment(id, text))
    },
    [id],
  )

  const edit = useCallback(
    (fields) => {
      setPost(updatePost(id, fields))
    },
    [id],
  )

  const remove = useCallback(() => {
    deletePost(id)
  }, [id])

  return { post, loaded, upvote, comment, edit, remove }
}

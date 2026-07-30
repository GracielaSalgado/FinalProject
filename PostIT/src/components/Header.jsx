import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        PostIT
      </Link>
      <Link to="/create" className="btn btn-primary">
        New Post
      </Link>
    </header>
  )
}

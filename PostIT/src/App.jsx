import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { HomeFeed } from './pages/HomeFeed'
import { CreatePost } from './pages/CreatePost'
import { PostPage } from './pages/PostPage'
import { EditPost } from './pages/EditPost'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </main>
    </>
  )
}

export default App

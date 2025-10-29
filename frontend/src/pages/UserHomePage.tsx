import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { User } from '../types/user'
import './UserHomePage.css'

const UserHomePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 获取当前用户信息
    const currentUser = authService.getCurrentUser()

    if (!currentUser) {
      // 未登录，跳转到登录页
      navigate('/')
      return
    }

    if (currentUser.role === 'admin') {
      // 管理员用户，重定向到管理员首页
      navigate('/admin/home')
      return
    }

    setUser(currentUser)
  }, [navigate])

  const handleLogout = () => {
    authService.logout()
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-home-container">
      <header className="user-header">
        <div className="header-content">
          <h1 className="platform-name">AI Novel Platform</h1>
          <div className="user-info">
            <span className="user-name">👤 {user.name || user.email}</span>
            <span className="user-role">User</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="user-main">
        <div className="welcome-section">
          <h2>Welcome, {user.name || 'User'}! 📖</h2>
          <p>Start creating your amazing novels with AI assistance</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>My Novels</h3>
            <p>View and manage your novel projects</p>
            <button className="btn-feature" disabled>Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Create Novel</h3>
            <p>Start a new novel project with AI</p>
            <button className="btn-feature" disabled>Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Settings</h3>
            <p>Configure AI models and preferences</p>
            <button className="btn-feature" disabled>Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Statistics</h3>
            <p>View your writing statistics</p>
            <button className="btn-feature" disabled>Coming Soon</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserHomePage

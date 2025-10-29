import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { User } from '../types/user'
import './AdminHomePage.css'

const AdminHomePage = () => {
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

    if (currentUser.role !== 'admin') {
      // 普通用户，重定向到用户首页
      navigate('/user/home')
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
    <div className="admin-home-container">
      <header className="admin-header">
        <div className="header-content">
          <h1 className="platform-name">AI Novel Platform - Admin</h1>
          <div className="user-info">
            <span className="user-name">👨‍💼 {user.name || user.email}</span>
            <span className="user-role admin-badge">Admin</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="welcome-section">
          <h2>Admin Dashboard 🛠️</h2>
          <p>Manage the platform and monitor all activities</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-value">-</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Total Novels</h3>
              <p className="stat-value">-</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🤖</div>
            <div className="stat-content">
              <h3>AI Requests</h3>
              <p className="stat-value">-</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Active Today</h3>
              <p className="stat-value">-</p>
            </div>
          </div>
        </div>

        <div className="admin-features-grid">
          <div className="admin-feature-card">
            <div className="feature-icon">👥</div>
            <h3>User Management</h3>
            <p>Manage users, roles, and permissions</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>

          <div className="admin-feature-card">
            <div className="feature-icon">📚</div>
            <h3>Novel Management</h3>
            <p>View and manage all novel projects</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>

          <div className="admin-feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Configuration</h3>
            <p>Configure AI models and API keys</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>

          <div className="admin-feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>View detailed platform analytics</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>

          <div className="admin-feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>System Settings</h3>
            <p>Configure platform settings</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>

          <div className="admin-feature-card">
            <div className="feature-icon">📝</div>
            <h3>Logs</h3>
            <p>View system and error logs</p>
            <button className="btn-admin-feature" disabled>Coming Soon</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminHomePage

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserHomePage from './pages/UserHomePage'
import AdminHomePage from './pages/AdminHomePage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        {/* 登录和注册 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 用户首页 */}
        <Route path="/user/home" element={<UserHomePage />} />

        {/* 管理员首页 */}
        <Route path="/admin/home" element={<AdminHomePage />} />

        {/* 旧的首页路由（保留兼容性）*/}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App

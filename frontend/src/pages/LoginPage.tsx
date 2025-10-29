import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import authService from '../services/authService'
import { useToast } from '../hooks/useToast'

const LoginPage = () => {
  const navigate = useNavigate()
  const toast = useToast()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle login button click
  const handleLogin = async () => {
    // 基本验证：只检查是否为空
    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }

    if (!password) {
      toast.error('Please enter your password')
      return
    }

    // 简单的邮箱格式检查
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // 调用后端API登录
      const response = await authService.login({ email, password })

      // 登录成功提示
      toast.success('Login successful!')

      // 根据用户角色跳转到不同页面
      setTimeout(() => {
        if (response.user.role === 'admin') {
          navigate('/admin/home')
        } else {
          navigate('/user/home')
        }
      }, 500)
    } catch (error: any) {
      // 处理登录失败 - 统一显示"密码错误"
      // 400 (验证失败) 和 401 (认证失败) 都统一提示
      if (error.response?.status === 400 || error.response?.status === 401) {
        toast.error('Wrong password. Please try again later')
      } else {
        // 其他错误（如网络错误、服务器错误）
        toast.error('Login failed. Please try again later')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle register button click
  const handleRegister = () => {
    navigate('/register')
  }

  // Handle form submission (Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <div className="login-container">
      {/* Toast 容器 */}
      <toast.ToastContainer />

      <div className="login-card">
        <h1 className="login-title">AI Novel Creation Platform</h1>
        <h2 className="login-subtitle">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button type="button" onClick={handleRegister} className="btn btn-register" disabled={loading}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

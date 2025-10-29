import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'
import authService from '../services/authService'
import { useToast } from '../hooks/useToast'

const RegisterPage = () => {
  const navigate = useNavigate()
  const toast = useToast()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle register button click
  const handleRegister = async () => {
    // 基本验证
    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!password) {
      toast.error('Please enter your password')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // 调用后端API注册
      const response = await authService.register({
        email,
        password,
        name: name.trim() || undefined
      })

      // 注册成功提示
      toast.success('Registration successful!')

      // 根据用户角色跳转到不同页面
      setTimeout(() => {
        if (response.user.role === 'admin') {
          navigate('/admin/home')
        } else {
          navigate('/user/home')
        }
      }, 500)
    } catch (error: any) {
      // 处理注册失败
      const errorMessage = error.response?.data?.message
      if (Array.isArray(errorMessage)) {
        toast.error(errorMessage.join(', '))
      } else if (errorMessage) {
        toast.error(errorMessage)
      } else {
        toast.error('Registration failed. Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle back to login
  const handleBackToLogin = () => {
    navigate('/')
  }

  // Handle form submission (Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRegister()
  }

  return (
    <div className="register-container">
      {/* Toast 容器 */}
      <toast.ToastContainer />

      <div className="register-card">
        <h1 className="register-title">AI Novel Creation Platform</h1>
        <h2 className="register-subtitle">Register</h2>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Name Input (Optional) */}
          <div className="form-group">
            <label htmlFor="name">Name (Optional)</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-register-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            <button type="button" onClick={handleBackToLogin} className="btn btn-back" disabled={loading}>
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage

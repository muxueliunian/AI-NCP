import apiClient from './apiClient'
import { LoginDto, RegisterDto, AuthResponse, User } from '../types/user'

class AuthService {
  /**
   * 用户登录
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', loginDto)

    // 保存Token和用户信息到localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
  }

  /**
   * 用户注册
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', registerDto)

    // 保存Token和用户信息到localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
  }

  /**
   * 获取当前用户信息（验证Token）
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile')
    return response.data
  }

  /**
   * 退出登录
   */
  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  /**
   * 获取当前登录用户（从localStorage）
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr) as User
      } catch {
        return null
      }
    }
    return null
  }

  /**
   * 检查是否已登录
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  /**
   * 检查是否是管理员
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }
}

export default new AuthService()

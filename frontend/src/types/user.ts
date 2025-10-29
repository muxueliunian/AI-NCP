// 用户角色枚举
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 用户实体接口
export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

// 登录请求DTO
export interface LoginDto {
  email: string
  password: string
}

// 注册请求DTO
export interface RegisterDto {
  email: string
  password: string
  name?: string
}

// 认证响应接口
export interface AuthResponse {
  accessToken: string
  user: User
}

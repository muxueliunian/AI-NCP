// API错误响应接口
export interface ApiError {
  statusCode: number
  message: string | string[]
  error?: string
}

// API通用响应包装
export interface ApiResponse<T> {
  data?: T
  error?: ApiError
}
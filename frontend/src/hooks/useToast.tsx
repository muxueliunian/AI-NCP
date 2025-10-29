import { useState, useCallback } from 'react'
import Toast from '../components/Toast'

interface ToastConfig {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastItem extends ToastConfig {
  id: number
}

let toastId = 0

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((config: ToastConfig) => {
    const id = toastId++
    const newToast: ToastItem = {
      id,
      type: config.type || 'info',
      message: config.message,
      duration: config.duration || 3000,
    }

    setToasts((prev) => [...prev, newToast])

    // 自动移除
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, newToast.duration)
  }, [])

  const success = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'success', duration })
  }, [showToast])

  const error = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'error', duration })
  }, [showToast])

  const warning = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'warning', duration })
  }, [showToast])

  const info = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'info', duration })
  }, [showToast])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const ToastContainer = useCallback(() => (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  ), [toasts, removeToast])

  return {
    success,
    error,
    warning,
    info,
    ToastContainer,
  }
}
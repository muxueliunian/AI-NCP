import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageHeader.css'

interface Breadcrumb {
  label: string
  path?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
  showBackButton?: boolean
  backPath?: string
  backLabel?: string
  actions?: React.ReactNode
  enableEscapeKey?: boolean
}

const PageHeader = ({
  title,
  breadcrumbs,
  showBackButton = true,
  backPath = '/user/home',
  backLabel = '← Back to Home',
  actions,
  enableEscapeKey = true,
}: PageHeaderProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(backPath)
  }

  const handleBreadcrumbClick = (path?: string) => {
    if (path) {
      navigate(path)
    }
  }

  // ESC键快捷键支持
  useEffect(() => {
    if (!enableEscapeKey) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [backPath, enableEscapeKey])

  return (
    <header className="page-header">
      <div className="page-header-content">
        {/* 左侧：返回按钮 */}
        {showBackButton && (
          <button
            onClick={handleBack}
            className="btn-back-header"
            title={enableEscapeKey ? `${backLabel} (Press ESC)` : backLabel}
          >
            {backLabel}
          </button>
        )}

        {/* 中间：标题和面包屑 */}
        <div className="page-header-center">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="breadcrumbs">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="breadcrumb-item">
                  {crumb.path ? (
                    <button
                      onClick={() => handleBreadcrumbClick(crumb.path)}
                      className="breadcrumb-link"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="breadcrumb-current">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="breadcrumb-separator">›</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="page-title">{title}</h1>
        </div>

        {/* 右侧：操作按钮 */}
        {actions && <div className="page-header-actions">{actions}</div>}
      </div>
    </header>
  )
}

export default PageHeader


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import novelService from '../services/novelService'
import authService from '../services/authService'
import { Novel, NovelStatusText, NovelStatusColor } from '../types/novel'
import { useToast } from '../hooks/useToast'
import PageHeader from '../components/PageHeader'
import './NovelListPage.css'

const NovelListPage = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查登录状态
    if (!authService.isAuthenticated()) {
      navigate('/')
      return
    }

    loadNovels()
  }, [navigate])

  const loadNovels = async () => {
    try {
      setLoading(true)
      const data = await novelService.getNovels()
      setNovels(data)
    } catch (error: any) {
      toast.error('Failed to load novels')
      console.error('Load novels error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNovel = () => {
    navigate('/novels/create')
  }

  const handleViewNovel = (id: string) => {
    navigate(`/novels/${id}`)
  }

  const handleDeleteNovel = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?\n\nThis will also delete all related outlines and chapters.`)) {
      return
    }

    try {
      await novelService.deleteNovel(id)
      toast.success('Novel deleted successfully')
      // 刷新列表
      loadNovels()
    } catch (error: any) {
      toast.error('Failed to delete novel')
      console.error('Delete novel error:', error)
    }
  }

  if (loading) {
    return (
      <div className="novel-list-container">
        <div className="loading">Loading novels...</div>
      </div>
    )
  }

  return (
    <div className="novel-list-container">
      <PageHeader
        title="📚 My Novels"
        breadcrumbs={[
          { label: 'Home', path: '/user/home' },
          { label: 'My Novels' },
        ]}
        backPath="/user/home"
        backLabel="← Back to Home"
        actions={
          <button onClick={handleCreateNovel} className="btn-create">
            + Create Novel
          </button>
        }
      />

      <main className="novel-list-main">
        {novels.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h2>No novels yet</h2>
            <p>Start creating your first novel with AI assistance</p>
            <button onClick={handleCreateNovel} className="btn-create-large">
              Create Your First Novel
            </button>
          </div>
        ) : (
          <div className="novels-grid">
            {novels.map((novel) => (
              <div key={novel.id} className="novel-card">
                <div className="novel-card-header">
                  <h3 className="novel-title" onClick={() => handleViewNovel(novel.id)}>
                    {novel.title}
                  </h3>
                  <span
                    className="novel-status"
                    style={{ backgroundColor: NovelStatusColor[novel.status] }}
                  >
                    {NovelStatusText[novel.status]}
                  </span>
                </div>

                <div className="novel-card-body">
                  <div className="novel-meta">
                    <span className="meta-item">📚 {novel.genre}</span>
                    <span className="meta-item">✨ {novel.style}</span>
                  </div>

                  <p className="novel-setting">{novel.setting}</p>

                  {novel.description && (
                    <p className="novel-description">{novel.description}</p>
                  )}

                  <div className="novel-stats">
                    <div className="stat-item">
                      <span className="stat-label">Chapters:</span>
                      <span className="stat-value">
                        {novel.completedChapters} / {novel.totalChapters}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Words:</span>
                      <span className="stat-value">{novel.totalWords.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="novel-card-footer">
                  <button
                    onClick={() => handleViewNovel(novel.id)}
                    className="btn-view"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteNovel(novel.id, novel.title)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default NovelListPage


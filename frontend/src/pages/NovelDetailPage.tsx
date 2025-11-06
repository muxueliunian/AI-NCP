import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import novelService from '../services/novelService'
import authService from '../services/authService'
import { Novel, UpdateNovelDto, NovelStatusText, NovelStatusColor } from '../types/novel'
import { useToast } from '../hooks/useToast'
import PageHeader from '../components/PageHeader'
import './NovelDetailPage.css'

const NovelDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const [novel, setNovel] = useState<Novel | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UpdateNovelDto>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // 检查登录状态
    if (!authService.isAuthenticated()) {
      navigate('/')
      return
    }

    if (id) {
      loadNovel(id)
    }
  }, [id, navigate])

  const loadNovel = async (novelId: string) => {
    try {
      setLoading(true)
      const data = await novelService.getNovel(novelId)
      setNovel(data)
      setFormData({
        title: data.title,
        genre: data.genre,
        style: data.style,
        setting: data.setting,
        description: data.description,
      })
    } catch (error: any) {
      console.error('Load novel error:', error)
      if (error.response?.status === 404) {
        toast.error('Novel not found')
        navigate('/novels')
      } else {
        toast.error('Failed to load novel')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // 恢复原始数据
    if (novel) {
      setFormData({
        title: novel.title,
        genre: novel.genre,
        style: novel.style,
        setting: novel.setting,
        description: novel.description,
      })
    }
  }

  const handleSave = async () => {
    if (!id || !novel) return

    // 验证
    if (!formData.title?.trim()) {
      toast.error('Title cannot be empty')
      return
    }

    if (formData.title.length > 200) {
      toast.error('Title must be less than 200 characters')
      return
    }

    setSaving(true)

    try {
      const updated = await novelService.updateNovel(id, formData)
      setNovel(updated)
      setIsEditing(false)
      toast.success('Novel updated successfully!')
    } catch (error: any) {
      console.error('Update novel error:', error)
      toast.error('Failed to update novel')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !novel) return

    if (!window.confirm(`Are you sure you want to delete "${novel.title}"?\n\nThis will also delete all related outlines and chapters.`)) {
      return
    }

    try {
      await novelService.deleteNovel(id)
      toast.success('Novel deleted successfully')
      setTimeout(() => {
        navigate('/novels')
      }, 500)
    } catch (error: any) {
      console.error('Delete novel error:', error)
      toast.error('Failed to delete novel')
    }
  }

  if (loading) {
    return (
      <div className="novel-detail-container">
        <div className="loading">Loading novel...</div>
      </div>
    )
  }

  if (!novel) {
    return null
  }

  return (
    <div className="novel-detail-container">
      <PageHeader
        title={`📖 ${novel.title}`}
        breadcrumbs={[
          { label: 'Home', path: '/user/home' },
          { label: 'My Novels', path: '/novels' },
          { label: novel.title },
        ]}
        backPath="/novels"
        backLabel="← Back to Novels"
        actions={
          !isEditing ? (
            <>
              <button onClick={handleEdit} className="btn-edit-header">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="btn-delete-header">
                🗑️ Delete
              </button>
            </>
          ) : null
        }
      />

      <div className="novel-detail-card">

        <div className="card-body">
          {!isEditing ? (
            // 查看模式
            <>
              <div className="novel-header">
                <h1 className="novel-title">{novel.title}</h1>
                <span
                  className="novel-status"
                  style={{ backgroundColor: NovelStatusColor[novel.status] }}
                >
                  {NovelStatusText[novel.status]}
                </span>
              </div>

              <div className="novel-meta">
                <div className="meta-item">
                  <span className="meta-label">Genre:</span>
                  <span className="meta-value">📚 {novel.genre}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Style:</span>
                  <span className="meta-value">✨ {novel.style}</span>
                </div>
              </div>

              <div className="novel-section">
                <h3>Setting & World</h3>
                <p>{novel.setting}</p>
              </div>

              {novel.description && (
                <div className="novel-section">
                  <h3>Description</h3>
                  <p>{novel.description}</p>
                </div>
              )}

              <div className="novel-stats">
                <div className="stat-card">
                  <div className="stat-icon">📖</div>
                  <div className="stat-content">
                    <div className="stat-label">Chapters</div>
                    <div className="stat-value">
                      {novel.completedChapters} / {novel.totalChapters}
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-content">
                    <div className="stat-label">Total Words</div>
                    <div className="stat-value">{novel.totalWords.toLocaleString()}</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <div className="stat-label">Created</div>
                    <div className="stat-value">
                      {new Date(novel.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-section">
                <button className="btn-action" disabled>
                  📋 View Outline
                </button>
                <button className="btn-action" disabled>
                  📚 View Chapters
                </button>
                <button className="btn-action" disabled>
                  🤖 Generate Content
                </button>
              </div>
            </>
          ) : (
            // 编辑模式
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="title">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  maxLength={200}
                  disabled={saving}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="genre">Genre</label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre || ''}
                    onChange={handleChange}
                    maxLength={100}
                    disabled={saving}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="style">Style</label>
                  <input
                    type="text"
                    id="style"
                    name="style"
                    value={formData.style || ''}
                    onChange={handleChange}
                    maxLength={100}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="setting">Setting & World</label>
                <textarea
                  id="setting"
                  name="setting"
                  value={formData.setting || ''}
                  onChange={handleChange}
                  rows={4}
                  disabled={saving}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  disabled={saving}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn-cancel"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-save"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NovelDetailPage


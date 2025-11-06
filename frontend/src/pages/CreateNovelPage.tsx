import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import novelService from '../services/novelService'
import authService from '../services/authService'
import { CreateNovelDto } from '../types/novel'
import { useToast } from '../hooks/useToast'
import PageHeader from '../components/PageHeader'
import './CreateNovelPage.css'

const CreateNovelPage = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [formData, setFormData] = useState<CreateNovelDto>({
    title: '',
    genre: '',
    style: '',
    setting: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  // 检查登录状态
  if (!authService.isAuthenticated()) {
    navigate('/')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return false
    }

    if (formData.title.length > 200) {
      toast.error('Title must be less than 200 characters')
      return false
    }

    if (!formData.genre.trim()) {
      toast.error('Please enter a genre')
      return false
    }

    if (formData.genre.length > 100) {
      toast.error('Genre must be less than 100 characters')
      return false
    }

    if (!formData.style.trim()) {
      toast.error('Please enter a writing style')
      return false
    }

    if (formData.style.length > 100) {
      toast.error('Style must be less than 100 characters')
      return false
    }

    if (!formData.setting.trim()) {
      toast.error('Please enter a setting')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const novel = await novelService.createNovel(formData)
      toast.success('Novel created successfully!')
      // 跳转到小说详情页
      setTimeout(() => {
        navigate(`/novels/${novel.id}`)
      }, 500)
    } catch (error: any) {
      console.error('Create novel error:', error)
      if (error.response?.status === 400) {
        toast.error('Invalid input. Please check your data.')
      } else {
        toast.error('Failed to create novel. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/novels')
  }

  return (
    <div className="create-novel-container">
      <PageHeader
        title="✍️ Create New Novel"
        breadcrumbs={[
          { label: 'Home', path: '/user/home' },
          { label: 'My Novels', path: '/novels' },
          { label: 'Create' },
        ]}
        backPath="/novels"
        backLabel="← Back to Novels"
      />

      <div className="create-novel-card">
        <div className="card-intro">
          <p>Start your creative journey with AI assistance</p>
        </div>

        <form onSubmit={handleSubmit} className="create-novel-form">
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your novel title"
              maxLength={200}
              disabled={loading}
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">
                Genre <span className="required">*</span>
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g., Fantasy, Sci-Fi, Romance"
                maxLength={100}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="style">
                Writing Style <span className="required">*</span>
              </label>
              <input
                type="text"
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                placeholder="e.g., Epic, Lighthearted, Dark"
                maxLength={100}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="setting">
              Setting & World <span className="required">*</span>
            </label>
            <textarea
              id="setting"
              name="setting"
              value={formData.setting}
              onChange={handleChange}
              placeholder="Describe the world, time period, and setting of your novel..."
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description or synopsis of your novel..."
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Novel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNovelPage


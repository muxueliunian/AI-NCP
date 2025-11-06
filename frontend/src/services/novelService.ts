import apiClient from './apiClient'
import { Novel, CreateNovelDto, UpdateNovelDto } from '../types/novel'

class NovelService {
  /**
   * 创建小说
   */
  async createNovel(data: CreateNovelDto): Promise<Novel> {
    const response = await apiClient.post<Novel>('/novels', data)
    return response.data
  }

  /**
   * 获取小说列表（当前用户的所有小说）
   */
  async getNovels(): Promise<Novel[]> {
    const response = await apiClient.get<Novel[]>('/novels')
    return response.data
  }

  /**
   * 获取单个小说详情
   */
  async getNovel(id: string): Promise<Novel> {
    const response = await apiClient.get<Novel>(`/novels/${id}`)
    return response.data
  }

  /**
   * 更新小说信息
   */
  async updateNovel(id: string, data: UpdateNovelDto): Promise<Novel> {
    const response = await apiClient.patch<Novel>(`/novels/${id}`, data)
    return response.data
  }

  /**
   * 删除小说
   */
  async deleteNovel(id: string): Promise<void> {
    await apiClient.delete(`/novels/${id}`)
  }
}

export default new NovelService()


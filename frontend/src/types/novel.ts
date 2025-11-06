// 小说状态枚举
export enum NovelStatus {
  DRAFT = 'draft',
  OUTLINE = 'outline',
  WRITING = 'writing',
  REVIEWING = 'reviewing',
  COMPLETED = 'completed',
}

// 小说实体接口
export interface Novel {
  id: string
  userId: string
  title: string
  genre: string
  style: string
  setting: string
  description?: string
  status: NovelStatus
  totalChapters: number
  completedChapters: number
  totalWords: number
  createdAt: string
  updatedAt: string
}

// 创建小说请求DTO
export interface CreateNovelDto {
  title: string
  genre: string
  style: string
  setting: string
  description?: string
}

// 更新小说请求DTO
export interface UpdateNovelDto {
  title?: string
  genre?: string
  style?: string
  setting?: string
  description?: string
}

// 小说状态显示文本映射
export const NovelStatusText: Record<NovelStatus, string> = {
  [NovelStatus.DRAFT]: '草稿',
  [NovelStatus.OUTLINE]: '大纲中',
  [NovelStatus.WRITING]: '创作中',
  [NovelStatus.REVIEWING]: '审稿中',
  [NovelStatus.COMPLETED]: '已完成',
}

// 小说状态颜色映射（用于UI显示）
export const NovelStatusColor: Record<NovelStatus, string> = {
  [NovelStatus.DRAFT]: '#999999',
  [NovelStatus.OUTLINE]: '#1890ff',
  [NovelStatus.WRITING]: '#52c41a',
  [NovelStatus.REVIEWING]: '#faad14',
  [NovelStatus.COMPLETED]: '#722ed1',
}


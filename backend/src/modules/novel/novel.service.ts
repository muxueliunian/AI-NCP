import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Novel, NOVEL_STATUS } from './entities/novel.entity';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';

@Injectable()
export class NovelService {
  constructor(
    @InjectRepository(Novel)
    private readonly novelRepository: Repository<Novel>,
  ) {}

  /**
   * 创建新小说
   * @param userId 用户ID
   * @param createNovelDto 创建小说DTO
   * @returns 创建的小说对象
   */
  async create(userId: string, createNovelDto: CreateNovelDto): Promise<Novel> {
    const novel = this.novelRepository.create({
      ...createNovelDto,
      userId,
      status: NOVEL_STATUS.DRAFT,
      totalChapters: 0,
      completedChapters: 0,
      totalWords: 0,
    });

    return await this.novelRepository.save(novel);
  }

  /**
   * 获取用户的所有小说
   * @param userId 用户ID
   * @returns 小说列表
   */
  async findAll(userId: string): Promise<Novel[]> {
    return await this.novelRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 获取单个小说
   * @param id 小说ID
   * @param userId 用户ID
   * @returns 小说对象
   * @throws NotFoundException 如果小说不存在或不属于该用户
   */
  async findOne(id: string, userId: string): Promise<Novel> {
    const novel = await this.novelRepository.findOne({
      where: { id, userId },
    });

    if (!novel) {
      throw new NotFoundException('小说不存在');
    }

    return novel;
  }

  /**
   * 更新小说
   * @param id 小说ID
   * @param userId 用户ID
   * @param updateNovelDto 更新小说DTO
   * @returns 更新后的小说对象
   * @throws NotFoundException 如果小说不存在或不属于该用户
   */
  async update(
    id: string,
    userId: string,
    updateNovelDto: UpdateNovelDto,
  ): Promise<Novel> {
    // 先查找小说，确保存在且属于该用户
    const novel = await this.findOne(id, userId);

    // 更新字段
    Object.assign(novel, updateNovelDto);

    return await this.novelRepository.save(novel);
  }

  /**
   * 删除小说
   * @param id 小说ID
   * @param userId 用户ID
   * @returns 删除的小说对象
   * @throws NotFoundException 如果小说不存在或不属于该用户
   */
  async remove(id: string, userId: string): Promise<Novel> {
    // 先查找小说，确保存在且属于该用户
    const novel = await this.findOne(id, userId);

    // 删除小说
    await this.novelRepository.remove(novel);

    return novel;
  }

  /**
   * 更新小说统计信息（章节数、字数等）
   * 此方法供内部使用，当章节创建/更新时调用
   * @param id 小说ID
   * @param totalChapters 总章节数
   * @param completedChapters 已完成章节数
   * @param totalWords 总字数
   */
  async updateStats(
    id: string,
    totalChapters: number,
    completedChapters: number,
    totalWords: number,
  ): Promise<Novel> {
    const novel = await this.novelRepository.findOne({ where: { id } });

    if (!novel) {
      throw new NotFoundException('小说不存在');
    }

    novel.totalChapters = totalChapters;
    novel.completedChapters = completedChapters;
    novel.totalWords = totalWords;

    return await this.novelRepository.save(novel);
  }

  /**
   * 更新小说状态
   * 此方法供内部使用，当工作流状态变化时调用
   * @param id 小说ID
   * @param status 新状态
   */
  async updateStatus(id: string, status: string): Promise<Novel> {
    const novel = await this.novelRepository.findOne({ where: { id } });

    if (!novel) {
      throw new NotFoundException('小说不存在');
    }

    novel.status = status as any;

    return await this.novelRepository.save(novel);
  }
}


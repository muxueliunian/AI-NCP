import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { Novel } from './entities/novel.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@ApiTags('novels')
@Controller('novels')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建新小说' })
  @ApiResponse({
    status: 201,
    description: '小说创建成功',
    type: Novel,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  @ApiResponse({
    status: 401,
    description: '未授权 - Token无效或缺失',
  })
  async create(
    @CurrentUser() user: User,
    @Body() createNovelDto: CreateNovelDto,
  ): Promise<Novel> {
    return await this.novelService.create(user.id, createNovelDto);
  }

  @Get()
  @ApiOperation({ summary: '获取当前用户的所有小说' })
  @ApiResponse({
    status: 200,
    description: '成功获取小说列表',
    type: [Novel],
  })
  @ApiResponse({
    status: 401,
    description: '未授权 - Token无效或缺失',
  })
  async findAll(@CurrentUser() user: User): Promise<Novel[]> {
    return await this.novelService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个小说详情' })
  @ApiParam({
    name: 'id',
    description: '小说ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取小说详情',
    type: Novel,
  })
  @ApiResponse({
    status: 404,
    description: '小说不存在',
  })
  @ApiResponse({
    status: 401,
    description: '未授权 - Token无效或缺失',
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Novel> {
    return await this.novelService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新小说信息' })
  @ApiParam({
    name: 'id',
    description: '小说ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '小说更新成功',
    type: Novel,
  })
  @ApiResponse({
    status: 404,
    description: '小说不存在',
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  @ApiResponse({
    status: 401,
    description: '未授权 - Token无效或缺失',
  })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateNovelDto: UpdateNovelDto,
  ): Promise<Novel> {
    return await this.novelService.update(id, user.id, updateNovelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除小说' })
  @ApiParam({
    name: 'id',
    description: '小说ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '小说删除成功',
    type: Novel,
  })
  @ApiResponse({
    status: 404,
    description: '小说不存在',
  })
  @ApiResponse({
    status: 401,
    description: '未授权 - Token无效或缺失',
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Novel> {
    return await this.novelService.remove(id, user.id);
  }
}


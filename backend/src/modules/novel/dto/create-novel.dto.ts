import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNovelDto {
  @ApiProperty({
    example: '修仙之路',
    description: '小说标题',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  @MinLength(1, { message: '标题至少需要1个字符' })
  @MaxLength(200, { message: '标题最多200个字符' })
  title: string;

  @ApiProperty({
    example: '玄幻',
    description: '题材类型（如：玄幻、都市、科幻、武侠等）',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: '题材不能为空' })
  @MaxLength(100, { message: '题材最多100个字符' })
  genre: string;

  @ApiProperty({
    example: '热血',
    description: '写作风格（如：热血、轻松、严肃、幽默等）',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: '风格不能为空' })
  @MaxLength(100, { message: '风格最多100个字符' })
  style: string;

  @ApiProperty({
    example: '一个少年从小村庄开始的修仙之旅，历经磨难最终成为一代仙尊',
    description: '背景设定和世界观',
  })
  @IsString()
  @IsNotEmpty({ message: '背景设定不能为空' })
  setting: string;

  @ApiPropertyOptional({
    example: '这是一个关于修仙的故事，主角从一个普通少年成长为强者的传奇经历',
    description: '小说简介（可选）',
  })
  @IsString()
  @IsOptional()
  description?: string;
}


import { PartialType } from '@nestjs/swagger';
import { CreateNovelDto } from './create-novel.dto';

/**
 * 更新小说DTO
 * 继承自CreateNovelDto，所有字段都是可选的
 */
export class UpdateNovelDto extends PartialType(CreateNovelDto) {}


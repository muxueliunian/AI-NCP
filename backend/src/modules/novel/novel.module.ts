import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novel } from './entities/novel.entity';
import { NovelService } from './novel.service';
import { NovelController } from './novel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Novel])],
  controllers: [NovelController],
  providers: [NovelService],
  exports: [NovelService],
})
export class NovelModule {}


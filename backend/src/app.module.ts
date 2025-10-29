import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 全局配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 数据库模块
    TypeOrmModule.forRoot(dataSourceOptions),

    // 认证模块
    UserModule,
    AuthModule,

    // 业务模块将在此处导入
    // NovelModule,
    // ChapterModule,
    // WorkflowModule,
    // AIProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

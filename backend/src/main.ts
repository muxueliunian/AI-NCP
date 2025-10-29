import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS 配置 - 支持多个前端端口
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:5173', // Vite 默认端口
    ],
    credentials: true,
  });

  // Swagger API 文档配置
  const config = new DocumentBuilder()
    .setTitle('AI Novel Creation Platform API')
    .setDescription('API documentation for AI-powered novel creation system')
    .setVersion('1.0')
    .addTag('novel', 'Novel management endpoints')
    .addTag('chapter', 'Chapter management endpoints')
    .addTag('workflow', 'Creation workflow endpoints')
    .addTag('ai-provider', 'AI provider configuration')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 AI Novel Creation Platform Backend                  ║
║                                                           ║
║   📝 Server is running on: http://localhost:${port}       ║
║   📚 API Documentation: http://localhost:${port}/api-docs ║
║   💾 Database: SQLite (${process.env.DB_DATABASE || 'data/novel.db'})
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();

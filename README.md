# AI小说创作平台

一个基于大模型的智能小说创作系统，支持多个AI厂商，实现从大纲生成到章节创作、审稿的完整工作流。

## ✨ 当前进度

**项目状态**: 🚧 开发中 (40% 完成)

- ✅ 前端登录界面 (100%)
- ✅ 后端用户认证模块 (100%)
- ✅ 前端UX优化 (100%)
- ✅ 开发文档体系 (100%)
- ⏳ 小说管理模块 (0%)
- ⏳ AI适配层 (0%)
- ⏳ 创作工作流 (0%)

## 技术栈

### 后端
- **框架**: NestJS 10.3 + TypeScript
- **数据库**: SQLite (开发环境) / PostgreSQL (生产环境)
- **ORM**: TypeORM
- **认证**: JWT + Passport
- **文档**: Swagger/OpenAPI
- **AI SDK**: OpenAI, Anthropic, Google Generative AI

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **路由**: React Router v6
- **样式**: CSS3 (响应式设计)

## 功能特性

### 已实现 ✅
- 🔐 **用户认证系统**
  - 用户注册 (邮箱 + 密码)
  - 用户登录 (JWT Token)
  - 密码加密 (bcryptjs)
  - 角色管理 (USER / ADMIN)
  - 受保护的API端点

- 🎨 **登录界面**
  - 响应式设计
  - 前端表单验证
  - 邮箱格式验证
  - 密码长度验证 (最少6字符)
  - 错误提示

### 计划实现 🔜
- 🤖 **多AI模型支持**: 灵活切换不同厂商的大模型
- 📖 **智能大纲生成**: 根据题材、风格自动生成小说大纲
- ✍️ **自动章节创作**: 基于大纲和上下文智能创作章节内容
- 🔍 **智能审稿系统**: 自动检查逻辑、文笔、人设一致性
- 💾 **版本管理**: 保存每次生成的版本，支持对比和回滚
- 🎨 **自定义配置**: 风格、字数、温度等参数可调整

## 项目结构

```
novel/
├── backend/                  # NestJS后端服务
│   ├── src/
│   │   ├── modules/
│   │   │   ├── user/         # ✅ 用户模块
│   │   │   ├── auth/         # ✅ 认证模块
│   │   │   ├── novel/        # ⏳ 小说管理 (实体已完成)
│   │   │   ├── chapter/      # ⏳ 章节管理 (实体已完成)
│   │   │   ├── ai-provider/  # ⏳ AI模型适配层
│   │   │   └── workflow/     # ⏳ 创作流程
│   │   ├── common/
│   │   │   └── decorators/   # ✅ 自定义装饰器
│   │   ├── config/           # ✅ 数据库配置
│   │   └── main.ts           # ✅ 应用入口
│   ├── data/                 # SQLite数据库文件
│   ├── package.json
│   └── .env.example          # 环境变量模板
├── frontend/                 # React前端
│   ├── src/
│   │   ├── pages/            # ✅ 页面组件
│   │   │   ├── LoginPage.tsx    # 登录页
│   │   │   └── HomePage.tsx     # 首页
│   │   ├── components/       # 组件目录
│   │   ├── services/         # API服务层
│   │   └── types/            # TypeScript类型定义
│   ├── package.json
│   └── vite.config.ts
├── README.md                 # 本文件
├── prompt.md                 # 项目进度记录
└── .gitignore
```

## 快速开始

### 环境要求

⚠️ **重要**: 请使用 Node.js 18.x LTS 版本

- **Node.js**: 18.20.4 (推荐) 或其他 18.x 版本
- **npm**: 9.x 或更高版本
- **操作系统**: Windows / macOS / Linux

如果您使用 `nvm` (Node Version Manager):
```bash
nvm use 18.20.4
```

### 安装步骤

#### 1. 克隆项目
```bash
git clone <repository-url>
cd novel
```

#### 2. 后端设置

**安装依赖**
```bash
cd backend
npm install
```

**配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，修改以下关键配置：
# - JWT_SECRET: 修改为您的密钥 (至少32字符)
# - 可选：添加AI厂商API密钥 (后续模块需要)
```

**创建数据库目录**
```bash
mkdir -p data
```

**启动后端服务**
```bash
npm run start:dev
```

后端服务将在 `http://localhost:3000` 启动

访问 API 文档: http://localhost:3000/api-docs

#### 3. 前端设置

**安装依赖**
```bash
cd ../frontend
npm install
```

**启动前端服务**
```bash
npm run dev
```

前端服务将在 `http://localhost:3002` 启动 (如果3001被占用会自动切换)

### 验证安装

1. **后端验证**:
   - 访问 http://localhost:3000/api-docs
   - 应该看到 Swagger API 文档
   - 查看 "auth" 标签下的3个端点: register, login, profile

2. **前端验证**:
   - 访问 http://localhost:3002
   - 应该看到登录界面
   - 测试输入验证功能

## 使用指南

### 1. 用户注册

**通过Swagger UI**:
1. 访问 http://localhost:3000/api-docs
2. 展开 `POST /auth/register`
3. 点击 "Try it out"
4. 输入以下JSON:
```json
{
  "email": "test@example.com",
  "password": "123456",
  "name": "测试用户"
}
```
5. 点击 "Execute"
6. 应该返回 JWT token 和用户信息

**通过前端界面** (即将支持):
- 当前前端只有登录验证，注册功能待集成

### 2. 用户登录

**方式1: 通过Swagger UI**
1. 访问 http://localhost:3000/api-docs
2. 展开 `POST /auth/login`
3. 输入注册时的邮箱和密码
4. 获取返回的 `accessToken`

**方式2: 通过前端界面**
1. 访问 http://localhost:3002
2. 输入邮箱和密码 (仅前端验证，暂未连接后端API)
3. 点击 "Login" 按钮

### 3. 访问受保护的端点

1. 在 Swagger 页面右上角点击 "Authorize" 按钮
2. 输入: `Bearer <your-token>`
3. 现在可以访问 `GET /auth/profile` 等受保护的API

## API文档

### 认证相关

#### POST /auth/register
注册新用户
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "User Name"  // 可选
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "jwt-token-here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user",
      "createdAt": "2025-10-29T..."
    }
  }
  ```

#### POST /auth/login
用户登录
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 与注册相同

#### GET /auth/profile (需要认证)
获取当前用户信息
- **Headers**: `Authorization: Bearer <token>`
- **Response**: 用户信息对象

完整API文档: http://localhost:3000/api-docs

## 📚 开发文档

为了提升开发效率，我们准备了完整的开发文档：

### 核心文档
- **[📋 文档索引 (DOCS_INDEX.md)](./DOCS_INDEX.md)** - 文档导航中心，快速找到你需要的内容
- **[📚 API 接口文档 (API_DOCUMENTATION.md)](./API_DOCUMENTATION.md)** - 完整的 API 参考、请求/响应示例、错误处理
- **[⚠️ 错误码说明 (ERROR_CODES.md)](./ERROR_CODES.md)** - HTTP 状态码、错误处理策略、安全最佳实践
- **[🚀 开发流程指南 (DEVELOPMENT_GUIDE.md)](./DEVELOPMENT_GUIDE.md)** - 开发规范、工作流程、代码示例
- **[🔐 认证指南 (AUTHENTICATION_GUIDE.md)](./AUTHENTICATION_GUIDE.md)** - 前后端连接、用户角色系统、测试流程
- **[🎨 UX 改进说明 (frontend/UX_IMPROVEMENTS.md)](./frontend/UX_IMPROVEMENTS.md)** - Toast 组件使用、表单优化

### 快速查找
| 你想要... | 查看文档 |
|----------|---------|
| 开发新的 API 接口 | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) → API 开发流程 |
| 调用后端 API | [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) → 接口参考 |
| 处理错误和异常 | [ERROR_CODES.md](./ERROR_CODES.md) → 错误处理策略 |
| 使用 Toast 提示 | [UX_IMPROVEMENTS.md](./frontend/UX_IMPROVEMENTS.md) → Toast 组件 |
| 测试登录注册功能 | [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) → 测试流程 |
| 了解项目规范 | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) → 代码规范 |

**提示**: 如果不确定看哪个文档，从 [DOCS_INDEX.md](./DOCS_INDEX.md) 开始！

## 数据库

### SQLite (当前使用)

**位置**: `backend/data/novel.db`

**查看数据**:
```bash
cd backend
sqlite3 data/novel.db
.tables           # 查看所有表
SELECT * FROM users;  # 查看用户数据
.exit             # 退出
```

### 表结构

**users** (用户表)
- `id`: UUID 主键
- `email`: 邮箱 (唯一)
- `password`: 密码哈希
- `name`: 用户名 (可选)
- `role`: 角色 (user / admin)
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

**novels** (小说表 - 已定义，待实现CRUD)
**chapters** (章节表 - 已定义，待实现CRUD)
**outlines** (大纲表 - 已定义，待实现CRUD)
**reviews** (审稿表 - 已定义，待实现CRUD)

## 开发计划

### 已完成 ✅
- [x] 项目初始化
- [x] 后端框架搭建 (NestJS)
- [x] 前端框架搭建 (React + Vite)
- [x] 数据库设计 (4个核心实体)
- [x] 用户认证模块
  - [x] User Entity (含role字段)
  - [x] Auth DTOs
  - [x] User Service (密码哈希)
  - [x] Auth Service (JWT)
  - [x] JWT Strategy & Guard
  - [x] Auth Controller (register/login/profile)
- [x] 前端登录界面
  - [x] 登录表单组件
  - [x] 表单验证
  - [x] 路由配置

### 进行中 🔄
- [ ] 更新项目文档

### 待实现 📋

**阶段2: 小说管理模块**
- [ ] Novel CRUD (创建、读取、更新、删除)
- [ ] 用户与小说关联
- [ ] 小说列表、详情页面

**阶段3: AI适配层**
- [ ] 统一AI接口设计
- [ ] OpenAI适配器
- [ ] Anthropic适配器
- [ ] Google Gemini适配器
- [ ] 国内厂商适配器 (百度/阿里/腾讯)

**阶段4: 创作工作流**
- [ ] 大纲生成功能
- [ ] 章节创作功能
- [ ] 智能审稿功能
- [ ] 流式输出支持

**阶段5: 前端完善**
- [ ] 前端Auth集成 (连接后端API)
- [ ] 小说管理界面
- [ ] 大纲编辑器
- [ ] 章节创作器
- [ ] 审稿结果展示

**阶段6: 优化与部署**
- [ ] 性能优化
- [ ] 单元测试
- [ ] E2E测试
- [ ] 部署文档

## 常见问题

### Q: 为什么要使用 Node.js 18.x？

A: Node.js 22.x 对某些native模块（如`better-sqlite3`）的支持有问题。Node.js 18.x 是当前的LTS版本，稳定性最好。

### Q: 如何切换Node.js版本？

A: 如果您使用 `nvm`:
```bash
nvm install 18.20.4
nvm use 18.20.4
cd backend && npm rebuild
```

### Q: 后端启动失败怎么办？

A: 常见解决方案:
1. 检查Node.js版本: `node --version` (应该是18.x)
2. 重新构建native模块: `cd backend && npm rebuild`
3. 清理并重装: `rm -rf node_modules && npm install`
4. 检查端口占用: 确保3000端口未被占用

### Q: 前端连接不上后端？

A:
1. 确认后端已启动 (http://localhost:3000/api-docs 可访问)
2. 检查CORS配置 (已在main.ts中启用)
3. 当前前端登录表单暂未连接后端API (计划中)

### Q: SQLite 够用吗？

A:
- **开发环境**: 完全够用，零配置
- **小规模生产**: 可以支持 (单用户/少量并发)
- **大规模生产**: 建议切换到 PostgreSQL

切换到 PostgreSQL 只需修改 `database.config.ts` 中的配置。

### Q: 如何添加第一个管理员？

A:
1. 先通过API注册一个普通用户
2. 手动在数据库中修改role:
```bash
sqlite3 backend/data/novel.db
UPDATE users SET role='admin' WHERE email='your-email@example.com';
.exit
```

## 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue。

---

**最后更新**: 2025-10-29
**当前版本**: 0.4.0-alpha
**下一里程碑**: Novel CRUD Module

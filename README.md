# AI小说创作平台

一个基于大模型的智能小说创作系统，支持多个AI厂商，实现从大纲生成到章节创作、审稿的完整工作流。

## ✨ 当前进度

**项目状态**: 🚧 开发中 (50% 完成 - v0.4.0-alpha)
**最后更新**: 2025-11-06

### 模块完成度
- ✅ 项目基础架构 (100%)
- ✅ 后端用户认证模块 (100%)
- ✅ 前端登录注册界面 (100%)
- ✅ 前端UX优化 (100%)
- ✅ 开发文档体系 (100%)
- ✅ 数据库实体设计 (100%)
- ✅ 小说管理模块 (100%) ⭐ **NEW**
- ⏳ 前端小说管理界面 (0% - 下一步)
- ⏳ AI适配层 (0%)
- ⏳ 创作工作流 (0%)

### 进度条
```
[██████████░░░░░░░░░░] 50%

已完成: 基础架构、认证系统、小说管理API
进行中: 无
下一步: 前端小说界面、AI适配层、大纲生成
```

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

- 📚 **小说管理 (Novel CRUD)** ⭐ **NEW**
  - 创建小说项目 (POST /novels)
  - 获取小说列表 (GET /novels)
  - 获取单个小说详情 (GET /novels/:id)
  - 更新小说信息 (PATCH /novels/:id)
  - 删除小说 (DELETE /novels/:id)
  - 权限控制 (用户只能操作自己的小说)
  - 数据验证 (标题、题材、风格、背景设定)
  - 小说状态管理 (草稿、创作中、已完成等)

- 🎨 **前端界面**
  - 登录/注册页面 (响应式设计)
  - 用户首页 / 管理员首页
  - 前端表单验证
  - Toast 通知组件
  - 统一错误处理

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
│   │   │   ├── novel/        # ✅ 小说管理 (CRUD完整)
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
│   │   ├── pages/            # ✅ 认证页面
│   │   │   ├── LoginPage.tsx      # 登录页
│   │   │   ├── RegisterPage.tsx   # 注册页
│   │   │   ├── UserHomePage.tsx   # 用户首页
│   │   │   └── AdminHomePage.tsx  # 管理员首页
│   │   ├── components/       # ✅ Toast组件
│   │   ├── services/         # ✅ API服务层
│   │   ├── hooks/            # ✅ 自定义Hooks
│   │   └── types/            # TypeScript类型定义
│   ├── package.json
│   └── vite.config.ts
├── README.md                 # 本文件
├── API_DOCUMENTATION.md      # API接口文档
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
   - 查看 "auth" 标签下的 3 个端点: register, login, profile
   - 查看 "novels" 标签下的 5 个端点: POST/GET/PATCH/DELETE

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
2. 输入 Token (不要加 "Bearer " 前缀，Swagger 会自动添加)
3. 现在可以访问 `GET /auth/profile`、`POST /novels` 等受保护的API

### 4. 创建第一个小说

1. 确保已经登录并授权 (参考步骤2和3)
2. 在 Swagger 中找到 `POST /novels` 端点
3. 点击 "Try it out"
4. 输入小说信息:
```json
{
  "title": "修仙之路",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅",
  "description": "这是一个关于修仙的故事"
}
```
5. 点击 "Execute"，应该返回 201 Created

## API文档

### 已实现的 API 端点 (8个)

#### 认证相关 (3个)
- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录
- `GET /auth/profile` - 获取当前用户信息 (需要认证)

#### 小说管理 (5个) ⭐ **NEW**
- `POST /novels` - 创建小说 (需要认证)
- `GET /novels` - 获取小说列表 (需要认证)
- `GET /novels/:id` - 获取单个小说详情 (需要认证)
- `PATCH /novels/:id` - 更新小说信息 (需要认证)
- `DELETE /novels/:id` - 删除小说 (需要认证)

**完整API文档**:
- Swagger UI: http://localhost:3000/api-docs
- 详细文档: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

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

**novels** (小说表 - ✅ CRUD已实现)
- `id`: UUID 主键
- `userId`: 用户ID (外键)
- `title`: 小说标题
- `genre`: 题材类型
- `style`: 写作风格
- `setting`: 背景设定
- `description`: 小说简介
- `status`: 状态 (draft/outline/writing/reviewing/completed)
- `totalChapters`: 总章节数
- `completedChapters`: 已完成章节数
- `totalWords`: 总字数
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

**outlines** (大纲表 - 已定义，待实现)
**chapters** (章节表 - 已定义，待实现)
**reviews** (审稿表 - 已定义，待实现)

## 开发计划

### 已完成 ✅
- [x] 项目初始化
- [x] 后端框架搭建 (NestJS)
- [x] 前端框架搭建 (React + Vite)
- [x] 数据库设计 (5个核心实体: User, Novel, Outline, Chapter, Review)
- [x] 用户认证模块
  - [x] User Entity (含role字段)
  - [x] Auth DTOs
  - [x] User Service (密码哈希)
  - [x] Auth Service (JWT)
  - [x] JWT Strategy & Guard
  - [x] Auth Controller (register/login/profile)
  - [x] 自定义装饰器 (@CurrentUser)
- [x] 前端认证界面
  - [x] 登录页面 (LoginPage)
  - [x] 注册页面 (RegisterPage)
  - [x] 用户首页 (UserHomePage)
  - [x] 管理员首页 (AdminHomePage)
  - [x] 前后端完整集成
- [x] 前端UX优化
  - [x] Toast通知组件
  - [x] useToast Hook
  - [x] 统一错误处理
- [x] 开发文档体系
  - [x] API_DOCUMENTATION.md (~5,000字)
  - [x] ERROR_CODES.md (~4,000字)
  - [x] DEVELOPMENT_GUIDE.md (~6,000字)
  - [x] DOCS_INDEX.md
  - [x] AUTHENTICATION_GUIDE.md
  - [x] UX_IMPROVEMENTS.md
- [x] **小说管理模块 (Novel CRUD)** ⭐ **NEW**
  - [x] Novel Entity (已存在)
  - [x] Novel DTOs (CreateNovelDto, UpdateNovelDto)
  - [x] Novel Service (create/findAll/findOne/update/remove)
  - [x] Novel Controller (5个API端点)
  - [x] Novel Module (注册到AppModule)
  - [x] 权限控制 (用户只能操作自己的小说)
  - [x] 数据验证 (class-validator)
  - [x] Swagger文档完善
  - [x] API测试通过

### 进行中 🔄
- 无

### 待实现 📋

**阶段2: 前端小说管理界面** (当前阶段 - 优先级 ⭐⭐⭐⭐)
- [ ] 前端类型定义 (Novel interface)
- [ ] novelService (API调用封装)
- [ ] NovelListPage (小说列表页)
- [ ] CreateNovelPage (创建小说页)
- [ ] NovelDetailPage (小说详情页)
- [ ] 路由配置和导航

**阶段3: AI适配层** (优先级 ⭐⭐⭐⭐⭐)
- [ ] 统一AI接口设计 (IAIProvider)
- [ ] OpenAI适配器 (优先)
- [ ] Anthropic适配器
- [ ] Google Gemini适配器
- [ ] 国内厂商适配器 (百度/阿里/腾讯/深度求索)
- [ ] AI Provider工厂模式

**阶段4: 创作工作流**
- [ ] 大纲生成功能 (OutlineService)
- [ ] 章节创作功能 (ChapterService)
- [ ] 智能审稿功能 (ReviewService)
- [ ] 流式输出支持 (SSE)
- [ ] Prompt模板管理

**阶段5: 前端完善**
- [ ] 大纲编辑器页面
- [ ] 章节创作器页面
- [ ] 审稿结果展示页面
- [ ] AI配置页面
- [ ] 流式文本显示组件

**阶段6: 优化与部署**
- [ ] 性能优化 (缓存、并发控制)
- [ ] 单元测试
- [ ] E2E测试
- [ ] 部署文档
- [ ] 错误处理和日志系统

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

## 📊 项目统计

- **代码行数**: ~16,000+ 行 (新增 ~800 行)
- **文档字数**: ~25,000+ 字 (新增 ~2,000 字)
- **API端点**: 8个已实现 ✅ (3个认证 + 5个小说管理)
- **前端页面**: 4个已完成 (认证相关)
- **数据库实体**: 5个已定义，1个已实现CRUD (Novel)
- **AI厂商支持**: 0/7 (计划支持)

---

**最后更新**: 2025-11-06
**当前版本**: v0.4.0-alpha
**完成度**: 50%
**下一里程碑**: 前端小说管理界面 (预计1-2天)
**下下里程碑**: AI适配层 + OpenAI集成 (预计2-3天)

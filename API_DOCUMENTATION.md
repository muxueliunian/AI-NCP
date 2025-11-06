# 📚 AI 小说创作平台 - API 接口文档

**版本**: v0.4.0-alpha
**基础URL**: `http://localhost:3000`
**最后更新**: 2025-11-06

---

## 📑 目录

- [接口概览](#接口概览)
- [认证相关](#认证相关-auth)
- [小说管理](#小说管理-novels)
- [错误码说明](#错误码说明)
- [通用响应格式](#通用响应格式)
- [认证机制](#认证机制)

---

## 接口概览

### 已实现的接口 (8个)

| 分类 | 方法 | 路径 | 认证 | 状态 |
|------|------|------|------|------|
| 认证 | POST | `/auth/register` | ❌ | ✅ |
| 认证 | POST | `/auth/login` | ❌ | ✅ |
| 认证 | GET | `/auth/profile` | ✅ | ✅ |
| 小说 | POST | `/novels` | ✅ | ✅ |
| 小说 | GET | `/novels` | ✅ | ✅ |
| 小说 | GET | `/novels/:id` | ✅ | ✅ |
| 小说 | PATCH | `/novels/:id` | ✅ | ✅ |
| 小说 | DELETE | `/novels/:id` | ✅ | ✅ |

### 待实现的接口

| 分类 | 方法 | 路径 | 认证 | 状态 |
|------|------|------|------|------|
| 大纲 | POST | `/novels/:id/outline/generate` | ✅ | ⏳ |
| 大纲 | GET | `/novels/:id/outline` | ✅ | ⏳ |
| 大纲 | PATCH | `/novels/:id/outline` | ✅ | ⏳ |
| 章节 | POST | `/novels/:id/chapters` | ✅ | ⏳ |
| 章节 | POST | `/chapters/:id/generate` | ✅ | ⏳ |
| 章节 | GET | `/novels/:id/chapters` | ✅ | ⏳ |
| 章节 | GET | `/chapters/:id` | ✅ | ⏳ |
| 章节 | PATCH | `/chapters/:id` | ✅ | ⏳ |
| 章节 | DELETE | `/chapters/:id` | ✅ | ⏳ |

---

## 认证相关 (Auth)

### 1. 用户注册

**接口**: `POST /auth/register`

**描述**: 注册新用户账号

**是否需要认证**: ❌ 否

**请求头**:
```http
Content-Type: application/json
```

**请求体**:
```json
{
  "email": "user@example.com",      // 必填，邮箱格式
  "password": "password123",        // 必填，最少 6 个字符
  "name": "张三"                    // 可选，用户昵称
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | ✅ | 邮箱地址，必须符合邮箱格式 |
| password | string | ✅ | 密码，长度不少于 6 个字符 |
| name | string | ❌ | 用户名/昵称，可选 |

**成功响应** (201 Created):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "张三",
    "role": "user",
    "createdAt": "2025-10-29T12:00:00.000Z",
    "updatedAt": "2025-10-29T12:00:00.000Z"
  }
}
```

**错误响应**:

❌ **400 Bad Request** - 参数验证失败
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

❌ **409 Conflict** - 邮箱已存在
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

**curl 示例**:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "name": "Test User"
  }'
```

---

### 2. 用户登录

**接口**: `POST /auth/login`

**描述**: 用户登录获取 JWT Token

**是否需要认证**: ❌ 否

**请求头**:
```http
Content-Type: application/json
```

**请求体**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | ✅ | 注册时使用的邮箱 |
| password | string | ✅ | 密码 |

**成功响应** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "张三",
    "role": "user",
    "createdAt": "2025-10-29T12:00:00.000Z",
    "updatedAt": "2025-10-29T12:00:00.000Z"
  }
}
```

**错误响应**:

❌ **400 Bad Request** - 参数验证失败
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

❌ **401 Unauthorized** - 邮箱或密码错误
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

**前端处理建议**:
- 400 和 401 错误都统一显示："邮箱或密码错误"
- 不要向用户暴露具体是哪个字段错误（安全考虑）

---

### 3. 获取当前用户信息

**接口**: `GET /auth/profile`

**描述**: 获取当前登录用户的详细信息

**是否需要认证**: ✅ 是

**请求头**:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**请求参数**: 无

**成功响应** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "张三",
  "role": "user",
  "createdAt": "2025-10-29T12:00:00.000Z",
  "updatedAt": "2025-10-29T12:00:00.000Z"
}
```

**错误响应**:

❌ **401 Unauthorized** - Token 无效或过期
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**前端处理建议**:
- 收到 401 错误时，清除本地 Token
- 自动跳转到登录页面

---

## 小说管理 (Novels)

### 1. 创建小说

**接口**: `POST /novels`

**描述**: 创建新的小说项目

**是否需要认证**: ✅ 是

**请求头**:
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**请求体**:
```json
{
  "title": "修仙之路",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅，历经磨难最终成为一代仙尊",
  "description": "这是一个关于修仙的故事，主角从一个普通少年成长为强者的传奇经历"
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | ✅ | 小说标题，1-200字符 |
| genre | string | ✅ | 题材类型（如：玄幻、都市、科幻、武侠等），最多100字符 |
| style | string | ✅ | 写作风格（如：热血、轻松、严肃、幽默等），最多100字符 |
| setting | string | ✅ | 背景设定和世界观 |
| description | string | ❌ | 小说简介（可选） |

**成功响应** (201 Created):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "修仙之路",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅，历经磨难最终成为一代仙尊",
  "description": "这是一个关于修仙的故事，主角从一个普通少年成长为强者的传奇经历",
  "status": "draft",
  "totalChapters": 0,
  "completedChapters": 0,
  "totalWords": 0,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T12:00:00.000Z"
}
```

**错误响应**:

❌ **400 Bad Request** - 参数验证失败
```json
{
  "statusCode": 400,
  "message": [
    "标题不能为空",
    "标题最多200个字符"
  ],
  "error": "Bad Request"
}
```

❌ **401 Unauthorized** - Token 无效或缺失
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X POST http://localhost:3000/novels \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "修仙之路",
    "genre": "玄幻",
    "style": "热血",
    "setting": "一个少年从小村庄开始的修仙之旅",
    "description": "这是一个关于修仙的故事"
  }'
```

---

### 2. 获取小说列表

**接口**: `GET /novels`

**描述**: 获取当前用户的所有小说项目

**是否需要认证**: ✅ 是

**请求头**:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**请求参数**: 无

**成功响应** (200 OK):
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "修仙之路",
    "genre": "玄幻",
    "style": "热血",
    "setting": "一个少年从小村庄开始的修仙之旅",
    "description": "这是一个关于修仙的故事",
    "status": "draft",
    "totalChapters": 0,
    "completedChapters": 0,
    "totalWords": 0,
    "createdAt": "2025-11-06T12:00:00.000Z",
    "updatedAt": "2025-11-06T12:00:00.000Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "都市修真",
    "genre": "都市",
    "style": "轻松",
    "setting": "现代都市中的修真者",
    "description": "都市修真故事",
    "status": "writing",
    "totalChapters": 10,
    "completedChapters": 5,
    "totalWords": 50000,
    "createdAt": "2025-11-05T12:00:00.000Z",
    "updatedAt": "2025-11-06T10:00:00.000Z"
  }
]
```

**错误响应**:

❌ **401 Unauthorized** - Token 无效或缺失
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X GET http://localhost:3000/novels \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**前端处理建议**:
- 按创建时间倒序显示（最新的在前）
- 显示小说状态标签（草稿、创作中、已完成等）
- 显示进度信息（已完成章节/总章节）

---

### 3. 获取单个小说详情

**接口**: `GET /novels/:id`

**描述**: 获取指定小说的详细信息

**是否需要认证**: ✅ 是

**请求头**:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string (UUID) | ✅ | 小说ID |

**成功响应** (200 OK):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "修仙之路",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅",
  "description": "这是一个关于修仙的故事",
  "status": "draft",
  "totalChapters": 0,
  "completedChapters": 0,
  "totalWords": 0,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T12:00:00.000Z"
}
```

**错误响应**:

❌ **404 Not Found** - 小说不存在或不属于当前用户
```json
{
  "statusCode": 404,
  "message": "小说不存在",
  "error": "Not Found"
}
```

❌ **401 Unauthorized** - Token 无效或缺失
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X GET http://localhost:3000/novels/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. 更新小说信息

**接口**: `PATCH /novels/:id`

**描述**: 更新指定小说的信息

**是否需要认证**: ✅ 是

**请求头**:
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string (UUID) | ✅ | 小说ID |

**请求体** (所有字段都是可选的):
```json
{
  "title": "修仙之路（修订版）",
  "description": "更新后的描述"
}
```

**参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | ❌ | 小说标题，1-200字符 |
| genre | string | ❌ | 题材类型，最多100字符 |
| style | string | ❌ | 写作风格，最多100字符 |
| setting | string | ❌ | 背景设定 |
| description | string | ❌ | 小说简介 |

**成功响应** (200 OK):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "修仙之路（修订版）",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅",
  "description": "更新后的描述",
  "status": "draft",
  "totalChapters": 0,
  "completedChapters": 0,
  "totalWords": 0,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T13:00:00.000Z"
}
```

**错误响应**:

❌ **404 Not Found** - 小说不存在或不属于当前用户
```json
{
  "statusCode": 404,
  "message": "小说不存在",
  "error": "Not Found"
}
```

❌ **400 Bad Request** - 参数验证失败
```json
{
  "statusCode": 400,
  "message": [
    "标题最多200个字符"
  ],
  "error": "Bad Request"
}
```

❌ **401 Unauthorized** - Token 无效或缺失
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X PATCH http://localhost:3000/novels/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "修仙之路（修订版）",
    "description": "更新后的描述"
  }'
```

---

### 5. 删除小说

**接口**: `DELETE /novels/:id`

**描述**: 删除指定的小说项目（包括相关的大纲和章节）

**是否需要认证**: ✅ 是

**请求头**:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string (UUID) | ✅ | 小说ID |

**成功响应** (200 OK):
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "修仙之路",
  "genre": "玄幻",
  "style": "热血",
  "setting": "一个少年从小村庄开始的修仙之旅",
  "description": "这是一个关于修仙的故事",
  "status": "draft",
  "totalChapters": 0,
  "completedChapters": 0,
  "totalWords": 0,
  "createdAt": "2025-11-06T12:00:00.000Z",
  "updatedAt": "2025-11-06T12:00:00.000Z"
}
```

**错误响应**:

❌ **404 Not Found** - 小说不存在或不属于当前用户
```json
{
  "statusCode": 404,
  "message": "小说不存在",
  "error": "Not Found"
}
```

❌ **401 Unauthorized** - Token 无效或缺失
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**curl 示例**:
```bash
curl -X DELETE http://localhost:3000/novels/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**前端处理建议**:
- 删除前需要二次确认
- 提示用户：删除小说将同时删除相关的大纲和章节
- 删除成功后刷新小说列表

---

## 错误码说明

### HTTP 状态码

| 状态码 | 说明 | 何时触发 |
|--------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功（如注册用户） |
| 400 | Bad Request | 请求参数错误（邮箱格式、密码长度等） |
| 401 | Unauthorized | 认证失败（密码错误、Token 无效） |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突（如邮箱已存在） |
| 500 | Internal Server Error | 服务器内部错误 |

### 常见错误消息

#### 认证相关

| 错误消息 | HTTP 状态码 | 原因 | 前端处理 |
|---------|-----------|------|----------|
| `email must be an email` | 400 | 邮箱格式不正确 | 提示："邮箱或密码错误" |
| `password must be longer than or equal to 6 characters` | 400 | 密码少于 6 位 | 提示："邮箱或密码错误" |
| `Invalid credentials` | 401 | 邮箱或密码错误 | 提示："邮箱或密码错误" |
| `Unauthorized` | 401 | Token 无效或过期 | 清除 Token，跳转登录页 |
| `Email already exists` | 409 | 邮箱已被注册 | 提示："该邮箱已被注册" |

#### 小说管理相关

| 错误消息 | HTTP 状态码 | 原因 | 前端处理 |
|---------|-----------|------|----------|
| `标题不能为空` | 400 | 标题字段为空 | 提示："请填写小说标题" |
| `标题最多200个字符` | 400 | 标题超过长度限制 | 提示："标题最多200个字符" |
| `题材不能为空` | 400 | 题材字段为空 | 提示："请选择小说题材" |
| `风格不能为空` | 400 | 风格字段为空 | 提示："请选择写作风格" |
| `背景设定不能为空` | 400 | 背景设定字段为空 | 提示："请填写背景设定" |
| `小说不存在` | 404 | 小说ID不存在或不属于当前用户 | 提示："小说不存在" |
| `Unauthorized` | 401 | Token 无效或缺失 | 清除 Token，跳转登录页 |

#### 前端统一错误处理策略

**登录/注册时**:
```typescript
if (error.response?.status === 400 || error.response?.status === 401) {
  // 统一提示，不泄露具体信息
  toast.error('邮箱或密码错误')
} else if (error.response?.status === 409) {
  // 邮箱已存在
  toast.error('该邮箱已被注册')
} else {
  // 其他错误
  toast.error('操作失败，请稍后重试')
}
```

**访问受保护资源时**:
```typescript
if (error.response?.status === 401) {
  // Token 失效
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  navigate('/')
  toast.error('登录已过期，请重新登录')
}
```

**小说管理操作时**:
```typescript
try {
  const response = await novelService.createNovel(novelData)
  toast.success('小说创建成功')
  navigate(`/novels/${response.id}`)
} catch (error) {
  if (error.response?.status === 400) {
    // 参数验证失败
    const messages = error.response.data.message
    if (Array.isArray(messages)) {
      toast.error(messages[0]) // 显示第一个错误
    } else {
      toast.error(messages)
    }
  } else if (error.response?.status === 404) {
    toast.error('小说不存在')
  } else if (error.response?.status === 401) {
    // Token 失效
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate('/')
    toast.error('登录已过期，请重新登录')
  } else {
    toast.error('操作失败，请稍后重试')
  }
}
```

---

## 通用响应格式

### 成功响应

**格式**:
```typescript
{
  // 数据字段（因接口而异）
  "accessToken"?: string,
  "user"?: User,
  "data"?: any
}
```

### 错误响应

**格式**:
```typescript
{
  "statusCode": number,      // HTTP 状态码
  "message": string | string[],  // 错误消息（可能是数组）
  "error": string            // 错误类型
}
```

**示例 1 - 单个错误消息**:
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**示例 2 - 多个错误消息（验证失败）**:
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

---

## 认证机制

### JWT Token

**Token 获取**:
- 通过 `/auth/register` 或 `/auth/login` 接口获取
- Token 包含在响应的 `accessToken` 字段中

**Token 使用**:
- 在请求头中添加：`Authorization: Bearer <token>`
- 示例：`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Token 过期**:
- 默认有效期：待确认（建议 7 天）
- 过期后需要重新登录

**Token 存储**（前端）:
```typescript
// 登录成功后
localStorage.setItem('accessToken', response.accessToken)
localStorage.setItem('user', JSON.stringify(response.user))

// 发送请求时
const token = localStorage.getItem('accessToken')
headers: {
  'Authorization': `Bearer ${token}`
}

// 退出登录
localStorage.removeItem('accessToken')
localStorage.removeItem('user')
```

---

## 用户角色

| 角色 | 值 | 权限 |
|------|-----|------|
| 普通用户 | `user` | 管理自己的小说项目 |
| 管理员 | `admin` | 管理所有用户和小说 |

**默认角色**:
- 注册时默认为 `user`
- 管理员需要手动在数据库中设置

**角色判断**（前端）:
```typescript
const user = JSON.parse(localStorage.getItem('user') || '{}')

if (user.role === 'admin') {
  // 跳转到管理员首页
  navigate('/admin/home')
} else {
  // 跳转到用户首页
  navigate('/user/home')
}
```

---

## API 测试工具

### 在线测试

访问 Swagger 文档：
```
http://localhost:3000/api-docs
```

Swagger 提供：
- ✅ 交互式 API 测试
- ✅ 自动生成的请求示例
- ✅ 支持 Bearer Token 认证

### 使用 Swagger 测试步骤

1. **打开 Swagger 文档**
   ```
   http://localhost:3000/api-docs
   ```

2. **测试注册**
   - 展开 `POST /auth/register`
   - 点击 "Try it out"
   - 填写请求体
   - 点击 "Execute"
   - 复制返回的 `accessToken`

3. **设置认证**
   - 点击右上角 "Authorize" 按钮
   - 输入：`Bearer <your_token>`
   - 点击 "Authorize"

4. **测试受保护接口**
   - 展开 `GET /auth/profile`
   - 点击 "Try it out"
   - 点击 "Execute"
   - 应该返回用户信息

---

## 开发流程建议

### 1. 开发新接口

**步骤**:
1. 创建 DTO（数据传输对象）
2. 创建 Service（业务逻辑）
3. 创建 Controller（路由控制器）
4. 添加 Swagger 注解
5. 在 Swagger 中测试
6. 更新本文档

### 2. 前端调用流程

```typescript
// 1. 导入服务
import authService from '../services/authService'
import { useToast } from '../hooks/useToast'

// 2. 使用服务
const toast = useToast()

try {
  const response = await authService.login({ email, password })
  toast.success('登录成功')
  // 处理成功逻辑
} catch (error) {
  // 统一错误处理
  if (error.response?.status === 400 || error.response?.status === 401) {
    toast.error('邮箱或密码错误')
  } else {
    toast.error('操作失败，请稍后重试')
  }
}
```

### 3. 错误处理最佳实践

**安全原则**:
- ❌ 不要向用户暴露具体的验证失败字段
- ✅ 统一提示："邮箱或密码错误"
- ✅ 防止通过错误消息枚举账号

**用户体验原则**:
- ✅ 使用 Toast 提示代替表单内错误文本
- ✅ 错误消息简洁明了
- ✅ 关键操作（删除）需要二次确认

---

## 更新日志

### v0.4.0-alpha (2025-11-06)
- ✅ 实现小说管理接口（CRUD）
  - POST /novels - 创建小说
  - GET /novels - 获取小说列表
  - GET /novels/:id - 获取单个小说
  - PATCH /novels/:id - 更新小说
  - DELETE /novels/:id - 删除小说
- ✅ 添加小说实体和数据库表
- ✅ 实现权限控制（用户只能操作自己的小说）
- ✅ 添加数据验证（DTO）
- ✅ 完善 Swagger 文档

### v0.3.0-alpha (2025-10-29)
- ✅ 实现用户注册接口
- ✅ 实现用户登录接口
- ✅ 实现获取用户信息接口
- ✅ 添加 JWT 认证
- ✅ 添加密码加密（bcryptjs）
- ✅ 配置 CORS（支持多端口）

### 下一版本计划 (v0.5.0)
- ⏳ 实现 AI 适配层（OpenAI、Anthropic、Google）
- ⏳ 实现大纲生成接口
- ⏳ 实现章节创作接口
- ⏳ 实现流式输出（SSE）
- ⏳ 添加分页功能

---

## 常见问题

### Q: Token 过期了怎么办？
A: 收到 401 错误时，清除本地 Token 并跳转到登录页。

### Q: 如何测试需要认证的接口？
A: 使用 Swagger 文档，点击 "Authorize" 按钮，只输入 Token 本身（不要加 "Bearer " 前缀）。

### Q: 密码是如何加密的？
A: 使用 bcryptjs 进行哈希加密，存储在数据库中的是加密后的密码。

### Q: 如何创建管理员账号？
A: 先注册普通账号，然后在数据库中手动修改 `role` 字段为 `admin`。

### Q: 删除小说会删除相关的章节吗？
A: 是的，删除小说会级联删除相关的大纲和章节数据。

### Q: 为什么访问别人的小说返回 404 而不是 403？
A: 为了安全考虑，避免泄露小说是否存在的信息。用户只能看到自己的小说。

### Q: 小说状态有哪些？
A:
- `draft` - 草稿（刚创建）
- `outline` - 已生成大纲
- `writing` - 创作中
- `reviewing` - 审稿中
- `completed` - 已完成

### Q: 如何更新小说的统计信息（章节数、字数）？
A: 统计信息由系统自动维护，当创建或更新章节时会自动更新。

---

## 联系方式

- **项目地址**: 本地开发
- **Swagger 文档**: http://localhost:3000/api-docs
- **后端服务**: http://localhost:3000
- **前端服务**: http://localhost:3002

---

**文档维护**: 请在添加新接口时及时更新本文档
**最后更新**: 2025-11-06
**文档版本**: 1.1
**当前API版本**: v0.4.0-alpha
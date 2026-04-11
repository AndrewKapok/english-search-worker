# 英语学习搜索应用

一个基于 Cloudflare Workers 的英语学习搜索应用，支持搜索单词、句子和词组。

## 功能特性

- 🔍 **实时搜索**：支持搜索单词、句子、词组
- 🎯 **智能建议**：输入时自动显示搜索建议
- 🎨 **简洁界面**：白色淡白色主题
- 📝 **Markdown 支持**：搜索结果支持粗体、列表等 Markdown 格式
- 🗄️ **D1 数据库**：使用 Cloudflare D1 数据库存储数据
- 🚀 **快速部署**：基于 Cloudflare Workers，全球边缘部署

## 项目结构

```
english-web/
├── src/
│   ├── index.js          # 主入口文件，处理请求和静态页面
│   └── search.js         # 搜索逻辑和数据库操作
├── db/
│   ├── init.sql          # 数据库初始化 SQL 文件
│   └── schema.sql        # 数据库表结构定义
├── wrangler.toml         # Wrangler 配置文件
├── package.json          # 项目依赖
└── README.md             # 项目说明文档
```

## 技术栈

- **后端**：Cloudflare Workers
- **数据库**：Cloudflare D1
- **前端**：原生 HTML + CSS + JavaScript
- **Markdown 渲染**：marked

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

在 `wrangler.toml` 中配置 D1 数据库：

```toml
[[d1_databases]]
binding = "ENGLISH_DB"
database_id = "${DATABASE_ID}"
```

### 3. 初始化数据库

```bash
wrangler d1 execute ENGLISH_DB --file=./db/init.sql
```

### 4. 本地开发

```bash
npm run dev
```

应用将在 http://127.0.0.1:8787 运行

### 5. 部署

```bash
DATABASE_ID=your_database_id npm run deploy
```

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DATABASE_ID` | D1 数据库 ID | 是 |

## API 接口

### 搜索接口

```
GET /api/search?q={query}&type={type}
```

参数：
- `q`: 搜索关键词
- `type`: 搜索类型（all/word/sentence/phrase）

### 建议接口

```
GET /api/suggest?q={query}
```

参数：
- `q`: 搜索关键词

## 数据格式

### 单词数据

```json
{
  "key": "单词",
  "content": "单词释义"
}
```

### 句子数据

```json
{
  "key": "例句",
  "content": "例句翻译"
}
```

### 词组数据

```json
{
  "key": "词组",
  "content": "词组释义"
}
```

## 数据库表结构

### words 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| key | TEXT | 单词 |
| content | TEXT | 释义 |
| created_at | TIMESTAMP | 创建时间 |

### sentences 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| key | TEXT | 句子 |
| content | TEXT | 翻译 |
| created_at | TIMESTAMP | 创建时间 |

### phrases 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| key | TEXT | 词组 |
| content | TEXT | 释义 |
| created_at | TIMESTAMP | 创建时间 |

## 开发说明

### 添加新数据

1. 准备 JSON 数据文件（单词.json、句子.json、词组.json）
2. 运行构建脚本生成 SQL 文件
3. 执行 SQL 文件导入数据

### 自定义样式

前端样式内联在 `src/index.js` 中，修改 CSS 部分即可自定义界面风格。

## 许可证

MIT

# Guardians of Health｜健康守护者

<p align="center">
  <a href="./README.md">English</a> · <strong>简体中文</strong>
</p>

<p align="center">
  <strong>一个融合健康科普、疾病知识、AI 辅助问答与健康数据可视化的现代健康教育平台。</strong>
</p>

<p align="center">
  <a href="https://react.dev/learn" title="阅读 React 官方指南"><img alt="React 19 官方文档" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=06142f" /></a>
  <a href="https://www.typescriptlang.org/docs/" title="阅读 TypeScript 官方文档"><img alt="TypeScript 5 官方文档" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" /></a>
  <a href="https://vite.dev/guide/" title="阅读 Vite 官方入门指南"><img alt="Vite 7 入门指南" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" /></a>
  <a href="#健康教育" title="了解健康教育页面与内容"><img alt="健康教育使用指南" src="https://img.shields.io/badge/Healthcare-Education-22c8e5" /></a>
  <a href="#ai-助手" title="配置并使用 AI 健康助手"><img alt="AI 助手使用指南" src="https://img.shields.io/badge/AI-Assistant-7dd3fc" /></a>
  <a href="#大语言模型配置" title="配置兼容 OpenAI 接口的模型服务"><img alt="大语言模型配置指南" src="https://img.shields.io/badge/LLM-OpenAI--compatible-0f766e" /></a>
</p>

<p align="center">
  <img src="./goh-frontend/assets/goh-preview.gif" alt="健康守护者项目预览" width="100%" />
</p>

> 项目预览由演示视频生成，保存在 `goh-frontend/assets/goh-preview.gif`。

## 仓库目录说明

实际前端工程位于 `goh-frontend/` 子目录。安装依赖、运行开发服务、构建项目或编辑前端文件前，请先进入该目录：

```bash
cd goh-frontend
```

## 项目概览

Guardians of Health（健康守护者）是一个基于 React 的健康教育前端项目。用户可以学习一般健康知识、浏览疾病资料、向 AI 助手提问、查看健康数据可视化、收藏内容，并管理本地演示账户。

首页采用健康服务平台风格，以深蓝色视觉、半透明仪表盘示例、动态功能卡片、清晰的入口、主题分类和学术项目页脚组织内容。

项目适合用于：

- 课程项目展示
- 个人作品集
- 前端工程能力演示
- 健康信息设计原型
- AI 界面与服务集成演示

## 主要功能

- **健康教育首页**：提供产品概览、仪表盘示例、动态卡片、悬停反馈和主要功能入口。
- **AI 健康助手**：通过对话提供一般健康教育与日常保健知识。
- **兼容 OpenAI 的模型接口**：通过环境变量连接 OpenAI、DeepSeek、通义千问 / DashScope、Moonshot、Ollama 或其他兼容服务。
- **健康科普中心**：提供教育性文章、本地备用内容和配套图片。
- **疾病百科**：支持搜索与浏览疾病知识，侧重学习、认识与预防。
- **统一文章详情页**：健康主题与疾病条目共用详情展示。
- **健康数据可视化**：通过图表展示健康相关信息。
- **本地演示账户**：使用 `localStorage` 完成注册、登录、资料管理、退出登录及收藏。
- **内容收藏**：按演示用户在本地保存感兴趣的文章。
- **反馈页面**：提供项目反馈入口。
- **学术页脚与法律说明**：展示大学及项目品牌、团队信息、隐私政策和医疗免责声明。
- **Firebase 集成结构**：保留 Firebase 配置、Firestore 调用位置、托管配置和数据库规则；真实配置通过本地环境变量提供。

## 探索项目

### 健康教育

按照[快速开始](#快速开始)启动项目后，访问 `/science` 阅读健康文章、访问 `/diseases` 搜索疾病知识，或访问 `/data-viz` 浏览健康数据。更多页面见[页面路由](#页面路由)。

如需改进科普材料，可以从[本地内容文件](goh-frontend/src/data/localContent.ts)开始，并保留[图片来源说明](goh-frontend/public/content-images/README.md)。内容仅供一般健康教育，使用前请阅读[医疗免责声明](#医疗免责声明)。

### AI 助手

完成[大语言模型配置](#大语言模型配置)并[启动本地项目](#快速开始)后，访问 `/ai-assistant`，即可尝试一般健康知识问答。发送问题需要配置模型服务地址、模型名称，以及服务商要求的凭据。公开部署前请阅读[前端密钥注意事项](#前端密钥注意事项)。

开发相关功能时，可查看 [AI 助手页面](goh-frontend/src/pages/AIAssistantPage.tsx)和[模型客户端](goh-frontend/src/services/llmClient.ts)。回答仅用于辅助学习，不能替代针对个人情况的专业医疗建议。

## 技术栈

| 领域 | 技术 |
| --- | --- |
| 前端框架 | React 19 |
| 开发语言 | TypeScript |
| 构建工具 | Vite 7 |
| 页面路由 | React Router DOM 7 |
| 页面样式 | CSS |
| AI 接口 | 兼容 OpenAI 的 Chat Completions API |
| Markdown 渲染 | React Markdown、Remark GFM |
| 项目服务 | Firebase 配置与 Firestore 集成 |
| 演示认证 | localStorage |

## 快速开始

### 环境要求

- Vite 要求 Node.js 20.19+ 或 22.12+；建议使用 Node.js 22.12+ 或 24。
- 使用 npm 安装依赖，并保留项目中的 `package-lock.json`。

### 1. 克隆仓库

```bash
git clone https://github.com/chenjinxian1/GOH-frontend.git
cd GOH-frontend/goh-frontend
```

### 2. 安装依赖

```bash
npm ci
```

### 3. 配置环境变量

在 `goh-frontend/` 中创建本地 `.env` 或 `.env.local` 文件。模型服务配置示例如下：

```env
VITE_LLM_PROVIDER=openai-compatible
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_MODEL=gpt-4o-mini
VITE_LLM_TEMPERATURE=0.7
VITE_LLM_MAX_TOKENS=800
```

仓库提供了两个配置示例文件：

- [goh-frontend/.env.example](goh-frontend/.env.example)
- [goh-frontend/.env.local.example](goh-frontend/.env.local.example)

### 4. 启动开发服务

```bash
npm run dev
```

Vite 会显示本地访问地址，通常为 `http://localhost:5173/`。

### 5. 构建项目

```bash
npm run build
```

### 6. 预览构建结果

```bash
npm run preview
```

## 环境变量

### 大语言模型配置

AI 助手使用通用的 OpenAI 兼容客户端，代码位于 `goh-frontend/src/services/llmClient.ts`。上方配置示例包含服务地址、密钥、模型名称、温度和最大输出 token 数。

客户端向以下地址发送请求：

```text
POST {VITE_LLM_API_BASE_URL}/chat/completions
```

并从以下字段读取回答：

```text
choices[0].message.content
```

### 模型服务配置示例

OpenAI：

```env
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_MODEL=gpt-4o-mini
```

DeepSeek：

```env
VITE_LLM_API_BASE_URL=https://api.deepseek.com/v1
VITE_LLM_MODEL=deepseek-chat
```

通义千问 / DashScope：

```env
VITE_LLM_API_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
VITE_LLM_MODEL=qwen-plus
```

Moonshot：

```env
VITE_LLM_API_BASE_URL=https://api.moonshot.cn/v1
VITE_LLM_MODEL=moonshot-v1-8k
```

本地 Ollama：

```env
VITE_LLM_API_BASE_URL=http://localhost:11434/v1
VITE_LLM_API_KEY=ollama
VITE_LLM_MODEL=llama3.1
```

### Firebase 配置

Firebase 相关文件保留在工程中。真实项目配置应保存在本地环境文件中，不要提交到仓库。如需连接自己的 Firebase 项目，可配置：

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 前端密钥注意事项

这是一个基于 Vite 的纯前端项目。以 `VITE_` 开头的环境变量会被写入浏览器构建文件，访问者可以查看这些值。

因此，`VITE_LLM_API_KEY` 仅适合本地演示、课堂展示或受控测试。不要在公开部署的前端中放置生产环境模型服务密钥。生产环境应使用后端代理，由服务端保存密钥：

```text
前端 -> 后端 /api/chat -> 模型服务商
```

## 演示账户与认证

项目使用基于 `localStorage` 的本地演示认证，方便在不依赖 Firebase Auth 的情况下展示注册、登录与账户管理。

本地存储使用以下键：

```text
goh_users
goh_current_user
goh_favorites
```

支持的演示功能包括：

- 注册本地用户
- 使用邮箱与密码登录
- 刷新后保留登录状态
- 查看与更新个人资料
- 退出登录
- 在本地保存收藏内容

此认证方式不安全，不适用于生产环境，仅用于本地演示和项目展示。

## 页面路由

| 路由 | 页面说明 |
| --- | --- |
| `/` | 健康教育平台首页 |
| `/ai-assistant` | AI 健康助手 |
| `/science` | 健康科普内容 |
| `/articles` | 健康科普内容的别名路由 |
| `/article/:id` | 文章详情 |
| `/health/:id` | 健康文章详情别名 |
| `/science/:id` | 科普文章详情别名 |
| `/diseases` | 疾病百科与搜索 |
| `/disease/:id` | 疾病详情 |
| `/data-viz` | 健康数据可视化 |
| `/favorites` | 收藏内容 |
| `/feedback` | 项目反馈 |
| `/login` | 登录 |
| `/register` | 注册 |
| `/profile` | 个人资料 |
| `/create` | 创建文章 |
| `/privacy-policy` | 隐私政策 |
| `/legal-notice` | 法律声明与免责声明 |

## 项目结构

```text
GOH-frontend/
├── README.md                 # 默认英文说明
├── README.zh-CN.md           # 简体中文说明
└── goh-frontend/             # 实际前端工程
    ├── public/
    │   └── content-images/   # 本地演示内容图片
    ├── src/
    │   ├── assets/           # 静态资源
    │   ├── components/      # 共用组件
    │   │   └── layout/      # 导航栏与页脚
    │   ├── context/         # 认证上下文与本地账户状态
    │   ├── data/            # 本地备用内容
    │   ├── firebase/        # Firebase 初始化
    │   ├── pages/           # 页面组件
    │   └── services/        # AI 服务与模型客户端
    ├── .env.example         # 模型配置示例
    ├── .env.local.example   # Firebase 与模型配置示例
    ├── firebase.json        # Firebase 托管配置
    ├── firestore.rules      # Firestore 数据库规则
    ├── package.json
    └── README.md            # 前端工程英文说明
```

## 可用命令

请在 `goh-frontend/` 目录运行：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务 |
| `npm run build` | 执行 TypeScript 检查并生成生产构建 |
| `npm run preview` | 在本地预览构建结果 |
| `npm run lint` | 运行 ESLint 代码检查 |

## 医疗免责声明

健康守护者用于健康教育和一般信息支持，不提供医疗诊断、治疗、处方或紧急医疗服务，也不能替代专业医疗建议。

AI 助手可能生成错误或不完整的信息。涉及个人健康问题时，请咨询合格的医疗专业人员。如果认为自己正面临医疗紧急情况，请立即联系当地急救服务。

## 学术项目信息

这是一个学术健康教育与前端工程项目，主要展示：

- 健康信息架构
- 现代 React 应用开发
- 健康服务平台首页设计
- 可切换模型服务商的 AI 助手集成
- 不依赖 Firebase Auth 的本地演示账户
- 负责任的健康信息表达与免责声明设计

应用页脚包含大学 / USM 品牌、项目品牌、团队成员信息、反馈入口、隐私政策和法律声明链接。

## 社区与支持

- [贡献指南](CONTRIBUTING.md)：本地配置、检查方式与提交改进的流程；欢迎使用中文或英文提出问题。
- [行为准则](CODE_OF_CONDUCT.md)：社区参与规范与私下报告渠道。
- [安全政策](SECURITY.md)：私下报告安全漏洞，以及已知的演示项目限制。
- [无障碍声明](ACCESSIBILITY.md)：无障碍目标、已知障碍与反馈方式。
- [报告问题、建议功能或反馈无障碍障碍](https://github.com/chenjinxian1/GOH-frontend/issues/new/choose)。

## 许可证

项目原创代码与文档采用 [MIT 许可证](LICENSE)。第三方依赖、图片、大学品牌、外部数据集和嵌入服务仍适用各自的条款；现有图片引用见[图片来源说明](goh-frontend/public/content-images/README.md)。行为准则保留 Contributor Covenant 的原始署名。

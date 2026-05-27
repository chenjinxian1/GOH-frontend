# Guardians of Health

<p align="center">
  <strong>A modern healthcare education platform that combines health knowledge, disease information, AI-powered general guidance, and health data visualization.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=06142f" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img alt="Healthcare Education" src="https://img.shields.io/badge/Healthcare-Education-22c8e5" />
  <img alt="AI Assistant" src="https://img.shields.io/badge/AI-Assistant-7dd3fc" />
  <img alt="OpenAI-compatible LLM" src="https://img.shields.io/badge/LLM-OpenAI--compatible-0f766e" />
</p>

<p align="center">
  <img src="./goh-frontend/assets/goh-preview.gif" alt="Guardians of Health Preview" width="100%" />
</p>

> Project preview generated from the demo video and stored at `goh-frontend/assets/goh-preview.gif`.

## Repository Notice

The actual frontend project is located in the subdirectory:

```text
goh-frontend/
```

When installing dependencies, running the development server, building the app, or editing frontend files, enter that folder first:

```bash
cd goh-frontend
```

## Overview

Guardians of Health is a healthcare education web platform built as a modern React frontend. It helps users explore general health knowledge, browse disease information, ask an AI-powered assistant for educational guidance, visualize health-related information, save favorite content, and manage a local demo profile.

The project has been redesigned with a healthcare SaaS-style homepage: a soft navy-blue visual system, glassmorphism product dashboard mockups, animated feature cards, clear entry points, category exploration, and a polished academic footer.

This is suitable for:

- Course project presentation
- Portfolio showcase
- Frontend engineering demonstration
- Healthcare information design prototype
- AI interface integration demo

## Main Features

- **Healthcare SaaS-style landing page**: redesigned homepage with modern visual storytelling, product mockups, hover states, animations, and clear calls to action.
- **AI Health Assistant**: conversational interface for general health education and wellness guidance.
- **OpenAI-compatible LLM interface**: configurable through `.env` so the project can connect to OpenAI, DeepSeek, Qwen/DashScope, Moonshot, Ollama, or another compatible provider.
- **Health Science Central**: educational health articles with local fallback content and image assets.
- **Disease Encyclopedia**: searchable disease information for learning, awareness, and prevention-oriented exploration.
- **Shared article detail page**: unified detail experience for health topics and disease entries.
- **Health Data Visualization**: visual dashboard page for presenting health information in a clearer way.
- **Local demo authentication**: register, login, profile, logout, and favorites using `localStorage` when Firebase Auth is unavailable.
- **Favorites system**: save selected articles locally per demo user.
- **Feedback page**: project feedback collection interface.
- **Academic footer and legal pages**: university/project branding, team section, privacy policy, and legal/medical disclaimer pages.
- **Firebase-related structure preserved**: Firebase config, Firestore usage points, hosting config, and Firestore rules remain in the project, while real Firebase values are moved to local environment variables.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Routing | React Router DOM 7 |
| Styling | CSS |
| AI Interface | OpenAI-compatible Chat Completions API |
| Markdown | React Markdown, Remark GFM |
| Project Services | Firebase-related config and Firestore integration points |
| Demo Auth | localStorage |

## Quick Start

### Prerequisites

- Node.js 20 or newer is recommended.
- npm is used by the project lockfile.

### 1. Clone the repository

```bash
git clone https://github.com/chenjinxian1/GOH-frontend.git
cd GOH-frontend/goh-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` or `.env.local` file inside `goh-frontend/`.

```env
VITE_LLM_PROVIDER=openai-compatible
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_MODEL=gpt-4o-mini
VITE_LLM_TEMPERATURE=0.7
VITE_LLM_MAX_TOKENS=800
```

The repository also includes examples:

```text
goh-frontend/.env.example
goh-frontend/.env.local.example
```

### 4. Run the development server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

### 5. Build the project

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Environment Variables

### LLM Configuration

The AI Assistant uses a generic OpenAI-compatible LLM client located in:

```text
goh-frontend/src/services/llmClient.ts
```

Required LLM variables:

```env
VITE_LLM_PROVIDER=openai-compatible
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_MODEL=gpt-4o-mini
VITE_LLM_TEMPERATURE=0.7
VITE_LLM_MAX_TOKENS=800
```

The client sends requests to:

```text
POST {VITE_LLM_API_BASE_URL}/chat/completions
```

and reads:

```text
choices[0].message.content
```

### Provider Examples

```env
# OpenAI
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_MODEL=gpt-4o-mini
```

```env
# DeepSeek
VITE_LLM_API_BASE_URL=https://api.deepseek.com/v1
VITE_LLM_MODEL=deepseek-chat
```

```env
# Qwen / DashScope OpenAI-compatible
VITE_LLM_API_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
VITE_LLM_MODEL=qwen-plus
```

```env
# Moonshot
VITE_LLM_API_BASE_URL=https://api.moonshot.cn/v1
VITE_LLM_MODEL=moonshot-v1-8k
```

```env
# Local Ollama OpenAI-compatible
VITE_LLM_API_BASE_URL=http://localhost:11434/v1
VITE_LLM_API_KEY=ollama
VITE_LLM_MODEL=llama3.1
```

### Firebase Configuration

Firebase-related files are still present, but real Firebase project values should be configured locally, not committed.

Optional Firebase variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Frontend API Key Warning

This is a frontend-only Vite project. Environment variables prefixed with `VITE_` are embedded into the browser build and can be inspected by users.

That means `VITE_LLM_API_KEY` is suitable only for local demos, classroom demos, or controlled testing. Do not expose production API keys in a public frontend deployment.

For production, use a backend proxy:

```text
Frontend -> Backend /api/chat -> LLM Provider
```

## Demo Authentication

The updated project uses localStorage-based demo authentication so login and registration can work even when Firebase Auth is unavailable.

Local storage keys:

```text
goh_users
goh_current_user
goh_favorites
```

Supported demo behavior:

- Register a local user
- Log in with email and password
- Persist current user after refresh
- View and update profile information
- Log out
- Save favorites locally

This authentication is not secure and is not intended for production. It exists only to support local demonstration and GitHub showcase usage.

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Redesigned healthcare SaaS-style homepage |
| `/ai-assistant` | AI Health Assistant |
| `/science` | Health Science content |
| `/articles` | Alias for Health Science content |
| `/article/:id` | Article detail page |
| `/health/:id` | Health article detail alias |
| `/science/:id` | Science article detail alias |
| `/diseases` | Disease Encyclopedia and search |
| `/disease/:id` | Disease detail page |
| `/data-viz` | Health Data Visualization |
| `/favorites` | Saved favorites |
| `/feedback` | Feedback page |
| `/login` | Login page |
| `/register` | Register page |
| `/profile` | Profile page |
| `/create` | Create article page |
| `/privacy-policy` | Privacy Policy |
| `/legal-notice` | Legal Notice & Disclaimer |

## Project Structure

```text
GOH-frontend/
├── README.md                 # Repository-level GitHub documentation
└── goh-frontend/             # Actual Vite frontend project
    ├── public/
    │   └── content-images/   # Local demo health images
    ├── src/
    │   ├── assets/           # Static frontend assets
    │   ├── components/       # Shared UI components
    │   │   └── layout/       # Navbar and Footer
    │   ├── context/          # Auth context and local demo auth state
    │   ├── data/             # Local fallback content
    │   ├── firebase/         # Firebase initialization
    │   ├── pages/            # Route pages
    │   └── services/         # AI service and LLM client
    ├── .env.example          # LLM environment example
    ├── .env.local.example    # Firebase + LLM environment example
    ├── firebase.json         # Firebase hosting config
    ├── firestore.rules       # Firestore rules
    ├── package.json
    └── README.md             # Frontend-specific README
```

## Available Scripts

Run these from `goh-frontend/`.

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Run TypeScript checks and build the production bundle.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run ESLint.

## Medical Disclaimer

Guardians of Health is designed for health education and general informational support. It does not provide medical diagnosis, medical treatment, prescriptions, emergency care, or a replacement for professional medical advice.

The AI Assistant can generate incorrect or incomplete information. Always consult a qualified healthcare professional for personal medical concerns. If you believe you may be experiencing a medical emergency, contact local emergency services immediately.

## Academic Project Information

Guardians of Health is an academic healthcare education platform and frontend engineering project. It demonstrates:

- Healthcare information architecture
- Modern React application development
- SaaS-style landing page design
- AI assistant integration through a provider-flexible LLM client
- Demo authentication without requiring Firebase Auth
- Responsible health communication and disclaimer design

The application footer includes university/USM branding, Guardians of Health branding, team member information, feedback access, privacy policy, and legal disclaimer links.

## License

No license file is currently included in this repository. Unless a license is added, this project should be treated as an education and research project rather than a formally licensed open-source package.

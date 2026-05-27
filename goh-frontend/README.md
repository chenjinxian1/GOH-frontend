# Guardians of Health

<p align="center">
  <strong>A modern healthcare education platform for exploring health knowledge, disease information, AI-powered general guidance, and health data visualization.</strong>
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
  <img src="./assets/goh-preview.gif" alt="Guardians of Health Preview" width="100%" />
</p>

> Project preview generated from the demo video and stored at `assets/goh-preview.gif`.

## Overview

Guardians of Health is a React + TypeScript web platform designed to make health education more accessible. It brings together curated health science content, disease information, an AI-powered general health assistant, health data visualization, local demo accounts, favorites, and an academic project footer into one modern frontend experience.

The homepage has been redesigned as a healthcare SaaS-style landing page with a soft navy-blue visual system, glassmorphism dashboard mockups, animated feature sections, and clear entry points into the platform.

This repository contains the frontend project inside the subfolder:

```text
goh-frontend/
```

Run all project commands from that folder.

## Key Features

- **Healthcare SaaS-style homepage**: modern dark-blue interface, dashboard preview, animated cards, category exploration, and strong product navigation.
- **AI Health Assistant**: conversational assistant powered by an OpenAI-compatible Chat Completions interface.
- **Provider-flexible LLM client**: switch between OpenAI, DeepSeek, Qwen/DashScope, Moonshot, Ollama, or any OpenAI-compatible provider through environment variables.
- **Health Science Library**: curated educational articles with image-backed local fallback content.
- **Disease Encyclopedia**: searchable disease and condition information for learning and awareness.
- **Article Detail Pages**: shared detail view for health articles and disease entries.
- **Health Data Visualization**: visual health information and trend-oriented dashboard page.
- **Local demo authentication**: register, log in, profile, logout, and favorites using `localStorage` for demo use.
- **Favorites**: save and revisit articles locally per demo user.
- **Feedback and legal pages**: project feedback form, privacy policy, and legal/medical disclaimer pages.
- **Firebase-related project structure**: Firebase config, Firestore usage points, hosting config, and rules are preserved, while sensitive Firebase values are moved to local environment variables.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM
- **Markdown Rendering**: React Markdown + Remark GFM
- **Data / Project Services**: Firebase-related structure and Firestore integration points
- **Authentication for Demo**: localStorage-based demo auth
- **AI Interface**: OpenAI-compatible Chat Completions API wrapper

## Getting Started

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

Create a local `.env` or `.env.local` file in `goh-frontend/`.

```env
VITE_LLM_PROVIDER=openai-compatible
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_MODEL=gpt-4o-mini
VITE_LLM_TEMPERATURE=0.7
VITE_LLM_MAX_TOKENS=800
```

Optional Firebase environment variables can also be configured locally if you want Firebase-backed features to connect to your own project:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Start the development server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## LLM Configuration

The AI Assistant uses `src/services/llmClient.ts`, a small OpenAI-compatible client that sends chat messages to:

```text
POST {VITE_LLM_API_BASE_URL}/chat/completions
```

The request body follows the Chat Completions format:

```json
{
  "model": "configured-model",
  "messages": [],
  "temperature": 0.7,
  "max_tokens": 800
}
```

The assistant reads the response from:

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

### Frontend API Key Warning

This is a frontend-only demo. Any variable prefixed with `VITE_` is exposed in the browser bundle.

Do not use production API keys in public frontend deployments. For production, use a backend proxy:

```text
Frontend -> Backend /api/chat -> LLM Provider
```

## Demo Authentication

Guardians of Health currently includes localStorage-based demo authentication so the app can be demonstrated without Firebase Auth.

Local storage keys:

```text
goh_users
goh_current_user
goh_favorites
```

Demo auth supports:

- Registering a local demo user
- Logging in with email and password
- Persisting the current user across refreshes
- Viewing and editing a profile
- Logging out
- Saving favorites locally per user

This authentication system is for local development and academic demonstration only. It is not secure and must not be used as production authentication.

## Routes

| Route | Page |
| --- | --- |
| `/` | SaaS-style homepage |
| `/ai-assistant` | AI Health Assistant |
| `/science` | Health Science articles |
| `/articles` | Health Science alias |
| `/article/:id` | Article detail page |
| `/health/:id` | Health article detail alias |
| `/science/:id` | Science article detail alias |
| `/diseases` | Disease Encyclopedia / search |
| `/disease/:id` | Disease detail page |
| `/data-viz` | Health Data Visualization |
| `/favorites` | Saved favorites |
| `/feedback` | Feedback form |
| `/login` | Login page |
| `/register` | Register page |
| `/profile` | User profile |
| `/create` | Create article page |
| `/privacy-policy` | Privacy Policy |
| `/legal-notice` | Legal Notice & Disclaimer |

## Project Structure

```text
goh-frontend/
├── public/
│   └── content-images/       # Local demo images for content cards
├── src/
│   ├── assets/               # Static app assets
│   ├── components/           # Shared UI components
│   │   └── layout/           # Navbar and Footer
│   ├── context/              # Auth context and demo auth state
│   ├── data/                 # Local fallback content
│   ├── firebase/             # Firebase initialization
│   ├── pages/                # Route pages
│   └── services/             # AI service and generic LLM client
├── .env.example              # LLM environment example
├── .env.local.example        # Firebase + LLM environment example
├── firebase.json             # Firebase hosting config
├── firestore.rules           # Firestore rules
├── package.json
└── README.md
```

## Important Notes

- The repository root on GitHub contains this project inside `goh-frontend/`.
- Real `.env` and `.env.local` files should not be committed.
- Firebase project values are intentionally read from environment variables instead of being hard-coded.
- AI Assistant behavior depends on a valid OpenAI-compatible provider configuration.
- Some Firebase-backed features may require your own Firebase project if you want live persistence beyond the local demo behavior.

## Medical Disclaimer

Guardians of Health is designed for health education and general informational support. It does not provide medical diagnosis, medical treatment, prescriptions, or emergency care.

The AI Assistant may generate incorrect or incomplete information. Always consult a qualified healthcare professional for personal medical concerns. If you believe you may be experiencing a medical emergency, contact local emergency services immediately.

## Academic Project Information

Guardians of Health is developed as an academic healthcare education web platform. The project is intended to demonstrate frontend engineering, healthcare information design, local demo authentication, AI interface integration, and responsible health communication.

The footer of the application includes university/USM branding, Guardians of Health branding, team member information, feedback access, privacy policy, and legal disclaimer links.

## Available Scripts

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Run TypeScript build checks and generate a production build.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run ESLint.

## License

This project is currently provided for academic and demonstration purposes. Add a license file if the repository will be distributed as an open-source project.

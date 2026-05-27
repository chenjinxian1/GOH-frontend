# Guardians of Health Frontend

Guardians of Health is a React, TypeScript, and Vite frontend for health education, disease information, AI-powered guidance, and health data visualization.

## Environment Variables

Create a local `.env` or `.env.local` file before running the AI Assistant. Do not commit real API keys.

```env
VITE_LLM_PROVIDER=openai-compatible
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_MODEL=gpt-4o-mini
VITE_LLM_TEMPERATURE=0.7
VITE_LLM_MAX_TOKENS=800
```

Provider examples:

```env
# OpenAI
VITE_LLM_API_BASE_URL=https://api.openai.com/v1
VITE_LLM_MODEL=gpt-4o-mini

# DeepSeek
VITE_LLM_API_BASE_URL=https://api.deepseek.com/v1
VITE_LLM_MODEL=deepseek-chat

# Qwen / DashScope OpenAI-compatible
VITE_LLM_API_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
VITE_LLM_MODEL=qwen-plus

# Moonshot
VITE_LLM_API_BASE_URL=https://api.moonshot.cn/v1
VITE_LLM_MODEL=moonshot-v1-8k

# Local Ollama OpenAI-compatible
VITE_LLM_API_BASE_URL=http://localhost:11434/v1
VITE_LLM_API_KEY=ollama
VITE_LLM_MODEL=llama3.1
```

This frontend-only demo uses Vite environment variables. Values prefixed with `VITE_` are exposed in the browser, so do not use production API keys in public deployments. For production, use a backend proxy such as:

```text
Frontend -> Backend /api/chat -> LLM Provider
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

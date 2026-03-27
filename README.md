<div align="center">

<img src="https://img.shields.io/badge/Chatly-AI%20Powered%20Chat-6366f1?style=for-the-badge&logo=sparkles&logoColor=white" alt="Chatly" height="42" />

<br/>
<br/>

**A modern, AI-powered chat application built for seamless and intelligent interactions.**

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3068b7?style=flat-square)](https://zod.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

<br/>

[Overview](#-overview) · [Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Configuration](#-configuration) · [API Reference](#-api-reference) · [Contributing](#-contributing)

---

</div>

## 📖 Overview

**Chatly** is a full-stack, monorepo-based chat application that combines a high-performance backend with a modern frontend to deliver intelligent, AI-powered conversations. It supports multiple AI providers out of the box — including **Google Gemini** and **OpenAI** — and is designed to scale cleanly thanks to its package-based architecture.

Whether you're building a customer support bot, an internal knowledge assistant, or a general-purpose chat interface, Chatly gives you a solid, production-ready foundation to build on.

---

## ✨ Features

### 🤖 AI-Powered Intelligence

- Multi-provider AI support via **Google Generative AI** (`@google/genai`) and the **OpenAI SDK**
- Context-aware, multi-turn conversations with conversation history management
- Easily swap or combine AI providers per use case
- Streaming response support for low-latency, real-time output

### 🖥️ Modern Frontend

- Built with **React 19** and **TypeScript** for type-safe, component-driven UI
- Lightning-fast HMR dev experience powered by **Vite**
- Responsive, accessible design using **Tailwind CSS**
- Premium, polished components inspired by **Shadcn/UI** patterns
- Clean chat interface with message threading, loading states, and error handling

### ⚡ High-Performance Backend

- **Express** server running on the **Bun** runtime for exceptional throughput
- Native TypeScript support — no build step required for the server
- Structured, modular route and controller architecture
- Middleware-first design for auth, logging, rate limiting, and error handling

### 🔒 Type Safety & Validation

- End-to-end **TypeScript** across the entire monorepo
- **Zod** schemas for strict request/response validation at API boundaries
- Shared type definitions between client and server packages
- Runtime safety with zero-cost abstractions

### 🛠️ Developer-First Workflow

- **Prettier** pre-configured for consistent code formatting
- **ESLint** with strict rules for code quality enforcement
- **Husky** + **lint-staged** for automated pre-commit checks
- Monorepo managed with **Bun workspaces**
- One-command setup and development startup

---

## 🏗️ Architecture

Chatly follows a clean, package-based monorepo architecture that separates concerns clearly while allowing shared tooling and types.

```
chatly/
├── packages/
│   ├── client/                  # React Frontend (Vite + Tailwind)
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── ui/          # Base design system components
│   │   │   │   └── chat/        # Chat-specific components
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── lib/             # Utilities and API client
│   │   │   ├── pages/           # Route-level page components
│   │   │   ├── store/           # Global state management
│   │   │   ├── types/           # Frontend TypeScript types
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── server/                  # Express Backend (Bun runtime)
│       ├── src/
│       │   ├── routes/          # API route definitions
│       │   ├── controllers/     # Request handlers & business logic
│       │   ├── services/        # AI provider integrations
│       │   │   ├── gemini.ts    # Google Generative AI service
│       │   │   └── openai.ts    # OpenAI service
│       │   ├── middleware/      # Auth, logging, error handling
│       │   ├── schemas/         # Zod validation schemas
│       │   ├── types/           # Server-side TypeScript types
│       │   └── index.ts         # Server entry point
│       └── package.json
│
├── .husky/                      # Git hooks
├── .prettierrc                  # Prettier config
├── eslint.config.js             # ESLint config (flat config)
├── package.json                 # Root workspace config
├── bun.lockb                    # Bun lockfile
└── tsconfig.json                # Root TypeScript config
```

### Data Flow

```
User Input
    │
    ▼
┌─────────────────────────────────┐
│         React Client            │
│  (Vite + Tailwind + TypeScript) │
└──────────────┬──────────────────┘
               │  HTTP / SSE (Streaming)
               ▼
┌─────────────────────────────────┐
│       Express Server            │
│  (Bun Runtime + TypeScript)     │
│                                 │
│  Route → Middleware → Controller│
│              │                  │
│         Zod Validation          │
└──────────────┬──────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌────────────┐   ┌────────────────┐
│  Google    │   │    OpenAI      │
│  Gemini    │   │    GPT-4o      │
└────────────┘   └────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

| Tool                           | Version    | Purpose                          |
| ------------------------------ | ---------- | -------------------------------- |
| [Bun](https://bun.sh/)         | `>= 1.1.0` | Package manager & server runtime |
| [Node.js](https://nodejs.org/) | `>= 20.x`  | Required for some tooling        |
| [Git](https://git-scm.com/)    | Latest     | Version control                  |

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/chatly.git
cd chatly
```

**2. Install all dependencies** (installs for all packages in the monorepo)

```bash
bun install
```

**3. Set up environment variables**

Copy the example env files for both packages:

```bash
# Server environment
cp packages/server/.env.example packages/server/.env

# Client environment
cp packages/client/.env.example packages/client/.env
```

Then fill in your API keys (see [Configuration](#-configuration) below).

**4. Start the development servers**

```bash
# Start both client and server concurrently
bun run dev
```

Or start them individually:

```bash
# Server only (runs on http://localhost:3000)
bun run dev:server

# Client only (runs on http://localhost:5173)
bun run dev:client
```

**5. Open the app**

Navigate to `http://localhost:5173` in your browser. 🎉

---

## ⚙️ Configuration

### Server — `packages/server/.env`

```env
# ── Server ──────────────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── AI Providers ────────────────────────────────────────
# Google Generative AI (Gemini)
# Get your key at: https://aistudio.google.com/app/apikey
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here

# OpenAI
# Get your key at: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# ── AI Model Settings ────────────────────────────────────
DEFAULT_AI_PROVIDER=gemini          # "gemini" or "openai"
GEMINI_MODEL=gemini-2.0-flash       # or gemini-1.5-pro, etc.
OPENAI_MODEL=gpt-4o-mini            # or gpt-4o, gpt-4-turbo, etc.
MAX_TOKENS=2048

# ── CORS ─────────────────────────────────────────────────
CLIENT_ORIGIN=http://localhost:5173
```

### Client — `packages/client/.env`

```env
# ── API ──────────────────────────────────────────────────
VITE_API_BASE_URL=http://localhost:3000/api

# ── App ──────────────────────────────────────────────────
VITE_APP_NAME=Chatly
VITE_ENABLE_STREAMING=true
```

> [!IMPORTANT]
> Never commit `.env` files containing real API keys. They are already in `.gitignore` by default.

---

## 📜 Available Scripts

Run all scripts from the **root** of the monorepo using `bun run <script>`.

| Script                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `bun run dev`          | Start both client and server in development mode |
| `bun run dev:client`   | Start only the Vite dev server                   |
| `bun run dev:server`   | Start only the Bun/Express server                |
| `bun run build`        | Build both packages for production               |
| `bun run build:client` | Build only the React client                      |
| `bun run build:server` | Type-check and compile only the server           |
| `bun run lint`         | Run ESLint across all packages                   |
| `bun run lint:fix`     | Run ESLint with auto-fix                         |
| `bun run format`       | Format all files with Prettier                   |
| `bun run format:check` | Check formatting without writing                 |
| `bun run typecheck`    | Run `tsc --noEmit` across all packages           |
| `bun run test`         | Run all tests                                    |
| `bun run clean`        | Remove all `node_modules` and build artifacts    |

---

## 📡 API Reference

The server exposes a RESTful API under `/api`. All requests and responses use `application/json`.

### Chat

#### `POST /api/chat`

Send a message and receive an AI response.

**Request Body**

```json
{
   "message": "Explain the concept of recursion in simple terms.",
   "conversationId": "conv_abc123",
   "provider": "gemini",
   "history": [
      { "role": "user", "content": "Hello!" },
      { "role": "assistant", "content": "Hi there! How can I help you today?" }
   ]
}
```

| Field            | Type                   | Required | Description                                              |
| ---------------- | ---------------------- | -------- | -------------------------------------------------------- |
| `message`        | `string`               | ✅       | The user's message                                       |
| `conversationId` | `string`               | ❌       | ID to group messages into a conversation                 |
| `provider`       | `"gemini" \| "openai"` | ❌       | AI provider override (defaults to `DEFAULT_AI_PROVIDER`) |
| `history`        | `array`                | ❌       | Prior messages for context                               |

**Response `200 OK`**

```json
{
   "success": true,
   "data": {
      "message": "Recursion is when a function calls itself...",
      "conversationId": "conv_abc123",
      "provider": "gemini",
      "model": "gemini-2.0-flash",
      "usage": {
         "promptTokens": 48,
         "completionTokens": 112,
         "totalTokens": 160
      }
   }
}
```

**Error Response `4xx / 5xx`**

```json
{
   "success": false,
   "error": {
      "code": "VALIDATION_ERROR",
      "message": "message field is required and must be a non-empty string."
   }
}
```

---

#### `POST /api/chat/stream`

Same as `/api/chat` but streams the response as **Server-Sent Events (SSE)**.

**Request Body** — Same as `/api/chat`

**Response** — `text/event-stream`

```
data: {"chunk": "Recursion "}
data: {"chunk": "is when "}
data: {"chunk": "a function "}
data: {"chunk": "calls itself..."}
data: [DONE]
```

---

#### `GET /api/health`

Health check endpoint.

```json
{
   "status": "ok",
   "timestamp": "2025-03-27T10:00:00.000Z",
   "uptime": 3600
}
```

---

## 🧰 Tech Stack

### Frontend (`packages/client`)

| Technology                                    | Purpose                       |
| --------------------------------------------- | ----------------------------- |
| [React 19](https://react.dev/)                | UI component framework        |
| [TypeScript](https://www.typescriptlang.org/) | Static type safety            |
| [Vite](https://vitejs.dev/)                   | Build tool & dev server       |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling         |
| [Shadcn/UI](https://ui.shadcn.com/)           | Component design patterns     |
| [Zod](https://zod.dev/)                       | Client-side schema validation |

### Backend (`packages/server`)

| Technology                                                   | Purpose                              |
| ------------------------------------------------------------ | ------------------------------------ |
| [Bun](https://bun.sh/)                                       | JavaScript runtime & package manager |
| [Express](https://expressjs.com/)                            | HTTP server framework                |
| [TypeScript](https://www.typescriptlang.org/)                | Static type safety                   |
| [@google/genai](https://www.npmjs.com/package/@google/genai) | Google Gemini AI SDK                 |
| [openai](https://www.npmjs.com/package/openai)               | OpenAI GPT SDK                       |
| [Zod](https://zod.dev/)                                      | API request/response validation      |

### Tooling (Root)

| Technology                                                | Purpose                          |
| --------------------------------------------------------- | -------------------------------- |
| [Husky](https://typicode.github.io/husky/)                | Git hooks management             |
| [lint-staged](https://github.com/lint-staged/lint-staged) | Run linters on staged files      |
| [ESLint](https://eslint.org/)                             | Code quality & style enforcement |
| [Prettier](https://prettier.io/)                          | Opinionated code formatting      |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

**1. Fork and clone the repository**

```bash
git clone https://github.com/your-username/chatly.git
cd chatly
bun install
```

**2. Create a feature branch**

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

**3. Make your changes**

- Follow the existing code style (enforced by ESLint + Prettier)
- Write clear, self-documenting code
- Add or update types where needed
- Test your changes manually

**4. Commit using Conventional Commits**

```bash
git commit -m "feat: add streaming support to chat endpoint"
git commit -m "fix: handle empty message validation correctly"
git commit -m "docs: update API reference for /chat/stream"
```

Husky will automatically run linting and formatting checks on your staged files before the commit is created.

**5. Push and open a Pull Request**

```bash
git push origin feat/your-feature-name
```

Then open a PR on GitHub against the `main` branch. Please describe what your PR does and reference any related issues.

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix      | When to use                        |
| ----------- | ---------------------------------- |
| `feat:`     | New feature                        |
| `fix:`      | Bug fix                            |
| `docs:`     | Documentation changes              |
| `style:`    | Formatting, no logic change        |
| `refactor:` | Code restructuring                 |
| `test:`     | Adding or updating tests           |
| `chore:`    | Build, tooling, dependency updates |

---

## 🗺️ Roadmap

- [ ] Persistent conversation history with a database (SQLite / PostgreSQL)
- [ ] User authentication (JWT + session management)
- [ ] Support for file/image uploads in chat
- [ ] Model selection UI per conversation
- [ ] Rate limiting and usage quotas per user
- [ ] Docker + Docker Compose setup for one-command deployment
- [ ] WebSocket support as an alternative to SSE
- [ ] Prompt templating and system prompt configuration UI
- [ ] Plugin / tool calling support (function calling)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgements

- [Google Generative AI](https://ai.google.dev/) for the Gemini API
- [OpenAI](https://openai.com/) for the GPT API
- [Shadcn/UI](https://ui.shadcn.com/) for the component design inspiration
- [Bun](https://bun.sh/) for the incredible runtime performance
- The open source community for the amazing tools that make this possible

---

<div align="center">

Built with ❤️ using React, Bun, and AI

⭐ **If you find Chatly useful, consider giving it a star!** ⭐

</div>

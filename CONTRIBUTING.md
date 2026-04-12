# Contributing to Shlokas Frontend

Thanks for contributing to the VedVani frontend.

## Before You Start

- Read the [README](./README.md) for the project overview and architecture.
- Check open issues before starting work.
- Prefer small, focused pull requests.
- Do not commit secrets, `.env` files, or production URLs that should remain private.

## Local Setup

### 1. Prerequisites

- Node.js `22.x`
- npm `10+`
- A running Shlokas backend API, or access to a deployed backend

### 2. Clone the Repository

```bash
git clone https://github.com/kumargaurav2722/shlokas-frontend.git
cd shlokas-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create the Environment File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values:

```env
VITE_API_BASE=https://shlokas-apishlokas-backend-apishlokas.onrender.com
VITE_SITE_URL=http://localhost:5173
VITE_AUDIO_CDN_BASE=https://shlokas-apishlokas-backend-apishlokas.onrender.com
VITE_SHARE_CDN_BASE=https://shlokas-apishlokas-backend-apishlokas.onrender.com
```

Environment variable notes:

- `VITE_API_BASE`: Base URL for the backend API
- `VITE_SITE_URL`: Public URL of the frontend
- `VITE_AUDIO_CDN_BASE`: Base URL for audio file delivery
- `VITE_SHARE_CDN_BASE`: Base URL for share-card image generation

For contributors:

- the example file points to the public VedVani backend so the frontend works immediately after cloning
- if you run your own backend, replace those backend URLs in `.env`
- do not treat the backend base URL as a secret; protect real access on the backend side instead

### 5. Start the Dev Server

```bash
npm run dev
```

### 6. Run Validation Before Opening a PR

```bash
npm run lint
npm run build
```

## Development Guidelines

- Keep route-level code inside `src/pages`
- Keep reusable UI inside `src/components`
- Keep API calls inside `src/services`
- Keep global state inside `src/context`
- Keep shared logic inside `src/hooks` and `src/utils`
- Prefer `Link`/anchor navigation for public crawlable routes instead of click-only containers
- Avoid mixing backend logic into React components

## Pull Request Checklist

Before submitting:

- Confirm the app still runs locally
- Confirm `npm run lint` passes
- Confirm `npm run build` passes
- Update docs if behavior, setup, or env variables changed
- Add or update screenshots when UI changes materially
- Keep commits readable and scoped

## Branching

- Branch from `main`
- Use descriptive branch names, for example: `docs/readme-refresh` or `feat/seo-metadata`

## Security Rules for Contributors

- Never commit `.env`
- Never commit secrets in code, screenshots, or test fixtures
- Never hardcode tokens, API keys, or admin endpoints
- If you find a vulnerability, follow the process in [SECURITY.md](./SECURITY.md)

# Shlokas Frontend

Frontend for the VedVani spiritual reading platform.

This project is a React + Vite application focused on scripture discovery,
verse reading, devotional browsing, translations, audio playback, and
AI-assisted scripture exploration.

## What This Repo Includes

- Landing experience for devotional discovery
- Scripture browsing for Vedas, Upanishads, Puranas, Bhagavad Gita, Ramayana, and Mahabharata
- Verse reading with translation tabs and audio support
- Devotional sections for Chalisas and Puja Vidhi
- Authentication UI
- Chat UI for scripture questions
- Profile, bookmarks, history, and personalization-related frontend flows

## Tech Stack

- React 18
- Vite 7
- React Router
- Axios
- Tailwind CSS v4
- Context API

## Current App Structure

The active app lives in `src/`.

There is also a legacy root-level `pages/` directory from an older Next.js
flow. The current Vercel deployment is configured to build the Vite app, not
that legacy layer.

## Folder Structure

```text
src/
├── app/                 # App shell, router, route-level wiring
├── assets/              # Static source assets imported in code
├── compat/              # Compatibility helpers from older migration work
├── components/
│   ├── auth/            # Auth-specific reusable UI
│   ├── chat/            # Chat UI building blocks
│   ├── common/          # Generic reusable UI pieces
│   ├── layout/          # Navbar, footer, side panel, shell pieces
│   ├── seo/             # SEO and structured-data helpers
│   ├── shloka/          # Verse, translation, audio, language UI
│   └── ui/              # Skeletons and low-level UI helpers
├── context/             # Global state providers
├── hooks/               # Reusable logic hooks
├── i18n/                # Translation labels and language config
├── pages/
│   ├── About/           # About page
│   ├── Admin/           # Admin and analytics screens
│   ├── Auth/            # Login, signup, callback, forgot password
│   ├── Bookmarks/       # Saved verses/items
│   ├── Chat/            # Ask-scripture page
│   ├── Devotion/        # Chalisas and Puja Vidhi
│   ├── History/         # Reading history
│   ├── Landing/         # Home/landing sections
│   ├── Profile/         # User profile page
│   ├── Scriptures/      # Overviews, text list, chapter list, verse page
│   ├── Search/          # Global search experience
│   └── Topics/          # Topic listing and topic detail pages
├── services/            # API clients only
├── styles/              # Theme and variable files
├── utils/               # Routing, SEO, topic, and helper utilities
├── index.css            # Global styles
└── main.jsx             # React entrypoint
```

## Important Root Files

- `package.json`: scripts, dependencies, Node version
- `vite.config.js`: Vite configuration
- `vercel.json`: Vercel deployment config and security headers
- `.env.example`: example environment variables
- `CONTRIBUTING.md`: contribution workflow and local setup
- `SECURITY.md`: vulnerability reporting and repo safety guidance
- `LICENSE`: MIT license for VedVani

## Environment Variables

The frontend reads these variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_BASE` | Yes | Backend API base URL |
| `VITE_SITE_URL` | Yes | Public frontend URL |
| `VITE_AUDIO_CDN_BASE` | Optional | Audio delivery base URL |
| `VITE_SHARE_CDN_BASE` | Optional | Share-card generation base URL |

Use `.env.example` as the template.

### Backend Base URL for Cloners

If someone clones this frontend, they can use the deployed VedVani backend
immediately by copying `.env.example` to `.env`.

The default public backend configured for open-source setup is:

`https://shlokas-apishlokas-backend-apishlokas.onrender.com`

If they are running their own backend, they only need to replace:

- `VITE_API_BASE`
- `VITE_AUDIO_CDN_BASE`
- `VITE_SHARE_CDN_BASE`

Important:

- the backend base URL is not a secret
- frontend code cannot hide a public API base URL
- real backend protection must be done on the backend with auth, rate limiting, quotas, and private admin-only endpoints

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

For the full setup flow, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Backend Expectations

This frontend is backend-integrated but remains loosely coupled.

The app expects endpoints for:

- authentication
- scripture catalog and verse retrieval
- bookmarks
- reading history
- verse-of-the-day
- recommendations
- analytics
- devotional content
- chat/search

If your backend shape differs, update the service layer in `src/services/`.

## Deployment

This repo is configured for Vercel and builds the Vite app output in `dist/`.

Important deployment notes:

- Use Node `22.x`
- Set the production env variables in Vercel
- The repo uses SPA rewrites in `vercel.json`
- Security headers are also configured in `vercel.json`

## Open Source Notes

This repository is licensed under MIT in the name of VedVani.

Important tradeoff:

- MIT is permissive
- It allows reuse, modification, and redistribution
- It does not prevent others from using implementation ideas

If you want to keep strategic advantage:

- keep the backend private
- keep private datasets private
- keep ingestion pipelines private
- keep admin tooling private
- protect the VedVani brand separately with trademark strategy if needed

For brand usage guidance, see [TRADEMARKS.md](./TRADEMARKS.md).

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Community

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Trademark Notice](./TRADEMARKS.md)
- [Contribution Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## Repo Automation

This repository includes GitHub automation for:

- CI on pushes and pull requests
- CodeQL code scanning
- weekly `npm audit` dependency scanning
- label synchronization from `.github/labels.json`
- optional GitHub Project automation for issues and pull requests
- release creation from semantic version tags

### Project Automation Setup

To enable automatic issue and pull request addition to a GitHub Project, set:

- repository variable `GITHUB_PROJECT_URL`
- repository secret `ADD_TO_PROJECT_PAT`

`ADD_TO_PROJECT_PAT` should be a token with project access. For private repos,
it also needs repository access. The workflow is defined in
`.github/workflows/add-to-project.yml`.

### Release Setup

To publish a release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow in `.github/workflows/release.yml` will create a GitHub Release
using automatically generated release notes configured by
`.github/release.yml`.

## Security

Please read [SECURITY.md](./SECURITY.md) before reporting vulnerabilities or
publishing security concerns.

## Trademarks

Please read [TRADEMARKS.md](./TRADEMARKS.md) before reusing the VedVani name,
logo, or project identity.

## License

[MIT](./LICENSE) © VedVani

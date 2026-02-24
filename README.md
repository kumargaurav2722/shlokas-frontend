Shlokas Platform — Frontend Documentation
This document describes ONLY the FRONTEND of the Shlokas platform.
The frontend is built to be:
modern
calm & devotional
scalable
SOLID-principle compliant
backend-agnostic (easy to integrate & extend)
🧠 Frontend Vision
The frontend should provide a complete religious experience, not just pages:
Read sacred shlokas
Listen to Sanskrit & translations
Switch languages easily
Navigate scriptures naturally
Ask questions via AI chatbot
Personalize reading experience
Feel calm, spiritual, and modern
🛠️ Tech Stack (Frontend)
React.js
Tailwind CSS v4
React Router
Axios
Context API
Functional components
SOLID-based folder structure
📁 Final Frontend Folder Structure
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
│
├── pages/
│   ├── Landing/
│   ├── Scriptures/
│   ├── Auth/
│   ├── Chat/
│   └── Profile/          (future)
│
├── components/
│   ├── layout/
│   ├── shloka/
│   ├── chat/
│   ├── auth/
│   └── common/
│
├── services/
│   ├── api.js
│   ├── auth.service.js
│   ├── scripture.service.js
│   └── chat.service.js
│
├── context/
│   ├── AuthContext.jsx
│   └── LanguageContext.jsx (future)
│
├── hooks/
│   ├── useAuth.js
│   └── useAudio.js (future)
│
├── styles/
│   └── index.css
│
└── main.jsx
This structure is intentional:
Pages = route-level screens
Components = reusable UI
Services = API calls only
Context = global state
Hooks = reusable logic
🟢 FRONTEND PHASE 1 — FOUNDATION & LANDING PAGE
Status: ✅ COMPLETED
Purpose
Create a first impression of the platform that feels:
spiritual
trustworthy
modern
What is DONE in Phase 1
1️⃣ Tailwind CSS v4 Setup
CSS-first theming using @theme
Custom colors:
saffron
cream
dark
Serif typography for Sanskrit feel
📄 src/index.css
2️⃣ Navbar
Logo / brand name
Sign In button
Sign Up button
Reusable layout component
📄 components/layout/Navbar.jsx
3️⃣ Landing Page
📄 pages/Landing/Landing.jsx
Landing page is composed of sections, not a single file.
4️⃣ Hero Section
📄 pages/Landing/HeroSection.jsx
Contains:
Title: spiritual & inspirational
Subtitle explaining purpose
CTA buttons:
“Start Reading”
“Ask the Gita”
5️⃣ Popular Shloka Section
📄 pages/Landing/PopularShlokas.jsx
Features:
One famous shloka (static for now)
Sanskrit text
Hindi & English translations
🔊 Audio buttons (reusing existing AudioPlayer)
Clean card-style layout
Purpose:
Show platform capability immediately
6️⃣ Categories Section
📄 pages/Landing/Categories.jsx
Displays clickable cards for:
Vedas
Upanishads
Puranas
Bhagavad Gita
Mahabharata
Purpose:
Entry point into scriptures
What NEEDS TO BE DONE Later in Phase 1 (Enhancements)
Fetch popular shloka dynamically from backend
Add language dropdown on landing page
Add animation (fade / slide)
Make landing fully mobile-optimized
🟡 FRONTEND PHASE 2 — SCRIPTURES EXPERIENCE
Status: ✅ COMPLETED (Basic)
Purpose
Allow users to naturally navigate scriptures, just like a book.
What is DONE in Phase 2
1️⃣ Routing Architecture
📄 app/routes.jsx
Routes implemented:
/scriptures
/scriptures/:category
/scriptures/:category/:text
/scriptures/:category/:text/:chapter
2️⃣ Scriptures Home
📄 pages/Scriptures/ScripturesHome.jsx
Displays scripture categories
Click → navigates to text list
3️⃣ Text List Page
📄 pages/Scriptures/TextList.jsx
Shows texts based on category
Example:
Vedas → Rigveda, Yajurveda…
Gita → Bhagavad Gita
(Currently static, backend-ready)
4️⃣ Chapter List Page
📄 pages/Scriptures/ChapterList.jsx
Shows chapter numbers
Click → verse page
5️⃣ Verse Page
📄 pages/Scriptures/VersePage.jsx
Uses:
Existing Verse component
Existing AudioPlayer
Features:
Sanskrit text
Translation tabs
Audio playback
Clean reading layout
6️⃣ Side Panel (Suggestions)
📄 components/layout/SidePanel.jsx
Shows related / suggested shlokas
Helps discovery
Currently static placeholders
What NEEDS TO BE DONE in Phase 2 (Next Tasks)
Fetch texts / chapters / verses from backend
Implement real “related shlokas” logic
Improve side panel UX (click → navigate)
Add breadcrumb navigation
🟣 FRONTEND PHASE 3 — AUTHENTICATION UI
Status: ✅ COMPLETED (Basic)
Purpose
Give users identity and session control.
What is DONE in Phase 3
1️⃣ Auth Layout
📄 components/auth/AuthLayout.jsx
Centered card layout
Reused by all auth pages
2️⃣ Reusable Auth Form
📄 components/auth/AuthForm.jsx
Accepts dynamic fields
Submit button
Footer links
(SOLID: open for extension)
3️⃣ Login Page
📄 pages/Auth/Login.jsx
Email + password
Calls backend auth API
Stores token in context
4️⃣ Signup Page
📄 pages/Auth/Signup.jsx
Email + password
Redirects to login
5️⃣ Forgot Password Page (UI only)
📄 pages/Auth/ForgotPassword.jsx
Email input
Placeholder logic
6️⃣ Auth Context
📄 context/AuthContext.jsx
Stores auth token
Login / logout functions
What NEEDS TO BE DONE in Phase 3 (Advanced Auth)
Google OAuth UI
Phone number + OTP UI
Password reset flow (backend integration)
Profile dropdown in Navbar
🔵 FRONTEND PHASE 4 — CHAT UI (ASK THE GITA)
Status: ✅ COMPLETED
Purpose
Let users ask questions, not just read.
What is DONE in Phase 4
1️⃣ Chat Page
📄 pages/Chat/AskScripture.jsx
Full page chat layout
Header + message area + input
2️⃣ Chat Components
ChatContainer → message list
ChatMessage → user vs assistant bubble
ChatInput → input + send button
3️⃣ Chat Service
📄 services/chat.service.js
Connects frontend to backend RAG chatbot
What NEEDS TO BE DONE in Phase 4 (Enhancements)
Show verse references separately
Add “clear chat” button
Add chat history persistence
Add loading / typing indicator
Add voice-based question (future)
🔴 FRONTEND PHASE 5 — PERSONALIZATION (NOT DONE)
To Be Built
Default language selection
Audio preferences
Bookmarks / favorites
Daily shloka
Reading history
User profile page
⚫ FRONTEND PHASE 6 — UX POLISH (NOT DONE)
To Be Built
Mobile-first refinement
Dark mode
Accessibility (ARIA, keyboard)
Smooth animations
Festival themes (Diwali, Gita Jayanti)
🧭 HOW TO USE THIS AS A TASK FOR CODEX / DEV
You can assign tasks like this:
“Implement Frontend Phase 2 enhancement:
Replace static scripture data with backend API
Implement real side-panel suggestions
Add breadcrumb navigation”
or
“Implement Frontend Phase 5:
Create LanguageContext
Add default language selector
Persist user preference”
Each phase is clearly isolated, so work can be parallelized.
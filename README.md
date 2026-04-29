<div align="center">

# 🔄 CaseChange

### Advanced Text Utility Suite

*A professional-grade, privacy-first text manipulation toolkit built for developers and content creators.*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 Live Demo](#) · [📦 Installation](#-installation) · [🛠️ Tech Stack](#-tech-stack) · [👨‍💻 Developer](#-developer-profile)

</div>

---

## 🎯 Project Vision

**CaseChange** is not just another case converter — it's a **high-level text utility suite** engineered for professional developers, DevOps engineers, and content creators who demand speed, precision, and a frictionless workflow. Every feature is designed around the principle: *get in, do the work, get out.*

Unlike standard online converters that break on large inputs, leak your data to servers, or provide zero insight into your text, CaseChange processes **everything client-side** with real-time statistics, 20+ case transformations, and a polished Neumorphic UI that feels native to modern development environments.

---

## ❌ Problems Solved

| Problem | How CaseChange Fixes It |
|---------|------------------------|
| **Word-breaking in textareas** | Intelligent overflow handling with `overflow-wrap: break-word` and 1M character safety cap |
| **Layout overflows from long words** | Text truncation in stat cards with ellipsis, responsive grid that never breaks |
| **No real-time statistics** | 12+ live metrics — word count, reading time, most frequent word, unique words, and more |
| **Data privacy concerns** | Zero server calls. All processing happens in your browser. No data ever leaves your machine |
| **Clunky multi-step workflows** | Top-positioned input + side-by-side panels = single-glance access to all tools |
| **Poor error feedback** | Toast notification system with success/error/info states and auto-dismiss |
| **No undo/redo in online tools** | Full undo/redo stack with keyboard shortcuts (Ctrl+Z / Ctrl+Y) |

---

## ✨ Key Features

### 🔄 Case Conversions (20+)
- **Standard:** uppercase, lowercase, title case, sentence case, capitalized case
- **Developer:** camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case
- **Fun:** aLtErNaTiNg cAsE, iNvErSe cAsE, rAnDoM cAsE
- **Grouped tabs** — filter by All / Standard / Fun / Dev

### 📊 Real-Time Text Statistics
- Characters (with/without spaces), words, sentences, paragraphs, lines
- Reading time estimate, letter/number/special character counts
- Most frequent word, longest word, unique word count
- **Export stats as JSON** with one click

### 🛠️ Advanced Text Operations
- **Text Cleanup:** Remove extra spaces, empty lines, duplicate lines
- **Line Operations:** Sort A-Z/Z-A, reverse lines, shuffle lines, number lines, trim whitespace
- **Encode/Decode:** URL encode/decode, Base64 encode/decode, HTML entities encode/decode
- **Extract & Transform:** Extract emails/URLs/numbers, reverse text, slugify, wrap text at 80 chars
- **Find & Replace** with case-sensitive toggle and live match count
- **Custom Separator** — replace spaces with any character, optionally including newlines
- **Word Filter** — filter words by minimum length

### 🎨 Professional UI/UX
- **Neumorphism Design System** — soft extruded/inset shadows, uniform backgrounds, light & dark mode
- **Scroll Reveal Animations** — staggered entrance with IntersectionObserver
- **3D Tilt + Glare Effect** on hero banner with perspective transforms
- **Custom SVG Checkboxes** with animated stroke-dasharray transitions
- **Ripple Click Effects** on case conversion cards
- **Shimmer Hover Effects** on interactive elements
- **Custom Cursor** with glow trail (desktop only)
- **Toast Notifications** — success/error/info with auto-dismiss
- **Dark/Light Theme** with localStorage persistence
- **Fully Responsive** — mobile-first layout with adaptive grids

### 🔒 Security & Validation
- **Hacker-mindset input validation** — 1M character cap prevents browser freeze
- **Client-side only** — zero network requests, no data leakage
- **Disabled-state guards** — buttons disable when no text is entered, preventing empty operations

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/m-sharique-sabir/CaseChange.git
cd CaseChange

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Component-based UI with hooks, context, and memoized rendering |
| **TailwindCSS 4** | Utility-first styling with custom Neumorphism design tokens |
| **Vite 8** | Lightning-fast HMR and optimized production builds |
| **Lucide React** | Consistent, tree-shakeable icon system |
| **Vanilla JS Utilities** | Zero-dependency text processing functions |

---

## 🏗️ Technical Architecture

```
CaseChange-Web-App/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images & media
│   │   └── m-sharique-sabir.jpeg    # Developer profile photo
│   ├── components/                  # React UI components
│   │   ├── AdvancedOptions.jsx      # Expandable text operations panel
│   │   ├── CaseButtons.jsx          # 20+ case conversion cards with tabs
│   │   ├── CaseIconFallbacks.jsx    # Fallback icons for case types
│   │   ├── CustomCursor.jsx         # Animated cursor with glow trail
│   │   ├── CustomSeparator.jsx      # Custom separator tool with checkbox
│   │   ├── FindReplace.jsx          # Find & replace with match counter
│   │   ├── HeroBanner.jsx           # 3D tilt hero with profile & badges
│   │   ├── ProfessionalFooter.jsx   # Developer info, skills & tech stack
│   │   ├── StatsPanel.jsx           # 12+ real-time statistics cards
│   │   ├── TextInput.jsx            # Main input with undo/redo/copy/download
│   │   └── ToastContainer.jsx       # Toast notification system (context-based)
│   ├── hooks/                       # Custom React hooks
│   │   ├── useScrollReveal.js       # IntersectionObserver scroll animations
│   │   ├── useTextConverter.js      # Text state management with undo/redo
│   │   └── useTiltHover.js          # 3D perspective tilt + glare effect
│   ├── utils/                       # Pure utility functions
│   │   ├── caseConverters.js        # 15 case conversion functions
│   │   ├── customSeparator.js       # Text ops: find/replace, filter, slugify, etc.
│   │   └── textStatistics.js        # Real-time text analysis engine
│   ├── App.jsx                      # Root layout, theme toggle, scroll reveals
│   ├── index.css                    # Neumorphism design system + animations
│   └── main.jsx                     # React entry point with ToastProvider
├── index.html                       # HTML shell
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
└── eslint.config.js                 # ESLint rules
```

### 🧠 Core Logic Flow

```
User Input (TextInput.jsx)
    ├── useTextConverter hook → manages text state + undo/redo stack
    ├── CaseButtons.jsx → calls converter functions → updates text state
    ├── StatsPanel.jsx → memoized getStats() → real-time metrics
    └── AdvancedOptions.jsx → text ops (cleanup, encode, extract, etc.)
        ├── FindReplace.jsx → regex-based find & replace
        └── CustomSeparator.jsx → custom delimiter insertion
```

---

## 🎨 Design System

The Neumorphism theme uses CSS custom properties for consistent styling:

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--color-neu-light` | `#e0e5ec` | — |
| `--color-neu-dark` | — | `#2d3436` |
| Panel shadow | `8px 8px 16px rgba(0,0,0,0.15)` | `6px 6px 12px rgba(0,0,0,0.4)` |
| Inset shadow | `inset 5px 5px 10px rgba(0,0,0,0.12)` | `inset 4px 4px 8px rgba(0,0,0,0.35)` |

**Component classes:** `.panel` · `.neu-card` · `.neu-inset` · `.neu-input` · `.btn-action` · `.neu-btn-sm` · `.neu-tab-bar` · `.neu-badge` · `.neu-nav` · `.neu-footer`

---

## 👨‍💻 Developer Profile

<div align="center">

### **Mohammad Sharique Sabir**

*Senior DevOps Engineer & Open-Source Contributor*

</div>

A Software Engineer crafting clean, scalable web experiences. Passionate about modern frontend, developer tooling, and building products that make a difference.

- 📞 **WhatsApp:** [+92 339 2409950](https://wa.me/923392409950)
- 📧 **Email:** [mohammadsharique2409950@gmail.com](mailto:mohammadsharique2409950@gmail.com)
- 🐙 **GitHub:** [@m-sharique-sabir](https://github.com/m-sharique-sabir)
- 💼 **LinkedIn:** [m-sharique-sabir](https://linkedin.com/in/m-sharique-sabir)

---

## 🤝 Why Use This?

- **⚡ Frictionless Workflow** — Input at the top, tools at your fingertips. No page navigation, no waiting.
- **🔒 Privacy-First** — Your text never leaves the browser. Period.
- **📊 Insightful** — Real-time statistics give you instant understanding of your content.
- **🎨 Beautiful** — Neumorphism design with smooth animations that feel professional, not gimmicky.
- **🛡️ Robust** — Input validation, character limits, and disabled-state guards prevent errors before they happen.
- **🌙 Dark Mode** — Full dark/light theme with persistent preference.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Mohammad Sharique Sabir](https://github.com/m-sharique-sabir)**

© 2025 Mohammad Sharique Sabir. All rights reserved.

</div>

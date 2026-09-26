# LawLens AI - GenAI Legal Document Intelligence Workspace

LawLens AI is a production-quality GenAI web application built to make legal information and basic legal assistance more accessible by helping users understand, compare, and navigate legal documents. 

It transforms complicated legal documents into clear, actionable information while helping users prepare for conversations with legal professionals.

## Problem Statement Alignment & GenAI Integration
This project directly solves the hackathon problem statement:
- **UPLOAD & UNDERSTAND**: Users can upload legal documents (simulated via Vite React app drag-and-drop).
- **DETECT**: The application utilizes **Google Gemini (Vertex AI)** backend integration to analyze text and detect critical clauses.
- **COMPARE**: Automated comparison between two iterations of an agreement.
- **ASK**: Document-grounded Q&A interface using Gemini embeddings architecture to securely retrieve answers only found within the text.
- **NAVIGATE & TAKE ACTION**: The AI extracts dates into a visual Timeline and builds a smart checklist for legal consultation prep.

*Note: For demo accessibility without active API keys, the frontend is currently deployed in a robust Mock/Demo mode, while the secure `server` directory contains the production-ready Node.js + Express backend configured with `@google/generative-ai`, `helmet`, and `cors` for safe text extraction.*

## Code Quality & Efficiency
- **React + Vite**: Built on a modern, ultra-fast toolchain.
- **Tailwind CSS v4 & Framer Motion**: Provides a premium, hackathon-winning UI.
- **Code Splitting**: Implemented `React.lazy()` and `<Suspense>` to drastically reduce JavaScript chunk sizes, ensuring rapid load times (High Efficiency).
- **Strict TypeScript**: Guarantees type safety across components.

## Security
The `/server` module implements industry-standard security headers via `helmet`, `cors` protection, and environment variable management (`dotenv`) to ensure Gemini API keys are never exposed on the frontend.

## Testing
We have established a robust unit testing suite using **Vitest** and **React Testing Library** (`src/App.test.tsx`). The test suite ensures core routes and dashboards mount flawlessly.

## Accessibility (a11y)
The user interface implements semantic HTML5 structure (`<main>`, `<nav>`), visually hidden screen-reader text, and ARIA labeling across all major components for WCAG compliance.

## Getting Started

### Run the Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`

### Run the Tests
\`\`\`bash
npm run test
\`\`\`

### Run the Backend API
\`\`\`bash
cd server
npm install
node index.js
\`\`\`

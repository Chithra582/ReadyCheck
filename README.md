ReadyCheck — AI Interview Readiness Evaluator
ReadyCheck is an AI-powered tool designed to objectively measure a student's interview readiness in under 2 minutes. It evaluates profile data, resumes, voice communication, and portfolio quality to provide an actionable readiness score and a 7-day improvement roadmap.

🚀 Our Approach
The "ReadyCheck" methodology focuses on four core dimensions that recruiters prioritize during the initial 30-second screening:

Technical Fit: Benchmarking skills against target role (SDE, PM, Data) and company tier (FAANG vs. Startup).
Resume Impact: Analyzing for ATS-friendly keywords, action verbs, and measurable impact metrics (XYZ formula).
Communication Clarity: Using voice transcription to detect filler words, STAR structure, and optimal pacing.
Portfolio Quality: Evaluating GitHub activity, project diversity, and "recency" of contributions.
Parallel Processing Architecture
To achieve the < 2-minute goal, ReadyCheck simulates a parallel execution flow:

Claude 3 API for deep resume/JD matching and action plan generation.
OpenAI Whisper for high-accuracy voice transcription.
spaCy / PyResparser for semantic entity extraction from PDFs.
GitHub REST API for real-time repository health checks.
🛠️ Tech Stack
Frontend: React 19 + Vite 8
Styling: Tailwind CSS v4 (with @tailwindcss/vite plugin)
Icons: Lucide React
Charts: Recharts (Radar breakdown)
Animations: Framer Motion
🏃 How to Run Locally
Prerequisites
Node.js (v18 or higher)
npm or yarn
Setup Instructions
Clone the project:

cd ReadyCheck
Install dependencies:

npm install
Run the development server:

npm run dev
Access the application: Open http://localhost:5173/ in your browser.

📝 Key Features
Fast Intake Wizard: 4-step onboarding (Profile -> Resume -> Voice -> Portfolio).
Interactive Dashboard: Radar charts comparing your scores against peer benchmarks.
Critical Red Flags: Immediate identification of "deal-breaker" issues in your profile.
7-Day Action Plan: A customized, daily task list generated based on your specific gaps.
Re-assessment Tracking: Built-in reminder to re-evaluate after following the action plan.
© 2026 ReadyCheck AI. All rights reserved.

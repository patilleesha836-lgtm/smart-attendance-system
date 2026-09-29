# Attendance OS — Student Attendance System

A single-page React + Vite app for tracking student attendance, styled with a
dark glassmorphism UI (cyan / indigo neon accents). Data is persisted to
`localStorage`, so no backend is required.

## Features
- **Dashboard** — today's stats, overall attendance rate, recent days
- **Students** — add/remove students (name, roll number, class)
- **Mark Attendance** — pick a date, mark each student Present / Late / Absent, "All Present" shortcut
- **Reports** — per-student attendance %, CSV export

## Setup (VS Code)

1. Unzip this folder and open it in VS Code.
2. Open a terminal in the project root and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Notes
- Data lives in your browser's `localStorage` under `attos_students` and
  `attos_attendance` — clearing site data will reset it.
- A few sample students are seeded on first run; delete them from the
  Students tab if you don't need them.

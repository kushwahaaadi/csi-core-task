# 🏆 CSI Bennett University — PR & Management Task & Leaderboard Warzone

The official **Computer Society of India (CSI) Student Chapter at Bennett University** web application, transformed into a high-stakes **PR & Outreach Task & Candidate Referral Portal** with live rankings and Supabase cloud persistence.

---

## ⚡ Key Features

1. **Editorial Chic & Brutalist Aesthetic**:
   - Custom palette inspired by `element.jsx`: Rich Cream (`#f7f4ed`), Deep Soil (`#201915`), Vibrant Coral Blush (`#f2765e`), and Navy Blue (`#315b8c`).
   - Interactive living generative particle canvas in Hero and Event sections with mouse repulsion and node links.
   - Interactive 3D spherical rotating archive cloud (`#community`) featuring physics-based mouse/touch drag with momentum.
   - Infinite marquee ticker with dynamic sound & tag loops.

2. **PR & Management Junior Task System**:
   - Juniors log every student attendee they convince to register for campus events.
   - **Candidate Referral Key**: Every junior's Bennett University Enrollment Number (e.g., `S24CSEU1214`) acts as their unique referral tracking key.
   - **Enrollment Validation**: Enforces Bennett University format (`S24CSEU1214`, `E23CSEU0045`) with real-time feedback.
   - **Deduplication Engine**: Prevents duplicate attendee registrations for the same event to guarantee fair competition.
   - **Direct Referral URLs**: Juniors can share `http://localhost:3000/?ref=S24CSEU1214`, which auto-populates their referral code when opened.

3. **Live Campus Leaderboard**:
   - **Top 3 Podium**: Gold 👑, Silver 🥈, and Bronze 🥉 ranks with badges, total XP, and verified attendee count.
   - **Live Activity Ticker**: Real-time ticker streaming recent registrations across campus.
   - **Personal Scorecard**: Type in any enrollment number (e.g., `S24CSEU1214`) to instantly check standing, rank, total referrals, and copy your personal link.
   - Searchable, filterable campus table.

4. **Supabase Cloud Integration**:
   - Built with `@supabase/supabase-js`.
   - **Offline-First Resilience**: Works instantly out of the box using persistent local storage seed data, so you never encounter blank screens.
   - **Cloud Sync**: Connect your Supabase project URL and Anon Key directly via `.env` or the in-app **Supabase Database Modal**.
   - Ready-to-run schema script: [`supabase_setup.sql`](./supabase_setup.sql).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Dev Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Connect Supabase (Optional for Cloud Sync)
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
Then run the SQL statements in [`supabase_setup.sql`](./supabase_setup.sql) in your Supabase SQL editor. You can also click the **"Supabase"** button in the navbar to test and save credentials directly from the UI!

---

## 📋 Technology Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS + Custom Animations (Marquee, 3D Canvas, Physics Sphere)
- **Database & Auth**: Supabase (@supabase/supabase-js) + LocalStorage Cache
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

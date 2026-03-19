# Chendure CARE+

Production-ready MVP for healthcare patient engagement and follow-up automation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Evolution API (WhatsApp)

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Configure `.env` with your database and Evolution API credentials.
4. `npx prisma migrate dev --name init`
5. `npm start`

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Access at `http://localhost:3000/dashboard`

---

## 🏗️ Architecture

### Tech Stack
- **Backend**: Express, Prisma, PostgreSQL
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons
- **Messaging**: Evolution API (WhatsApp)
- **AI**: Simple rule-based classifier (expandable to OpenAI/Claude)

### Core Logic
- **Daily Cron**: Automatically triggers patient follow-up messages based on their treatment day.
- **Webhook Handler**: Captures patient responses, updates timelines, and triggers alerts for "Worse" symptoms.
- **Alert System**: Real-time dashboard notification for high-priority patient needs.

## 📁 Project Structure
```
/backend
  /controllers - Business logic
  /routes      - API endpoints
  /services    - WhatsApp, AI, and Automation engines
  /prisma      - Database schema
/frontend
  /app         - Next.js pages and layouts
  /components  - Reusable UI elements
  /lib         - Shared utilities (cn, etc.)
```

## 🔥 Key APIs
- `POST /patients`: Onboard new patient & start flow.
- `POST /webhook`: Receive WhatsApp messages.
- `POST /followup/run`: Manually trigger the daily automation engine.

---
Designed for Chendure Hospital. Scalable, Modular, and HMS-ready.

# Plantorium — Coming Soon

A responsive Coming Soon landing page for Plantorium, a plant consulting and design studio.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Supabase (email subscription storage)
- **Fonts:** Brygada 1918, Inter (Google Fonts)

## Features

- Responsive design (320px to ultrawide)
- Email subscription form with validation
- Duplicate email detection
- Supabase database integration
- Plant-themed decorative elements with layered positioning
- Radial gradient background

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account with a `subscribers` table

### Installation

```bash
git clone https://github.com/yourusername/plantorium.git
cd plantorium
npm install
```

### Environment Variables

Create a `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

Opens at http://localhost:3000

### Build for Production

```bash
npm run build
```

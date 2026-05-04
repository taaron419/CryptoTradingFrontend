# Crypto Trading Frontend

React and Tailwind CSS frontend for a crypto trading application.

## Features

- Coinbase-inspired responsive landing page
- Live cryptocurrency data from the backend API
- Tradable, top gainer, and new listing crypto views
- Protected user profile page
- Sign in and sign up flows
- Add new cryptocurrency form
- Crypto asset detail pages

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app runs at:

```txt
http://localhost:5173
```

## Backend API

By default, the frontend expects the backend API at:

```txt
http://localhost:5000
```

You can override this with:

```env
VITE_API_URL=https://your-backend-url.com
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

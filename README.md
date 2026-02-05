# Hac Book (Frontend)

This is the frontend application for a personal household accounting system.
Users can record incomes and expenses, manage categories, and view summaries
through a clean and responsive UI.

Backend repository 👉 [Hac Book API](https://github.com/katsu0511/hac_book_api)

## Features

- User authentication (login / logout / signup)
- Dashboard
  - Income and expense summary in specific dates
  - Expense breakdown by category in specific dates
- Transaction management
  - Create, edit and delete income and expense records
  - List monthly records
- Category management
  - Parent-child category structure
  - Create and edit user-created categories

### Login
![Login](docs/login.png)

### Dashboard
![Dashboard](docs/dashboard.png)

### Transactions
![Transactions](docs/transactions.png)

### Categories
![Categories](docs/categories.png)

> All screenshots are taken in desktop view.
> The application is fully responsive and supports mobile and tablet devices.

## Tech Stack

### Frontend

- React
- TypeScript
- Next.js (App Router)
- Tailwind CSS
- Fetch API
- React Hook Form

### Infrastructure

- Vercel

## System Configuration

- Next.js (Vercel)

## Architecture

- App Router based routing
- Component-based design
- API communication via REST
- Authentication handled by HttpOnly cookies
- Server-side authentication check

## Backend Integration

This frontend communicates with the backend REST API.
Authentication is handled via JWT stored in HttpOnly cookies.

Backend repository 👉 [Hac Book API](https://github.com/katsu0511/hac_book_api)

## Deployment

- Vercel
- CI/CD is introduced by Vercel

## Getting Started

```bash
npm install
npm run dev
```

Create ```.env```:

```
API_BASE_URL=http://localhost:8080
```

## Future Improvements

- Improve loading and error handling UX
- Add more flexible summaries
- Develop mobile apps (iOS / Android)

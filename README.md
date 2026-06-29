# URL Shortener Demo

This repository demonstrates the **full-stack logic behind a URL shortener**.

It includes a modern React frontend built with Vite and Tailwind CSS v4, and an Express Node.js backend.

The goal of this demo is to clearly show **how the core backend routes work** and how they integrate with a frontend interface.

This project focuses on two main responsibilities:
1. Creating a short URL via an API.
2. Redirecting a short URL to the original link.

---

## Project Structure

```bash
URL-Shortener-Demo
│
├── backend (Node.js & Express)
│   ├── .env
│   ├── server.js
│   ├── models/Url.js
│   └── routes/
│       ├── shortenURL.js
│       └── redirect.js
│
└── frontend (React & Vite)
    ├── .env
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        └── index.css
```

---

## Getting Started

### 1. Backend Setup

The backend runs on port 4000.

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure MongoDB is running on your machine (default port 27017). You can adjust the `MONGO_URI` in `backend/.env` if needed.
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup

The frontend runs on port 5173.

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173` and enjoy the modern, glassmorphism UI!

---

## How It Works

### The Frontend Flow

The React frontend provides a beautifully designed interface for users to enter a long URL.
When submitted, it sends a `POST` request using Axios to the backend `http://localhost:4000/shorten`.
The backend responds with a short URL (e.g. `http://localhost:4000/aZ3xP1`) which is then displayed to the user with a convenient "Copy" button.

### The Backend Flow

This demo includes **two routes** representing the core functionality of a URL shortener.

#### 1. Shorten URL Route (`backend/routes/shortenURL.js`)
**Route:** `POST /shorten`
- The frontend sends a request with a long URL.
- The server generates a unique short code.
- The mapping is stored in the MongoDB database using Mongoose.
- The server returns the shortened URL.

#### 2. Redirect Route (`backend/routes/redirect.js`)
**Route:** `GET /:code`
- The user opens the shortened link (e.g., `http://localhost:4000/aZ3xP1`).
- The server extracts the short code from the URL.
- The database is queried for that code.
- If found, the server redirects the user's browser to the original URL.

---

## Database Mapping

When a URL is shortened, it creates a database mapping like this:

| shortCode | originalUrl |
|-----------|-------------|
| aZ3xP1    | https://example.com/blog/how-backend-authentication-works |

---

## Technologies Used

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS v4**: Utility-first styling (configured seamlessly via `@import "tailwindcss";`)
- **Axios**: HTTP client
- **Lucide React**: Beautiful iconography

### Backend
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **CORS & Dotenv**: Middleware and environment config

---

## License

This project is intended for **learning and demonstration purposes**.
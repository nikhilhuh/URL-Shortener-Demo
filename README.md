# URL Shortener Demo

This repository demonstrates the **basic backend routing logic behind a URL shortener**.

The goal of this demo is **not to provide a complete production-ready application**, but to clearly show **how the core backend routes for a URL shortener work**.

This project focuses only on two responsibilities:

1. Creating a short URL
2. Redirecting a short URL to the original link

Everything else such as database setup, server initialization, validation, and deployment is intentionally left for developers to implement themselves.

---

# Project Structure

```bash
URL-Shortener-Demo
│
├── .env
├── shortenURL.js
└── redirect.js
```

---

# Environment Variables

The `.env` file contains placeholders for required environment variables.

```bash
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### MONGO_URI
Connection string for the MongoDB database where URL mappings will be stored.

### BASE_URL
The base domain used when generating shortened URLs.

Example output:
```bash
http://localhost:5000/aZ3xP1
```

---

# How URL Shorteners Work

A URL shortener works by **mapping a short code to a long URL**.

Example:

Original URL
```bash
https://example.com/blog/how-backend-authentication-works
```

Generated short URL
```bash
http://localhost:5000/aZ3xP1
```

Database mapping:

| shortCode | originalUrl |
|-----------|-------------|
| aZ3xP1    | https://example.com/blog/how-backend-authentication-works |

Whenever someone opens the short link, the backend:

1. extracts the short code
2. finds the corresponding URL in the database
3. redirects the user to the original link

---

# Backend Routes

This demo includes **two routes** representing the core functionality of a URL shortener.

---

## 1. Shorten URL Route

File: `shortenURL.js`

Route:
```bash
POST /shorten
```

### Purpose
Creates a shortened URL for a provided long URL.

### Flow

1. The frontend sends a request with a long URL.
2. The server generates a unique short code.
3. The mapping is stored in the database.
4. The server returns the shortened URL.

Example request body:
```bash
{
"url": "https://example.com/article"
}
```

Example response:
```bash
{
"shortUrl": "http://localhost:5000/aZ3xP1"
}
```

---

## 2. Redirect Route

File: `redirect.js`

Route:
```bash
GET /:code
```


### Purpose
Redirects users from a short URL to the original long URL.

### Flow

1. The user opens the shortened link.
2. The server extracts the short code from the URL.
3. The database is queried for that code.
4. If found, the server redirects the user to the original URL.

Example:

User visits:
```bash
http://localhost:5000/aZ3xP1
```

Server finds:
```bash
aZ3xP1 → https://example.com/article
```

Server responds with a redirect to the original URL.

---

# Frontend to Backend Flow

### Step 1 — User Enters URL

The user enters a long URL in the frontend application.

Example:
```bash
https://example.com/very/long/article/link
```

---

### Step 2 — Frontend Sends Request

The frontend sends a POST request to the backend:
```bash
POST /shorten
```

With body:
```bash
{
"url": "https://example.com/very/long/article/link"
}
```

---

### Step 3 — Backend Generates Short Code

The backend generates a random short code such as:
```bash
kT9Lm2
```

---

### Step 4 — Store Mapping

The backend stores the mapping in the database.

Example record:
```bash
shortCode: kT9Lm2
originalUrl: https://example.com/very/long/article/link
```

---

### Step 5 — Return Short Link

The backend returns a shortened URL to the frontend:
```bash
http://localhost:5000/kT9Lm2
```

The frontend can display or copy this link for the user.

---

### Step 6 — User Opens Short Link

When someone opens the short link:
```bash
http://localhost:5000/kT9Lm2
```

The request hits the redirect route:
```bash
GET /:code
```

---

### Step 7 — Backend Redirects User

The backend finds the original URL associated with the code and redirects the browser to it.

Result:

The user lands on the original page.

---

# Purpose of This Demo

This project is designed to help developers understand:

- How URL shorteners work internally
- How backend routes handle URL creation and redirection
- How short code to URL mapping works

It intentionally keeps the implementation minimal so developers can expand it themselves.

Possible improvements include:

- URL validation
- Custom aliases
- Expiration links
- Click tracking
- Analytics
- Rate limiting
- Authentication
- Production deployment

---

# License

This project is intended for **learning and demonstration purposes**.
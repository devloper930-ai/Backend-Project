# Backend API Documentation for Frontend Developers

This backend provides user authentication, profile lookup, post creation, and post deletion APIs for a simple social-style application.

## Base URL

- Local development: `http://localhost:3000`
- Production: use your deployed backend domain

## Authentication Model

Authentication is handled with a JWT stored in an HTTP-only cookie named `AuthToken`.

### Important frontend note

For protected endpoints, your frontend must send cookies with the request:

```js
fetch(url, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

If you are using Axios:

```js
axios.defaults.withCredentials = true;
```

## Environment Variables

Add these in your `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

## Run the Server

```bash
npm install
npm run dev
```

The server runs on `PORT` (default `3000`).

---

# API Endpoints

## 1) Register a User

### Request

- Method: `POST`
- Endpoint: `/Auth/add`
- Headers:
  - `Content-Type: application/json`

### Body

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "name": "John Doe",
  "password": "securePassword123"
}
```

### Response

- `201 Created` on success
- Returns a success message and the created user data
- Also sets the `AuthToken` cookie

### Example

```js
await fetch("http://localhost:3000/Auth/add", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    password: "securePassword123"
  })
});
```

---

## 2) Login

### Request

- Method: `POST`
- Endpoint: `/Auth/Login`
- Headers:
  - `Content-Type: application/json`

### Body

```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

You can also send `email` instead of `username`.

### Response

- `200 OK` on success
- Sets the `AuthToken` cookie

### Example

```js
await fetch("http://localhost:3000/Auth/Login", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "john_doe",
    password: "securePassword123"
  })
});
```

---

## 3) Logout

### Request

- Method: `GET`
- Endpoint: `/Auth/LogOut`

### Response

- Clears the `AuthToken` cookie
- Returns a success message

### Example

```js
await fetch("http://localhost:3000/Auth/LogOut", {
  method: "GET",
  credentials: "include"
});
```

---

## 4) Get User Profile

### Request

- Method: `GET`
- Endpoint: `/apis/profile/:username`

### Example

```http
GET /apis/profile/john_doe
```

### Response

```json
{
  "profile": {
    "username": "john_doe",
    "name": "John Doe",
    "posts": [
      {
        "_id": "post_id",
        "image": "image_url"
      }
    ]
  }
}
```

### Example

```js
const response = await fetch("http://localhost:3000/apis/profile/john_doe");
const data = await response.json();
```

---

## 5) Create a Post

### Request

- Method: `POST`
- Endpoint: `/apis/new`
- Authentication: required

### Headers

- `Content-Type: application/json`

### Body

```json
{
  "title": "My First Post",
  "description": "This is a sample post description",
  "image": "https://example.com/post.jpg"
}
```

### Response

- `201 Created` on success
- Returns a success message and updated user data

### Example

```js
await fetch("http://localhost:3000/apis/new", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "My First Post",
    description: "This is a sample post description",
    image: "https://example.com/post.jpg"
  })
});
```

---

## 6) Delete a Post

### Request

- Method: `DELETE`
- Endpoint: `/apis/delete/:postId`
- Authentication: required

### Example

```http
DELETE /apis/delete/64f4c89b4d9a2c8b16f0a123
```

### Response

- `200 OK` on success
- Returns a deleted-success message

### Example

```js
await fetch("http://localhost:3000/apis/delete/64f4c89b4d9a2c8b16f0a123", {
  method: "DELETE",
  credentials: "include"
});
```

---

## 7) Get a Single Post

### Request

- Method: `GET`
- Endpoint: `/apis/post/:postId`

### Example

```http
GET /apis/post/64f4c89b4d9a2c8b16f0a123
```

### Response

```json
{
  "success": true,
  "post": {
    "_id": "64f4c89b4d9a2c8b16f0a123",
    "title": "My First Post",
    "description": "This is a sample post description",
    "image": "https://example.com/post.jpg"
  }
}
```

---

# Error Response Notes

Most endpoints return JSON errors like:

```json
{
  "message": "Invalid credentials"
}
```

or

```json
{
  "success": false,
  "message": "User not found."
}
```

Common status codes:

- `200` — success
- `201` — created
- `400` — invalid request / missing params
- `401` — unauthorized / invalid token
- `404` — resource not found
- `409` — duplicate user registration
- `500` — server error

---

# Frontend Integration Tips

1. Always include `credentials: "include"` for routes that depend on the auth cookie.
2. Save the `AuthToken` cookie automatically from the browser when the backend sets it.
3. If you are using a separate frontend domain, ensure CORS and cookie settings are configured correctly.
4. Use the `username` or `email` fields in the login request as supported by the backend.

---

# Data Model Summary

## User

```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "hashed string",
  "posts": ["post ObjectId"]
}
```

## Post

```json
{
  "title": "string",
  "description": "string",
  "image": "string (optional)"
}
```

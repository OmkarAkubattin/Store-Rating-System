# Store Rating System API

## Authentication

### POST /api/auth/register

- **Request Body:**
  - `name`: string
  - `email`: string
  - `password`: string
  - `role`: "admin" | "storeOwner" | "user"
- **Response:**
  - `success`: boolean
  - `token`: string
  - `user`: { id, name, email, role }

### POST /api/auth/login

- **Request Body:**
  - `email`: string
  - `password`: string
- **Response:**
  - `success`: boolean
  - `token`: string
  - `user`: { id, name, email, role }

### GET /api/auth/me

- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `success`: boolean
  - `user`: { id, name, email, role }

---

## Admin Endpoints

### GET /api/admin/users

- **Headers:**
  - `Authorization: Bearer <admin token>`
- **Response:**
  - `success`: boolean
  - `data`: [ { id, name, email, role, ... } ]

### GET /api/admin/users/:id

- **Headers:**
  - `Authorization: Bearer <admin token>`
- **Response:**
  - `success`: boolean
  - `data`: { id, name, email, role, store, ratings }

### POST /api/admin/stores

- **Headers:**
  - `Authorization: Bearer <admin token>`
- **Request Body:**
  - `name`: string
  - `address`: string
  - `ownerId`: userId
- **Response:**
  - `success`: boolean
  - `data`: { id, name, address, ownerId }

### GET /api/admin/stores

- **Headers:**
  - `Authorization: Bearer <admin token>`
- **Response:**
  - `success`: boolean
  - `data`: [ { id, name, address, ownerId, averageRating, totalRatings } ]

---

## Store Owner Endpoints

### GET /api/store-owner/stats

- **Headers:**
  - `Authorization: Bearer <storeOwner token>`
- **Response:**
  - `success`: boolean
  - `data`: { store, averageRating, totalRatings }

### GET /api/store-owner/ratings

- **Headers:**
  - `Authorization: Bearer <storeOwner token>`
- **Response:**
  - `success`: boolean
  - `data`: [ { id, rating, comment, user: { id, name, email }, createdAt } ]

---

## User Endpoints

### GET /api/user/stores

- **Headers:**
  - `Authorization: Bearer <user token>`
- **Response:**
  - `success`: boolean
  - `data`: [ { id, name, address, averageRating, totalRatings } ]

### POST /api/user/ratings

- **Headers:**
  - `Authorization: Bearer <user token>`
- **Request Body:**
  - `storeId`: number
  - `rating`: number
  - `comment`: string
- **Response:**
  - `success`: boolean
  - `data`: { id, storeId, userId, rating, comment, createdAt }

---

## Error Response

- **Format:**
  - `success`: false
  - `error`: string

---

## Notes

- All protected endpoints require a valid JWT token in the `Authorization` header.
- Roles: `admin`, `storeOwner`, `user`.
- All responses are JSON.

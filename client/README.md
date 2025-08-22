# Store Rating System Frontend

## Project Structure

```
client/
  public/
  src/
    assets/
    components/
      admin/
      auth/
      shared/
      storeOwner/
      user/
    context/
    services/
    utils/
    App.jsx
    main.jsx
  package.json
  vite.config.js
  README.md
```

## Main Features

- User authentication (register, login, JWT-based session)
- Role-based dashboards: Admin, Store Owner, User
- Admin: Manage users and stores
- Store Owner: View store stats and ratings
- User: Browse stores, submit ratings

## Key Pages & Components

- `auth/Login.jsx`, `auth/Register.jsx`: User authentication
- `admin/Dashboard.jsx`, `admin/UserList.jsx`, `admin/StoreList.jsx`, `admin/CreateUser.jsx`, `admin/CreateStore.jsx`, `admin/UserDetails.jsx`: Admin management
- `storeOwner/Dashboard.jsx`, `storeOwner/RatingList.jsx`: Store owner dashboard and ratings
- `user/StoreList.jsx`, `user/StoreCard.jsx`: User store browsing and rating
- `shared/Navbar.jsx`, `shared/Layout.jsx`, `shared/ProtectedRoute.jsx`, `shared/Loading.jsx`: Shared UI and routing

## Service Layer (API Calls)

- `services/auth.js`: Auth endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- `services/admin.js`: Admin endpoints (`/api/admin/users`, `/api/admin/stores`)
- `services/storeOwner.js`: Store owner endpoints (`/api/store-owner/stats`, `/api/store-owner/ratings`)
- `services/users.js`: User endpoints (`/api/user/stores`)
- `services/ratings.js`: User ratings (`/api/user/ratings`)

## Example Usage

### Login

```js
import { useAuth } from "../context/AuthContext";
const { login } = useAuth();
const result = await login(email, password);
```

### Fetch Stores (User)

```js
import userService from "../services/users";
const stores = await userService.getStores();
```

### Fetch Store Stats (Store Owner)

```js
import storeOwnerService from "../services/storeOwner";
const stats = await storeOwnerService.getStoreStats();
```

## Environment Variables

- `VITE_API_URL` (if used): Set your backend API base URL

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. The app runs at `http://localhost:5173` by default.

## Notes

- All API requests require a valid JWT token in `Authorization` header after login.
- Role-based routing is handled in `ProtectedRoute.jsx` and context.
- UI built with React, Tailwind CSS, Lucide icons.

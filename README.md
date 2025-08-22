# Store Rating System

A full-stack web application for rating stores, with role-based dashboards for Admin, Store Owner, and User.

## Project Structure

```
Store-Rating-System/
  backend/    # Node.js, Express, Sequelize, MySQL
  client/     # React, Vite, Tailwind CSS
  README.md   # (this file)
```

## Features

- User authentication (JWT)
- Admin: Manage users and stores
- Store Owner: View store stats and ratings
- User: Browse stores, submit ratings
- RESTful API with role-based access
- Responsive UI with React and Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MySQL

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database in `backend/config/db.js`
4. Run migrations/seeders if needed
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. `cd client`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. The app runs at `http://localhost:5173`

## Documentation

- Backend API: See `backend/README.md`
- Frontend usage: See `client/README.md`

## Environment Variables
- Backend: See `.env.example` or set DB and JWT config in `backend/config`
- Frontend: Set `VITE_API_URL` if needed

## License
MIT

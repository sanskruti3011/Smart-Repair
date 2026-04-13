# Smart Repair System

Smart Repair System is a full-stack repair management platform with separate user, service provider, and admin workflows. It includes JWT authentication, role-based access, image uploads, repair status tracking, notifications with Socket.IO, reviews, support tickets, provider search, and responsive dark-mode dashboards.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Real-time updates: Socket.IO
- Authentication: JWT + bcrypt

## Folder Structure

```text
Smart Fix/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      uploads/
      utils/
      server.js
  frontend/
    src/
      api/
      components/
      context/
      hooks/
      layouts/
      pages/
      styles/
```

## Backend Setup

1. Open a terminal in `E:\tmp\Smart Fix\backend`
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env`
4. Update the values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart-repair-system
JWT_SECRET=change-this-secret
CLIENT_URL=http://localhost:5173
```

5. Seed sample data:

```bash
npm run seed
```

6. Start the backend:

```bash
npm run dev
```

## Frontend Setup

1. Open a terminal in `E:\tmp\Smart Fix\frontend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` with:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. Start the frontend:

```bash
npm run dev
```

## MongoDB Setup

1. Install MongoDB Community Server locally, or use MongoDB Atlas.
2. If using local MongoDB, ensure the MongoDB service is running on `mongodb://127.0.0.1:27017`.
3. Create database `smart-repair-system` automatically by running the backend or seed script.

## Sample Credentials

- Admin: `admin@smartrepair.com` / `password123`
- User: `user@smartrepair.com` / `password123`
- Provider: `provider1@smartrepair.com` / `password123`

## API Routes List

- `POST /api/auth/register/user`
- `POST /api/auth/register/provider`
- `POST /api/auth/login`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/requests`
- `GET /api/users/notifications`
- `PATCH /api/users/notifications/:id/read`
- `POST /api/users/reviews`
- `GET /api/providers`
- `GET /api/providers/directory`
- `GET /api/providers/me`
- `PUT /api/providers/me`
- `GET /api/providers/requests`
- `POST /api/providers/requests/:id/action`
- `POST /api/providers/requests/:id/cost`
- `PATCH /api/providers/requests/:id/status`
- `GET /api/providers/notifications`
- `POST /api/repairs`
- `GET /api/repairs/:id`
- `POST /api/repairs/:id/confirm-price`
- `POST /api/support`
- `GET /api/support/mine`
- `GET /api/admin/analytics`
- `GET /api/admin/users`
- `GET /api/admin/providers`
- `GET /api/admin/requests`
- `GET /api/admin/tickets`
- `PATCH /api/admin/tickets/:id`

## Notes

- Uploaded images are stored in `backend/src/uploads`.
- Pagination is implemented on the provider directory endpoint.
- The UI is mobile-first and tuned for a professional dark theme.

# Expense Tracker

A full-stack app for tracking income and expenses. Add and delete transactions
and see your current balance, total income, and total expenses. Transactions
are stored in MongoDB Atlas.

## Tech stack

- Frontend: React and Vite
- Backend: Node.js, Express, and Mongoose
- Database: MongoDB

## Run locally

You need Node.js, npm, Nodemon, and access to a MongoDB Atlas cluster.

1. Create `backend/.env` using `backend/.env.example` as a template. Fill in
   your database settings and keep `backend/.env` out of version control.
2. From the project root, start the backend in one terminal:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. From the project root, start the frontend in a second terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite. During local development, Vite forwards
   `/api` requests to the Express backend.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/transactions` | List transactions |
| POST | `/api/v1/transactions` | Create a transaction |
| DELETE | `/api/v1/transactions/:id` | Delete a transaction |

## Frontend checks

Run these commands from `frontend/`:

```bash
npm run lint
npm run build
```
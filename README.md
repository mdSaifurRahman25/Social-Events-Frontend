# Kindred (Frontend)

> Small acts. Shared city.

Kindred is a community platform where neighbours organize, discover and join local social-development drives: blood donation camps, cleanups, tree plantations, winter relief, food drives, health camps and education programs.

- **Live site:** https://socialeventsfrontend.vercel.app
- **Live API (server):** https://social-events-backend.vercel.app

## Key Features

- **Secure authentication:** register and log in with email and password (validated: uppercase, lowercase and at least 6 characters) or with Google. Clear success and error toasts on every action.
- **Browse upcoming events:** public events page with type filters and search by title or area. Cards show the thumbnail, title, location, type and date.
- **Create events:** a private, validated form (title, description, type, thumbnail URL, location and date) that blocks past dates. The organizer is identified from the logged-in account.
- **Join and leave events:** log in to join a drive from its details page. Every join is stored in the database with the event and the user.
- **Joined events:** a private page listing the events the logged-in user has joined.
- **Manage your events:** edit (with validation) or delete only the events you created. Other users cannot change them.
- **Profile page:** view your name, photo and email, and update your name and profile photo.
- **JWT-protected API calls:** the frontend requests a short-lived token for every protected request and the server verifies it.
- **Light and dark theme** for the whole app, responsive layout, and skeleton loaders while data loads.

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, next-themes |
| Authentication | Better Auth (email/password, Google, JWT plugin), MongoDB adapter |
| UI helpers | lucide-react, sonner (toasts), date-fns |
| Deployment | Vercel |

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | public | Banner, features, recent upcoming events, photo gallery, newsletter |
| `/events` | public | All upcoming events with filters and search |
| `/events/[id]` | public | Event details and Join / Leave |
| `/events/create` | private | Create a new event |
| `/events/manage` | private | Your events: edit and delete |
| `/events/[id]/edit` | private | Update one of your events |
| `/events/joined` | private | Events you joined |
| `/profile` | private | View and update your profile |
| `/signin`, `/signup` | public | Authentication |

Private routes are protected by `src/proxy.ts`, which redirects logged-out visitors to `/signin`. The API enforces the same rules on the server.

## Getting Started

**Prerequisites:** Node.js 20 or newer and a MongoDB database (for example MongoDB Atlas).

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (see the table below)

# 3. Start the dev server
npm run dev
```

The app runs at http://localhost:3000. Start the [backend](https://social-events-backend.vercel.app) locally as well (default http://localhost:8000) and point `NEXT_PUBLIC_API_URL` at it.

## Environment Variables

Create a `.env` file in the project root:

| Variable | Description |
|---|---|
| `BETTER_AUTH_URL` | Public URL of this app (for example `http://localhost:3000`) |
| `BETTER_AUTH_SECRET` | Long random string used by Better Auth to sign sessions |
| `MONGODB_URI` | MongoDB connection string (the same database as the backend) |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API (for example `http://localhost:8000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

For Google login, add `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorized redirect URI in the Google Cloud console.

## How Authentication Works

1. The user logs in with Better Auth (session cookie).
2. Before each protected API call the app asks Better Auth for a short-lived JWT.
3. The JWT is sent in the `Authorization: Bearer <token>` header.
4. The backend verifies it against this app's public keys at `/api/auth/jwks`, so identity always comes from the token and never from form data.

## Project Structure

```
src/
  app/            Routes (pages, layouts, API route for Better Auth)
  components/     Navbar, Footer, homepage sections, events and profile components, ui/
  lib/            auth, auth-client, events helpers, password rules, utils
  proxy.ts        Redirects logged-out users away from private routes
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
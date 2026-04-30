# brus

Soda fridge tracker for Webkom. Members register when they take a drink or refill the fridge, and balances are tracked automatically. A weekly shame run every Tuesday at 16:20 applies a debt penalty (`ceil(|saldo| / 100) × 30kr`) to anyone who has been negative for more than 7 days.

## Local development

### 1. Start MongoDB

```bash
docker compose up -d
```

This starts MongoDB on `localhost:27017` with the same credentials as production.

### 2. Configure environment

Create `.env.local`:

```
MONGODB_URI=mongodb://brus:6vPQdOw08ADYLj@localhost:27017/brus?authSource=admin
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MEMBERS_URL=https://members.webkom.dev/
MEMBERS_USERNAME=<ask a Webkom member>
MEMBERS_PASSWORD=<ask a Webkom member>
```

### 3. Start the dev server

```bash
npm run dev
```

### 4. Seed users

Hit `/api/refetch_active_members` once to pull active members from the members API into the local database.

> **Note:** The local Docker database is independent from production — no changes sync between them.

### Option: connect to production DB via SSH tunnel

> ⚠️ Any buy, refill, or shame action will affect real data.

```bash
# Get the MongoDB container's internal IP on the Coolify server
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <mongo-container-id>

# Open the tunnel (keep this terminal open)
ssh -L 27017:<container-ip>:27017 webkom@<server-ip>
```

Then set `MONGODB_URI` in `.env.local` to point at `localhost:27017` with the production credentials.

## Environment variables

| Variable               | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `MONGODB_URI`          | MongoDB connection string                                |
| `NEXT_PUBLIC_BASE_URL` | Base URL used by the cron job to call `/api/applyshame`  |
| `MEMBERS_URL`          | Endpoint for fetching active Webkom members              |
| `MEMBERS_USERNAME`     | Basic auth username for the members API                  |
| `MEMBERS_PASSWORD`     | Basic auth password for the members API                  |

## Deploy (Coolify)

The app builds as a standalone Next.js Docker image (`output: "standalone"`). Coolify builds and deploys automatically on push to `master`.

Set the environment variables above in the Coolify service settings. `NEXT_PUBLIC_BASE_URL` should be the public URL (e.g. `https://brus.webkom.dev`).

**MongoDB service env vars:**
```
MONGO_INITDB_ROOT_USERNAME=brus
MONGO_INITDB_ROOT_PASSWORD=<password>
MONGO_INITDB_DATABASE=brus
```

# brus

brus fridge tracker for Webkom. Members buy and refill drinks, balances are tracked, and a weekly shame run every Tuesday at 16:20 applies a debt penalty (`ceil(|saldo| / 100) × 30kr`) to anyone who has been negative for more than 7 days.

## Local development

### Option A — local MongoDB (safe)

```bash
docker compose up -d   # starts MongoDB on localhost:27017
```

Set `.env.local`:

```
MONGODB_URI=mongodb://root:12345678@localhost:27017/brus?authSource=admin
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Option B — production DB via SSH tunnel

> ⚠️ **This connects to the live database.** Any buy, refill, or reset affects real data.

```bash
# 1. Get the container's internal IP on the Coolify server
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <mongo-container-id>

# 2. Open the tunnel (keep this terminal open)
ssh -L 27017:<container-ip>:27017 webkom@192.168.1.128
```

Set `.env.local`:

```
MONGODB_URI=mongodb://<user>:<password>@localhost:27017/brus?authSource=admin
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Start the dev server

```bash
yarn dev
```

## Environment variables

| Variable               | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `MONGODB_URI`          | MongoDB connection string                               |
| `NEXT_PUBLIC_BASE_URL` | Base URL used by the cron job to call `/api/applyshame` |
| `MEMBERS_URL`          | Endpoint for fetching active Webkom members             |
| `MEMBERS_USERNAME`     | Basic auth username for members API                     |
| `MEMBERS_PASSWORD`     | Basic auth password for members API                     |

## Deploy (Coolify)

The app builds as a standalone Next.js Docker image (`output: "standalone"`). Coolify handles builds and deployments from this repo automatically on push to `master`.

Set the environment variables above in the Coolify service settings. `NEXT_PUBLIC_BASE_URL` should be the public URL of the deployed app (e.g. `https://brus.webkom.dev`).

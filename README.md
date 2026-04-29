# Brus-Frontend

> https://brus-frontend.vercel.app

## Local Development

### MongoDB (via SSH tunnel)

The MongoDB database runs inside a Docker container on the Coolify server. Since the port is not exposed to the host, connect via an SSH tunnel.

**1. Get the container's IP on the server:**

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' f13ul537dxktznnhdkt4f25f
```

**2. Open the tunnel (keep this terminal open while developing):**

```bash
ssh -L 27017:<container-ip>:27017 webkom@192.168.1.128
```

**3. Set your `.env.local`:**

```
MONGODB_URI=mongodb://brus:6vPQdOw08ADYLj@localhost:27017/brus?authSource=admin
```

**4. Start the dev server:**

```bash
yarn dev
```

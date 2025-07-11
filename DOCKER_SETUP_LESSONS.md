
# Lessons Learned: Dockerizing a Full-Stack React + Flask App

This document outlines the steps, challenges, and solutions I encountered while containerizing a full-stack web app using Docker and Docker Compose. It serves as both a learning record and proof of real-world DevOps experience.

## App Overview

- **Frontend:** React (served via NGINX)
- **Backend:** Python Flask (API)
- **Communication:** Frontend makes AJAX calls to Flask API
- **Environment:** Docker, Docker Compose
- **Local Dev Ports:** 3000 (frontend), 5000 (backend)

## What I Set Out to Do

- Containerize both the frontend and backend
- Use Docker Compose to orchestrate services
- Route API calls from React to Flask using internal Docker DNS
- Serve the production React build through NGINX
- Fix CORS and MIME issues along the way

## What I Learned

### 1. Cross-Container Networking

**Problem:** React couldn’t reach Flask using `http://backend:5000`  
**Fix:** Browsers can’t resolve Docker service names. I used a reverse proxy in NGINX or a `"proxy"` config in development, and relative URLs in React code.

### 2. CORS Errors

**Problem:** AJAX requests from React to Flask failed due to Same-Origin Policy  
**Fix:** Installed and configured `flask-cors`:

```python
from flask_cors import CORS
CORS(app)
```

### 3. MIME Type Warnings for JS and CSS

**Problem:** Stylesheets and JS files were served as `text/plain`  
**Fix:** NGINX in Alpine doesn’t include `mime.types` by default. I manually copied it:

```dockerfile
COPY mime.types /etc/nginx/mime.types
```

And added to `nginx.conf`:

```nginx
include /etc/nginx/mime.types;
```

Some minor warnings still remain (e.g., JS file with text/html) but do not break functionality.

### 4. React File Not Found Errors

**Problem:** Console showed 404s for `/static/js/main.xxx.js`  
**Fix:** Realized NGINX was serving `index.html` fallback due to `try_files`, indicating the JS file wasn't present or copied. Solved by ensuring:

```dockerfile
COPY --from=build /app/build /usr/share/nginx/html
```

was correctly placed in the Dockerfile.

### 5. `sudo` Required for Docker

**Problem:** Had to run `sudo` with every Docker command  
**Fix:** Added user to Docker group:

```bash
sudo usermod -aG docker $USER
```

Then restarted session or ran `newgrp docker`.

### 6. Configuration Management

- Split `Dockerfile` into multi-stage build: `node` for React build, `nginx` for serving
- Created a custom `nginx.conf` to handle SPA routing and API proxying
- Ensured `mime.types` was explicitly copied into container

## Final Setup Files

- `Dockerfile.frontend`
- `Dockerfile.backend` (optional if Flask runs directly)
- `docker-compose.yml`
- `nginx.conf`
- `mime.types`

## Outcome

- Both frontend and backend containers communicate seamlessly
- React builds successfully and is served through NGINX
- Flask API responds correctly to AJAX requests
- Environment is now production-adjacent and portable

## Reflection

This project gave me hands-on experience with:

- Dockerfile optimization and multi-stage builds
- Debugging CORS and MIME issues in containerized apps
- Cross-container networking with Docker Compose
- Serving SPAs with NGINX
- Setting up a realistic local development pipeline

## Next Steps

- Set up CI/CD using GitHub Actions
- Add `.env` support and runtime config for both frontend/backend
- Deploy to a cloud provider (e.g., Render, Railway, or Fly.io)

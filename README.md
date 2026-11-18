# MERN Blog — Vercel Deployment

This repository contains two separately deployable applications:

- `frontend/`: React + Vite client
- `backend/`: Express API (Vercel serverless function) + MongoDB + Cloudinary

## 1. Local development

### Backend

```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI, SECRET_KEY and Cloudinary credentials
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

### Frontend

In another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Vite runs at `http://localhost:5173` and proxies `/api/*` requests to the local backend.

## 2. Deploy the backend to Vercel

Create a new Vercel project and import this repository.

- **Root Directory:** `backend`
- **Framework Preset:** Other
- **Build Command:** leave empty / use Vercel default
- **Output Directory:** leave empty
- **Install Command:** `npm install`

Add these Environment Variables in Vercel (Production, and Preview if required):

| Name | Value |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string |
| `SECRET_KEY` | Long, random, private signing secret |
| `CLOUD_NAME` | Cloudinary cloud name |
| `API_KEY` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Exact frontend origin, e.g. `https://your-frontend.vercel.app` |
| `NODE_ENV` | `production` |

Deploy. Test `https://YOUR-BACKEND.vercel.app/` and expect a JSON health response.

In MongoDB Atlas, ensure the database user/password are correct and the network access rules permit connections from your hosting environment. Use a dedicated database user with a strong password.

## 3. Deploy the frontend to Vercel

Create a second Vercel project from the same repository.

- **Root Directory:** `frontend`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Add this environment variable:

| Name | Value |
| --- | --- |
| `VITE_API_URL` | `https://YOUR-BACKEND.vercel.app/api/v1` |

Deploy the frontend.

## 4. Final connection check

1. Copy the deployed frontend origin (no trailing slash).
2. Set that exact origin as backend `FRONTEND_URL`.
3. Redeploy the backend after changing its environment variables.
4. Confirm the frontend `VITE_API_URL` points to the backend `/api/v1` base.
5. Test signup, login, refresh, profile image upload, create/update/publish blog, comments, and logout.

The backend uses credentialed CORS and HTTP-only cookies. Production cookies are marked `Secure` and `SameSite=None`; therefore the frontend must use HTTPS.

## Important security note

Never commit `.env` files. Only commit `.env.example`. If any real credentials were previously committed or shared in a ZIP, rotate the MongoDB password, Cloudinary API secret, and JWT signing secret before deploying. Changing the local file alone does not invalidate exposed credentials.
## Deployment: Render + Netlify

### Backend (Render)
- Create a Web Service from this repository.
- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Add the variables listed in `backend/.env.example` in Render's Environment settings.
- Set `FRONTEND_URL` to the exact deployed Netlify site origin (no trailing slash).

### Frontend (Netlify)
- Connect this repository.
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- `frontend/public/_redirects` proxies `/api/v1/*` to the Render backend and keeps React routes working.
- Do not set `VITE_API_URL` in Netlify; the app intentionally uses the same-origin `/api/v1` proxy.

### Local development
- Copy `frontend/.env.example` to `frontend/.env`.
- Copy `backend/.env.example` to `backend/.env` and fill in your own credentials.
- Start the backend on port 3000, then run the frontend with `npm run dev` from `frontend`.

Never commit `.env` files or real credentials.

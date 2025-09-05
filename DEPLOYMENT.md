# Deployment Guide

This document provides step-by-step instructions for deploying the Profile API Playground to various hosting platforms.

## Deployment Options

### Backend API

#### Option 1: Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: profile-api (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `PORT`: 10000 (Render assigns a port)
     - `NODE_ENV`: production

#### Option 2: Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add a new service and select your repository
4. Configure the service:
   - Set the root directory to `/backend`
   - Set the start command to `npm start`
   - Add environment variables as needed

#### Option 3: Heroku

1. Create a new app on Heroku
2. Connect your GitHub repository or use Heroku CLI
3. Set up environment variables in the Settings tab
4. Configure the buildpack for Node.js
5. Deploy the application

### Frontend

#### Option 1: Vercel

1. Import your repository to Vercel
2. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: npm run build
   - **Output Directory**: dist
3. Add environment variables if needed
4. Deploy

#### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - **Base directory**: frontend
   - **Build command**: npm run build
   - **Publish directory**: frontend/dist
3. Add environment variables if needed
4. Deploy

## Environment Variables

### Backend

- `PORT`: Port number for the server (default: 3000)
- `NODE_ENV`: Environment (development, production)
- `DB_PATH`: Path to the SQLite database file (optional)

### Frontend

- Update `API_BASE_URL` in `frontend/src/services/api.js` to point to your deployed backend API URL.

## Database Setup in Production

For SQLite:
1. The database file will be created automatically on first run
2. Make sure the database directory is writable

For a production environment, you might want to consider:
1. Regular database backups
2. Migrating to a more robust database like PostgreSQL

## SSL/TLS Setup

Most hosting providers handle SSL/TLS certificates automatically. If you're using a custom domain, make sure to set up HTTPS:

1. On Vercel and Netlify: SSL is provided automatically
2. On Render: SSL is provided automatically
3. On Heroku: SSL is available on paid plans or through add-ons

## Post-Deployment Checklist

- [ ] Test the health endpoint: `GET /health`
- [ ] Verify CORS is working correctly
- [ ] Check that all API endpoints are accessible
- [ ] Test the frontend connection to the API
- [ ] Verify that the search functionality works
- [ ] Test filtering projects by skill
- [ ] Update the README with the actual deployed URLs

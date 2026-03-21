# University Scraper

A web application that scrapes university websites and presents admissions-related data in a dashboard.

## Stack
- Backend: Node.js + Express + Prisma
- Frontend: Next.js
- Database: PostgreSQL

## Features
- Scrapes admission details, tuition fees, eligibility, and scholarship information.
- Stores extracted data in PostgreSQL.
- RESTful API for CRUD operations and scraping triggers.
- Dashboard for viewing scraped data in a structured table.

## Project Structure
- `backend/` Express API, Prisma schema, scraping service
- `frontend/` Next.js dashboard UI

## Backend Setup
1. Go to `backend/`
2. Install dependencies:
   - `npm install`
3. Create environment file:
   - copy `.env.example` to `.env`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Run migrations (or push schema):
   - `npm run prisma:migrate`
   - or `npm run prisma:push`
6. Start backend:
   - `npm run dev`

Backend default URL: `http://localhost:5000`

## Frontend Setup
1. Go to `frontend/`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - copy `.env.local.example` to `.env.local`
4. Start frontend:
   - `npm run dev`

Frontend default URL: `http://localhost:3000`

## REST API
- `GET /api/health`
- `GET /api/universities`
- `GET /api/universities/:id`
- `POST /api/universities`
- `PUT /api/universities/:id`
- `PATCH /api/universities/:id`
- `DELETE /api/universities/:id`
- `POST /api/scrape` (single university scrape)
- `POST /api/scrape/seed` (bulk scrape from seed list)

## Sample `POST /api/scrape`
```json
{
  "name": "Example University",
  "slug": "example-university",
  "website": "https://example.edu/admissions"
}
```

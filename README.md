# ASTAFLIX – Streaming Dashboard Clone

This project is a simplified streaming dashboard built as part of the StoryBit assignment. It includes dynamic movie listings, detail pages, and a responsive UI. The application uses the TMDB API for real-time data.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- pnpm
- TMDB API
- Vercel (deployment)

## Features

- Fetches real movie data from TMDB
- Home page with Trending, Top Rated, and Upcoming sections
- Individual movie detail page: `/movie/[id]`
- Responsive layout for all screen sizes
- Image optimization using `next/image`
- Secure handling of environment variables

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPO_LINK_HERE
cd my-streaming-dashboard

2. Install Dependencies
pnpm install

3. Add Environment Variables

Create a .env.local file in the root directory and add:

TMDB_API_KEY=YOUR_TMDB_API_KEY
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/

Running the Project

Start the development server:

pnpm dev


Then open your browser at:

http://localhost:3000

Deployment (Vercel)

If deploying on Vercel, add the following environment variables in the project settings:

TMDB_API_KEY

TMDB_BASE_URL

TMDB_IMAGE_BASE_URL

After adding them, trigger a redeployment.
The movie detail pages should work correctly once deployed.

Testing the Deployment

Open your Vercel URL.

Browse through the movies.

Click any movie card.

The dynamic route /movie/[id] should load without errors.

This confirms everything is working as expected.

# AI Usage Report – ASTAFLIX Streaming Dashboard

This document explains how I used AI tools while building the ASTAFLIX Streaming Dashboard. My goal was to use AI only to speed up my understanding and to help with troubleshooting—not to generate the entire project. All code was reviewed, modified, and implemented by me.

---

## Project Links

GitHub Repository:  
https://github.com/VirojaYeshpatel/my-streaming-dashboard/tree/main

---

## AI Tools I Used

During the development process, I used two AI tools:

### Google Gemini
I used Gemini mainly for planning. It helped me think through the correct folder structure for Next.js App Router, how to organize components, and how the TMDB API works. It also helped me understand how to structure TypeScript interfaces based on the API response.

### ChatGPT
I used ChatGPT mostly for troubleshooting and clarifying errors. It was helpful when I ran into:
- Dynamic routing issues
- Problems with environment variables
- Layout adjustments with Tailwind CSS
- Optimizing my fetch utility and server-side data flow

AI gave me direction, but I wrote all final code myself.

---

## How AI Helped in My Development Process

AI mainly supported me in the following areas:

### Project Structure and Planning
AI helped me confirm that my folder structure—involving `app/page.tsx`, dynamic routes like `app/movie/[id]/page.tsx`, and reusable components—matched best practices for Next.js 14.

### Understanding and Using the TMDB API
AI helped me verify the correct API endpoints and how to safely use environment variables on the server. This gave me confidence before I implemented the fetch logic.

### TypeScript Models
AI generated initial ideas for the Movie type. I used those as a reference and then customized them based on TMDB's real response.

### UI Layouts
AI gave suggestions for:
- Building a Hero Banner
- Creating scrollable rows
- Structuring my detail page layout  
I later improved and adjusted these designs to make them responsive and visually cleaner.

### Debugging Issues
When I faced problems such as:
- The “params is a Promise” issue in dynamic routes  
- Vercel deployment errors  
- pnpm behavior during production builds  

AI helped me understand what was causing the problem, but I applied the final fixes myself.

---

## Final Summary

AI tools acted like a coding assistant and guide. They helped me plan faster, understand errors more clearly, and improve certain parts of my structure and design. However, every piece of code—from API integration, server components, Tailwind CSS, dynamic routing, debugging, and Vercel deployment—was written and validated by me.

This project reflects my ability to use AI effectively while still being fully responsible for the development, debugging, and final implementation of the application.


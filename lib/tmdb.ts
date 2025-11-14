// lib/tmdb.ts

import { Movie, MovieListResponse } from "@/types/movie"; 

// 1. Function to safely retrieve configuration at runtime
function getConfig() {
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    
    if (!API_KEY) {
        // Throw if missing
        throw new Error("TMDB_API_KEY is not defined in environment variables. Check .env.local or Vercel settings.");
    }
    return { API_KEY, BASE_URL };
}

// 2. Generic fetch utility now calls getConfig()
async function fetcher<T>(path: string): Promise<T> {
  // Access config only when the fetcher is called (runtime), not on module load
const { API_KEY, BASE_URL } = getConfig(); 

const url = `${BASE_URL}${path}?api_key=${API_KEY}`;

const res = await fetch(url, {
next: { revalidate: 3600 } 
});

if (!res.ok) {
console.error(`TMDB API Error (${res.status}): ${path}`);
throw new Error(`Failed to fetch data from TMDB API at ${path}. Status: ${res.status}`);
}

return res.json();
}

// Specific functions for fetching lists, returning only the Movie[] array
export async function fetchPopularMovies(): Promise<Movie[]> {
const data = await fetcher<MovieListResponse>("/movie/popular");
return data.results;
}

export async function fetchTopRatedMovies(): Promise<Movie[]> {
const data = await fetcher<MovieListResponse>("/movie/top_rated");
return data.results;
}

export async function fetchUpcomingMovies(): Promise<Movie[]> {
const data = await fetcher<MovieListResponse>("/movie/upcoming");
return data.results;
}

// Function for fetching a single movie by ID
export async function fetchMovieById(id: string): Promise<Movie> {
return fetcher<Movie>(`/movie/${id}`);
}

// Utility function to construct the full image URL
export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
    if (!path) return '/placeholder.jpg'; 
    const imageBase = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/'; 
    return `${imageBase}${size}${path}`;
}
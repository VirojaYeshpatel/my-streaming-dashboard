// lib/tmdb.ts
import { Movie, MovieListResponse } from "@/types/movie"; 

function getConfig() {
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    
    if (!API_KEY) {
        throw new Error("TMDB_API_KEY is not defined in environment variables.");
    }
    return { API_KEY, BASE_URL };
}

// Improved fetch with connection handling
async function fetcher<T>(path: string, retries = 3): Promise<T> {
    const { API_KEY, BASE_URL } = getConfig(); 
    const url = `${BASE_URL}${path}?api_key=${API_KEY}`;

    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

            const res = await fetch(url, {
                next: { revalidate: 3600 },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                signal: controller.signal,
                // Add keep-alive settings
                keepalive: true,
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                if (res.status === 429 && i < retries - 1) {
                    const waitTime = Math.pow(2, i + 1) * 1000;
                    console.warn(`Rate limited. Waiting ${waitTime}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    continue;
                }
                
                throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
            }

            return res.json();
        } catch (error: any) {
            const isLastRetry = i === retries - 1;
            
            // Log the specific error
            if (error.name === 'AbortError') {
                console.error(`⏱️ Request timeout for ${path}`);
            } else if (error.code === 'ECONNRESET' || error.cause?.code === 'ECONNRESET') {
                console.error(`🔌 Connection reset for ${path} - Network issue detected`);
            } else {
                console.error(`❌ Fetch error for ${path}:`, error.message);
            }

            if (!isLastRetry) {
                const waitTime = Math.pow(2, i + 1) * 1000;
                console.warn(`🔄 Retrying in ${waitTime}ms... (Attempt ${i + 2}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }
            
            // On final failure, throw a user-friendly error
            throw new Error(`Unable to connect to TMDB API. Please check your internet connection.`);
        }
    }

    throw new Error(`Failed to fetch after ${retries} retries`);
}

// Movie functions with fallback
export async function fetchPopularMovies(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/movie/popular");
        return data.results.map(movie => ({ ...movie, media_type: 'movie' as const }));
    } catch (error) {
        console.error('Failed to fetch popular movies:', error);
        return [];
    }
}

export async function fetchTopRatedMovies(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/movie/top_rated");
        return data.results.map(movie => ({ ...movie, media_type: 'movie' as const }));
    } catch (error) {
        console.error('Failed to fetch top rated movies:', error);
        return [];
    }
}

export async function fetchUpcomingMovies(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/movie/upcoming");
        return data.results.map(movie => ({ ...movie, media_type: 'movie' as const }));
    } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
        return [];
    }
}

export async function fetchMovieById(id: string): Promise<Movie> {
    const movie = await fetcher<Movie>(`/movie/${id}`);
    return { ...movie, media_type: 'movie' };
}

// TV Series functions with fallback
export async function fetchPopularTVSeries(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/tv/popular");
        return data.results.map(item => ({
            ...item,
            title: item.title || (item as any).name,
            media_type: 'tv' as const,
        }));
    } catch (error) {
        console.error('Failed to fetch popular TV series:', error);
        return [];
    }
}

export async function fetchTopRatedTVSeries(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/tv/top_rated");
        return data.results.map(item => ({
            ...item,
            title: item.title || (item as any).name,
            media_type: 'tv' as const,
        }));
    } catch (error) {
        console.error('Failed to fetch top rated TV series:', error);
        return [];
    }
}

export async function fetchOnTheAirTVSeries(): Promise<Movie[]> {
    try {
        const data = await fetcher<MovieListResponse>("/tv/on_the_air");
        return data.results.map(item => ({
            ...item,
            title: item.title || (item as any).name,
            media_type: 'tv' as const,
        }));
    } catch (error) {
        console.error('Failed to fetch on the air TV series:', error);
        return [];
    }
}

export async function fetchTVSeriesById(id: string): Promise<Movie> {
    const series = await fetcher<any>(`/tv/${id}`);
    return {
        ...series,
        title: series.name || series.title,
        release_date: series.first_air_date,
        media_type: 'tv',
    };
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
    if (!path) return '/placeholder.jpg'; 
    const imageBase = 'https://image.tmdb.org/t/p/';
    return `${imageBase}${size}${path}`;
}
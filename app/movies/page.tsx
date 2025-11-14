// app/movies/page.tsx
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '@/lib/tmdb';
import MovieRow from '@/components/MovieRow';

export const metadata = {
title: 'Movies - ASTAFLIX',
description: 'Browse all movies on ASTAFLIX',
};

export default async function MoviesPage() {
// Fetch multiple movie categories
const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
fetchPopularMovies(),
fetchTopRatedMovies(),
fetchUpcomingMovies(),
]);

return (
<main className="min-h-screen px-4 md:px-8 lg:px-16 py-8">
    <h1 className="text-3xl md:text-5xl font-extrabold mb-8">Movies</h1>
    
    <div className="space-y-8">
    <MovieRow movies={popularMovies} categoryTitle="Popular Movies" />
    <MovieRow movies={topRatedMovies} categoryTitle="Top Rated Movies" />
    <MovieRow movies={upcomingMovies} categoryTitle="Upcoming Movies" />
    </div>
</main>
);
}
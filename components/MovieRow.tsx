// components/MovieRow.tsx
'use client'; // Required for client-side scrolling interaction features

import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
movies: Movie[];
categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
if (!movies || movies.length === 0) return null;

return (
<section className="mb-8">
    <h2 className="text-xl md:text-2xl font-bold mb-4">{categoryTitle}</h2>

    {/* Horizontal scrolling implementation */}
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide py-2 md:py-4">
    {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
    ))}
    </div>

    {/* Custom CSS to hide the ugly scrollbar while keeping scroll functionality */}
    <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    `}</style>
</section>
);
}

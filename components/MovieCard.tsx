// components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';

// Define the component's expected poster size
const POSTER_SIZE = 'w342';

export default function MovieCard({ movie }: { movie: Movie }) {
if (!movie.poster_path) return null;

const imageUrl = getImageUrl(movie.poster_path, POSTER_SIZE);

return (
<Link
    href={`/movie/${movie.id}`}
    className="flex-shrink-0 w-[150px] md:w-[200px] group transition duration-300 transform hover:scale-105"
>
    <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[2/3]">
    <Image
        src={imageUrl}
        alt={`Poster for ${movie.title}`}
        fill
        sizes="(max-width: 768px) 150px, 200px"
        style={{ objectFit: 'cover' }}
        className="group-hover:opacity-80 transition-opacity"
    />
    </div>

    <h4 className="mt-2 text-sm truncate text-gray-200 group-hover:text-red-400">
    {movie.title}
    </h4>
</Link>
);
}

// components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';

const POSTER_SIZE = 'w500';

export default function MovieCard({ movie }: { movie: Movie }) {
    if (!movie.poster_path) return null;

    const imageUrl = getImageUrl(movie.poster_path, POSTER_SIZE);

    // FIXED: Ensure TV series link uses the '/tv-series/' folder name
    const href = movie.media_type === 'tv' ? `/tv-series/${movie.id}` : `/movie/${movie.id}`;
    const contentTitle = movie.title; 

    return (
        <Link
            href={href}
            className="flex-shrink-0 w-[150px] md:w-[200px] group transition duration-300 transform hover:scale-105"
        >
            <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[2/3]">
                <Image
                    src={imageUrl}
                    alt={`Poster for ${contentTitle}`}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:opacity-80 transition-opacity"
                />
            </div>

            <h4 className="mt-2 text-sm truncate text-gray-200 group-hover:text-red-400">
                {contentTitle}
            </h4>
        </Link>
    );
}
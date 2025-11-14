import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';

export default function HeroBanner({ movie }: { movie: Movie }) {
if (!movie.backdrop_path) return null;

// Get the largest hero image quality
const imageUrl = getImageUrl(movie.backdrop_path, 'original');

return (
<Link
    href={`/movie/${movie.id}`}
    className="block relative h-[50vh] min-h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-2xl"
>
    {/* Background Image */}
    <Image
    src={imageUrl}
    alt={`Banner for ${movie.title}`}
    fill
    priority
    sizes="100vw"
    style={{ objectFit: 'cover' }}
    className="transition-transform duration-700 hover:scale-105"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent p-6 flex flex-col justify-end">
    <h1 className="text-5xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
        {movie.title}
    </h1>

    <p className="text-lg max-w-lg hidden md:block line-clamp-2 drop-shadow-md">
        {movie.overview}
    </p>

    <div className="mt-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-300">
        More Info
        </button>
    </div>
    </div>
</Link>
);
}

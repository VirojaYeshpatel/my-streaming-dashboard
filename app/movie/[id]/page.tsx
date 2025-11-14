// app/movie/[id]/page.tsx

import { fetchMovieById, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface MoviePageProps {
    params: { id: string };
}

// ⭐ Optional but recommended: Dynamic Metadata for SEO
export async function generateMetadata({ params }: MoviePageProps) {
    if (!params.id) return { title: "Movie Not Found" };

    const movie = await fetchMovieById(params.id).catch(() => null);

    if (!movie) return { title: "Movie Not Found" };

    return {
        title: `${movie.title} - ASTAFLIX Details`,
        description: movie.overview ? movie.overview.substring(0, 150) + "..." : "",
    };
}

export default async function MoviePage({ params }: MoviePageProps) {
    if (!params.id) {
        return notFound();
    }

    // Fetch movie
    const movie = await fetchMovieById(params.id).catch(() => null);

    // ❗ FIXED: Must RETURN notFound()
    if (!movie || !movie.id) {
        return notFound();
    }

    // ⭐ Safe image URL generation
    const backdropUrl = movie.backdrop_path
        ? getImageUrl(movie.backdrop_path, "original")
        : null;

    const posterUrl = movie.poster_path
        ? getImageUrl(movie.poster_path, "w500")
        : null;

    return (
        <section className="relative pt-4 pb-12">
            {/* Backdrop Banner */}
            <div className="relative h-[40vh] md:h-[60vh] w-full rounded-lg overflow-hidden mb-6">
                {backdropUrl && (
                    <Image
                        src={backdropUrl}
                        alt={`Backdrop for ${movie.title}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        className="opacity-20"
                        priority
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-8 relative z-10 -mt-[150px] md:mt-0 px-4">
                
                {/* Poster */}
                <div className="relative w-2/3 max-w-[300px] aspect-[2/3] mx-auto md:mx-0 rounded-lg shadow-2xl overflow-hidden flex-shrink-0">
                    {posterUrl && (
                        <Image
                            src={posterUrl}
                            alt={`Poster for ${movie.title}`}
                            fill
                            sizes="(max-width: 768px) 300px, 300px"
                            style={{ objectFit: "cover" }}
                        />
                    )}
                </div>

                {/* Text Details */}
                <div className="flex-grow pt-4 md:pt-0">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        {movie.title}
                    </h1>

                    <div className="text-lg space-y-2 mb-6 text-gray-300">

                        <p>
                            <span className="font-semibold text-red-400">Release Date:</span>{" "}
                            {movie.release_date}
                        </p>

                        {movie.vote_average !== undefined && (
                            <p>
                                <span className="font-semibold text-red-400">Rating:</span>{" "}
                                ⭐ {movie.vote_average.toFixed(1)} / 10
                            </p>
                        )}

                        {movie.runtime > 0 && (
                            <p>
                                <span className="font-semibold text-red-400">Runtime:</span>{" "}
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </p>
                        )}

                        {movie.genres?.length > 0 && (
                            <p>
                                <span className="font-semibold text-red-400">Genres:</span>{" "}
                                {movie.genres.map(g => g.name).join(", ")}
                            </p>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-2 mt-6">Overview</h2>
                    <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
                </div>
            </div>
        </section>
    );
}

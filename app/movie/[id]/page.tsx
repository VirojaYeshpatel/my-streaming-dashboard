// app/movie/[id]/page.tsx
import { fetchMovieById, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Define the interface for the props received by the page component
interface MoviePageProps {
    params: { id: string };
}

// Optional: Dynamic Metadata for SEO
export async function generateMetadata({ params }: MoviePageProps) {
    // Check for ID presence early to avoid fetching 'undefined'
    if (!params.id) return { title: "Movie Not Found" }; 
    
    // Attempt to fetch data for metadata
    const movie = await fetchMovieById(params.id).catch(() => null);
    
    if (!movie) return { title: "Movie Not Found" };
    
    return {
        title: `${movie.title} - ASTAFLIX Details`,
        // Ensure overview exists before accessing substring
        description: movie.overview ? movie.overview.substring(0, 150) + '...' : "Movie details.",
    };
}

// The main Server Component for the detail page
export default async function MoviePage({ params }: MoviePageProps) {
    
    // Ensure ID is present before proceeding with the fetch
    if (!params.id) {
        return notFound();
    }

    // Step 12: Fetch detail data by id (Server-side)
    const movie = await fetchMovieById(params.id).catch(error => {
        console.error(`Error fetching movie ID ${params.id}:`, error.message);
        return null;
    });
    
    // Handle API fetch failure or movie not found
    if (!movie || !movie.id) {
        notFound(); 
    }

    // Utility calls to get image URLs
    const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
    const posterUrl = getImageUrl(movie.poster_path, 'w500');
    
    // Step 13: Render detail page (Responsive layout)
    return (
        <section className="relative pt-4 pb-12">
            
            {/* Backdrop/Cover Effect */}
            <div className="relative h-[40vh] md:h-[60vh] w-full rounded-lg overflow-hidden mb-6">
                {movie.backdrop_path && (
                    <Image
                        src={backdropUrl}
                        alt={`Backdrop for ${movie.title}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                        className="opacity-20"
                        priority
                    />
                )}
            </div>
            
            {/* Content: Flex layout for poster and details */}
            <div className="flex flex-col md:flex-row gap-8 relative z-10 -mt-[150px] md:mt-0 px-4">
                
                {/* Poster Image */}
                <div className="relative w-2/3 max-w-[300px] aspect-[2/3] mx-auto md:mx-0 rounded-lg shadow-2xl overflow-hidden flex-shrink-0">
                    {movie.poster_path && (
                        <Image
                            src={posterUrl}
                            alt={`Poster for ${movie.title}`}
                            fill
                            sizes="(max-width: 768px) 300px, 300px"
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>
                
                {/* Details */}
                <div className="flex-grow pt-4 md:pt-0">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{movie.title}</h1>
                    
                    <div className="text-lg space-y-2 mb-6 text-gray-300">
                        {movie.release_date && <p>
                            <span className="font-semibold text-red-400">Release Date:</span> {movie.release_date}
                        </p>}
                        
                        {/* Corrected: Check for existence before calling toFixed(1) */}
                        {movie.vote_average !== undefined && movie.vote_average !== null && <p>
                            <span className="font-semibold text-red-400">Rating:</span> ⭐ {movie.vote_average.toFixed(1)} / 10
                        </p>}
                        
                        {/* Corrected: Check for existence and > 0 before performing math */}
                        {movie.runtime !== undefined && movie.runtime !== null && movie.runtime > 0 && (
                            <p>
                                <span className="font-semibold text-red-400">Runtime:</span> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </p>
                        )}
                        
                        {/* Genres check */}
                        {movie.genres && movie.genres.length > 0 && <p>
                            <span className="font-semibold text-red-400">Genres:</span> {movie.genres.map(g => g.name).join(', ')}
                        </p>}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 mt-6">Overview</h2>
                    {movie.overview && <p className="text-gray-200 leading-relaxed">{movie.overview}</p>}
                </div>
            </div>
        </section>
    );
}
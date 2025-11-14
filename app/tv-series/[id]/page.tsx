// app/tv-series/[id]/page.tsx

import { fetchTVSeriesById, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// TEMPORARY: Use the Promise type and explicit 'await' to match your working movie page behavior
interface TVPageProps {
    params: Promise<{ id: string }>; 
}

// Dynamic Metadata for SEO
export async function generateMetadata({ params }: TVPageProps) {
    
    // Unwrap the Promise to access 'id'
    const resolvedParams = await params; 
    const id = resolvedParams.id;
    
    if (!id) return { title: "TV Series Not Found" }; 
    
    const series = await fetchTVSeriesById(id).catch(() => null);
    
    if (!series) return { title: "TV Series Not Found" };
    
    return {
        title: `${series.title} - ASTAFLIX Details`,
        description: series.overview ? series.overview.substring(0, 150) + '...' : "TV series details.",
    };
}

// The main Server Component for the detail page
export default async function TVPage({ params }: TVPageProps) {
    
    // Unwrap the Promise to access 'id'
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
        return notFound();
    }

    const series = await fetchTVSeriesById(id).catch(error => {
        console.error(`Error fetching TV series ID ${id}:`, error.message);
        return null;
    });
    
    if (!series || !series.id) {
        notFound(); 
    }

    const title = series.title; 
    const backdropUrl = getImageUrl(series.backdrop_path, 'original');
    const posterUrl = getImageUrl(series.poster_path, 'w500');
    
    return (
        <section className="relative min-h-screen pb-12">
            
            {/* Backdrop/Cover Effect */}
            <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
                {series.backdrop_path && (
                    <Image
                        src={backdropUrl}
                        alt={`Backdrop for ${title}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        className="opacity-30"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 md:px-8 -mt-32 md:-mt-40 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    
                    {/* Poster Image */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative w-48 md:w-64 lg:w-72 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden border-4 border-gray-800">
                            {series.poster_path && (
                                <Image
                                    src={posterUrl}
                                    alt={`Poster for ${title}`}
                                    fill
                                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            )}
                        </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow space-y-4">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                            {title}
                        </h1>
                        
                        <div className="flex flex-wrap gap-4 text-sm md:text-base">
                            {series.release_date && (
                                <div className="flex items-center gap-2">
                                    <span className="text-red-400 font-semibold">📅</span>
                                    <span className="text-gray-300">{new Date(series.release_date).getFullYear()}</span>
                                </div>
                            )}
                            
                            {series.vote_average !== undefined && series.vote_average !== null && (
                                <div className="flex items-center gap-2">
                                    <span className="text-red-400 font-semibold">⭐</span>
                                    <span className="text-gray-300">{series.vote_average.toFixed(1)} / 10</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Genres */}
                        {series.genres && series.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {series.genres.map(genre => (
                                    <span 
                                        key={genre.id} 
                                        className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full text-sm text-red-400"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {/* Overview */}
                        <div className="mt-6">
                            <h2 className="text-xl md:text-2xl font-bold mb-3 text-red-400">Overview</h2>
                            {series.overview ? (
                                <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl">
                                    {series.overview}
                                </p>
                            ) : (
                                <p className="text-gray-500 italic">No overview available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
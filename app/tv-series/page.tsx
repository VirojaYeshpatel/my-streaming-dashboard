import { fetchPopularTVSeries, fetchTopRatedTVSeries, fetchOnTheAirTVSeries } from '@/lib/tmdb';
import MovieRow from '@/components/MovieRow'; // Reuse your MovieRow component

export const metadata = {
    title: 'TV Series - ASTAFLIX',
    description: 'Browse all popular and top-rated TV series on ASTAFLIX',
};

export default async function TVSeriesPage() {
    // Fetch multiple TV series categories
    const [popularSeries, topRatedSeries, onTheAirSeries] = await Promise.all([
        fetchPopularTVSeries(),
        fetchTopRatedTVSeries(),
        fetchOnTheAirTVSeries(),
    ]);

    return (
        <main className="min-h-screen px-4 md:px-8 lg:px-16 py-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-8">TV Series</h1>
            
            <div className="space-y-8">
                {/* Reusing MovieRow component, which correctly handles 'media_type: tv' in MovieCard */}
                <MovieRow movies={popularSeries} categoryTitle="Popular TV Series" />
                <MovieRow movies={topRatedSeries} categoryTitle="Top Rated TV Series" />
                <MovieRow movies={onTheAirSeries} categoryTitle="Currently Airing" />
            </div>
        </main>
    );
}
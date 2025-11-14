// app/page.tsx
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, getImageUrl } from '@/lib/tmdb';
import MovieRow from '@/components/MovieRow';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  // Fetch multiple categories in parallel
  const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  // Get the hero movie (first popular movie)
  const heroMovie = popularMovies[0];
  const heroBackdropUrl = heroMovie ? getImageUrl(heroMovie.backdrop_path, 'original') : '';

  return (
    <main className="min-h-screen">
      {/* Hero Banner Section */}
      {heroMovie && (
        <Link href={`/movie/${heroMovie.id}`}>
          <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden cursor-pointer group">
            {/* Background Image */}
            <Image
              src={heroBackdropUrl}
              alt={`${heroMovie.title} backdrop`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              className="opacity-40 group-hover:opacity-50 transition-opacity"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-2xl group-hover:text-red-400 transition-colors">
                {heroMovie.title}
              </h1>
              
              {heroMovie.overview && (
                <p className="text-sm md:text-lg text-gray-300 max-w-2xl line-clamp-3">
                  {heroMovie.overview}
                </p>
              )}
              
              {/* Optional: Display rating or year */}
              <div className="flex gap-4 items-center text-sm md:text-base">
                {heroMovie.vote_average && (
                  <span className="text-red-400 font-semibold">
                    ⭐ {heroMovie.vote_average.toFixed(1)}
                  </span>
                )}
                {heroMovie.release_date && (
                  <span className="text-gray-400">
                    {new Date(heroMovie.release_date).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          </section>
        </Link>
      )}

      {/* Movie Rows Section */}
      <section className="px-4 md:px-8 lg:px-16 py-8 space-y-8">
        <MovieRow movies={popularMovies} categoryTitle="Popular on ASTAFLIX" />
        <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
        <MovieRow movies={upcomingMovies} categoryTitle="Coming Soon" />
      </section>
    </main>
  );
}
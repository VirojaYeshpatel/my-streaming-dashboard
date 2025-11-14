// app/page.tsx - Server Component (Next.js App Router)

import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "@/lib/tmdb";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";

export default async function HomePage() {
  // TEMPORARY CHECK:
  console.log("TMDB Key Loaded:", !!process.env.TMDB_API_KEY);
  
  // Fetch all three endpoints concurrently for best performance
  const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  // Pick the top (first) popular movie for the hero banner
  const heroMovie = popularMovies && popularMovies.length > 0 ? popularMovies[0] : null;

  return (
    <section className="space-y-10">
      {/* Hero banner — created next */}
      {heroMovie && <HeroBanner movie={heroMovie} />}

      <div className="pt-4">
        {/* Movie rows — MovieRow components will be created next */}
        <MovieRow movies={popularMovies.slice(1)} categoryTitle="Trending Now" />
        <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
        <MovieRow movies={upcomingMovies} categoryTitle="Coming Soon" />
      </div>
    </section>
  );
}

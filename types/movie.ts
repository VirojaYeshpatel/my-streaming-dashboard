// Define the core properties needed for listing and details
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // Nullable if the poster is missing
  backdrop_path: string | null; // Used for the Hero Banner
  overview: string;
  release_date: string;

  // Properties useful for the detail page
  genres?: { id: number; name: string }[];
  vote_average?: number;
  runtime?: number;
}

// Define the shape of the list response from endpoints like /movie/popular
export interface MovieListResponse {
  page: number;
  results: Movie[]; // Array of movies
  total_pages: number;
  total_results: number;
}
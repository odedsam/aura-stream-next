import { CastMember } from '@/components/cards/CastCard';

const BASE_URL = 'https://api.themoviedb.org/3';

const getTmdbAccessToken = () => {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Missing required TMDB access token in environment variables');
  }

  return token;
};

const getHeaders = () => ({
  Authorization: `Bearer ${getTmdbAccessToken()}`,
});

export type Movie = {
  release_date: string | undefined;
  spoken_languages: { name: string }[] | undefined;
  genres: { id: number; name: string }[] | undefined;
  vote_average: number | undefined;
  moviePersonas: any[] | undefined;
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  overview: string;
  poster_path: string | null;
};

export type Trailer = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

interface TmdbReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    name: string | null;
    username: string;
    rating: number | null;
    avatar_path: string | null;
  };
}

// _______________________________________________________________

/*   -------------- MOVIES FUNCTIONS ---------------------  */

// _______________________________________________________________

export const fetchMovieReviews = async (id: string): Promise<TmdbReview[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.warn(`Failed to fetch reviews for movie ${id}`);
    return [];
  }

  const data = await res.json();
  return data.results || [];
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch popular movies');

  const data = await res.json();
  return data.results;
};

export const fetchPopularShows = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/tv/popular?language=en-US&page=1`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch popular shows');

  const data = await res.json();
  return data.results;
};

export const searchMedia = async (query: string): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) throw new Error(`Failed to search media for query: ${query}`);

  const data = await res.json();

  return (data.results || []).filter(
    (item: any) => item.media_type === 'movie' || item.media_type === 'tv',
  );
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch movie with id: ${id}`);

  return res.json();
};

export async function fetchMovieCredits(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: getHeaders(),
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!res.ok) throw new Error('Failed to fetch movie credits');

  return res.json();
}
export const fetchMovieCast = async (id: string): Promise<CastMember[]> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.warn(`Failed to fetch cast for movie ${id}`);
    return [];
  }

  const data = await res.json();
  return data.cast || [];
};

export const fetchMovieTrailers = async (movieId: string): Promise<Trailer[]> => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch trailers for movie ${movieId}`);

  const data = await res.json();
  return data.results.filter(
    (video: Trailer) => video.site === 'YouTube' && video.type === 'Trailer',
  );
};

// _______________________________________________________________

/*   -------------- SHOWS FUNCTIONS ---------------------  */

// _______________________________________________________________

export const fetchShowById = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/tv/${id}?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch show with id: ${id}`);

  return res.json();
};

export const fetchShowTrailers = async (showId: string): Promise<Trailer[]> => {
  const res = await fetch(`${BASE_URL}/tv/${showId}/videos?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch trailers for show ${showId}`);

  const data = await res.json();
  return data.results.filter(
    (video: Trailer) => video.site === 'YouTube' && video.type === 'Trailer',
  );
};

export const fetchShowCast = async (id: string): Promise<CastMember[]> => {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch cast for show ${id}`);

  const data = await res.json();
  return data.cast;
};

export const fetchShowSeasons = async (showId: string): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/tv/${showId}?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch show seasons for ${showId}`);

  const data = await res.json();
  return data.seasons || [];
};

export const fetchSeasonDetails = async (showId: string, seasonNumber: number): Promise<any> => {
  const res = await fetch(`${BASE_URL}/tv/${showId}/season/${seasonNumber}?language=en-US`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch season ${seasonNumber} for show ${showId}`);

  return res.json();
};

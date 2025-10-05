export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieResponse = {
    page: number,
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}
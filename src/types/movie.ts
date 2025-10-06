
export type Movie = {
adult: boolean; 
backdrop_path: string;
gender_ids: number;
id: number;
original_language: string[]; 
original_title: string;
overview: string;
popularity: number;
poster_path: string;
release_date:string;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    totalPages: number;
    total_results: Number;
};

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}

export interface Image {
  file_path: string;
  vote_count: number;
}

export interface ImagesResponse {
  backdrops: Image[];
  posters: Image[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null; 
}


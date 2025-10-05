export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
}

export interface PersonType {
  id: number;
  name: string;
  profile_path: string | null;
  job?: string; // crew만 있음
  character?: string; // cast만 있음
}
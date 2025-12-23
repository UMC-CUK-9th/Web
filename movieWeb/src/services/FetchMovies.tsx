import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (category: string, page = 1, language = "ko-KR") => {
  const { data } = await axios.get<MovieResponse>(`${API_URL}/movie/${category}`, {
    params: {
      language,
      page,
    },
    headers: {
      Authorization: TOKEN,
    },
  });

  return data.results;
};


export const searchMovies = async (
  query: string,
  page = 1,
  language = "ko-KR",
  includeAdult = false
) => {
  const { data } = await axios.get<MovieResponse>(`${API_URL}/search/movie`, {
    params: {
      query,
      language,
      page,
      include_adult: includeAdult,
    },
    headers: {
      Authorization: TOKEN,
    },
  });

  return data.results;
};

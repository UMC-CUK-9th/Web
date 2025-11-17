import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (category: string, page = 1) => {
  const { data } = await axios.get<MovieResponse>(
    `${API_URL}/${category}`,
    {
      params: {
        language: "ko-KR",
        page,
      },
      headers: {
        Authorization: TOKEN,
      },
    }
  );

  return data.results;
};

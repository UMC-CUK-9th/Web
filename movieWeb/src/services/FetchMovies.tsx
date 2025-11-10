import axios from "axios";
import type { MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/movies";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZTE1MDcxOTI4YmY1MjFlMzczNTJiNmYxMTdkZiIsIm5iZiI6MTcxMzE2NjcyMy4xOSwic3ViIjoiNjYxY2Q5ODNmM2UwZGYwMTYzYTk1ODY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QYk-M1FG0aZzoVteeloZ1dd3TI_31uoGRmHgj6kPZfA";

export const fetchMovies = async (category: string, page = 1) => {
  const { data } = await axios.get<MovieResponse>(
    `${API_URL}/${category}?language=ko-KR&page=${page}`,
    {
      headers: {
        Authorization: TOKEN,
      },
    }
  );
  return data.results;
};
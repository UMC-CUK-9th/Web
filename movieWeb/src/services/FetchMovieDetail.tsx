import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZTE1MDcxOTI4YmY1MjFlMzczNTJiNmYxMTdkZiIsIm5iZiI6MTcxMzE2NjcyMy4xOSwic3ViIjoiNjYxY2Q5ODNmM2UwZGYwMTYzYTk1ODY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QYk-M1FG0aZzoVteeloZ1dd3TI_31uoGRmHgj6kPZfA";

// 영화 상세정보
export const fetchMovieDetail = async (movieId: string) => {
  const { data } = await axios.get(`${API_URL}/${movieId}?language=ko-KR`, {
    headers: { Authorization: TOKEN },
  });
  return data;
};

// 감독/출연진
export const fetchCredits = async (movieId: string) => {
  const { data } = await axios.get(
    `${API_URL}/${movieId}/credits?language=ko-KR`,
    {
      headers: { Authorization: TOKEN },
    }
  );
  return data;
};

// 영화 상세정보 + 출연진
export const fetchMovieData = async (movieId: string) => {
  const [detail, credits] = await Promise.all([
    fetchMovieDetail(movieId),
    fetchCredits(movieId),
  ]);
  return { detail, credits };
};

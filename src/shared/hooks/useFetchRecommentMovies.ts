import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { getRecommentMoviesApi } from "@/modules/movies/services/moviesApi";

export const useFetchRecommentMovies = (id: number) => {
  const [recommentMovies, setRecommentMovies] = useState<Movie[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchRecommentMovies = async () => {
      startLoading();
      try {
        const data = await getRecommentMoviesApi(id);
        console.log("res", data);
        if (data) setRecommentMovies(data?.results?.slice(0, 10));
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };
    fetchRecommentMovies()
  }, [id]);
  return {recommentMovies, loading}
};

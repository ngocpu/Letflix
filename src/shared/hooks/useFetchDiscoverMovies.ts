import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { Movie } from "@/types";
import { GetDisCoverMoviesApi } from "@/modules/movies/services/moviesApi";

export const useFetchDiscoverMovies = () => {
    const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([])
   const {loading, startLoading, stopLoading} = useLoading()
  useEffect(() => {
    const fetchMovie = async () => {
      startLoading();
      try {
        const data = await GetDisCoverMoviesApi(1);
        setDiscoverMovies(data.results);
      } catch (err) {
        console.error(err);
        stopLoading();
      } finally {
        stopLoading();
      }
    };
    fetchMovie();
  }, []);
  return {discoverMovies, loading}
};

import { Cast } from "@/types";
import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { getCastsMovieApi } from "@/modules/movies/services/moviesApi";

export const useFetchCastMovies = (id:number) => {
  const [casts, setCasts] = useState<Cast[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchCastsOfMovie = async () => {
      startLoading();
      try {
        const data = await getCastsMovieApi(id);

        if (data) setCasts(data?.cast.slice(0, 5));
      } catch (err: unknown) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };
    fetchCastsOfMovie()
  }, [id, startLoading, stopLoading]);
  return {casts, loading}
};

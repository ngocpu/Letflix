import { useEffect, useState } from "react";
import { useLoading } from "./useLoading";
import { getDetailMovieApi } from "@/modules/movies/services/moviesApi";


export const useFetchMovieDetail = (id:number) => {
  const [movie, setMovie] = useState<unknown>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchDeatailMovie = async () => {
       startLoading()
       try {
        const data = await getDetailMovieApi(id);
        if (data) setMovie(data);
      } catch (err: unknown) {
        console.log(err);
      } finally {
         stopLoading()
      }
    };
    fetchDeatailMovie()
  }, [id]);

  return {movie, loading}
};

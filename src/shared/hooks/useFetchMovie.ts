import { useState, useEffect } from 'react';
import { listMovies, Movie } from '@/types';
import { useLoading } from './useLoading';

interface UseFetchMoviesProps {
  fetchUrl: Promise<listMovies>;
}

interface UseFetchMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const useFetchMovies = ({ fetchUrl }: UseFetchMoviesProps): UseFetchMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const {loading,startLoading, stopLoading} = useLoading()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        startLoading();
        const data = await fetchUrl;
        setMovies(data.results);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        stopLoading();
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  return { movies,loading, error };
};

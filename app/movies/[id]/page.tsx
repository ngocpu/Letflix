import { getVideoMovieApi } from '@/services/apis/moviesApi';
import MovieDetail from './movie-detail';

interface MoviePageProps {
  params: { id: string };
}

// Fetch data cho mỗi trang dựa trên params
export default async function MoviePage({ params }: MoviePageProps) {
  const video = await getVideoMovieApi(Number(params.id)); // Lấy video từ API

  return (
    <MovieDetail video={video} />
  );
}

export async function generateStaticParams() {
  return [
    { id: '1' }, 
    { id: '2' },
  ];
}

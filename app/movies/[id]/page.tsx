'use client'
import { Videos } from '@/app/types';
import { getVideoMovieApi } from '@/services/apis/moviesApi';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Video from 'react-player/lazy';

const MovieDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Videos[]>([]);
  const fetched = useRef(false);

  useEffect(() => {
    const fetchMovieVideo = async () => {
      try {
        const data = await getVideoMovieApi(Number(id));
        if (data) setVideo(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    if (!fetched.current) {
      fetchMovieVideo();
      fetched.current = true;
    }
  }, [id]);

  return (
    <div className='w-full h-screen relative group'>
      <Video url={`https://www.youtube.com/watch?v=${video[1]?.key}&modestbranding=1`} controls={true} playing={true} width='100%' height='100%' />
    </div>
  );
};

export default MovieDetail;

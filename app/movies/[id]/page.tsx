'use client'
import React, { useEffect, useRef, useState } from 'react';
import { getVideoMovieApi } from '@/services/apis/moviesApi';
import { useParams } from 'next/navigation';

const MovieDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any[]>([]);
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

  const videoKey = video[1]?.key;
   // Assuming the key is at index 1
   console.log(videoKey)

  return (
    <div className='w-full h-full'>
      MovieDetail: {typeof id}
      {videoKey ? (
        <video
          width="100%"
          height="100%"
          src={`https://www.youtube.com/watch?v=Idh8n5XuYIA`}
          title="YouTube video player"
          // frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowFullScreen
        ></video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default MovieDetail;

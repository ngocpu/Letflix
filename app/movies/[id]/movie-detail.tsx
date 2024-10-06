'use client'; 
import { Videos } from '@/app/types';
import Video from 'react-player/lazy';

interface MovieDetailProps {
  video: Videos[];
}

const MovieDetail = ({ video }: MovieDetailProps) => {
  return (
    <div className='w-full h-screen relative group'>
      <Video 
        url={`https://www.youtube.com/watch?v=${video[1]?.key}&modestbranding=1`} 
        controls={true} 
        playing={true} 
        width='100%' 
        height='100%' 
      />
    </div>
  );
};

export default MovieDetail;

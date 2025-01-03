import { useToast } from '@/shared/hooks/use-toast'
import { useFetchCastMovies } from '@/shared/hooks/useFetchCastMovies'
import { useFetchMovieDetail } from '@/shared/hooks/useFetchMovieDetail'
import { useFetchRecommentMovies } from '@/shared/hooks/useFetchRecommentMovies'
import { apiConfig } from '@/services/apiConfig'
import { RootState } from '@/state/store'
import { Movie } from '@/types'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { Heart, Play } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../../../../firebase'
import { Button } from '../../../shared/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../shared/components/ui/dialog'
import { Skeleton } from '../../../shared/components/ui/skeleton'
import { ToastAction } from '../../../shared/components/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../shared/components/ui/tooltip'
import CastMovies from './CastMovies'
import ListRecommendMovies from './ListRecommendMovies'
interface props {
  id: number
}
const MovieModal: React.FC<props> = ({ id }) => {
  const fetched = useRef(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const [like, setLike] = useState(false)
  const { toast } = useToast()
  const movieId = doc(db, "users", `${user?.uid}`)
  const { movie, loading } = useFetchMovieDetail(id)
  const { casts } = useFetchCastMovies(id)
  const { recommentMovies } = useFetchRecommentMovies(id)
  useEffect(() => {
    const checkIfMovieIsLiked = async () => {
      if (!user?.uid) return;

      try {
        const userDoc = await getDoc(movieId);
        if (userDoc.exists()) {
          const userMovies = userDoc.data()?.listMovies || [];
          const isLiked = userMovies.some((savedMovie: Movie) => savedMovie.id === id);
          setLike(isLiked);
        }
      } catch (err) {
        console.error("Error checking if movie is liked:", err);
        toast({
          variant: "destructive",
          title: "Error checking movie status. Please try again.",
        });
      }
    };
    if (!fetched.current) {
      checkIfMovieIsLiked()
      fetched.current = true
    }
  }, [id, user?.uid])

  // Save movie to library
  const handleSaveMovie = async () => {
    if (user?.uid) {
      setLike(true);
      await updateDoc(movieId, {
        listMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          release_date: movie.release_date
        }),
      });
      toast({ title: 'Movie added to your library' });
    } else {
      toast({
        variant: 'destructive',
        title: 'Please login to save the movie',
      });
    }
  };

  const handleDeleteMovie = async () => {
    if (user?.uid) {
      const movieToRemove = {
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      };

      try {
        await updateDoc(movieId, {
          listMovies: arrayRemove(movieToRemove),
        });

        setLike(false);

        toast({
          title: 'Movie removed from your library',
          action: (
            <ToastAction altText="Undo" onClick={async () => {
              await updateDoc(movieId, {
                listMovies: arrayUnion(movieToRemove),
              });
              setLike(true);
            }}>
              Undo
            </ToastAction>
          ),
        });
      } catch (err) {
        console.error("Error removing movie:", err);
        toast({
          variant: 'destructive',
          title: 'Failed to remove the movie. Please try again.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Please login to remove the movie',
      });
    }
  };
  return (
    <div className="relative w-full h-full __overlay ">
      <img src={apiConfig.originalImg(movie?.backdrop_path)} alt="movie img" className='w-full h-[60%] brightness-50 object-cover rounded-t-md' />
      <div className="absolute z-10 top-[12%] w-full md:min-w-[850px] flex flex-wrap flex-grow justify-center items-center gap-5">
        <div className="w-[25%] hidden md:block h-[95%] rounded-md shadow-lg ml-10">
          {loading ? <Skeleton className='w-full h-full' /> : <img src={apiConfig.w500Img(movie?.poster_path)} alt="" className='w-full h-full object-cover shadow-lg rounded-md brightness-90' />}
        </div>
        <div className=" md:flex-1 h-full md:ml-9 md:mr-10 mx-6 justify-center md:justify-start">
          <DialogHeader className='gap-3'>
            <DialogTitle className='mt-5 text-3xl font-semibold text-wrap'>{movie?.title}</DialogTitle>
            <div className="flex gap-5 items-center flex-wrap">
              {movie?.genres?.map((item: any) => (
                <Button className='bg-transparent border-white border  text-white hover:bg-transparent hover:opacity-90 cursor-default rounded-lg'>{item?.name}</Button>
              ))}
            </div>
            <DialogDescription className='text-xs '>{movie?.overview}</DialogDescription>
            <div className="flex gap-3 w-full md:w-[40%] items-center">
              <Link to={`/movies/${movie?.id}`} className='cursor-pointer'>
                <Button className='flex items-center justify-center gap-3 cursor-pointer hover:opacity-85 '>
                  <Play fill='#000' size={25} />
                  Watch
                </Button>
              </Link>
              {like ? <Button className='w-10 h-10 p-0 rounded-full bg-transparent border border-red-500 cursor-pointer hover:bg-transparent' onClick={handleDeleteMovie}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Heart fill='red' size={25} />
                    </TooltipTrigger>
                    <TooltipContent className='mb-3'>
                      <p>Remove from my library</p>
                      <div className="tooltip-arrow"></div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button> : <Button className='w-10 h-10 p-0 rounded-full bg-transparent border border-white cursor-pointer ' onClick={handleSaveMovie}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Heart fill='#fff' size={25} />
                    </TooltipTrigger>
                    <TooltipContent className='mb-3'>
                      <p>Add to my library</p>
                      <div className="tooltip-arrow"></div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>}
            </div>
          </DialogHeader>
          <DialogFooter className='text-xs text-muted-foreground mt-5'>
            <strong className='text-white'>Release: </strong>
            <span> {movie?.release_date} </span>
          </DialogFooter>
        </div>
        <div className="flex flex-col gap-3 w-full md:mx-10 mx-6">
          <h6 className='text-xs font-semibold'>Casts</h6>
          <div className="flex flex-wrap gap-3 w-full items-center justify-start">
            {casts?.map(item => (
              <CastMovies key={item?.id} imgUrl={apiConfig?.w500Img(item?.profile_path)} name={item?.original_name} popularity={item?.popularity} loading={loading} />
            ))}
          </div>
          {/* Recommended Movies Carousel */}
          <h6 className='text-xs font-semibold mt-5'>Recommended Movies</h6>
          <div className="flex flex-wrap gap-3 w-full items-center justify-start">

            {recommentMovies?.map((movie) => (
              <ListRecommendMovies key={movie?.id} loading={loading} imgUrl={apiConfig?.w500Img(movie?.poster_path)} name={movie?.title} popularity={movie?.release_date} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieModal
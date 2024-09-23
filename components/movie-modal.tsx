"use client"
import { db } from '@/firebase'
import { useToast } from '@/hooks/use-toast'
import apiConfig from '@/services/apiConfig'
import { getCastsMovieApi, getDetailMovie } from '@/services/apis/moviesApi'
import { RootState } from '@/state/store'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { Heart, Play } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { ToastAction } from './ui/toast'
interface props {
  id: number
}
const MovieModal: React.FC<props> = ({ id }) => {
  const fetched = useRef(false)
  const [movie, setMovie] = useState<any>(null)
  const [casts, setCasts] = useState<any[]>([])
  const user = useSelector((state: RootState) => state.auth.user)
  const [like, setLike] = useState(false)
  const { toast } = useToast()

  const movieId = doc(db, "users", `${user?.uid}`)
  useEffect(() => {
    const fetchDeatailMovie = async () => {
      try {
        const data = await getDetailMovie(id)
        if (data) setMovie(data)
      } catch (err: any) {
        console.log(err)
      }
    }
    const checkIfMovieIsLiked = async () => {
      if (user?.uid) {
        const userDoc = await getDoc(movieId);
        if (userDoc.exists()) {
          const userMovies = userDoc.data()?.listMovies || [];
          const isLiked = userMovies.some((savedMovie: any) => savedMovie.id === id);
          setLike(isLiked);
        }
      }
    };
    const fetchCastsOfMovie = async () => {
      try {
        const data = await getCastsMovieApi(id)
        if (data) setCasts(data.slice(0,5))
      } catch (err: any) {
        console.log(err)
      }
    }
    if (!fetched.current) {
      fetchDeatailMovie()
      fetchCastsOfMovie()
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
    };
    setLike(false);
    const toastId = toast({
      title: 'Movie removed from your library',
      action:<ToastAction altText='Undo' onClick={async () => {
        await updateDoc(movieId, {
          listMovies: arrayUnion(movieToRemove),
        });
      }}>Undo</ToastAction>,
    });
    await updateDoc(movieId, {
      listMovies: arrayRemove(movieToRemove),
    });
  } else {
    toast({
      variant: 'destructive',
      title: 'Please login to remove the movie',
    });
  }
};
  console.log(movie, "dataa")
  return (
    <div className=" relative w-full h-full  __overlay ">
      <img src={apiConfig.originalImg(movie?.backdrop_path)} alt="movie img" className='w-full h-[60%] brightness-50 object-cover rounded-t-md' />

      <div className="absolute z-10 top-[12%] md:min-w-[850px] h-[70%] flex flex-wrap md:justify-center justify-start items-center gap-5">
        <div className="w-[25%] hidden md:block h-[95%] rounded-md shadow-lg ml-10">
          <img src={apiConfig.w500Img(movie?.poster_path)} alt="" className='w-full h-full object-cover shadow-lg rounded-md brightness-90' />
        </div>
        <div className=" flex-1 h-full md:ml-9 md:mr-10 mx-6 justify-start">
          <DialogHeader className='gap-3'>
            <DialogTitle className='mt-5 text-3xl font-semibold text-wrap'>{movie?.title}</DialogTitle>
            <div className="flex gap-5 items-center ">
              {movie?.genres?.map((item: any) => (
                <Button className='bg-transparent border-white border  text-white hover:bg-transparent hover:opacity-90 cursor-default rounded-lg'>{item?.name}</Button>
              ))}
            </div>
            <DialogDescription className='text-xs '>{movie?.overview}</DialogDescription>
            <div className="flex gap-3 w-[40%] items-center">
              <Link href={`/movies/${movie?.id}`} className='cursor-pointer'>
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
        <div className="flex flex-col gap-3 w-full mx-10">
          <h6 className='text-xs font-semibold'>Casts</h6>
          <div className="flex flex-wrap gap-3 w-full items-center justify-start">
            {casts?.map(item => (
              <div className="flex flex-col gap-2 md:min-h-40 w-36 bg-[#2f2f2f] rounded-md" key={item?.id}>
                <img src={apiConfig?.w500Img(item?.profile_path)} alt='' className='w-full h-[60%] object-cover rounded-t-md' />
                <div className="px-2 my-3">
                  <h6 className='text-xs font-semibold '>{item?.original_name}</h6>
                  <p className='text-xs text-muted-foreground '><strong className='text-white'>Popularity:</strong> {item?.popularity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
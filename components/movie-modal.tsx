import { getCastsMovieApi, getDetailMovie } from '@/services/apis/moviesApi'
import React, { useEffect, useRef, useState } from 'react'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Heart, Play } from 'lucide-react'

interface props {
  id: number
}
const MovieModal: React.FC<props> = ({ id }) => {
  const fetched = useRef(false)
  const [movie, setMovie] = useState<any>(null)
  const [casts, setCasts] = useState<any[]>([])
  useEffect(() => {
    const fetchDeatailMovie = async () => {
      try {
        const data = await getDetailMovie(id)
        if (data) setMovie(data)
      } catch (err: any) {
        console.log(err)
      }
    }
    const fetchCastsOfMovie = async () => {
      try {
        const data = await getCastsMovieApi(id)
        if (data) setCasts(data)
      } catch (err: any) {
        console.log(err)
      }
    }
    if (!fetched.current) {
      fetchDeatailMovie()
      fetchCastsOfMovie()
      fetched.current = true
    }
  }, [id])
  console.log(movie, "dataa")
  return (
    <div className=" relative w-full h-full  __overlay ">
      <img src={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}${movie?.backdrop_path}`} alt="movie img" className='w-full h-[60%] brightness-50 object-cover rounded-t-md' />
      <div className="absolute z-10 top-[12%] md:min-w-[850px] h-[70%] flex flex-wrap md:justify-center justify-start items-center gap-5">
        <div className="w-[25%] hidden md:block h-[95%] rounded-md shadow-lg ml-10">
          <img src={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}${movie?.poster_path}`} alt="" className='w-full h-full object-cover shadow-lg rounded-md brightness-90' />
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
              <Button className='flex items-center justify-center gap-3 cursor-pointer hover:opacity-85'>
                <Play fill='#000' size={25} />
                Watch
              </Button>
              <Button className='w-10 h-10 p-0 rounded-full bg-transparent border border-white cursor-pointer '>
                <Heart fill='#fff' size={25} />
              </Button>
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
                <img src={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}${item?.profile_path}`} alt='' className='w-full h-[60%] object-cover rounded-t-md' />
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
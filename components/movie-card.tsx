// MovieCard Component
'use client'
import apiConfig from '@/services/apiConfig'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import MovieModal from './movie-modal'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Movie } from '@/app/types'

interface props {
  data: Movie
  loading:boolean
}

const MovieCard: React.FC<props> = ({ data , loading}) => {
  const movieImg = apiConfig.w500Img(data?.poster_path || data?.backdrop_path)
  const router = useRouter()
  return (
    <div className='h-full md:min-w-[200px] w-full  md:w-[200px] transition duration-200 delay-200 cursor-pointer hover:scale-110 relative text-xs'>
      {loading ? (
        <>
          <Skeleton className="w-full h-[60%] rounded-t-md" />
          <div className="px-2 mt-2">
            <div className="flex justify-between items-center">
              <Skeleton className="w-1/2 h-4 rounded-md" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <Skeleton className='h-4 w-1/2' />
          </div>

        </>
      ) : (
        <>
          <img src={movieImg} alt='movies immg' className='w-full cursor-pointer h-[60%] rounded-t-md object-cover brightness-85' onClick={() => router.push(`/movies/${data?.id}`)} />
          <div className='px-2 mt-2'>
            <div className="flex justify-between items-center">
              <h5 className='text-xs font-semibold truncate max-w-[50%]'>{data?.title}</h5>
              <TooltipProvider>
                <Tooltip>
                  <Dialog>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild >
                        <ChevronDown className="border w-6 h-6 rounded-full border-gray-200 hover:border-gray-200 hover:opacity-80 cursor-pointer" size={15} />
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">Info</TooltipContent>
                    {/* Nội dung của Dialog */}
                    <DialogContent className='p-0 h-[80%] overflow-y-scroll scrollbar-hide md:min-w-[850px] border-none'>
                      <MovieModal id={data?.id} />
                    </DialogContent>
                  </Dialog>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className='text-[10px] text-gray-500 mt-1'>{data?.release_date}</p>
          </div>
        </>
      )}
    </div>


  )
}

export default MovieCard

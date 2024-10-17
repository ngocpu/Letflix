import { apiConfig } from '@/services/apiConfig'
import { Movie } from '@/types'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MovieModal from './MovieModal'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface props {
  data: Movie
  loading: boolean
}
const MovieCard: React.FC<props> = ({ data, loading }) => {
  const movieImg = apiConfig.w500Img(data?.poster_path || data?.backdrop_path)
  const navigate = useNavigate()

  return (
    <div className='h-full md:min-w-[200px] w-full min-w-[120px]  md:w-[200px] transition duration-200 delay-200 cursor-pointer hover:scale-110 relative text-xs'>
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
          <img src={movieImg} alt='movies immg' className='w-full cursor-pointer h-[30%] md:h-[60%] rounded-t-md object-cover brightness-85' onClick={() => navigate(`/movies/${data?.id}`)} />
          <div className='px-2 mt-2'>
            <div className="flex justify-between items-center">
              <h5 className='text-md md:text-xs 2xl:text-base font-semibold truncate max-w-[50%]'>{data?.title}</h5>
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
                    <DialogContent className='p-0 w-full min-w-full h-[80%] overflow-y-scroll scrollbar-hide md:min-w-[850px] border-none'>
                      <MovieModal id={data?.id} />
                    </DialogContent>
                  </Dialog>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className='text-[14px] text-gray-500 mt-1'>{data?.release_date}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieCard
// MovieCard Component
'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import MovieModal from './movie-modal'

interface props {
  data: any
}

const MovieCard: React.FC<props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='h-full min-w-[200px] transition duration-200 delay-200 cursor-pointer hover:scale-110 relative text-xs'>
      <img src={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}${data?.poster_path}`} alt='movies immg' className='w-full h-[60%] rounded-t-md object-cover brightness-85' />
      <div className='px-2 mt-2'>
        <div className="flex justify-between items-center">
          <h5 className='text-xs font-semibold truncate max-w-[50%]'>{data?.title}</h5>
          <TooltipProvider>
            <Tooltip>
              {/* TooltipTrigger sẽ là DialogTrigger để hiển thị dialog khi click */}
              <Dialog>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
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
      {/* <CardFooter>
      </CardFooter> */}
    </div>

  )
}

export default MovieCard

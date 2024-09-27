// Row Component
'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import MovieCard from './movie-card'
import { useLoading } from '@/hooks/useLoading'
import { Movie } from '@/app/types'

interface props {
  title: string
  id: string
  fetchUrl: Promise<Movie[]>
}

const Row: React.FC<props> = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const {loading, startLoading, stopLoading} = useLoading()
  useEffect(() => {
    const fetchMovie = async () => {
      startLoading()
      try {
        const response = await fetchUrl
        setMovies(response)
      } catch (err: any) {
        console.error(err)
      } finally {
        stopLoading()
      }
    }

    fetchMovie()
  }, [])

  const handleScrolLeft = () => {
    let sliderLeft = document.getElementById('slider' + id)
    if (sliderLeft) sliderLeft.scrollLeft -= 500
  }

  const handleScrolRight = () => {
    let slideRight = document.getElementById('slider' + id)
    if (slideRight) slideRight.scrollLeft += 500
  }

  return (
    <div className=''>
        <h1 className='text-sm font-semibold my-3'>{title}</h1>
        <div className="relative flex items-center group ">
            <ChevronLeft onClick={handleScrolLeft} className='absolute top-[40%] bottom-0 left-0 z-20 w-10 h-10 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:opacity-85 bg-black/50 flex items-center justify-center' size={35} />
            <div id={'slider' + id} className='w-full h-[200px] flex gap-5 overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies?.map((item, id)=>(
                     <MovieCard data={item} key={id} loading={loading}/>
                ))}
            </div>
            <ChevronRight onClick={handleScrolRight} className='absolute top-[40%] bottom-0 right-10 z-20 w-10 h-10 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:opacity-85 bg-black/50 flex items-center justify-center' size={35} />
        </div>
    </div>
  )
}

export default Row

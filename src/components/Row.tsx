import { listMovies, Movie } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { useLoading } from '@/hooks/useLoading'

interface props {
    id:string
    fetchUrl: Promise<listMovies>
    title:string
}
const Row:React.FC<props> = ({id,title, fetchUrl}) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const fetched = useRef(null)
    const {loading, startLoading, stopLoading} = useLoading()

    useEffect(() => {
      const fetMovies = async () => {
        try{
          startLoading()
          const data = await fetchUrl
          console.log("data", data)
          setMovies(data.results)
        } catch (error){
          console.log(error)
        } finally{
          stopLoading()
        }
      }
      fetMovies()
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
    <div>
      <h1 className='font-semibold my-3 text-xl lg:text-2xl'>{title}</h1>
      <div className="relative flex items-center group my-8">
            <ChevronLeft onClick={handleScrolLeft} className='absolute top-[40%] bottom-0 left-0 z-20 w-10 h-10 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:opacity-85 bg-black/50 flex items-center justify-center' size={35} />
            <div id={'slider' + id} className='w-full h-full flex gap-5 overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative'>
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
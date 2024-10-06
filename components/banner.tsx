'use client'
import { getDiscoverMoviesApi } from '@/services/apis/moviesApi'
import Autoplay from "embla-carousel-autoplay"
import { Info, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import MovieModal from './movie-modal'
import Link from 'next/link'
import apiConfig from '@/services/apiConfig'
import { Skeleton } from './ui/skeleton'
import { Movie } from '@/app/types'

const Banner = () => {
    const [movie, setMovie] = useState<Movie[]>([])
    const fetched = useRef(false)
    const [loading, setLoading] = useState(true)
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getDiscoverMoviesApi()
                if (data) {
                    setMovie(data)
                }
            } catch (err: any) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        if (!fetched.current) {
            fetchMovie()
            fetched.current = true
        }
    }, [])
    return (
        <div className="">
            {loading ? (
                <div className="w-full h-screen relative bg-cover bg-center">
                    <Skeleton className='w-full h-full'/>
                    <div className="absolute top-[40%] flex flex-col gap-2 px-10 md:px-10">
                        <Skeleton className="w-1/2 h-10" />
                        <Skeleton className="w-full md:w-[50%] h-6" />
                        <div className="flex gap-4 items-center mt-2">
                            <Skeleton className="w-24 h-10" />
                            <Skeleton className="w-32 h-10" />
                        </div>
                    </div>
                </div>
            ):(
                <Carousel opts={{
                    align: "start",
                    loop: true
                }} plugins={[plugin.current]} onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {movie?.map(item => (
                            <CarouselItem key={item.id}>
                                <div
                                    className="w-full h-screen relative bg-cover bg-center __overlay-baner"
                                >
                                    <img src={apiConfig.originalImg(item?.backdrop_path)} alt='movie img' className='w-full h-full object-cover brightness-75' />
                                    <div className="w-full h-full absolute top-0 left-0 bg-linear-18"></div>
                                    <div className="absolute top-[40%]  flex flex-col gap-2  px-10 md:px-10">
                                        <h1 className="text-5xl 2xl:text-8xl font-semibold">{item?.title}</h1>
                                        <p className='text-xs 2xl:text-sm w-full md:w-[50%] my-2'>{item?.overview}</p>
                                        <div className="flex gap-4 items-center mt-2">
                                            <Link href={`/movies/${item?.id}`}>
                                                <Button className='flex gap-1 items-center hover:opacity-85 transition cursor-pointer'>
                                                    <Play size={15} fill='black' />
                                                    Watch now
                                                </Button>
                                            </Link>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className='flex gap-1 items-center bg-gray-600/50 text-white hover:opacity-85 hover:bg-gray-600/50 transition cursor-pointer'>
                                                        <Info size={15} />
                                                        Infomation
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='p-0 h-[80%] overflow-y-scroll scrollbar-hide md:min-w-[850px] border-none'>
                                                    <MovieModal id={item?.id} />
                                                </DialogContent>
                                            </Dialog>
        
                                        </div>
                                    </div>
        
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </div>
    )
}

export default Banner
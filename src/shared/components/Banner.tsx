import { useFetchDiscoverMovies } from '@/shared/hooks/useFetchDiscoverMovies'
import { apiConfig } from '@/services/apiConfig'
import Autoplay from "embla-carousel-autoplay"
import { Info, Play } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import MovieModal from '../../modules/movies/components/MovieModal'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'

const Banner = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  const {discoverMovies, loading} = useFetchDiscoverMovies()
  
  
  return (
    <div className='relative h-[90%]'>
      {loading ? (
        <div className="w-full h-screen relative bg-cover bg-center">
          <Skeleton className='w-full h-full' />
          <div className="absolute top-[40%] flex flex-col gap-2 px-10 md:px-10">
            <Skeleton className="w-1/2 h-10" />
            <Skeleton className="w-full md:w-[50%] h-6" />
            <div className="flex gap-4 items-center mt-2">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="w-32 h-10" />
            </div>
          </div>
        </div>
      ) : (
        <Carousel opts={{
          align: "start",
          loop: true
        }} plugins={[plugin.current]} onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}>
          <CarouselContent>
            {discoverMovies?.map(item => (
              <CarouselItem key={item.id}>
                <div
                  className="w-full h-screen relative bg-cover bg-center __overlay-baner"
                >
                  <img src={apiConfig.originalImg(item?.backdrop_path)} alt='movie img' className='w-full h-full object-cover brightness-75' />
                  <div className="w-full h-full absolute top-0 left-0 bg-linear-18"></div>
                  <div className="absolute top-[40%]  flex flex-col gap-2 px-10 mx-5">
                    <h1 className="text-7xl font-semibold">{item?.title}</h1>
                    <p className='w-full md:w-[50%] my-2'>{item?.overview}</p>
                    <div className="flex gap-4 items-center mt-2">
                      <Link to={`/movies/${item?.id}`}>
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
import { Link } from 'react-router-dom'
import { Skeleton } from '@/shared/components/ui/skeleton'

type CastMoviesProps = {
   imgUrl: string
   name: string
   popularity: string
   key: number
   loading: boolean
}
const ListRecommendMovies = ({ imgUrl, name, popularity, key, loading }: CastMoviesProps) => {
   return (
      <div key={key} className='basic-1/5 flex flex-col gap-2 md:min-h-40 w-36 bg-[#2f2f2f] rounded-md'>
         {loading ? (
            <div>
               <Skeleton className='w-full h-[60%] rounded-t-md' />
               <div className="px-2 my-3">
                  <Skeleton className='w-1/2 h-4' />
                  <Skeleton className='w-1/2 h-4' />
               </div>
            </div>
         ) : (
            <Link to={`/movies/${key}`}>
               <img src={imgUrl} alt='' className='w-full h-[60%] object-cover rounded-t-md' />
               <div className="px-2 my-3">
                  <h6 className='text-xs font-semibold '>{name}</h6>
                  <p className='text-xs text-muted-foreground '> {popularity}</p>
               </div>
            </Link>
         )}
      </div>
   )
}

export default ListRecommendMovies
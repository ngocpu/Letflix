import MovieCard from '@/components/MovieCard'
import { useLoading } from '@/hooks/useLoading'
import { RootState } from '@/state/store'
import { Movie } from '@/types'
import { db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Mylibrary = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [movies, setMovies] = useState<Movie[]>([])
  const { loading, startLoading, stopLoading } = useLoading()
  useEffect(() => {
    startLoading()
    try {
      onSnapshot(doc(db, "users", `${user?.uid}`), (doc) => {
        setMovies(doc.data()?.listMovies)
      })
    } catch (err) {
      console.log(err)
    } finally {
      stopLoading()
    }

  }, [user?.uid])
  console.log(movies)
  return (
    <main className='mt-16 mx-10 min-h-[310px]'>
      <p className='text-base'>My library </p>
        {movies.length !== 0 ? <div className="flex flex-col gap-12 items-center md:gap-5 md:flex-row md:flex-wrap my-10">
          {movies?.map(item => (
            <div
              className="h-full"
            >
              <MovieCard data={item} loading={loading} />
            </div>
          ))}
        </div> : <p className='text-center text-gray-400 my-10'>No movies in your library</p>}
    </main>
  )
}

export default Mylibrary
"use client"
import { RootState } from '@/state/store'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '@/firebase'
import MovieCard from '@/components/movie-card'
import { motion } from 'framer-motion'
import { useLoading } from '@/hooks/useLoading'
import { Movie } from '@/app/types'

const MyLibrary = () => {
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
            <motion.div
              className="h-full"
              key={item?.id}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard data={item} loading={loading} />
            </motion.div>
          ))}
        </div> : <p className='text-center text-gray-400 my-10'>No movies in your library</p>}

    </main>
  )
}
export default MyLibrary
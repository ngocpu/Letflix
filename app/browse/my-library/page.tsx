"use client"
import { RootState } from '@/state/store'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '@/firebase'
import MovieCard from '@/components/movie-card'
import { motion } from 'framer-motion'

const MyLibrary = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [movies, setMovies] = useState<any[]>([])
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.uid}`), (doc) => {
      setMovies(doc.data()?.listMovies)
    })
  }, [user?.uid])
  console.log(movies)
  return (
    <main className='mt-16 ml-6 md:mx-10'>
      <p className='text-base'>My libraly </p>
      <div className="flex gap-5 items-center flex-wrap w-full my-10">
        {movies?.map(item => (
          <motion.div
            className="h-[200px]"
            key={item?.id}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard data={item} />
          </motion.div>
        ))}
      </div>
    </main>
  )
}
export default MyLibrary
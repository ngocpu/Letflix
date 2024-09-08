'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/main-nav'
import { RootState } from '@/state/store'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()
  return (
    <>
      {user ? <div className='relative w-full h-full text-xs'>
        <Navbar />
        <main className=''>{children}</main>
        <Footer />
      </div> : router.push("/login")}
    </>
  )
}

export default HomeLayout
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../public/images/logo.png'
import profile from '../public/images/profile.png'
import Image from 'next/image'
import { ArrowRight, BellRingIcon, LoaderCircle, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useRouter } from 'next/navigation'
import { logout } from '@/state/slice/authSlice'
const Navbar = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const router = useRouter()
  const MIN_HEIGHT = 50

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > MIN_HEIGHT) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleLogout = () => {
    setLoading(true)
    try {
      setTimeout(async () => {
        await dispatch(logout())
        setLoading(false)
        router.push("/login")
      }, 500)
    } catch (err: any) {
      setLoading(false)
      console.log(err.response.message)
    }
  }
  return (
    <nav className={`flex fixed z-50 top-0 left-0 w-full items-center justify-between  md:px-10 px-6 py-3 text-xs transition duration-200 ${isScroll ? 'bg-black' : 'bg-gradient-to-b from-black/40 to-transparent'}`}>
      <div className=" gap-3 items-center hidden md:flex">
        <Link href={'/browse'} className='w-24 h-6 '>
          <Image src={logo} alt='Letflix' className='w-full h-full object-cover' />
        </Link>
        <Link href={"/browse"} className='text-xs cursor-pointer hover:opacity-80 transition'>Browse</Link>
        <Link href={"/browse/tv-show"} className='text-xs cursor-pointer hover:opacity-80 transition'>Tv & show</Link>
        <Link href={"movies"} className='text-xs cursor-pointer hover:opacity-80 transition'>Movie</Link>
        <Link href={"/browse/my-library"} className='text-xs cursor-pointer hover:opacity-80 transition'>My library</Link>
      </div>
      <div className="sm:flex md:hidden items-center gap-3">
        <Link href={'/browse'} className='w-24 h-6 '>
          <Image src={logo} alt='Letflix' className='w-24 h-6  object-cover' />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>Browse</DropdownMenuTrigger>
          <DropdownMenuContent className='w-44'>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"/browse"} className='text-xs cursor-pointer hover:opacity-80 transition'>Browse</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/browse/tv-show"} className='text-xs cursor-pointer hover:opacity-80 transition'>Tv & show</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/browse/movies"} className='text-xs cursor-pointer hover:opacity-80 transition'>Movie</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/browse/my-library"} className='text-xs cursor-pointer hover:opacity-80 transition'>My library</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-4 items-center">
        <Search size={18} className='cursor-pointer hover:opacity-80 trasition' />
        <BellRingIcon size={18} className='cursor-pointer hover:opacity-80 trasition' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image src={profile} alt='profile' className='w-6 h-6 rounded' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer'>
                <Link href={"/profile"}>Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
              Log out
              <DropdownMenuShortcut>
                {loading ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
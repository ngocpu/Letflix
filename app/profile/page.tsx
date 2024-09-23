'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../public/images/logo.png'
import profile from '../../public/images/profile.png'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useRouter } from 'next/navigation'
import { logout } from '@/state/slice/authSlice'
import { Loader2 } from 'lucide-react'
const MyProflie = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    setLoading(true)
    try {
      setTimeout(async () => {
        setLoading(false)
        router.push("/login")
      }, 500)
    } catch (err: any) {
      setLoading(false)
      console.log(err.response.message)
    }
  }
  return (
    <div className='w-full h-full relative '>
      <div className="md:px-10 px-6 py-3 w-40 h-20 cursor-pointer">
        <Link href={"/browse"}>
          <Image src={logo} alt='Letflix logo' className='w-full h-full object-cover' />
        </Link>
      </div>
      <div className="flex flex-col gap-3  justify-center items-center mx-auto my-10 ">
        <h5 className='text-white text-lg font-semibold'>My profile</h5>
        <div className="flex gap-3 items-center justify-center w-[550px]">
          <Image src={profile} alt='your profile' className='w-16 h-16 object-cover' />
          <div className="flex flex-col gap-3">
            <h5 className='text-white text-xs'>{user?.email}</h5>
            {loading ? <Button size={"sm"} className='bg-red text-white opacity-80 cursor-pointer' > <Loader2 size={18} className=' animate-spin' /></Button> : <Button size={"sm"} className='bg-red text-white hover:bg-red hover:opacity-80 cursor-pointer' onClick={handleLogout}>Logout</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProflie
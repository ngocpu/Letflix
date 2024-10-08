'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../public/images/logo.png'
import profile from '../public/images/profile.png'
import Image from 'next/image'
import { ArrowRight, BellRingIcon, ChevronDown, ChevronUp, LoaderCircle, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/state/slice/authSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Input } from './ui/input'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { Form, FormField } from './ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  values: z.string()
})
const Navbar = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Browse')
  const router = useRouter()
  const pathName = usePathname()
  const MIN_HEIGHT = 50
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      values: ''
    }
  })

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


  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/results?search_query=${values.values}`)
  }
  const isActiveLink = (href: string) => pathName === href

  const handleMenuSelect = (menu: string, path: string) => {
    setSelectedMenu(menu) // Update the selected label
    router.push(path) // Navigate to the selected path
    setIsDropdownOpen(false) // Close the dropdown
  }

  return (
    <nav className={`flex fixed z-50 top-0 left-0 w-full items-center justify-between  px-6 py-3 text-xs transition duration-200 ${isScroll ? 'bg-black' : 'bg-gradient-to-b from-black/40 to-transparent'}`}>
      <div className=" gap-3 items-center hidden md:flex">
        <Link href={'/browse'} className='w-24 h-6'>
          <Image src={logo} alt='Letflix' className='w-full h-full object-cover' />
        </Link>
        <Link href={"/browse"} className={`text-xs 2xl:text-sm cursor-pointer hover:opacity-80 transition-all duration-300  ${isActiveLink("/browse") ? "opacity-100" : "opacity-60"}`} >Browse</Link>
        <Link href={"/browse/my-library"} className={`text-xs 2xl:text-sm cursor-pointer hover:opacity-80 transition-all duration-300  ${isActiveLink("/browse/my-library") ? "opacity-100" : "opacity-60"}`}>My library</Link>
      </div>
      {/* mobile */}
      <div className="flex md:hidden items-center gap-3">
        <Link href={'/browse'} className='w-24 h-6  '>
          <Image src={logo} alt='Letflix' className='w-24 h-6  object-cover' />
        </Link>
        <DropdownMenu open={isDropdownOpen} onOpenChange={(open) => setIsDropdownOpen(open)} >
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-xs">
              {selectedMenu} {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-44' side='bottom' align='end'>
            <DropdownMenuArrow/>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMenuSelect('Browse', '/browse')} >
                Browse
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuSelect('My Library', '/browse/my-library')}>
                My Library
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-4 items-center">
        <Popover>
          <PopoverTrigger asChild >
            <Search size={25} className='cursor-pointer hover:opacity-80 trasition' />
          </PopoverTrigger>
          <PopoverContent side='right' align='center' className='gap-2 p-0 outline-none'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="values"
                  render={({ field }) => (
                    <Input placeholder='Find your movie' className='text-xs outline-none border-none focus:outline-none h-7 ' {...field} />
                  )}
                />
              </form>
            </Form>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Image src={profile} alt='profile' className='w-6 h-6 2xl:w-8 2xl:h-8 rounded' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 border-none" side='bottom' align='end'>
            <DropdownMenuArrow />
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer text-xs'>
                <Link href={"/profile"}>Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer text-xs'>
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
import { useLoading } from "@/shared/hooks/useLoading"
import { logout } from "@/state/slice/authSlice"
import { AppDispatch } from "@/state/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { ArrowRight, ChevronDown, ChevronUp, LoaderCircle, Search } from 'lucide-react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import logo from '../../assets/images/logo.png'
import profile from '../../assets/images/profile.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Form, FormField } from "./ui/form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
const MIN_HEIGHT = 50
const formSchema = z.object({
  values: z.string()
})
const Navbar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      values: ''
    }
  })
  const { loading, startLoading, stopLoading } = useLoading()
  const [isScroll, setIsScroll] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Browse')
  const locations = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  function onSubmit(values: z.infer<typeof formSchema>) {
    navigate(`/results?search_query=${values.values}`)
  }
  const isActiveLink = (href: string) => locations.pathname === href
  // console.log(locations.pathname)
  const handleMenuSelect = (menu: string, path: string) => {
    setSelectedMenu(menu) // Update the selected label
    navigate(path) // Navigate to the selected path
    setIsDropdownOpen(false) // Close the dropdown
  }
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
  const handleLogout = async() => {
    try{
      startLoading()
      await dispatch(logout())
      stopLoading()
      navigate("/auth/login")
    } catch(err){
      console.log(err)
    } finally{
      stopLoading()
    }
  }
  return (
    <div className={`px-10 py-2 w-full fixed left-0 flex justify-between items-center z-10 ${isScroll ? "bg-black" : "bg-transparent"}`}>
      <div className="hidden md:flex justify-center items-center gap-3">
        <Link to={"/browse"} >
          <img src={logo} alt="Letflix logo" className="w-full md:w-40 h-10 object-cover cursor-pointer" />
        </Link>
        <Link to={"/browse"} className={`cursor-pointer hover:opacity-80 transition-all duration-300 text-white  ${isActiveLink("/browse") ? "opacity-100" : "opacity-60"}`}>Browse</Link>
        <Link to={"/browse/my-library"}className={`cursor-pointer hover:opacity-80 transition-all duration-300 text-white  ${isActiveLink("/browse/my-library") ? "opacity-100" : "opacity-60"}`}>My library</Link>
      </div>
      {/* môbile */}
      <div className="flex md:hidden items-center gap-3">
        <Link to={"/browse"}>
          <img src={logo} alt="Letflix logo" className="w-full md:w-40 h-10 object-cover cursor-pointer" />
        </Link>
        <DropdownMenu open={isDropdownOpen} onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-xs">
              {selectedMenu} {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-44' side='bottom' align='end'>
            <DropdownMenuArrow />
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
      <div className="flex justify-start items-center gap-3 mr-5">
        <Popover>
          <PopoverTrigger asChild >
            <Search size={20} className='cursor-pointer hover:opacity-80 trasition' />
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
            <img src={profile} alt='profile' className='w-5 h-5 2xl:w-8 2xl:h-8 rounded' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 border-none" side='bottom' align='end'>
            <DropdownMenuArrow />
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='cursor-pointer text-xs'>
                <Link to={"/profile"}>Profile</Link>
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
    </div>
  )
}

export default Navbar
import { Button } from '@/components/ui/button'
import { useLoading } from '@/hooks/useLoading'
import { logout } from '@/state/slice/authSlice'
import { AppDispatch, RootState } from '@/state/store'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import profile from '../assets/images/profile.png'
const MyProflie = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const {loading, startLoading, stopLoading} = useLoading()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = async() => {
    startLoading()
    try {
      setTimeout(async () => {
        stopLoading()
        await dispatch(logout())
        navigate("/login")
      }, 500)
    } catch (err: any) {
      stopLoading()
      console.log(err.response.message)
    }
  }
  return (
    <div className='w-full h-full relative '>
      <div className="md:px-10 px-6 py-3 w-40 h-20 cursor-pointer">
        <Link to={"/browse"}>
          <img src={logo} alt='Letflix logo' className='w-full h-full object-cover' />
        </Link>
      </div>
      <div className="flex flex-col gap-3  justify-center items-center mx-auto my-10 ">
        <h5 className='text-white text-lg font-semibold'>My profile</h5>
        <div className="flex gap-3 items-center justify-center w-[550px]">
          <img src={profile} alt='your profile' className='w-16 h-16 object-cover' />
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
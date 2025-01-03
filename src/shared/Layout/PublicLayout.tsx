import { Outlet } from 'react-router-dom'
import background from '../../assets/images/bg.jpg'
import logo from '../../assets/images/logo.png'
const PublicLayout = () => {
  return (
    <div className="relative w-full h-screen">
      <img src={background} alt="Letfix bg" className='hidden md:block w-full h-full object-cover brightness-75' />
      <div className="absolute top-0 left-0 w-full h-screen flex">
        <img src={logo} alt="Letflix logo" className='w-[40%] absolute md:w-40 h-24 ml-[-26px] md:ml-4' />
        <div className="flex justify-center items-center py-4 px-3 m-auto w-full md:max-w-[500px] md:bg-black/70 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PublicLayout
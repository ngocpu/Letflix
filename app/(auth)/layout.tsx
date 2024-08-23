import Image from 'next/image'
import { ReactNode } from 'react'
import background from '../../public/images/bg.jpg'
import logo from '../../public/images/logo.png'
const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='relative h-screen w-screen'>
            <Image src={background} alt='logo' className='w-full h-full object-cover hidden md:block' fill />
            <Image src={logo} alt='logo' className='w-20 h-20 object-cover absolute top-0 z-10 flex justify-start ml-4' />
            <div className="absolute top-0 w-screen h-screen bg-black/40 flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
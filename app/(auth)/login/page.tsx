'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoaderCircle } from 'lucide-react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useRouter } from 'next/navigation'
import { login } from '@/state/slice/authSlice'
import { useLoading } from '@/hooks/useLoading'


const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})
function Login() {
    const {loading, startLoading, stopLoading} = useLoading()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const dispatch = useAppDispatch()
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof schema>) => {
        startLoading()
        try {
          const result = await dispatch(login(values)).unwrap();
          console.log("Login successful:", result);
          stopLoading()
          router.push("/");
        } catch (error: any) {
          stopLoading()
          console.error("Login failed:", error);
        }
    }
    return (
        <Form {...form}>
            <form className='flex flex-col justify-center gap-3 md:bg-black/70 rounded-md min-h-[60%] w-full md:max-w-[400px] text-xs p-4' onSubmit={form.handleSubmit(onSubmit)}>
                <h1 className='text-xl font-semibold mb-4'>Sign in</h1>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" className='bg-neutral-700' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xs'>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" className='bg-neutral-700' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading ? <Button className='bg-red text-white transition border-none rounded-md hover:bg-red' disabled ><LoaderCircle size={20} className='animate-spin mr-2' /> Please wait</Button> : <Button size={"sm"} className='bg-red transition text-white border-none rounded-md hover:opacity-80 hover:bg-red' type="submit">Sign in </Button>}
                <p className='my-3 '><span className='text-gray-400 text-xs'>You don't have an account? </span><Link href='/register' className='hover:text-red-500 text-xs'>Create your acount </Link></p>
            </form>
        </Form>

    )
}

export default Login
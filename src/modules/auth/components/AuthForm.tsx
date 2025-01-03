import { Button } from "@/shared/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { useLoading } from "@/shared/hooks/useLoading"
import { login } from "@/state/slice/authSlice"
import { AppDispatch } from "@/state/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"

type authFormType = "SIGNIN" | "SIGNUP"

const authSchema = z.object({
   email: z.string().min(2).max(50).email({
      message: "Please enter your email"
   }),
   password: z.string().min(6, {
      message: "Password have atleast 6 charactor"
   })
})
const AuthForm = ({ type }: { type: authFormType }) => {

   const form = useForm<z.infer<typeof authSchema>>({
      resolver: zodResolver(authSchema),
      defaultValues: {
         email: "",
         password: ""
      },
   })
   const { loading, startLoading, stopLoading } = useLoading()
   const navigate = useNavigate()
   const dispatch = useDispatch<AppDispatch>()


   async function onSubmit(values: z.infer<typeof authSchema>) {
      try {
         startLoading()
         await dispatch(login(values)).unwrap()
         stopLoading()
         navigate("/")
      } catch (err) {
         stopLoading()
         console.log("Login-failed:", err)
      }
   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full flex flex-col justify-center gap-3 px-4 py-5  '>
            <h3 className='text-2xl mb-3 font-semibold'>{type === "SIGNIN" ? "Login" : "Create your account"}</h3>
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="Your email" {...field} className="bg-neutral-700 border-none outline-none focus-within:outline-none forced-colors:bg-neutral-600" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input placeholder="Your password" {...field} className="bg-neutral-700 border-none outline-none focus-within:outline-none forced-colors:bg-neutral-600" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <p> {type ==="SIGNIN" ? "You don't have an account? " : "You have an account?"}<Link to={type === "SIGNIN" ? "/auth/register" : "/auth/login"} className="transition cursor-pointer hover:text-red-500">{type === "SIGNIN" ? "Create your account !" : "Login now !"}</Link></p>
            {loading ? <Button className='bg-main text-white transition border-none rounded-md hover:bg-main' disabled ><LoaderCircle size={20} className='animate-spin mr-2' /> Please wait</Button> : <Button size={"sm"} className='bg-main transition text-white border-none rounded-md hover:opacity-80 hover:bg-main' type="submit">{type ==="SIGNIN" ? "Sign in" :"Submit"} </Button>}
         </form>
      </Form>
   )
}

export default AuthForm
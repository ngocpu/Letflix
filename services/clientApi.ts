import axios from "axios";

const  axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL_MOVIES,
})

export const apiRequest = async (url:any, method:string, data?:any) =>{
    try{
        const response = await axiosInstance.request({
            url:url,
            method:method,
            data:data
        })
        return response.data
    } catch(err:any){
        throw err
    }
}
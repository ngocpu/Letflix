import axios from "axios";

const  axiosInstance = axios.create({
    baseURL:'https://api.themoviedb.org/3',
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
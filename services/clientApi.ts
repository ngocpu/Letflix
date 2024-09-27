import axios from "axios";
import apiConfig from "./apiConfig";

const  axiosInstance = axios.create({
    baseURL:apiConfig.baseUrl,
})


export const apiRequest = async (url:string | undefined, method:string, data?:any) =>{
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
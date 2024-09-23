import apiConfig from "../apiConfig"
import { apiRequest } from "../clientApi"

export const seachDataApi = async (query:string, page:string) => {
    try{
        const endpointUrl = `${apiConfig.baseUrl}/search/movie?query=${query}&api_key=${apiConfig.apiKey}&page=${page}`
        const response  = await apiRequest(endpointUrl, "GET")
        return response

    } catch(err:any){
        console.error(err)
    }
}
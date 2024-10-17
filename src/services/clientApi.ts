import axios from 'axios'
interface ApiResponse{
    results: Movie[]
}
import { apiConfig } from './apiConfig'
import { Movie } from '@/types'
const api = axios.create({
    baseURL:apiConfig.baseUrl,
    timeout:100000
})

api.interceptors.request.use(
    (config) => {
        config.params = {
            api_key:apiConfig.apiKey
        }
        return config
    },
    (error) => {
        console.log("REQUEST_ERR: ", error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (respose) => {
        return respose.data
    },
    (error) => {
        console.error('RESPONSE_ERR :', error);
        return Promise.reject(error);
    }
)

export const apiRequest = async (endpoint: string, params: object = {}): Promise<any> => {
    try {
        const response = await api.get<ApiResponse>(endpoint, { params });
        return response; 
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};
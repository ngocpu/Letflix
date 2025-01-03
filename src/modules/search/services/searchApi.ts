import { apiRequest } from "@/services/clientApi"
import { TYPE } from "@/shared/constants/apiRoutes"

export const searchMovieApi = async (query:string, page:string) => {
    return apiRequest(`${TYPE.search}?query=${query}&page=${page}`)
}
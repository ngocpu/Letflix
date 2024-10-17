import { apiRequest } from "./clientApi"

const TYPE ={
    discover:"/discover/movie",
    now_playing:"/movie/now_playing",
    popular:"/movie/popular",
    upcoming:"/movie/upcoming",
    topRated:"/movie/top_rated",
    detail:"/movie/{id}",
    cast:"/movie/{id}/credits" ,
    similar:"/movie/{id}/recommendations",
    video:"/movie/{id}/videos",
    search:"/search/movie"
}

export const GetDisCoverMoviesApi = async (page?:number) => {
    return await apiRequest(TYPE.discover, { page: page });
}
export const GetNowPlayingMoviesApi = async (page?:number) => {
    return await apiRequest(TYPE.now_playing, {page:page})
}
export const GetPopularMoviesApi = async (page?:number) => {
    return await apiRequest(TYPE.popular, {page:page})
}
export const GetUpcomingMoviesApi = async (page?:number) => {
    return apiRequest(TYPE.upcoming, {page:page})
}
export const GetTopRatedMovieApi = async (page?:number) => {
    return apiRequest(TYPE.topRated, {page:page})
}
export const getDetailMovieApi = async (id:number) =>{
    return apiRequest(TYPE.detail.replace("{id}", id.toString()))

}
export const getCastsMovieApi = async (id:number) => {
    return apiRequest(TYPE.cast.replace("{id}", id.toString()))

}
export const getRecommentMoviesApi = async (id:number) =>{
    return apiRequest(TYPE.similar.replace("{id}", id.toString()))
}
export const getVideoMovieApi = async (id:number) => {
    return apiRequest(TYPE.video.replace("{id}", id.toString()))
}
export const searchMovieApi = async (query:string, page:string) => {
    return apiRequest(`${TYPE.search}?query=${query}&page=${page}`)
}
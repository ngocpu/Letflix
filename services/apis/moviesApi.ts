import { apiRequest } from "../clientApi";

export const getListMoviesApi = async () => {};
export const getDiscoverMoviesApi = async () => {
  try {
    const endpointUrl = process.env.NEXT_PUBLIC_DISCOVER_MOVIES;
    const res = await apiRequest(endpointUrl, "GET");
    return res.results
  } catch (err: any) {
    console.log(err);
  }
};
export const getNowPhayingMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_NOW_PLAYING_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err);
  }
}
export const getPopularMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_POPULAR_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err);
  }
}
export const getTopRatedMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_TOP_RATED_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err);
  }
}
export const getUpComingMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_UP_COMING_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err);
  }
}
export const getDetailMovie = async(id:number) => {
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
    const res = await apiRequest(endpointUrl, "GET")
    return res
  } catch(err:any){
    console.log(err);
  }
}
export const getCastsMovieApi = async (id:number) =>{
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
    const res = await apiRequest(endpointUrl, "GET")
    return res.cast
  } catch(err:any) {
    console.log(err);
  }
}
export const getVideoMovieApi = async(id:number) => {
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`
    const res = await apiRequest(endpointUrl, "GET")
    const video = res?.results?.filter((item:any) => item.type === "Trailer")
    return video
  } catch(err:any){
    console.log(err);
  }
}

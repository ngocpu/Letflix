import apiConfig from "../apiConfig";
import { apiRequest } from "../clientApi";


const fetchMoviesData = async (endpointUrl: string | undefined) => {
  try {
    const res = await apiRequest(endpointUrl, "GET");
    return res.results;
  } catch (err: any) {
    console.log(err);
  }
};

export const getDiscoverMoviesApi = async () => {
  return fetchMoviesData(process.env.NEXT_PUBLIC_DISCOVER_MOVIES);
};

export const getNowPlayingMoviesApi = async () => {
  return fetchMoviesData(process.env.NEXT_PUBLIC_NOW_PLAYING_MOVIES_URL);
};

export const getPopularMoviesApi = async () => {
  return fetchMoviesData(process.env.NEXT_PUBLIC_POPULAR_MOVIES_URL);
};

export const getTopRatedMoviesApi = async () => {
  return fetchMoviesData(process.env.NEXT_PUBLIC_TOP_RATED_MOVIES_URL);
};

export const getUpcomingMoviesApi = async () => {
  return fetchMoviesData(process.env.NEXT_PUBLIC_UP_COMING_MOVIES_URL);
};

export const getDetailMovie = async(id:number) => {
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}?api_key=${apiConfig.apiKey}`
    const res = await apiRequest(endpointUrl, "GET")
    return res
  } catch(err:any){
    console.log(err);
  }
}
export const getCastsMovieApi = async (id:number) =>{
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}/credits?api_key=${apiConfig.apiKey}`
    const res = await apiRequest(endpointUrl, "GET")
    return res.cast
  } catch(err:any) {
    console.log(err);
  }
}
export const getVideoMovieApi = async(id:number) => {
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}/videos?api_key=${apiConfig.apiKey}`
    const res = await apiRequest(endpointUrl, "GET")
    const video = res?.results?.filter((item:any) => item.type === "Trailer")
    return video
  } catch(err:any){
    console.log(err);
  }
}
export const getMovieImgApi = async(id:string) =>{
  try{
    const endpointUrl = `${process.env.NEXT_PUBLIC_BASE_URL_MOVIES}/movie/${id}/images?api_key=${apiConfig.apiKey}`
    const res = await apiRequest(endpointUrl, "GET")
    return res.backdrops
  } catch(err:any){
    console.log(err)
  }
}


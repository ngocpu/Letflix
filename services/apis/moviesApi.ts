import { apiRequest } from "../clientApi";

export const getListMoviesApi = async () => {};
export const getRandomMoviesApi = async () => {
  try {
    const endpointUrl = process.env.NEXT_PUBLIC_POPULAR_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET");
    return res.results
  } catch (err: any) {
    console.log(err.response.message);
  }
};
export const getNowPhayingMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_NOW_PLAYING_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err.response.message);
  }
}
export const getPopularMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_POPULAR_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err.response.message);
  }
}
export const getTopRatedMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_TOP_RATED_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err.response.message);
  }
}
export const getUpComingMoviesApi = async () => {
  try{
    const endpointUrl = process.env.NEXT_PUBLIC_UP_COMING_MOVIES_URL;
    const res = await apiRequest(endpointUrl, "GET")
    return res.results
  } catch(err:any) {
    console.log(err.response.message);
  }
}

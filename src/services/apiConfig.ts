export const apiConfig ={
    baseUrl: import.meta.env.VITE_BASE_URL_MOVIE_API,
    apiKey:import.meta.env.VITE_MOVIE_API_KEY,
    originalImg: (imgPath:string) => `${import.meta.env.VITE_BASE_URL_MOVIE_IMG}/original/${imgPath}`,
    w500Img: (imgPath:string) => `${import.meta.env.VITE_BASE_URL_MOVIE_IMG}/w500/${imgPath}`
}
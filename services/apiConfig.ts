const apiConfig ={
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL_MOVIES,
    apiKey:process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    originalImg:(imgPath:string) => `${process.env.NEXT_PUBLIC_BASE_IMG_URL}/original/${imgPath}`,
    w500Img:(imgPath:string) => `${process.env.NEXT_PUBLIC_BASE_IMG_URL}/w500/${imgPath}`
}
export default apiConfig
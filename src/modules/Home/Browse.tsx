import Banner from "@/shared/components/Banner"
import Row from "@/shared/components/Row"
import { GetNowPlayingMoviesApi, GetPopularMoviesApi, GetTopRatedMovieApi, GetUpcomingMoviesApi } from "../movies/services/moviesApi"

const Browse = () => {
  return (
    <div className="h-full relative overflow-hidden">
      <Banner />
      <div className="relative w-full scrollbar-hide px-10 mx-5">
          <Row id="1" title="Most popular" fetchUrl={GetPopularMoviesApi()} />
          <Row id="2" title="Now playing" fetchUrl={GetNowPlayingMoviesApi()} />
          <Row id="3" title="Top rated" fetchUrl={GetTopRatedMovieApi()} />
          <Row id="4" title="Up comming" fetchUrl={GetUpcomingMoviesApi()} />
      </div>
    </div>
  )
}

export default Browse
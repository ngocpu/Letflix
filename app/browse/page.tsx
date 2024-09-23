import Banner from '@/components/banner'
import Row from '@/components/row'
import { getNowPlayingMoviesApi, getPopularMoviesApi, getTopRatedMoviesApi, getUpcomingMoviesApi } from '@/services/apis/moviesApi'

const HomePage = () => {
  return (
    <div className='relative h-full w-full overflow-hidden'>
      <Banner />
      <div className=" w-full scrollbar-hide  ml-6 md:ml-10">
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />
        <Row id='2' title='Now playing' fetchUrl={getNowPlayingMoviesApi()} />
        <Row id='3' title='Top rated' fetchUrl={getTopRatedMoviesApi()} />
        <Row id='4' title='Up comming' fetchUrl={getUpcomingMoviesApi()} />
      </div>  
    </div>
  )
}
export default HomePage
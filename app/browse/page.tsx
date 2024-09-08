import Banner from '@/components/banner'
import Row from '@/components/row'
import { getNowPhayingMoviesApi, getPopularMoviesApi, getTopRatedMoviesApi, getUpComingMoviesApi } from '@/services/apis/moviesApi'
import React from 'react'

const HomePage = () => {
  return (
    <div className='relative h-full w-full overflow-hidden'>
      <Banner />
      <div className=" w-full scrollbar-hide  ml-6 md:ml-10">
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />
        <Row id='2' title='Now playing' fetchUrl={getNowPhayingMoviesApi()} />
        <Row id='3' title='Top rated' fetchUrl={getTopRatedMoviesApi()} />
        <Row id='4' title='Up comming' fetchUrl={getUpComingMoviesApi()} />

      </div>
      {/* <div className="bottom-[-85%] absolute w-full h-full pl-6 md:pl-10">
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />
        <Row id='1' title='Most popular' fetchUrl={getPopularMoviesApi()} />

      </div>
      */}
    </div>
  )
}

export default HomePage
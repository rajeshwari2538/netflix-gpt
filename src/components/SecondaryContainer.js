import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
import TopRated from './TopRated';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && <div className='bg-black'>
      <div className='mt-0 md:-mt-52 md:pl-4 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies.trendingMovies}/>
        <MovieList title={"Popular"} movies={movies.popularMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
        <TopRated title={"Top Rated"} movies={movies.topRatedMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer
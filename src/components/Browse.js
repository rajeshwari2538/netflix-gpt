import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import { useEffect } from 'react';

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[showGptSearch])

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useTopRatedMovies();
  return (
    <div>
      {showGptSearch ? (
          <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      
    </div>
  )
}

export default Browse
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies=()=>{

    const dispatch=useDispatch();
    const {topRatedMovies}=useSelector((store)=>store.movies);
    
  useEffect(()=>{
  !topRatedMovies &&  getTopRatedMovies();
  },[])

  const getTopRatedMovies=async()=>
  {
    const data= await fetch("https://api.themoviedb.org/3/movie/top_rated",API_OPTIONS)
    const json= await data.json();
    dispatch(addTopRatedMovies(json.results))
  }
}

export default useTopRatedMovies;
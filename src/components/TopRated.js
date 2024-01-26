import { svgArray } from "../utils/svgsExports";
import MovieCard from "./MovieCard";


const TopRated = ({title,movies}) => {

    const topRated = movies?.length>10 ? movies.slice(0,10) : movies;
    
  
  return (
    <div className="px-6">
        <h1 className="text-3xl py-4 text-white">{title}</h1>
        <div className="flex overflow-x-scroll no-scrollbar">
            {
                <div className="flex">
                    {topRated?.map((movie,index) => <div className="flex h-max"><div className={(index==9 ? 'w-32' : "w-20")}>{svgArray[index]}</div><MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path}/></div>)}
                </div>
            }
        </div>
    </div>
  )
}

export default TopRated
import { IMG_CDN_URL } from "../utils/constants"


const MovieCard = ({posterPath}) => {

  if(!posterPath) return null;

  return (
    <div className="w-36 md:w-48 pr-4 aspect-[2/3] cursor-pointer hover:scale-95 origin-center transition-all duration-100 ease-in">
        <img alt="movie poster"
            src={IMG_CDN_URL + posterPath}
        />
    </div>
  )
}

export default MovieCard
import { IMG_CDN_URL } from "../utils/constants"


const MovieCard = ({posterPath}) => {

  if(!posterPath) return null;

  return (
    <div className="w-56 pr-4 aspect-[2/3]">
        <img alt="movie poster"
            src={IMG_CDN_URL + posterPath}
        />
    </div>
  )
}

export default MovieCard
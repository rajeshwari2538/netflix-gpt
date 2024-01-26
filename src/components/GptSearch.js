import { useEffect } from "react";
import { BG_IMAGE } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
        <div className='fixed -z-10'>
            <img src={BG_IMAGE} alt="bg-img" className="h-screen object-cover md:w-screen"/>
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef, useState } from "react";
import openai from "../utils/openai"
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";


const GptSearchBar = () => {

  const [errorMessage,setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null)

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&page=1',API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async() => {

    if (searchText.current.value === "") {
      setErrorMessage("Please provide a valid input");
      return;
    }

    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma seprated like the example result give ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"
    const gptResults = await openai.createChatCompletion({
      messages: [{role: "user", content: gptQuery}],
      model: "gpt-3.5-turbo",
    });

    if(!gptResults.choices){
      setErrorMessage("An unexpected problem has occured. Please try after some time ");
      return;
    }else{
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))

      const tmdbResults = await Promise.all(promiseArray);
      setErrorMessage(null);
      dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
    }
  }

  return (
    <div className="pt-[50%] md:pt-[15%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input 
               ref={searchText}
               onChange={()=>setErrorMessage(null)}
               type="text"
               className="px-2 py-0 md:p-3 m-3 rounded-md col-span-9"
               placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
                {lang[langKey].search}
            </button>
        </form>
        {errorMessage && <p className="text-red-600 text-lg">{errorMessage}</p>}
    </div>
  )
}

export default GptSearchBar

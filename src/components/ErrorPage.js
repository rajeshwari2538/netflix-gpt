import { useNavigate } from "react-router-dom"
import { BG_IMAGE } from "../utils/constants";


const ErrorPage = () => {

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <div>
        <div className="absolute">
            <img className="min-h-screen w-screen object-cover" src={BG_IMAGE} alt="bg-img"/>
        </div>
        <div className="absolute rounded-md mx-auto my-auto top-28 left-0 right-0 bg-black bg-opacity-80 px-10 text-white w-10/12 md:w-3/12 ">
            <p className="text-xl md:text-3xl pt-8 pb-4 my-3 font-bold">You ran into something unexpected!!</p>
            <button onClick={handleBackToHome} className="rounded-md bg-red-600 mx-2 my-3 md:mt-4 w-full p-4">Take me Home</button>
        </div>
    </div>
  )
}

export default ErrorPage
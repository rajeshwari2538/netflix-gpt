import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useWatchMovie from '../hooks/useWatchMovie';
import { useDispatch, useSelector } from 'react-redux';
import { addWatchMovie } from '../utils/moviesSlice';
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from "../utils/userSlice";

const WatchMovie = () => {
  
  const {movieId} = useParams();
  const navigate = useNavigate();
  useWatchMovie(movieId);
  const dispatch = useDispatch();
  const youtubeKey = useSelector(store => store.movies?.watchMovie)

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/movie/" + movieId);
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  },[])

  const handleBackToHome = () => {
    dispatch(addWatchMovie(null));
    navigate("/browse");
  };

  return (
    <div className="h-screen">
      <div className="bg-black  w-full p-4">
        <div className=" cursor-pointer mt-4">
          <button
            className="text-white text-lg inline-block bg-purple-800 py-2 px-2 rounded-md ml-2"
            onClick={handleBackToHome}
          >
            Back to home
          </button>
        </div>
      </div>
      <div className="w-full h-[90%]  ">
        <iframe
          className="w-full h-full  object-cover aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            youtubeKey?.key +
            "?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          }
          title="YouTube video player"
          loading="lazy"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="bg-black h-[10%]"></div>
    </div>
  )
}

export default WatchMovie
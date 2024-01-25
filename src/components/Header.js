import { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/")
      }
    });

    return () => unsubscribe();
  },[])

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44 ' src={LOGO} alt="logo"/>
        {user && (
          <div className='flex p-2'>
            <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option> )}
            </select>
            <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white'
              onClick={handleGptSearch}
            >
              GPT Search
            </button>
          <img className='w-12 h-12' src={USER_AVATAR} alt="user-img"/>
          <button className='font-bold text-white' onClick={handleSignOut}>Sign Out</button>
        </div>
        )}
        
    </div>
  )
}

export default Header
import { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {

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

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44 ' src={LOGO} alt="logo"/>
        <div className='flex p-2'>
          <img className='w-12 h-12' src={USER_AVATAR} alt="user-img"/>
          <button className='font-bold text-white' onClick={handleSignOut}>Sign Out</button>
        </div>
    </div>
  )
}

export default Header
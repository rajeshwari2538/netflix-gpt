import { useState,useRef } from 'react'
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMAGE } from '../utils/constants';

const Login = () => {
  
  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value
        }).then(() => {
          const {uid,email,displayName} = auth.currentUser;
          dispatch(
            addUser({
              uid:uid,
              email:email,
              displayName:displayName
            }))
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });

    }else{
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.endsWith("invalid-credential"))
          setErrorMessage("Invalid user credential");
          else
          setErrorMessage(errorCode +"-"+errorMessage);
      });
    }
}

  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src={BG_IMAGE} alt="bg-img" className='h-screen object-cover md:w-screen'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='w-full absolute md:w-3/12 mx-auto p-12 bg-black my-36 right-0 left-0 text-white rounded-sm opacity-80' >
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<input 
              ref={name}
              type='text'
              placeholder='Full Name'
              className='p-2 my-2 w-full rounded-sm bg-gray-700'
            />)}
            <input 
              ref={email}
              type='text'
              placeholder='Email Address'
              className='p-2 my-2 w-full rounded-sm bg-gray-700'
            />
            <input 
              ref={password}
              type='password'
              placeholder='Password'
              className='p-2 my-2 w-full rounded-sm bg-gray-700'
            />
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button 
              className='p-2 my-2 bg-red-700 w-full rounded-sm'
              onClick={handleButtonClick}>
                Sign In
            </button>
            <p className='p-4 cursor-pointer' 
              onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In"}
            </p>
             
        </form>
    </div>
  )
}

export default Login
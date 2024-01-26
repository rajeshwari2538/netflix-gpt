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
            <img src={BG_IMAGE} alt="bg-img" className='min-h-screen w-screen object-cover'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} 
          className='absolute rounded-md mx-auto my-auto top-40 left-0 right-0 bg-black bg-opacity-80 px-10  text-white w-10/12 md:w-3/12' >
            <h1 className='text-2xl md:text-3xl pt-8 pb-4 my-3 font-bold'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<input 
              ref={name}
              type='text'
              placeholder='Full Name'
              className='m-2 bg-zinc-800 outline-none rounded-md text-sm md:text-lg p-4 w-full'
            />)}
            <input 
              ref={email}
              type='text'
              placeholder='Email Address'
              className='m-2 bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg'
            />
            <input 
              ref={password}
              type='password'
              placeholder='Password'
              className='m-2  bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg'
            />
            <p className='text-md text-red-800 m-2 p-2'>{errorMessage}</p>
            <button 
              className='rounded-md bg-red-600 m-2 mt-3 w-full p-4'
              onClick={handleButtonClick}>
                Sign In
            </button>
            <p className='pt-5 pb-6 px-3 cursor-pointer text-sm md:text-lg' 
              onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In"}
            </p>
             
        </form>
    </div>
  )
}

export default Login
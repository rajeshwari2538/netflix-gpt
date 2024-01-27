import { useState,useRef } from 'react'
import Header from './Header';
import { checkIfDataValid } from '../utils/validate';
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
  const emailSignIn = useRef(null);
  const emailSignUp = useRef(null);
  const passwordSignIn = useRef(null);
  const passwordSignUp = useRef(null);

  const toggleSignInForm = (e) => {
    setErrorMessage(null);
    setIsSignInForm(prev=>!prev);
  }
  const handleButtonClick = () => {

    if(!isSignInForm && name.current.value ==""){
      setErrorMessage("Please tell us your name");
      return;
    }

    if(!isSignInForm){
      const error = checkIfDataValid(emailSignUp.current.value, passwordSignUp.current.value, isSignInForm);
      setErrorMessage(error);
      if(error) return;
    }else{
      const error = checkIfDataValid(emailSignIn.current.value, passwordSignIn.current.value,isSignInForm);
      setErrorMessage(error);
      if(error) return;
    }

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth,emailSignUp.current.value,passwordSignUp.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value
        }).then(() => {
          setErrorMessage("Sign up successful! Try signing in.")
          const {uid,email,displayName} = auth.currentUser;
          dispatch(
            addUser({
              uid:uid,
              email:email,
              displayName:displayName
            }))
        }).catch((error) => {
        
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.endsWith("email-already-in-use"))
        setErrorMessage("User already Exists. Try signing in");
        else
        setErrorMessage(errorCode +"-"+errorMessage);
      });

    }else{
      signInWithEmailAndPassword(auth,emailSignIn.current.value,passwordSignIn.current.value)
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
        <div className='fixed'>
            <img src={BG_IMAGE} alt="bg-img" className='min-h-screen w-screen object-cover'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} 
          className='absolute rounded-md mx-auto my-auto top-40 left-0 right-0 bg-black bg-opacity-80 px-10  text-white w-10/12 md:w-3/12' >
            <h1 className='text-2xl md:text-3xl pt-8 pb-4 my-3 font-bold'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm ? 
            <>
                <input type="text" placeholder='Full Name' ref={name} key="name" className='m-2 bg-zinc-800 outline-none rounded-md text-sm md:text-lg p-4 w-full' />
                <input type="text" placeholder='Email address' key="emailSignIn"   ref={ emailSignUp}  className='m-2 bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg' />
                <input type="password" placeholder='Password'key="passSignIn"  ref={passwordSignUp}   className='m-2  bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg' />
                <p className="text-xs text-zinc-600  p-2 inline-block">Choose a password with a combination of capital,small alphabets and special characters.</p>
            </> : 
            <>
              <input type="text" placeholder='Email address' key="emailSignUp" ref={emailSignIn}  className='m-2 bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg' />
              <input type="password" placeholder='Password' key="passSignUp" ref={passwordSignIn}  className='m-2  bg-zinc-800 outline-none rounded-md p-4 w-full text-sm md:text-lg' />
            </>
            }
            {errorMessage && <p className='text-md text-red-800 m-2 p-2'>{errorMessage}</p>}
            <button className="rounded-md bg-red-600 m-2 mt-3 w-full p-4" onClick={handleButtonClick} >{isSignInForm?"Sign in":"Sign up"}</button>
            <p className='pt-2 pb-6 px-3 cursor-pointer text-sm md:text-lg' onClick={toggleSignInForm}><span className='text-gray-400'>{isSignInForm?"New to Netflix?":"Already a user?"} </span>{isSignInForm?"Sign up now!":"Sign in"} </p> 
        </form>
    </div>
  )
}

export default Login
export const checkIfDataValid=(email,password,isSignInForm)=>{
    const emailValid= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValid= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
   if(!isSignInForm)
   {
    if(!emailValid)
    return "Please enter a valid email"
    if(!passwordValid)
    return "Choose a stronger password"
   }
   else{
    if(!emailValid)
    return "Please enter a valid email"
    if(!passwordValid)
    return "Wrong password"
   }
    return null;

}
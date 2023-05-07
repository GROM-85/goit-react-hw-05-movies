
import { auth, createUserFirebaseDB } from "AppFirebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser,LogIn } from 'redux/Auth/authSlice';
import { toast } from 'react-hot-toast';


const signUpService = async({email,password,username}) => {

  await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser,{displayName:username});
          createUserFirebaseDB(user.uid);
          // console.log('signUp',user);
         toast.success("You have successfully registered!")
      })
      .catch((error) => {
          (error?.customData?._tokenResponse?.error?.message === 'EMAIL_EXISTS' && toast.error('EMAIL_EXISTS'))||console.log(error);
      });
};

const signInService = async ({ email, password },dispatch) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // console.log('signInName',user.displayName)
      // console.log('signInUID',user.uid)
      // uid need to add when submit favorite
      dispatch(setUser({username:user.displayName, uid:user.uid}))
      dispatch(LogIn());
      toast.success('You are Logged In!');
    })
    .catch(error => {
      const errorMessage = error.message;
      // console.log(errorMessage)
    });
};



export {
  signUpService,
  signInService
}




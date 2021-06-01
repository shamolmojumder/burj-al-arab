import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { createGenerateClassName } from '@material-ui/styles';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const Login = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const history=useHistory();
  const location =useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
    if (firebase.apps.length===0) {
      firebase.initializeApp(firebaseConfig);    
    }
    const handleGoogleSignIn =()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var {displayName,email} = result.user;
          const signInUser ={name:displayName,email};
          console.log(result.user);
          setLoggedInUser(signInUser);
          history.replace(from);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          // ...
        });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn }>Google SignIn </button>
        </div>
    );
};

export default Login;
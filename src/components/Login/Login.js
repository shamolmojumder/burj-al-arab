import React, { useContext } from 'react';
// import 'date-fns';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
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
          storeAuthToken();
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

    const storeAuthToken=()=>{
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        sessionStorage.setItem('token',idToken);
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
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
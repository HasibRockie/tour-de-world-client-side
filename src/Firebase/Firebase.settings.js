import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import initializeAuth from "./Firebase.config";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

initializeAuth();

const FirebaseSettings = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        const uid = user.uid;
      }
      else{
        setUser({})
        setLoggedIn(false)
      }
      setLoading(false)
    });
  }, []);

  // google sign in
  const handleGoogleSignin = () => {
    setLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        history.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      })
      .finally(setLoading(false))
  };

  const handleSignout = () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        setUser({});
        setLoggedIn(false)
      })
      .catch((error) => {
        console.log(error.errorMessage);
      })
      .finally(setLoading(false))
  };

  return {
    handleGoogleSignin,
    handleSignout,
    user,
    loggedIn,
    setUser,
    loading
  };
};

export default FirebaseSettings;

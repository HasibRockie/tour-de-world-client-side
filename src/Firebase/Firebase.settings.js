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
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
        setUserProfile({ user, cart, orders }); //updated
        const uid = user.uid;
      } else {
        setUser({});
        setUserProfile({});
        setLoggedIn(false);
        setCart([]);
        setOrders([]);
      }
      setLoading(false);
    });
  }, []);

  // check user function
  // const checkUser = (user) => {
    
  //   const member = allUsers.filter(
  //     (singleUser) => singleUser.user === user
  //   );
  //   console.log(member);
  //   if (member) {
  //     console.log("old user!");
  //     console.log(allUsers);
  //   } else {
  //     console.log("new user");
  //   }
  // };

  // google sign in
  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // checkUser(user);
        setUserProfile({ user, cart, orders });
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      })
      .finally(setLoading(false));
  };

  const handleSignout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        setLoggedIn(false);
        setUserProfile({});
        setCart([]);
        setOrders([]);
      })
      .catch((error) => {
        console.log(error.errorMessage);
      })
      .finally(setLoading(false));
  };

  return {
    handleGoogleSignin,
    handleSignout,
    user,
    loggedIn,
    setUser,
    loading,
    services,
    setServices,
    allUsers,
    setAllUsers,
    cart,
    setCart,
    orders,
    setOrders,
    userProfile,
    setUserProfile,
  };
};

export default FirebaseSettings;
